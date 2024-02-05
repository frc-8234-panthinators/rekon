import * as React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useColors } from '../../colors';
import { useState } from 'react';
import ky from 'ky';



export default function ErrorPage({ route, navigation }) {

    const { Colors } = useColors();

    const styles = StyleSheet.create({
        rootView: {
            backgroundColor: Colors.errorBackground,
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            padding: 10,
        },
        errorText: {
            color: Colors.text,
            padding: 5,
        }
    });

    return (
        <View style={styles.rootView}>
            <Text style={styles.errorText}>Error: {route.params.error}</Text>
        </View>
    )
}