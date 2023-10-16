import Colors from '../../../../colors';

import { StyleSheet, Text, View, Pressable, Dimensions, Button, TouchableOpacity } from 'react-native';
import StratHomePageVars from '../../../../StratHomePageVars';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState} from 'react';


export default function Analyze(props){
    

    return(
        <View>
            <Text style={styles.text}>Analyze</Text>
            <TouchableOpacity title='Analyze' style={{ ...styles.button, backgroundColor: Colors.component, }}> 
                <Text style={styles.text}>{StratHomePageVars.BlueWinPercent}</Text>
                <MaterialIcons
                    name="arrow-right"
                    size={50}
                    color="white"
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
        
    )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    button: {
        //backgroundColor: Colors.component,
        width: windowWidth * 0.9,
        height: windowHeight * 0.085,
        borderRadius: 10,

        flexDirection: 'row', // Arrange text and icon horizontally
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.mainText,

        marginRight: 10, // Adjust the spacing between text and icon
    },

    icon: {
        transform: [{ rotate: '-45deg' }], // Rotate the icon 45 degrees
      },

});