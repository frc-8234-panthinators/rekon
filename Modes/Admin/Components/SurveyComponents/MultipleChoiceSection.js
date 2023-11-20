import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';

export default function MultipleChoiceSection(props) {
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    console.log('Options:', props.options);
  }, [props.options]);


  const handleAddOption = () => {
    let optionNumber = props.options.length + 1;
    let newOption = `Option ${optionNumber}`;

    while (props.options.includes(newOption)) {
      optionNumber++;
      newOption = `Option ${optionNumber}`;
    }

    props.onUpdateOptions([...props.options, newOption]);
  };

  const handleDeleteOption = (optionToDelete) => {
    const newOptions = props.options.filter(option => option !== optionToDelete);
    props.onUpdateOptions(newOptions);
  };

  const handleEditOption = (index, newText) => {
    const newOptions = [...props.options];
    newOptions[index] = newText;
    props.onUpdateOptions(newOptions);
    setEditIndex(null);
  };

  // RadioButton component defined here
  const RadioButton = ({ label, onDelete, onEdit, options }) => {
    const [editText, setEditText] = useState(label);
    const [isDuplicate, setIsDuplicate] = useState(false);

    const handleEdit = () => {
      if (editText === label) {
        onEdit(editText);
        setIsDuplicate(false);
        return
      }

      if (!options.includes(editText)) {
        onEdit(editText);
        setIsDuplicate(false);
      } else {
        console.log('Option already exists');
        setEditText(label); //reset the text input to the original label
        setIsDuplicate(true);
      }
    };

    return (
      <View>
        <View style={styles.container}>
          <View style={styles.circle} />
          <TextInput
            value={editText}
            onChangeText={setEditText}
            onEndEditing={handleEdit}
            style={styles.textInput}
          />
          <Pressable style={styles.deleteOption} onPress={onDelete}><Text>Delete</Text></Pressable>
        </View>
          {isDuplicate && <Text style={styles.warning}>Duplicate cannot exist!</Text>}
      </View>
    );
  };

  return (
    <View style={styles.multipleChoiceSectionContainer}>
      <Text style={styles.header}>Multiple Choice Section</Text>
      {props.options.map((option, index) => (
        <RadioButton
          key={index}
          label={option}
          onDelete={() => handleDeleteOption(option)}
          onEdit={(newText) => handleEditOption(index, newText)}
          options={props.options}
        />
      ))}
      <Pressable style={styles.pressables} onPress={handleAddOption}>
        <Text>Add Option</Text>
      </Pressable>
      <Pressable style={styles.pressables} onPress={props.onDelete}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
}

// Styles for MultipleChoiceSection and RadioButton components
const styles = StyleSheet.create({
  multipleChoiceSectionContainer: {
    margin: 10,
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
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    borderWidth: 1,
  },
  deleteOption: {
    borderWidth: 2,
  },
  warning: {
    color: 'red',
    marginHorizontal: 5,
  }
});

