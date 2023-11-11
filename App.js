import Strategy from './Modes/Strategy/Pages/StategyPage';
import Admin from './Modes/Admin/Pages/AdminPage';
import Scouting from './Modes/Scouting/Pages/ScoutPage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'expo-status-bar'


const Stack = createStackNavigator();

function ModeStack()  {
  return(
    <Stack.Navigator initialRouteName="Tabs" >

      <Stack.Screen name="StratMode" component={Strategy} options={{animationEnabled: false, headerShown:false}}/>
      <Stack.Screen name="AdminMode" component={Admin} options={{animationEnabled: false, headerShown:false}}/>
      <Stack.Screen name="ScoutMode" component={Scouting} options={{animationEnabled: false,headerShown:false}}/>

    </Stack.Navigator>
  )
}

export default function App() {
  return(
    <NavigationContainer>
      <ModeStack />
      <StatusBar style="light" translucent={true}/>
    </NavigationContainer>
  )
}