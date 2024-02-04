import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function CheckboxPreview(props) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    console.log(props.question + ': ' + selectedOptions);
  }, [selectedOptions]);

  // Checkbox component defined here
  const Checkbox = ({ label, options }) => {
    const handlePress = () => {
      setSelectedOptions(prevOptions => {
        if (prevOptions.includes(label)) {
            return prevOptions.filter(option => option !== label);
        } else {
            return [...prevOptions, label];
        }
      });
    };

    const isSelected = selectedOptions.includes(label);

    return (
      <View style={styles.optionContainer}>
        <Pressable style={styles.container} onPress={handlePress}>
          <MaterialIcons name={isSelected ? "check" : null} size={19} color="white" style={[styles.checkbox, isSelected ? {borderColor: '#01BAEF', backgroundColor: '#01BAEF'} : null]}/>
          <Text style={{color: 'white', fontSize: 15.3,}}>{label}</Text>
        </Pressable>
      </View> //This View might be unnecessary
    );
  };

  return (
    <View style={styles.checkboxSectionContainer}>
      <Text style={styles.header}>{props.question}</Text>
      {props.options.map((option, index) => (
        <Checkbox
          key={index}
          label={option}
          options={props.options}
        />
      ))}
    </View>
  );
}

// Styles for MultipleChoiceSection and RadioButton components
const styles = StyleSheet.create({
  checkboxSectionContainer: {
    margin: 10,
  },
  checkboxQuestion: {
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
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
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

