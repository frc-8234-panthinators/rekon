import * as React from 'react';
import { Text, View, Pressable, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColors } from '../../../colors';
import ColorPickerPopup from '../Components/ColorPicker';
import * as NavigationBar from 'expo-navigation-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ModeSwitch from '../../CommonComponents/modeSwitch';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.error(e);
    }
};

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.error(e);
    }
};

export default function StratSettings(props) {
    const { Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault } = useColors();
    const [teamNumber, setTeamNumber] = React.useState('xxyy');

    function setTeamNumberValue(value) {
        setTeamNumber(value);
        storeData('teamNumber', value);
    }

    React.useEffect(() => {
        getData('teamNumber').then((value) => {
            if (value != null) {
                setTeamNumber(value);
            }
        });
    }, []);

	return(
        <View style={{flex: 1, backgroundColor: Colors.primary, gap: 20}}>
            <ModeSwitch page='StratMode' navigation={props.navigation}> </ModeSwitch>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20, padding: 10}}>
                <Text style={{color: Colors.text, fontSize: 20}}>Team Number</Text>
                <TextInput style={{backgroundColor: Colors.secondary, color: Colors.text, padding: 10, borderRadius: 10, flexGrow: 1}} value={teamNumber} onChangeText={setTeamNumberValue}></TextInput>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20, padding: 10}}>
                <Text style={{color: Colors.text}}>Update App Theme:</Text>
                <ColorPickerPopup defaultColor={Colors.accent} handleChange={(color) => {const calcColors = calcDiffFromTable(color); updateColorsFromCalc(calcColors)}}></ColorPickerPopup>
                <Pressable style={{backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', padding: 10}} onPress={() => resetColorsToDefault()}><Text style={{fontSize: 20, color: Colors.onAccent}}>Reset to Default</Text></Pressable>
            </View>
            <Pressable style={{backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', padding: 10}} onPress={() => props.navigation.navigate('DataVisTemplateBuilder')}><Text style={{fontSize: 20, color: Colors.onAccent}}>GO TO BUILDER</Text></Pressable>
        </View>
    )
}


