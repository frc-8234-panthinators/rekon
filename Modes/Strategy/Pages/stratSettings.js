import * as React from 'react';
import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColors } from '../../../colors';
import ColorPickerPopup from '../Components/ColorPicker';
import * as NavigationBar from 'expo-navigation-bar';

import ModeSwitch from '../../CommonComponents/modeSwitch';

export default function StratSettings(props) {
    const { Colors, calcDiffFromTable, updateColorsFromCalc, resetColorsToDefault } = useColors();
	return(
        <View style={{flex: 1, backgroundColor: Colors.primary, gap: 20}}>
            <ModeSwitch page='StratMode' navigation={props.navigation}> </ModeSwitch>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 20, padding: 10}}>
                <Text style={{color: Colors.text}}>Update App Theme:</Text>
                <ColorPickerPopup defaultColor={Colors.accent} handleChange={(color) => {const calcColors = calcDiffFromTable(color); updateColorsFromCalc(calcColors)}}></ColorPickerPopup>
                <Pressable style={{backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', padding: 10}} onPress={() => resetColorsToDefault()}><Text style={{fontSize: 20, color: Colors.onAccent}}>Reset to Default</Text></Pressable>
            </View>
            <Pressable style={{backgroundColor: Colors.accent, alignItems: 'center', justifyContent: 'center', padding: 10}} onPress={() => props.navigation.navigate('DataVisTemplateBuilder')}><Text style={{fontSize: 20, color: Colors.onAccent}}>GO TO BUILDER</Text></Pressable>
        </View>
    )
}


