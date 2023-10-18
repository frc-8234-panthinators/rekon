import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';


import TeamAssignmnetWidget from '../Components/PitScoutComponents/TeamAssignmnetsWidget';
import TopWidget from '../Components/PitScoutComponents/numCompletedWidget';


export default function PitScouting(props){
  return(
    <View style={styles.container}>
      <TopWidget />
      <TeamAssignmnetWidget />
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
    backgroundColor: Colors.background,
  },
});