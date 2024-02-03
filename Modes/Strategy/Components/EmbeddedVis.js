import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import Colors from '../../../colors';
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function EmbeddedView(props) {
    if (props.data == null) {
        return (
            <View style={styles.rootView}></View>
        )
    } else {
        const data = props.data;
        console.log(data);
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
                                    <Pressable onPress={props.openEdit} style={styles.editButton}>
                                        <Text style={styles.header}>{graphData.title}</Text>
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
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    rootView: {
        backgroundColor: Colors.primary,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    visText: {
        color: Colors.text,
        fontSize: 25,
    },
    header: {
        color: Colors.text,
        fontSize: 25,
    },
    viewWrapper: {
        width: "90%",
        minHeight: 240,
        backgroundColor: Colors.secondary,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 10,
    },
    editWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
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
    editButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
});