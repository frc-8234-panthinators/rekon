import * as React from 'react';
import { StyleSheet, useState, Text, View,StatusBar, Button, TouchableOpacity, Keyboard, Dimensions, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../colors';
import * as NavigationBar from 'expo-navigation-bar';
import PieChart from 'react-native-pie-chart'

export default function PieChartComponent(props){

   const percentLeft = 100 - props.percentCompleted 

  const widthAndHeight = 200
  const series = [props.percentCompleted, percentLeft]
  const sliceColor = [Colors.PieGreen, Colors.PieRed]

  return (

      <View style={styles.container}>
        <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
      </View>

  )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '90deg' }],
  },
});
