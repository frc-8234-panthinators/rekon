//import * as React from 'react';
import { Text, View, Button, TouchableOpacity, Pressable, Dimensions, TextInput} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

function Search(props) {
	const gotoTestStackScreen = () => {
		props.navigation.navigate('AutoMap');
	};
	return (
    <Pressable onPress={gotoTestStackScreen}>
      <Text>
        PRESS ME
      </Text>
    </Pressable>
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
  const [matchForms, setMatchForms] = useState([]);
  const [nextMatchFormId, setNextMatchFormId] = useState(0);
  const [selectedMatchForm, setSelectedMatchForm] = useState(null);

  useEffect(() => {
    console.log(`matchForms: ${JSON.stringify(matchForms)}`);
  }, [matchForms])

  useEffect(() => {
    console.log(`selectedMatchForm: ${selectedMatchForm}`);
  }, [selectedMatchForm])

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('matchForms').then(jsonValue => {
        const matchForms = jsonValue != null ? JSON.parse(jsonValue) : [];
        setMatchForms(matchForms); // Update the state with the fetched matchForms array
        setMatchForms(matchForms);
      }).catch(error => {
        console.error('Failed to fetch matchForms:', error);
      });

      AsyncStorage.getItem('nextMatchFormId').then(jsonValue => {
        const nextMatchFormId = jsonValue != null ? JSON.parse(jsonValue) : 0;
        setNextMatchFormId(nextMatchFormId); // Update the state with the fetched nextMatchFormId
      })
      .catch(error => {
        console.error('Failed to fetch nextMatchFormId from storage:', error);
      });

      AsyncStorage.getItem('selectedMatchForm').then(jsonValue => {
        const selectedMatchForm = jsonValue != null ? JSON.parse(jsonValue) : 0;
        setSelectedMatchForm(selectedMatchForm);
      }).catch(error => {
        console.error('Failed to fetch selectedMatchForm from storage:', error);
      });

    }, [])
  );

  useEffect(() => {
    const jsonValue = JSON.stringify(matchForms);

    AsyncStorage.setItem('matchForms', jsonValue).then(() => {
      console.log('Updated pages stored successfully');
    }).catch(error => {
      console.error('Failed to store updated pages:', error);
    });
  }, [matchForms])

  useEffect(() => {
    const jsonValue = JSON.stringify(nextMatchFormId)
    AsyncStorage.setItem('nextMatchFormId', jsonValue)
    .then(() => {
        console.log('Saved nextMatchFormId to storage');
    })
    .catch(error => {
        console.error('Failed to save nextMatchFormId to storage:', error);
    });
  }, [nextMatchFormId])

  useEffect(() => {
    const jsonValue = JSON.stringify(selectedMatchForm);
    AsyncStorage.setItem('selectedMatchForm', jsonValue).then(() => {
      console.log('Saved selectedMatchForm to storage');
    }).catch(error => {
      console.error('Failed to store selectedMatchForm to storage:', error);
    });
  }, [selectedMatchForm])

  const addMatch = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      let newMatchForm = [...matchForms, {id: nextMatchFormId, name: '', showTextInput: false}];
      let nextMatchForm = nextMatchFormId + 1;
      setSelectedMatchForm(nextMatchFormId);
      setNextMatchFormId(nextMatchForm);
      setMatchForms(newMatchForm);
  }).runOnJS(true);

  const removeMatch = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      const newMatchForms = matchForms.filter(matchForm => matchForm.id !== selectedMatchForm);
      setSelectedMatchForm(Math.max(...newMatchForms.map(matchForm => matchForm.id)));
      setMatchForms(newMatchForms);
  }).runOnJS(true);

  const goToMatchFormBuilder = (matchFormId) => {
    return Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        props.navigation.navigate('Test', {
          matchFormId: matchFormId,
        });
        setSelectedMatchForm(matchFormId);
    }).runOnJS(true);
  }

  const doubleTap = (id) => {
    return Gesture.Tap()
      .maxDelay(250)
      .numberOfTaps(2)
      .onStart(() => {
        console.log('Double Tapped!');
        let newMatchForms = matchForms.map(matchForm =>
          matchForm.id === id ? {...matchForm, showTextInput: true} : matchForm
        );
        setMatchForms(newMatchForms);
        setSelectedMatchForm(id);
      }).runOnJS(true);
  }

  function changeMatchFormName(id, name) {
    let newMatchForms = matchForms.map(matchForm =>
        matchForm.id === id ? {...matchForm, name: name} : matchForm
    );
    setMatchForms(newMatchForms);
  }

	return (
    <View style={{flex: 1}}>
      <ScrollView>
        {matchForms.map((matchForm, index) => (
          <View key={matchForm.id} style={{
            flex: 1,
            height: 100,
            backgroundColor: '#000000',
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderRadius: 10
          }}>
            <ScrollView style={{
                flex: 1,
                marginLeft: 60,
                marginRight: 135,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                }} horizontal={true}>
              
              <GestureDetector gesture={doubleTap(matchForm.id)}>
                <View style={{flex: 1, borderRadius: 10}}>
                  {matchForms.find(form => form.id === matchForm.id)?.showTextInput ? (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <TextInput
                        style={{color: '#e3e2e6', fontSize: 50}}
                        autoFocus
                        onBlur={() => {
                          let newMatchForms = matchForms.map(matchForm =>
                            matchForm.id ={...matchForm, showTextInput: false}
                          );
                          setMatchForms(newMatchForms);
                        }}
                        defaultValue={matchForms.find(form => form.id === matchForm.id)?.name || ''}
                        onChangeText={text => {
                          changeMatchFormName(matchForm.id, text);
                        }}
                      />
                    </View>
                  ) : (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{color: '#e3e2e6', fontSize: matchForms.find(form => form.id === matchForm.id)?.name === '' ? 13 : 50, textAlign: 'center'}}>
                        {matchForms.find(form => form.id === matchForm.id)?.name || 'Double click to change name'}
                      </Text>
                    </View>
                  )}
                </View>
              </GestureDetector>
              </ScrollView>

            <GestureDetector gesture={goToMatchFormBuilder(matchForm.id)}>
              <View size={50} borderRadius={10} position='absolute' right={25} top={25}>
                  <MaterialIcons name='edit' size={50} color='#e3e2e6'/>
              </View>
            </GestureDetector>
          </View>
        ))}
      </ScrollView>

      <GestureDetector gesture={addMatch}>
        <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 75, borderRadius: 10}}>
            <MaterialIcons name='add' size={65} color='#e3e2e6'/>
        </View>
      </GestureDetector>

      <GestureDetector gesture={removeMatch}>
        <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 10, borderRadius: 10}}>
          <MaterialIcons name='remove' size={65} color='#e3e2e6'/>
        </View>
      </GestureDetector>
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
            <Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="Settings" component={Resize}  options={{headerShown:false}} />
		</Tab.Navigator>
	);
}


import EditBar from '../../Admin/Components/v2Components/editBar';
import React, { useState, useEffect } from 'react';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';



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
                <Stack.Screen name="AutoMap" component={MatchForm} />
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