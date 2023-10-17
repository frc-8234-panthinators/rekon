import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';


import SearchBar from '../Components/SearchComponents.js/SearchBar';
import YourStats from '../Components/SearchComponents.js/YourTeamStats';
import MatchViewWidget from '../Components/SearchComponents.js/MatchViewWidget';

export default function StratSearch(props){
    return(
        <View style={styles.container}>
            
            <YourStats />
            <MatchViewWidget />
            <SearchBar />

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        
        //marginBottom: -50, 
        backgroundColor: Colors.background,
        
    },


});
