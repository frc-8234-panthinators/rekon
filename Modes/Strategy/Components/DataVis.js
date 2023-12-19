import * as React from 'react';
import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Pressable, Modal } from 'react-native';
import Colors from '../../../colors';
import {LineChart, PieChart} from "react-native-chart-kit";
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WidgetCarousel from './WidgetCarousel';
import ColorPicker from 'react-native-wheel-color-picker';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        navigation.navigate('ErrorPage', {error: e.name + '\n' + e.message});
    }
};

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        navigation.navigate('ErrorPage', {error: e.name + '\n' + e.message});
    }
};

function getRandomHexColor() {
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert the decimal values to hexadecimal
    const hexRed = red.toString(16).padStart(2, '0');
    const hexGreen = green.toString(16).padStart(2, '0');
    const hexBlue = blue.toString(16).padStart(2, '0');

    // Concatenate the hex values to form the color code
    const hexColor = `#${hexRed}${hexGreen}${hexBlue}`;

    return hexColor;
}  

export default function VisualView({ route, navigation }) {
    let [tbaData, setTbaData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let [noData, setNoData] = useState(false);
    let [noTemplate, setNoTemplate] = useState(false);
    let [template, setTemplate] = useState([]);
    let [visLoaded, setVisLoaded] = useState(false);
    let [visData, setVisData] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [userColors, setUserColors] = useState([]);
    const [startColor, setStartColor] = useState('#000000');
    const [activeColor, setActiveColor] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const team = route.params.teamId;
    const event = route.params.event;
    const year = route.params.year;

    function resetTemplate() {
        storeData(`visTemplate${year}`, []);
        setTemplate([]);
    }

    function openTemplateBuilder() {
        navigation.navigate('TemplateBuilder', {year: year, event: event, team: team});
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await ky.get(`${Constants.API_URL}/getTeamMatchData?team=${team}&event=${event}`).json();
                if (data.error) {
                    navigation.navigate('ErrorPage', {error: `The server has encountered an unhandled exception:\n${data.error}\n${data.message}`});
                    return;
                } else if (data.message) {
                    setNoData(true);
                    return;
                }
                setTbaData(data);
            } catch (error) {
                if (error.name == 'TypeError') {
                    navigation.navigate('ErrorPage', {error: 'Lost connection to server'});
                } else {
                    navigation.navigate('ErrorPage', {error: error.name + '\n' + error.message});
                }
            }
            const template = await getData(`visTemplate${year}`);
            if (template == null || template.length == 0) {
                setNoTemplate(true);
                console.log('no template');
            } else {
                setIsLoading(false);
                setNoTemplate(false);
                setTemplate(template);
                setVisLoaded(false);
            }
        }
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [navigation]);

    if (!visLoaded && template.length != 0) {
        let graphs = [];
        for (const dataPoint of template) {
            const graphData = {
                "title": dataPoint.label,
                "labels": [],
                "data": []
            }
            if (dataPoint.widget == "number") {
                graphData['type'] = 'line';
                for (const match of tbaData) {
                    let tempMatch = [];
                    let tempSelected = [];
                    let currentAlliance = '';
                    if (match.alliances.blue.team_keys.includes(`frc${team}`)) {
                        currentAlliance = 'blue';
                    } else {
                        currentAlliance = 'red';
                    }
                    if (dataPoint.value.includes('/')) {
                        tempMatch = match.score_breakdown[currentAlliance];
                        tempSelected = dataPoint.value.split('/')[1];
                    } else { 
                        tempMatch = match;
                        tempSelected = dataPoint.value;
                    }
                    let prefix;
                    if (match.comp_level == "qm") {
                        prefix = "Qual ";
                    } else if (match.comp_level == "qf") {
                        prefix = "Quarter-Final ";
                    } else if (match.comp_level == "sf") {
                        prefix = "Semi-Final ";
                    } else if (match.comp_level == "f") {
                        prefix = "Final ";
                    }
                    graphData.labels.push(prefix + match.match_number);
                    if (tempMatch[tempSelected] == null) {
                        graphData.data.push(0);
                    } else {
                        graphData.data.push(tempMatch[tempSelected])
                    }
                }
            } else if (dataPoint.widget == 'text') {
                graphData['type'] = 'pie';
                let typeDict = {};
                for (const match of tbaData) {
                    let tempMatch = [];
                    let tempSelected = [];
                    let currentAlliance = '';
                    if (match.alliances.blue.team_keys.includes(`frc${team}`)) {
                        currentAlliance = 'blue';
                    } else {
                        currentAlliance = 'red';
                    }
                    if (dataPoint.value.includes('/')) {
                        tempMatch = match.score_breakdown[currentAlliance];
                        tempSelected = dataPoint.value.split('/')[1];
                    } else {
                        tempMatch = match;
                        tempSelected = dataPoint.value;
                    }
                    if (tempMatch[tempSelected] in typeDict) {
                        const number = typeDict[tempMatch[tempSelected]];
                        typeDict[tempMatch[tempSelected]] = number + 1
                    } else {
                        typeDict[tempMatch[tempSelected]] = 1
                    }
                }
                let indexCounter = 0;
                for ([key,point] of Object.entries(typeDict)) {
                    let chartData = {
                        name: key,
                        population: point,
                        color: dataPoint.colors[indexCounter],
                        legendFontColor: '#e3e2e6',
                        legendFontSize: 15
                    }
                    graphData.data.push(chartData)
                    indexCounter++;
                }
            }
            graphs.push(graphData);
        }
        setVisData({graphs: graphs})
        setVisLoaded(true);
    }

    if (noTemplate) {
        return (
            <View style={styles.flexFooter}>
                <ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
                    <View style={styles.subRootView}>
                        <Text style={styles.visText}>No template for this year</Text>
                        <Pressable style={styles.button} onPress={openTemplateBuilder}><Text style={styles.text}>Create Template</Text></Pressable>
                    </View>
                </ScrollView>
            </View>
        )
    }

    if (noData) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>No data for this event</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size={Dimensions.get('window').width*0.6} color={Colors.text} />
            </View>
        )
    } else if (template.length != 0 && visLoaded) {
        return (
            <ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
                <View style={styles.subRootView}>
                    {visData.graphs.map((graphData, index) => {
                        console.log(graphData)
                        if (graphData.type == "line") {
                            return(
                                <View style={styles.viewWrapper} horizontal={true}>
                                    <Text style={styles.visText}>{graphData.title}</Text>
                                    <LineChart verticalLabelRotation={60} data={{
                                        labels: graphData.labels,
                                        datasets: [
                                            {
                                                data: graphData.data,
                                            }
                                            
                                        ],
                                    }}
                                    width={Dimensions.get("window").width*0.86}
                                    height={Dimensions.get("window").height * 0.4}
                                    fromZero={true}
                                    yAxisSuffix="pts"
                                    yAxisInterval={1} // optional, defaults to 1
                                    chartConfig={{
                                    backgroundColor: "#e26a00",
                                    backgroundGradientFrom: Colors.secondary,
                                    backgroundGradientTo: Colors.secondary,
                                    propsForBackgroundLines: {
                                        strokeWidth: 1,
                                        stroke: Colors.border,
                                    },
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => Colors.graphPrimary,
                                    labelColor: (opacity = 1) => Colors.graphPrimary,
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: Colors.graphPrimary
                                    }
                                    }}
                                    bezier
                                    style={{
                                        marginVertical: 8,
                                        borderRadius: 10
                                    }}
                                />
                            </View>
                            )
                        } else if (graphData.type == 'pie') {
                            return (
                                <View style={styles.viewWrapper}>
                                    <Pressable onPress={() => {setEditModalVisible(!editModalVisible); setActiveIndex(index)}} style={styles.editButton}>
                                        <Text style={styles.visText}>{graphData.title}</Text>
                                        <PieChart data={graphData.data}
                                        width={Dimensions.get("window").width * 0.86}
                                        height={220}
                                        chartConfig={{
                                            color: (opacity = 1) => Colors.graphPrimary,
                                        }}
                                        style={{
                                            borderRadius: 10
                                        }}
                                        accessor={"population"}
                                        backgroundColor={Colors.secondary}
                                        paddingLeft={"15"}
                                        />
                                    </Pressable>
                                </View>
                            )
                        }
                    })}
                    <Modal animationType='slide' transparent={true} visible={editModalVisible} onRequestClose={() => {setEditModalVisible(!editModalVisible)}}>
                        <View style={styles.dimBackground}>
                            <View style={styles.modalPopup}>
                                <Text style={styles.text}>Legend</Text>
                                <View style={styles.divider}></View>
                                {visLoaded && visData.graphs[activeIndex].data.map((item, index) => {
                                    return (
                                        <View style={styles.flexHorizontal}>
                                            <Text style={styles.text}>{item.name}</Text>
                                            <Pressable onPress={() => {setColorModalVisible(!colorModalVisible); setActiveColor(index); setStartColor(item.color)}} style={{backgroundColor: item.color, width: 50, height: 50}}></Pressable>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                    </Modal>
                    <Modal visible={colorModalVisible} onRequestClose={() => {setColorModalVisible(!colorModalVisible)}}>
                        <View style={[styles.flexHorizontal, {backgroundColor: Colors.secondary, paddingTop: 20}]}>
                            <View style={{backgroundColor: startColor, flexGrow: 1, height: 50}}></View>
                            <View style={{backgroundColor: visData.graphs[activeIndex].data[activeColor].color, flexGrow: 1, height: 50}}></View>
                        </View>
                        <ColorPicker style={{flex: 1, padding: 20, backgroundColor: Colors.secondary}} color={visData.graphs[activeIndex].data[activeColor].color} onColorChangeComplete={async (color) => {
                            template[activeIndex].colors[activeColor] = color;
                            await storeData(`visTemplate${year}`, template);
                            setVisLoaded(false);
                            }}/>
                    </Modal>
                    <Pressable style={styles.button} onPress={() => {navigation.navigate('TemplateBuilder', {year: year, event: event, team: team})}}><Text style={styles.text}>Add new data point</Text></Pressable>
                    <Pressable style={styles.button} onPress={resetTemplate}><Text style={styles.text}>Reset Template</Text></Pressable>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    flexFooter: {
        flex: 1,
        backgroundColor: Colors.primary,
        height: Dimensions.get('window').height
    },
    rootView: {
        backgroundColor: Colors.primary,
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight,
    },
    center: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subRootView: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        marginBottom: 20
    },
    visText: {
        color: Colors.text,
        fontSize: 20,
    },
    errorText: {
        color: Colors.text,
        padding: 5,
        fontSize: normalize(30),
    },
    viewWrapper: {
        width: "90%",
        minHeight: 240,
        backgroundColor: Colors.secondary,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
    },
    button: {
        backgroundColor: Colors.accent,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        color: Colors.text,
        fontSize: normalize(18),
        padding: 10,
    },
    modalPopup: {
        backgroundColor: Colors.secondary,
        width: '90%',
        height: '90%',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        padding: 10
    },
    dimBackground: {
        backgroundColor: '#000000aa',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 10
    },
  });