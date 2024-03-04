import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TextPreview(props) {

  return (
    <View style={styles.textSectionContainer}>
        <Text style={styles.header}>{props.question}</Text>
        <View style={{flexDirection: 'row', flex: 1, marginBottom: 10}}>
            <TextInput
              style={styles.textAnswer}
              placeholder='Answer'
              placeholderTextColor={'#D9D9D9'}
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  textSectionContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 5
  },
  textQuestion: {
    backgroundColor: '#E3E2E6',
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    marginRight: 5,
    width: '100%'
    
  },
  textAnswer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    //marginTop: 10,
    marginHorizontal: 10,
    fontSize: 16,
    color: 'white',
  },
  header: {
    fontSize: 20,
    color: 'white',
  },

});
