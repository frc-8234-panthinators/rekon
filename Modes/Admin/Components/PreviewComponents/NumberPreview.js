import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function NumberPreview(props) {
  const [ answer, setAnswer ] = useState(null);

  const editAnswer = (input) => {
    const newAnswer = input.replace(/[^0-9]/g, '');
    setAnswer(newAnswer);

  }

  return (
    <View style={styles.numberSectionContainer}>
        <Text style={styles.header}>{props.question}</Text>
        <View style={{ flexDirection: 'row', flex: 1, marginBottom: 10, }}>
            <TextInput
              value={answer}
              style={styles.numberAnswer}
              placeholder='Answer'
              placeholderTextColor={'#D9D9D9'}
              onChangeText={editAnswer}
              inputMode='numeric'
            />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  numberSectionContainer: {
    //flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    marginTop: 5,
  },
  numberQuestion: {
    backgroundColor: '#E3E2E6',
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    marginRight: 5,
    width: '100%'
  },
  numberAnswer: {
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
  }
});
