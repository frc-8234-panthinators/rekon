import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../../colors';
import {LineChart, PieChart} from "react-native-chart-kit";
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    let [tbaData, setTbaData] = useState({graphs: []});
    let [isLoading, setIsLoading] = useState(true);
    let [noData, setNoData] = useState(false);
    let [noTemplate, setNoTemplate] = useState(false);
    const team = route.params.teamId;
    const event = route.params.event;
    const year = route.params.year;

    React.useEffect(() => {
        const fetchData = async () => {
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
            if (await getData(`visTemplate${year}`) == null) {
                setNoTemplate(true);
            } else {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (noTemplate) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>No visualization template for this year</Text>
                <Pressable style={styles.button} onPress={() => {navigation.navigate('TemplateBuilder', {year: year, event: event, team: team})}}><Text style={styles.text}>Create New Template</Text></Pressable>
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
    } else {
        return (
            <ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
                <View style={styles.subRootView}>
                    {data.graphs.map((graphData, index) => {
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
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: Colors.background,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
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
    },
    text: {
        color: Colors.subText,
        fontSize: normalize(18),
        padding: 10,
    }
  });