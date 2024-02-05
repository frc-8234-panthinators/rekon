import Strategy from './Modes/Strategy/Pages/StategyPage';
import Admin from './Modes/Admin/Pages/AdminPage';
import Scouting from './Modes/Scouting/Pages/ScoutPage';
import 'expo-dev-client'; 

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar';
import { LogBox } from 'react-native';
import { useEffect } from 'react';
import { ColorProvider } from './colors';


const Stack = createStackNavigator();

function ModeStack()  {
  return(
    <Stack.Navigator initialRouteName="Tabs" >

      <Stack.Screen name="StratMode" component={Strategy} options={{animationEnabled: false, headerShown: false}}/>
      <Stack.Screen name="AdminMode" component={Admin} options={{animationEnabled: false, headerShown: false}}/>
      <Stack.Screen name="ScoutMode" component={Scouting} options={{animationEnabled: false,headerShown: false}}/>

    </Stack.Navigator>
  )
}

export default function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, [])
  return(
    <NavigationContainer>
      <ColorProvider>
        <ModeStack />
        <StatusBar style="light" translucent={true}/>
      </ColorProvider>
    </NavigationContainer>
  )
}