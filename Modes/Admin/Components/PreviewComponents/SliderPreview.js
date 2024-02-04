import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';

export default function SliderPreview(props) {
    const [sliderValue, setSliderValue] = useState(Number(props.minimum));

    return(
        <View style={styles.sliderSectionContainer}>
            <Text style={styles.header}>{props.question}</Text>
            <Text style={{color: 'white'}}>{sliderValue}</Text>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.limits}><Text style={{color: 'white'}}>{props.minimum}</Text></View>
                <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={Number(props.minimum)}
                    maximumValue={Number(props.maximum)}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={value => setSliderValue(value)}
                    thumbTintColor='#01BAEF'
                    step={1}
                />
                <View style={styles.limits}><Text style={{color: 'white'}}>{props.maximum}</Text></View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    sliderSectionContainer: {
        margin: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: {
        marginBottom: 5,
        fontSize: 20,
        color: 'white'
    },
    sliderQuestion: {
        backgroundColor: '#E3E2E6',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginRight: 5,   
        marginBottom: 10, 
    },
    limits: {
        alignContent: 'center',
        justifyContent: 'center',
    },
    limitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    warning: {
        color: 'red',
        marginHorizontal: 5,
    },
})