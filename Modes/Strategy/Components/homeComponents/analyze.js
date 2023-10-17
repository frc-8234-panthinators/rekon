import Colors from '../../../../colors';

import { StyleSheet, Text, View, Pressable, Dimensions, Button, TouchableOpacity } from 'react-native';
import StratHomePageVars from '../../../../StratHomePageVars';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState, useEffect} from 'react';




export default function Analyze(props){

    return(
        <View>
            <TouchableOpacity title='Analyze' style={styles.button}> 
                <Text style={styles.text}>Analyze</Text>
                <MaterialIcons
                    name="arrow-back"
                    size={40}
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
        backgroundColor: Colors.component,
        width: windowWidth * 0.9,
        height: windowHeight * 0.085,
        borderRadius: 10,

        flexDirection: 'row', // Arrange text and icon horizontally
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.subText,

        marginRight: 10, // Adjust the spacing between text and icon
    },

    icon: {
        transform: [{ rotate: '145deg' }], // Rsotate the icon 45 degrees
        color: Colors.subText,
      },

});