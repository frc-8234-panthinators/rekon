import React, { useState } from 'react';
import { Pressable, View, Text, TextInput, StyleSheet, Dimensions, Picker } from 'react-native';

const Question = ({ type, question }) => {
    switch (type) {
      case 'text':
        return <TextInput style={styles.input} placeholder={question} />;
      case 'number':
        return <TextInput style={styles.input} placeholder={question} keyboardType="numeric" />;
      case 'multipleChoice':
        return (
          <Picker>
            {/* Replace 'Option 1', 'Option 2' with your options */}
            <Picker.Item label="Option 1" value="option1" />
            <Picker.Item label="Option 2" value="option2" />
          </Picker>
        );
      case 'checkbox':
        return (
          <View style={styles.checkboxContainer}>
            <CheckBox />
            <Text>{question}</Text>
          </View>
        );
      // Add other types here
      default:
        return null;
    }
  };

const PitForm = () => {
  const [questions, setQuestions] = useState([
    { id: 1, type: 'text', question: 'Question 1' },
    { id: 2, type: 'number', question: 'Question 1'},
    { id: 3, type: 'multipleChoice', question: 'Question 1'},
    // Add other questions here
  ]);

  const moveQuestion = (direction, index) => {
    // Implement rearranging logic here
  };

  return (
    <View style={styles.container}>
      {questions.map((question, index) => (
        <View key={question.id} style={styles.question}>
          <Pressable onPress={() => moveQuestion('up', index)}><Text>Up</Text></Pressable>
          <Question type={question.type} question={question.question} />
          <Pressable onPress={() => moveQuestion('down', index)}><Text>Down</Text></Pressable>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  }
});

export default PitForm;
