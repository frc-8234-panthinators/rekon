import * as React from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ScrollView, Image, Pressable, Dimensions, Modal, StatusBar } from 'react-native';
import {useColors} from '../../../colors';
import { useState, useEffect } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { normalize } from '../../CommonComponents/fontScaler';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmbeddedView from '../Components/EmbeddedVis';
import ColorPicker from 'react-native-wheel-color-picker';


const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
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

export default function TemplateBuilder({ route, navigation }) {
    const { Colors } = useColors();
    const [selectedSource, setSelectedSource] = useState("");
    const [selectedData, setSelectedData] = useState("");
    const [previewLoaded, setPreviewLoaded] = useState(false);
    const [dataPoints, setDataPoints] = useState([{label: "(Select a data point)", value: ""}]);
    const [dataLoaded, setDataLoaded] = useState("");
    const [matchData, setMatchData] = useState([]);
    const [previewData, setPreviewData] = useState(null);
    const [userColors, setUserColors] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [colorModalVisible, setColorModalVisible] = useState(false);
    const [activeColor, setActiveColor] = useState(0);
    const [startColor, setStartColor] = useState('#000000');
    const team = route.params.team;
    const event = route.params.event;
    const year = route.params.year;

    const styles = StyleSheet.create({
        rootView: {
            backgroundColor: Colors.primary,
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: 10,
            alignItems: 'center',
            gap: 20,
            paddingTop: StatusBar.currentHeight + 20,
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
        text: {
            color: Colors.text,
            fontSize: normalize(30),
        },
        picker: {
            color: Colors.text,
            backgroundColor: Colors.secondary,
            width: '90%'
        },
        button: {
            backgroundColor: Colors.secondary,
            borderRadius: 10,
            padding: 10,
            width: '90%',
            display: 'flex',
            alignItems: 'center',
            position: 'absolute',
            bottom: 20
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
        divider: {
            backgroundColor: Colors.text,
            width: '100%',
            height: 1,
            margin: 10
        }
    });

    async function saveAndReturn() {
        if (selectedSource == "" || selectedData == "") {
            return;
        }
        const dataPoint = selectedData.value;
        const dataType = selectedData.type;
        const dataLabel = selectedData.label;
        const data = {source: selectedSource, value: dataPoint, type: dataType, label: dataLabel, widget: selectedData.widget, colors: userColors};
        if (await getData(`visTemplate${year}`) == null) {
            await storeData(`visTemplate${year}`, [data]);
        } else {
            const template = await getData(`visTemplate${year}`);
            template.push(data);
            await storeData(`visTemplate${year}`, template);
        }
        navigation.goBack();
    }

    async function openDataEditor() {
        setEditModalVisible(!editModalVisible);
    }

    const sources = [
        {label: "(Select a source)", value: ""},
        {label: "The Blue Alliance", value: "tba"},
        {label: "Pit Forms", value: "pit"},
        {label: "Match Forms", value: "match"},
    ]

    if (selectedSource == "tba" && dataLoaded != "tba") {
        const fetchData = async () => {
            try {
                const data = await ky.get(`${Constants.API_URL}/getTeamMatchData?team=${team}&event=${event}`).json();
                setMatchData(data);
                const dataPoints = [{label: "(Select a data point)", value: ""}];
                const dataTracker = [];
                for (const match of data) {
                    const keys = Object.keys(match);
                    for (const key of keys) {
                        if (!dataTracker.includes(key)) {
                            if (key == "score_breakdown") {
                                const scoreKeys = Object.keys(match[key].blue);
                                for (const scoreKey of scoreKeys) {
                                    if (!dataTracker.includes(scoreKey)) {
                                        dataTracker.push(scoreKey);
                                        let widget;
                                        if (typeof match[key].blue[scoreKey] == "string" || typeof match[key].blue[scoreKey] == "boolean") {
                                            widget = "text";
                                        } else if (typeof match[key].blue[scoreKey] == "object") {
                                            break;
                                        } else {
                                            widget = "number";
                                        }
                                        dataPoints.push({label: scoreKey, value: `scoreBreakdown/${scoreKey}`, type: typeof match[key].blue[scoreKey], widget: widget});
                                    }
                                }
                            } else {
                                dataTracker.push(key);
                                let widget;
                                if (typeof match[key] == "string" || typeof match[key] == "boolean") {
                                    widget = "text";
                                } else if (typeof match[key] == "object") {
                                    break;
                                } else {
                                    widget = "number";
                                }
                                dataPoints.push({label: key, value: key, type: typeof match[key], widget: widget});
                            }
                        }
                    }
                }
                setDataPoints(dataPoints);
                setDataLoaded('tba');
            } catch (error) {
                navigation.navigate('ErrorPage', {error: error.name + '\n' + error.message});
            }
        };
        fetchData();
    }

    if (selectedData != "" && !previewLoaded) {
        let graphData = {
            "title": selectedData.label,
            "labels": [],
            "data": []
        }
        if (selectedData.widget == 'number') {
            graphData['type'] = 'line';
            for (const match of matchData) {
                let tempMatch = [];
                let tempSelected = [];
                let currentAlliance = '';
                if (match.alliances.blue.team_keys.includes(`frc${team}`)) {
                    currentAlliance = 'blue';
                } else {
                    currentAlliance = 'red';
                }
                if (selectedData.value.includes('/')) {
                    tempMatch = match.score_breakdown[currentAlliance];
                    tempSelected = selectedData.value.split('/')[1];
                } else {
                    tempMatch = match;
                    tempSelected = selectedData.value;
                }
                graphData.labels.push("Qual " + match.match_number);
                graphData.data.push(tempMatch[tempSelected])
            }
        } else if (selectedData.widget == 'text') {
            graphData['type'] = 'pie';
            let typeDict = {};
            for (const match of matchData) {
                let tempMatch = [];
                let tempSelected = [];
                let currentAlliance = '';
                if (match.alliances.blue.team_keys.includes(`frc${team}`)) {
                    currentAlliance = 'blue';
                } else {
                    currentAlliance = 'red';
                }
                if (selectedData.value.includes('/')) {
                    tempMatch = match.score_breakdown[currentAlliance];
                    tempSelected = selectedData.value.split('/')[1];
                } else {
                    tempMatch = match;
                    tempSelected = selectedData.value;
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
                if (userColors.length <= indexCounter) {
                    userColors.push(getRandomHexColor());
                }
                let chartData = {
                    name: key,
                    population: point,
                    color: userColors[indexCounter],
                    legendFontColor: '#e3e2e6',
                    legendFontSize: 15
                }
                graphData.data.push(chartData)
                indexCounter++;
            }
        }
        setPreviewData({graphs: [graphData]})
        setPreviewLoaded(true);
    }

    return(
        <View style={styles.rootView}>
            <Picker
                selectedValue={selectedSource}
                onValueChange={(itemValue, itemIndex) => setSelectedSource(itemValue)}
                dropdownIconColor={Colors.text}
                style={styles.picker}
            >
                {sources.map((item, index) => {
                    return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
                })}
            </Picker>
            <Picker
                selectedValue={selectedData}
                onValueChange={(itemValue, itemIndex) => {setSelectedData(itemValue); setPreviewLoaded(false);}}
                dropdownIconColor={Colors.text}
                style={styles.picker}
            >
                {dataPoints.map((item, index) => {
                    return (<Picker.Item label={item.label + ' -> ' + item.type} value={item} key={index}/>)
                })}
            </Picker>
            <EmbeddedView data={previewData} openEdit={openDataEditor}/>
            <Modal animationType='slide' transparent={true} visible={editModalVisible} onRequestClose={() => {setEditModalVisible(!editModalVisible)}}>
                <View style={styles.dimBackground}>
                    <View style={styles.modalPopup}>
                        <Text style={styles.text}>Legend</Text>
                        <View style={styles.divider}></View>
                        {previewLoaded && userColors.map((item, index) => {
                            if (userColors.length > previewData.graphs[0].data.length) {
                                setUserColors([]);
                                setPreviewLoaded(false);
                            } else {
                                return (
                                    <View style={styles.flexHorizontal}>
                                        <Text style={styles.text}>{previewData.graphs[0].data[index].name}</Text>
                                        <Pressable onPress={() => {setColorModalVisible(!colorModalVisible); setActiveColor(index); setStartColor(userColors[activeColor])}} style={{backgroundColor: item, width: 50, height: 50}}></Pressable>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
            </Modal>
            <Modal visible={colorModalVisible} onRequestClose={() => {setColorModalVisible(!colorModalVisible)}}>
                <View style={[styles.flexHorizontal, {backgroundColor: Colors.secondary, paddingTop: 20}]}>
                    <View style={{backgroundColor: startColor, flexGrow: 1, height: 50}}></View>
                    <View style={{backgroundColor: userColors[activeColor], flexGrow: 1, height: 50}}></View>
                </View>
                <ColorPicker style={{flex: 1, padding: 20, backgroundColor: Colors.secondary}} color={userColors[activeColor]} onColorChangeComplete={(color) => {
                    userColors[activeColor] = color;
                    setUserColors(userColors);
                    setPreviewLoaded(false);
                    }}/>
            </Modal>
            <Pressable style={styles.button} onPress={saveAndReturn}><Text style={styles.text}>Add Data Point</Text></Pressable>
        </View>
      )
}