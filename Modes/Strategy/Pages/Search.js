import * as React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import { useState } from 'react';
import ky from 'ky';



export default function Search(props) {
    function navigateToYearPick(text) {
        props.navigation.navigate('YearPicker', {teamId: text.nativeEvent.text});
    }
    return (
        <View style={styles.rootView}>
            <TextInput keyboardType="numeric" style={styles.search} placeholder="Search" placeholderTextColor={Colors.subText} onSubmitEditing={navigateToYearPick}></TextInput>
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
    search: {
        backgroundColor: Colors.tab,
        color: Colors.subText,
        padding: 10,
        height: '10%',
        width: '100%',
        borderRadius: 10,
        fontSize: Dimensions.get('window').height * 0.05,
    }
});