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
import CompareAndQuickpick from '../Components/SearchComponents.js/Compare-QuickWids';

export default function StratSearch(props){
    return(
        <View style={styles.container}>
            
            <View style={styles.space}>
                <YourStats />
            </View>

            <View style={styles.space}>
                <CompareAndQuickpick />
            </View>

            <View style={styles.space}>
                <MatchViewWidget />     
            </View>

            <View style={styles.space}>
                <SearchBar />
            </View>
            

            

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
    space: {
        marginBottom: 'auto',
    },


});
