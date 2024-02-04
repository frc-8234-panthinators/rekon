import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MultipleChoicePreview(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  // RadioButton component defined here
  const RadioButton = ({ label, options }) => {
    const handlePress = () => {
      setSelectedOption(label);
    };

    const isSelected = label === selectedOption;

    return (
      <View style={styles.optionContainer}>
        <Pressable style={styles.container} onPress={handlePress}>
          <View style={[styles.circle, isSelected ? {borderColor: '#01BAEF'} : null]}>
            <View style={[{display: 'none'}, isSelected ? styles.selectedCircle : null]}/>
          </View>
          <Text style={{color: 'white', fontSize: 15.3,}}>{label}</Text>
        </Pressable>
      </View> //This view might be unnecessary
    );
  };

  return (
    <View style={styles.multipleChoiceSectionContainer}>
      <Text style={styles.header}>{props.question}</Text>
      {props.options.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          options={props.options}
          setSelectedOption={setSelectedOption}
        />
      ))}
    </View>
  );
}

// Styles for MultipleChoiceSection and RadioButton components
const styles = StyleSheet.create({
  multipleChoiceSectionContainer: {
    margin: 10,
  },
  multipleChoiceQuestion: {
    backgroundColor: '#E3E2E6',
    padding: 10,
    fontSize: 20,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  pressables: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  header: {
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 5,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  selectedCircle: {
    display: 'flex',
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: '#01BAEF',
    justifyContent: 'center',
  }, 
  textInput: {
    fontSize: 16,
    color: 'white',
  },
  deleteOption: {
    borderWidth: 2,
  },
  warning: {
    color: 'red',
    marginHorizontal: 5,
  },
  optionContainer: {
  },
});

