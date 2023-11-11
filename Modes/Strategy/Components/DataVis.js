import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Colors from '../../../colors';
import {LineChart, PieChart} from "react-native-chart-kit";
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';

export default function VisualView({ route, navigation }) {
    let [data, setData] = useState({graphs: []});
    let [isLoading, setIsLoading] = useState(true);
    let [noData, setNoData] = useState(false);
    const team = route.params.teamId;
    const event = route.params.event;

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
                setData(data);
            } catch (error) {
                navigation.navigate('ErrorPage', {error: error.message});
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

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
    }
  });