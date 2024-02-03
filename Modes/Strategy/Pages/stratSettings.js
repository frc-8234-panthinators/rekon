import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import ModeSwitch from '../../CommonComponents/modeSwitch';

export default function StratSettings(props) {
	return(
        <View style={{flex: 1}}>
            <ModeSwitch page='StratMode' navigation={props.navigation}> </ModeSwitch>
            <Button title="Go to builder" onPress={() => props.navigation.navigate('DataVisTemplateBuilder')} />
        </View>
    )
}


