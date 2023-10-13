import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as NavigationBar from 'expo-navigation-bar';




export default function ModeSwitch(props) {

    const page = props.page;

    const goToAdminMode = () => {
		props.navigation.navigate('AdminMode', {screen: 'Tabs', params: {screen: 'AdminHome'}});
	};
    const goToScoutMode = () => {
		props.navigation.navigate('ScoutMode', {screen: 'Tabs', params: {screen: 'ScoutHome'}});
	};
    const goToStratMode = () => {
		props.navigation.navigate('StratMode', {screen: 'Tabs', params: {screen: 'StratHome'}});
	};

    if (page == 'AdminMode') {
        return(

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Button title="Scouting" onPress={goToScoutMode} />  
                <Button title="Strategy" onPress={goToStratMode} />
            </View>
            
        )
    }
    else if(page == 'StratMode') {
        return(

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button title="Admin" onPress={goToAdminMode} />
                <Button title="Scouting" onPress={goToScoutMode} />
            </View>
            
        )
    }

    else if(page == 'ScoutMode') {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                <Button title="Admin" onPress={goToAdminMode} />
                <Button title="Strategy" onPress={goToStratMode} />
            </View>
        )
    }
    
}