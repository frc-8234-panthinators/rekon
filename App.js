import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

function CustomDrawerContent(props) {
  const { state, navigation } = props;

  const handleCustomViewPress = () => {
    navigation.navigate('Settings'); // Replace 'Profile' with the name of the screen you want to navigate to
  };

  const singleTap = Gesture.Tap()
  .maxDuration(250)
  .onStart(handleCustomViewPress).runOnJS(true);

  return (
    
  
    <DrawerContentScrollView {...props}>
      {/* Render your first drawer item */}
      <DrawerItem
        label="Home"
        onPress={() => navigation.navigate('Home')}
        focused={state.routeNames[state.index] === 'Home'}
      />

      {/* Add your custom view here */}
      <GestureDetector gesture={singleTap}>
        <View style={{width: '100%', height: 100, backgroundColor: 'black', marginTop: 10}}>
          <Text>Your Custom View</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={singleTap}>
        <View style={{width: '100%', height: 100, backgroundColor: 'black', marginTop: 10}}>
          <Text>Your Custom View</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={singleTap}>
        <View style={{width: '100%', height: 100, backgroundColor: 'black', marginTop: 10}}>
          <Text>Your Custom View</Text>
        </View>
      </GestureDetector>

      <GestureDetector gesture={singleTap}>
        <View style={{width: '100%', height: 100, backgroundColor: 'black', marginTop: 10}}>
          <Text>Your Custom View</Text>
        </View>
      </GestureDetector>


      
      
    </DrawerContentScrollView>
   
  );
}


function HomeScreen() {
  return (
    <View style={{ flex:  1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex:  1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Settings Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Home"       screenOptions={{
      drawerStyle: {
        marginTop: 0,  
      }, }} drawerContent={(props) => <CustomDrawerContent {...props} />} >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

/* import * as React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';


function HomeScreen() {

	return (

 
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a1b1e' }}>
			<Text>Home!</Text>
      <FontAwesome name="search" size={24} color="black" />
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

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row',backgroundColor: 'rgba(62, 71, 88, 0.8)' ,height:85,borderRadius:10, margin: 12, justifyContent:"center",alignItems:"center" }}>
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
  
            />


            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
	return (
    <View style={{backgroundColor: '#1a1b1e', flex: 1}}>
      <NavigationContainer>
      <StatusBar style="light" translucent={true}/>
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={props => <MyTabBar {...props} />} >
          <Tab.Screen name="Home" component={HomeScreen}/>
          <Tab.Screen name="Search" component={SettingsScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
	);
} */
