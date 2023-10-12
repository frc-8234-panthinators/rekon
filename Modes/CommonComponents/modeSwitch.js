import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';




export default function ModeSwitch(props) {

    const page = props.page;

    const goToAdminMode = () => {
		props.navigation.navigate('AdminMode');
	};
    const goToScoutMode = () => {
		props.navigation.navigate('ScoutMode');
	};
    const goToStratMode = () => {
		props.navigation.navigate('StratMode');
	};

    if (page == 'AdminMode') {
        return(

            <View> 
                <Button title="Scouting" onPress={goToScoutMode} />  
                <Button title="Strategy" onPress={goToStratMode} />
            </View>
            
        )
    }
    else if(page == 'StratMode') {
        return(

            <View>
                <Button title="Admin" onPress={goToAdminMode} />
                <Button title="Scouting" onPress={goToScoutMode} />
            </View>
            
        )
    }

    else if(page == 'ScoutMode') {
        return(
            <View> 
                <Button title="Admin" onPress={goToAdminMode} />
                <Button title="Strategy" onPress={goToStratMode} />
            </View>
        )
    }
    
}