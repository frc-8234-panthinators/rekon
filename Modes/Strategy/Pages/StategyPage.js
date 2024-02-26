import * as React from 'react';
import { Text, View, Button, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColors } from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';
import VisualView from '../Components/DataVis';


import StratSettings from './stratSettings';
import MyTabBar from '../Components/StratTabBar';
import Search from './Search';
import EventPicker from './EventPicker';
import YearPicker from './YearPicker';
import ErrorPage from '../../CommonComponents/ErrorPage';
import MathJax from '../Components/MathJax';
import DataVis from './DataTemplateBuilder';
import TemplateBuilder from './TemplateBuilder';
import { Circle } from '@shopify/react-native-skia';
import { MaterialIcons } from '@expo/vector-icons';

import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuActions, renderers } from 'react-native-popup-menu';



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
			<Menu renderer={renderers.NotAnimatedContextMenu}>
				<MenuTrigger>
					<Text style={{color: Colors.text}}>Open Menu</Text>
				</MenuTrigger>
				<MenuOptions style={{backgroundColor: 'rgba(0,0,0,1)'}}>
					<MenuOption style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: Colors.graphPrimary, flexDirection: 'row', alignItems: 'center', gap: 5}} onSelect={gotoTestStackScreen}>
						<MaterialIcons name="save" size={24} color={Colors.secondary} />
						<Text style={{color: Colors.secondary}}>Save</Text>
					</MenuOption>
					<MenuOption style={{backgroundColor: Colors.graphPrimary, flexDirection: 'row', alignItems: 'center', gap: 5}} onSelect={gotoTestStackScreen}>
						<MaterialIcons name="edit" size={24} color={Colors.secondary} />
						<Text style={{color: Colors.secondary}}>Edit</Text>
					</MenuOption>
					<MenuOption style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, backgroundColor: Colors.graphPrimary, flexDirection: 'row', alignItems: 'center', gap: 5}} onSelect={gotoTestStackScreen}>
						<MaterialIcons name="delete" size={24} color={Colors.errorBackground} />
						<Text style={{color: Colors.errorBackground}}>Delete</Text>
					</MenuOption>
				</MenuOptions>
			</Menu>
			{/*<Text style={{color: Colors.text}}>MathJax Test</Text>
			<TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, color: Colors.text, width: '90%' }} onChangeText={onChangeText} value={text} />
	<MathJax math={text}></MathJax>*/}
			
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
				<Stack.Screen name="VisualView" component={VisualView} options={{headerShown:false}}/>
				<Stack.Screen name="TemplateBuilder" component={TemplateBuilder} options={{headerShown:false}}/>
			</Stack.Navigator>
		
	);
}