import * as React from 'react';
import { StyleSheet, useState, Text, View,StatusBar, Button, TouchableOpacity, Keyboard, Dimensions, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import {ScrollViewIndicator} from '@fanchenbao/react-native-scroll-indicator';
import ScoutingModeVars from '../../../../ScoutingModeVars';

export default function TeamAssignmnetWidget(props){
    const generateTeamBoxes = (teamNames) => {
        const teamBoxes = [];
      
        for (let i = 0; i < teamNames.length; i++) {
          teamBoxes.push(
            <TouchableOpacity key={i} style={styles.teamBox}>
              <Text style={styles.team}>{teamNames[i]}</Text>
            </TouchableOpacity>
          );
        }
      
        return teamBoxes;
      };


      return (
        <View>
            <Text style={styles.titleText}>Team Assignments</Text>
            <View style={styles.container}>
            <View style={styles.scrollView}>
                <ScrollViewIndicator indStyle={{backgroundColor: Colors.subText,}}>
                    <View style={styles.contentBox}>
                        {generateTeamBoxes(ScoutingModeVars.teamNames)}
                    </View>
                </ScrollViewIndicator>
            </View>
            </View>
        </View>
        
      );
    };

/*
export default function TeamAssignmnetWidget(props){
    return(

        <View>
            <Text style={styles.titleText}>Team Assignments</Text>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <TouchableOpacity style={styles.teamBox}>
                        <Text style={styles.team}>Panthinators | 8234</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                    <TouchableOpacity style={styles.teamBox}></TouchableOpacity>
                </ScrollView>
            </View>
        </View>
        
    )
} */




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

  },
  titleText: {
    color: Colors.subText,
    fontWeight: 'bold',
    fontSize: 20,
  },
  teamBox: {

    height: windowHeight * 0.07,
    width: windowWidth * 0.85,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingLeft: 10,
    borderRadius: 10,
    //marginTop: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: 10,

    

  },
  contentBox: {
    marginTop: 10,
  },
  scrollView: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    //marginBottom: 10,
  },
  team: {
  
    color: Colors.subText,
    fontSize: 15,
    fontWeight: 'bold',
    
        
    marginTop: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 'auto'
    
 
  },


});