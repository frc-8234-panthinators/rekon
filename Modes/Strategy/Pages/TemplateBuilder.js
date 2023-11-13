import * as React from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import { useState, useEffect } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { normalize } from '../../CommonComponents/fontScaler';
import { Picker } from '@react-native-picker/picker';



export default function TemplateBuilder({ route, navigation }) {
    const [selected, setSelected] = useState("");
    const sources = [
        {label: "(Select a source)", value: ""},
        {label: "The Blue Alliance", value: "tba"},
        {label: "Pit Forms", value: "pit"},
        {label: "Match Forms", value: "match"},
    ]

    return(
        <View style={styles.rootView}>
            <Text style={styles.text}>Selected: {selected}</Text>
            <Picker
                selectedValue={selected}
                onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
                dropdownIconColor={Colors.subText}
                style={styles.picker}
            >
                {sources.map((item, index) => {
                    return (<Picker.Item label={item.label} value={item.value} key={index}/>) 
                })}
            </Picker>
        </View>
      )
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: Colors.background,
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        padding: 10,
        alignItems: 'center',
    },
    text: {
        color: Colors.subText,
        fontSize: normalize(30),
    },
    picker: {
        color: Colors.subText,
        backgroundColor: Colors.tab,
        width: '90%'
    }
});