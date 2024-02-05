import * as React from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColors } from '../../../colors';
import { calcDiffFromTable, updateColorsFromCalc } from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';


import StratSettings from './stratSettings';
import MyTabBar from '../Components/StratTabBar';
import Search from './Search';
import EventPicker from './EventPicker';
import YearPicker from './YearPicker';
import ErrorPage from '../../CommonComponents/ErrorPage';
import MathJax from '../Components/MathJax';
import DataVis from './DataTemplateBuilder';
import { Circle } from '@shopify/react-native-skia';



function TestScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
			<Text>Test!</Text>
		</View>
	);
}

function HomeScreen(props) {
	const { Colors } = useColors();
	const [text, onChangeText] = React.useState("Useless Text");
	const gotoTestStackScreen = () => {
		props.navigation.navigate('Test');
	};
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: (Colors.primary)}}>
			<Text style={{color: Colors.text}}>MathJax Test</Text>
			<TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: Colors.text, width: '90%' }} onChangeText={onChangeText} value={text} />
			<MathJax math={text}></MathJax>
		</View>
	);
}

function SearchScreen(props) {
	const { Colors } = useColors();
	const styles = StyleSheet.create({
		padding: {
			backgroundColor: Colors.primary,
			paddingTop: 50,
		},
	});
    return (
		<View style={styles.padding}>
        	<Search navigation={props.navigation}/>
		</View>
	);
}


const Tab = createBottomTabNavigator();

function MyTabs() {
	const { Colors } = useColors();
	return (
		<Tab.Navigator /*screenOptions={{headerShown: false}}*/   tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="StratHome" component={HomeScreen}  options={{ headerStyle: {
              backgroundColor: (Colors.secondary)
           }}}/>
            <Tab.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>
			<Tab.Screen name="StratSettings" component={StratSettings} />
		</Tab.Navigator>
	);
}

const Stack = createStackNavigator();

export default function Strategy() {
	const { Colors } = useColors();
	return (
		
			<Stack.Navigator initialRouteName="Tabs" independant={true}   screenOptions={{
                cardStyle: { backgroundColor: (Colors.primary)} // Set the background color to blue
              }}/*screenOptions={{headerShown: false}}*/>
				<Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
				<Stack.Screen name="EventPicker" component={EventPicker} options={{headerShown:false}}/>
				<Stack.Screen name="YearPicker" component={YearPicker} options={{headerShown:false}}/>
				<Stack.Screen name="DataVisTemplateBuilder" component={DataVis} options={{headerShown:false}}/>
				<Stack.Screen name="ErrorPage" component={ErrorPage} options={{headerShown:false}}/>
      	        <Stack.Screen name="Test" component={TestScreen} options={{headerShown:false}}/>
			</Stack.Navigator>
		
	);
}