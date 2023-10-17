import * as React from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import ScoutSettings from './scoutSettings';
import MyTabBar from '../Components/ScoutTabBar';

/*get rid of this later/ re map the page*/ import StratSearch from '../../Strategy/Pages/StratSearch';

function TestScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Test!</Text>
		</View>
	);
}

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
const { width, height } = Dimensions.get("window")

function MyTabs() {
	return (
		<View style={{
            width,
            height,
        }}>
			<Tab.Navigator /*screenOptions={{headerShown: false}}*/ tabBar={props => <MyTabBar {...props} />}>
				<Tab.Screen name="ScoutHome" component={HomeScreen}  options={{ headerStyle: {
				backgroundColor: (Colors.tab)
			}}}/>
				<Tab.Screen name="Search" component={StratSearch} options={{headerShown:false}}/>
				<Tab.Screen name="ScoutSettings" component={ScoutSettings} />
			</Tab.Navigator>
		</View>
	);
}

const Stack = createStackNavigator();

export default function Scouting() {
	return (
		
			<Stack.Navigator initialRouteName="Tabs" independant={true}   screenOptions={{
                cardStyle: { backgroundColor: (Colors.background) } // Set the background color to blue
              }}/*screenOptions={{headerShown: false}}*/>
				<Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
      	        <Stack.Screen name="Test" component={TestScreen} />
			</Stack.Navigator>
		
	);
}
