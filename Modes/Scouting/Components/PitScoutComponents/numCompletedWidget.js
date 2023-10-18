import * as React from 'react';
import { StyleSheet, useState, Text, View,StatusBar, Button, TouchableOpacity, Keyboard, Dimensions, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../../colors';
import * as NavigationBar from 'expo-navigation-bar';
import PieChart from 'react-native-pie-chart'
import PieChartComponent from '../../../CommonComponents/PieChart';
import ScoutingModeVars from '../../../../ScoutingModeVars';


export default function TopWidget(){
    return(
        <View style={styles.outBox}>
            <Text style={styles.titleText}>Scouting</Text>
            <View style={styles.container}>
                <PieChartComponent percentCompleted={ScoutingModeVars.percentCompleted} />
            </View>
        </View>
        
    )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'collumn',
    alignItems: 'center',
    backgroundColor: Colors.component,
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    marginBottom: 10,

  },
  outBox: {
    marginTop: 20, //adjusts whole thing from the top
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.subText,
  },

});
