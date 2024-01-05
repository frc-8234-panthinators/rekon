//import * as React from 'react';
import { Text, View, Button, TouchableOpacity, Pressable} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';





/*import Home from './Modes/Strategy/Pages/home';*/

import MatchForm from '../../Admin/Components/matchForm';
import DotBackground from '../../Admin/Components/test';


import AHH from '../../Admin/Components/ahhh'; //delete after
import AnotherTest from '../../Admin/Components/anotherTest';
import Resize from '../../Admin/Components/moveableBox';
import TEST from '../../Admin/Components/v2Components/moveableBoxv2';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MatchFormLayout from '../../Admin/Pages/matchFormBuilder';


const background = '#1a1b1e'

function Test() {
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
    <Pressable onPress={gotoTestStackScreen}>
      <Text>
        PRESS ME
      </Text>
    </Pressable>
	);
}

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

function MyTabBar({ state, descriptors, navigation }) {
  NavigationBar.setVisibilityAsync(false).then(() => {}).catch(() => {});
  NavigationBar.setBehaviorAsync('overlay-swipe').then(() => {}).catch(() => {});
  NavigationBar.setBackgroundColorAsync(Colors.background).then(() => {}).catch(() => {});
  return (
    <View style={{ flexDirection: 'row',backgroundColor: (Colors.tab) ,height:65,borderRadius:10, margin: 12, justifyContent:"center",alignItems:"center", }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;


        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        let iconName;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home";
        } else if (route.name === "Settings") {
          iconName = isFocused ? "settings" : "settings";
        } else if (route.name === "Search") {
          iconName = isFocused ? "search" : "search";
        }


        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
              
              flex: 1, 
              alignItems:"center",

              backgroundColor: isFocused ? '#1a1b1e' : 'transparent',
              borderRadius: 100, 
              padding: 5, 
              margin: 20 }}
          >

           <MaterialIcons
              name={iconName}
              size={35} // Adjust the icon size as needed
              color={isFocused ? '#e3e2e6' : '#e3e2e6'}
              style={{ height: 35 }}
            />


            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator /*screenOptions={{headerShown: false}}*/   tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="Home" component={HomeScreen}  options={{ headerStyle: {
              backgroundColor: (Colors.tab)
           }}}/>
            <Tab.Screen name="Search" component={MatchForm} />
			<Tab.Screen name="Settings" component={Resize}  options={{headerShown:false}} />
		</Tab.Navigator>
	);
}


import EditBar from '../../Admin/Components/v2Components/editBar';
import React, { useState, useEffect } from 'react';



const Stack = createStackNavigator();

export default function Strategy() {


  
  
const [tabActive, setTabActive] = useState(false);

  function editBarShow(){
    
    setTabActive(!tabActive);
    console.log(tabActive);

  }  
 

	return (
		
			<Stack.Navigator initialRouteName="Tabs" independant={true} screenOptions={{
                cardStyle: { backgroundColor: (Colors.background) }  // Set the background color to blue
              }}/*screenOptions={{headerShown: false}}*/>
				        <Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
                <Stack.Screen name="Test" component={MatchFormLayout} options={{cardStyle: {backgroundColor: 'white'}, 
                /* headerRight: () => (<Pressable style={{ marginRight: 30 }} onPress={editBarShow}>
                                      <MaterialIcons name="edit" size={24} color="black" />
                </Pressable>) */ }} /> 
  </Stack.Navigator>
		
	);
}




/* import { Text, View, Button, TouchableOpacity } from 'react-native';


export default function Home(props) {

    const gotoTestStackScreen = () => {
		props.navigation.navigate('Test');
	};
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
			<Button title="Go to test stack screen" onPress={gotoTestStackScreen} />
		</View>
	);
}*/