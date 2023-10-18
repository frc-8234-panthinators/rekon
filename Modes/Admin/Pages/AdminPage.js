import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import AdminSettings from './adminSettings'; 
import MyTabBar from '../Components/AdminTabBar';


import PitScouting from '../../Scouting/Pages/PitScouting';// get rid of this later
//import TeamAssignmnetWidget  from '../../Scouting/Components/PitScoutComponents/TeamAssignmnetsWidget'; //get rid of this too


function TestScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Test!</Text>
		</View>
	);
}

/*function HomeScreen() {
  
	return (
    
 
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
			<Text>Home!</Text>
      <FontAwesome name="search" size={24} color="black" />
		</View>
	);
}*/

function HomeScreen(props) {
	const gotoTestStackScreen = () => {
		props.navigation.navigate('Test');
	};
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (Colors.background)}}>
			<Text>Home!</Text>
			<Button title="Go to test stack screen" onPress={gotoTestStackScreen} />
		</View>
	);
}

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator /*screenOptions={{headerShown: false}}*/   tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="AdminHome" component={SettingsScreen}  options={{ headerStyle: {
              backgroundColor: (Colors.tab)
           }}}/>
            <Tab.Screen name="Search" component={PitScouting} options={{headerShown:false}}/>
			<Tab.Screen name="AdminSettings" component={AdminSettings} />
		</Tab.Navigator>
	);
}



const Stack = createStackNavigator();

export default function Admin() {
	return (
		
			<Stack.Navigator initialRouteName="Tabs" independant={true}   screenOptions={{
                cardStyle: { backgroundColor: (Colors.background) } // Set the background color to blue
              }}/*screenOptions={{headerShown: false}}*/>
				<Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
      	        <Stack.Screen name="Test" component={TestScreen} />
			</Stack.Navigator>
		
	);
}
