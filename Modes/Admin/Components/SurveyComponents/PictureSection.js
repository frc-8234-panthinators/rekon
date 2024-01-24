import React from 'react';
import { View, TextInput, Text, Pressable, StyleSheet } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function PictureSection(props) {
    return (
        <View style={styles.pictureSectionContainer}>
            <View style={{flexdirection: 'colummn', flex: 1 }}>
                <Text style={styles.header}>Picture Section</Text>
                <TextInput
                    placeholder='Question'
                    value={props.question}
                    onChangeText={props.onChangeQuestion}
                    style={styles.pictureQuestion}
                />
                <View style={styles.pictureBox}>
                    <Text style={styles.cameraIcon}>Photo Here</Text>
                </View>
            </View>
            <MaterialIcons name="delete" size={30} color="red" onPress={props.onDelete}/>
        </View>
    );
}

const styles = StyleSheet.create({
    pictureSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
    },
    pictureQuestion: {
        backgroundColor: '#E3E2E6',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginRight: 5,    
    },
    pictureBox: {
        backgroundColor: '#E3E2E6',
        borderWidth: 1,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        marginRight: 5,
        justifyContent: 'center',
    },
    cameraIcon: {
        height: 50,
        width: 50,
        backgroundColor: 'gray',
        alignSelf: 'center',
        padding: 5,
    }
});