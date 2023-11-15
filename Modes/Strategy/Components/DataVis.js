import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../../colors';
import {LineChart, PieChart} from "react-native-chart-kit";
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WidgetCarousel from './WidgetCarousel';

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

export default function VisualView({ route, navigation }) {
    let [tbaData, setTbaData] = useState({});
    let [isLoading, setIsLoading] = useState(true);
    let [noData, setNoData] = useState(false);
    let [noTemplate, setNoTemplate] = useState(false);
    let [template, setTemplate] = useState([]);
    let [visLoaded, setVisLoaded] = useState(false);
    let [visData, setVisData] = useState([]);
    let [carouselVisible, setCarouselVisible] = useState(false);
    let [widgetPositions, setWidgetPositions] = useState([]); // [x, y, width, height]
    const team = route.params.teamId;
    const event = route.params.event;
    const year = route.params.year;

    function resetTemplate() {
        storeData(`visTemplate${year}`, []);
        setTemplate([]);
    }

    function toggleWYSIWYGcarousel() {
        setCarouselVisible(!carouselVisible);
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
            if (dataPoint.widget = "line") {
                const graphData = {
                    "title": dataPoint.label,
                    "type": "line",
                    "labels": [],
                    "data": []
                }
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
                graphs.push(graphData);
            }
        }
        setVisData({graphs: graphs})
        setVisLoaded(true);
    }

    if (noTemplate) {
        return (
            <View style={styles.flexFooter}>
                <ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
                    <View style={styles.subRootView}>
                        <Text style={styles.visText} onLayout={(event => {
                            setWidgetPositions([{x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y, w: event.nativeEvent.layout.width, h: event.nativeEvent.layout.height}]);
                        })}>Drag a widget to begin</Text>
                    </View>
                </ScrollView>
                <WidgetCarousel widgetPositions={widgetPositions}/>
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
                <ActivityIndicator size={Dimensions.get('window').width*0.6} color={Colors.subText} />
            </View>
        ) 
    } else if (template.length != 0 && visLoaded) {
        return (
            <View style={styles.flexFooter}>
                <ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
                    <View style={styles.subRootView}>
                        {noTemplate ? <Text style={styles.visText}>No template for this year</Text> : null}
                        <Pressable style={styles.button} onPress={toggleWYSIWYGcarousel}><Text style={styles.text}>Edit Template</Text></Pressable>
                    </View>
                </ScrollView>
                {carouselVisible ? <WidgetCarousel/> : null}
            </View>
        )
        /*return (
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
                                    backgroundGradientFrom: Colors.tab,
                                    backgroundGradientTo: Colors.tab,
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
                                    backgroundColor={Colors.tab}
                                    paddingLeft={"15"}
                                    />
                                </View>
                            )
                        }
                    })}
                    <Pressable style={styles.button} onPress={() => {navigation.navigate('TemplateBuilder', {year: year, event: event, team: team})}}><Text style={styles.text}>Add new data point</Text></Pressable>
                    <Pressable style={styles.button} onPress={resetTemplate}><Text style={styles.text}>Reset Template</Text></Pressable>
                </View>
            </ScrollView>
        );*/
    }
}

const styles = StyleSheet.create({
    flexFooter: {
        flex: 1,
        backgroundColor: Colors.background,
        height: Dimensions.get('window').height
    },
    rootView: {
        backgroundColor: Colors.background,
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subRootView: {
        backgroundColor: Colors.background,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
        marginBottom: 20
    },
    visText: {
        color: Colors.subText,
        fontSize: 20,
    },
    errorText: {
        color: Colors.subText,
        padding: 5,
        fontSize: normalize(30),
    },
    viewWrapper: {
        width: "90%",
        minHeight: 240,
        backgroundColor: Colors.tab,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
    },
    button: {
        backgroundColor: Colors.tab,
        borderRadius: 10,
        padding: 10,
        width: '90%',
        display: 'flex',
        alignItems: 'center',
    },
    text: {
        color: Colors.subText,
        fontSize: normalize(18),
        padding: 10,
    }
  });