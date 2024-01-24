import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TextSection(props) {

  return (
    <View style={styles.textSectionContainer}>
      <MaterialIcons  name="drag-indicator" size={30} color="red" onPress={null} style={{marginBottom: 5, transform: [{ rotate: '90deg' }],}} />
              <TextInput
          placeholder="Question"
          value={props.question}
          onChangeText={props.onChangeQuestion}
          style={styles.textQuestion}
        />
      <View style={{flexDirection: 'row', flex: 1, marginTop: 15, marginBottom: 10}}>

        <Text style={styles.textAnswer}>Text Answer</Text>
        <MaterialIcons  name="delete" size={30} color="red" onPress={props.onDelete} />
      
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
    color: '#D9D9D9',
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
  }

});
