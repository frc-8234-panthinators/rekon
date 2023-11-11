import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import {LineChart, PieChart} from "react-native-chart-kit";
import { useState } from 'react';

export default function VisualView({ route, navigation }) {
    let [data, setData] = useState({
        graphs: [
            {
            type: "line",
            labels: ["Qual 1", "Qual 2", "Qual 3", "Qual 4", "Qual 5", "Qual 6"],
            data: [20, 45, 28, 30, 25, 30]
            },
            {
            type: "line",
            labels: ["Qual 1", "Qual 2", "Qual 3", "Qual 4", "Qual 5", "Qual 6", "Qual 7", "Qual 8", "Qual 9", "Qual 10"],
            data: [20, 25, 20, 35, 25, 22, 15, 17, 37, 24]
            },
            {
            type: "pie",
            data: [
                {
                name: "Win",
                population: 8,
                color: "#58ba6d",
                legendFontColor: Colors.graphPrimary,
                legendFontSize: 15
                },
                {
                name: "Lose",
                population: 2,
                color: "#9a5c5c",
                legendFontColor: Colors.graphPrimary,
                legendFontSize: 15
                },
            ]  
            }
        ]
    });
	return (
		<ScrollView key='rootView' vertical={true} contentContainerStyle={styles.rootView}>
            {data.graphs.map((graphData, index) => {
                if (graphData.type == "line") {
                    return(
                        <ScrollView style={styles.scrollGraph} horizontal={true}>
                            <LineChart data={{
                                labels: graphData.labels,
                                datasets: [
                                    {
                                        data: graphData.data,
                                    }
                                ],
                            }}
                            width={Dimensions.get("window").width*(graphData.data.length/7)}
                            height={220}
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
                    </ScrollView>
                    )
                } else if (graphData.type == 'pie') {
                    return (
                        <View style={styles.pieTin}>
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
        </ScrollView>
	);
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: Colors.background,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: 10,
    },
    visText: {
        color: Colors.subText,
        fontSize: 20,
    },
    scrollGraph: {
        width: "90%",
        minHeight: 240,
    },
    pieTin: {
        width: "90%",
        minHeight: 240,
        marginVertical: 8,
    }
  });