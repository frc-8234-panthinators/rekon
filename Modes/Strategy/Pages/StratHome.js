import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import RedBlueCards from '../Components/homeComponents/RedBlueAlliences';
import StratHomePageVars from '../../../StratHomePageVars';
import CurrentNextLoad from '../Components/homeComponents/CurrentNextLoad';
import Analyze from '../Components/homeComponents/analyze';


export default function StratHome(props){
    return(
        <View style={styles.container}>
                
                <CurrentNextLoad />
                <RedBlueCards Title='Red' Color={Colors.blue} RBnum='R' Team1={StratHomePageVars.RedOne} Team2={StratHomePageVars.RedTwo} Team3={StratHomePageVars.RedThree}/>
                <RedBlueCards Title='Blue' Color={Colors.red} RBnum='B'Team1={StratHomePageVars.BlueOne} Team2={StratHomePageVars.BlueTwo} Team3={StratHomePageVars.BlueThree}/>
                <Analyze />

        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    
        //marginBottom: -50, 
        backgroundColor: Colors.background,
        
    },


});

