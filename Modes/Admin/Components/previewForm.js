import React from 'react';

import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';

import TextPreview from './PreviewComponents/TextPreview';
import NumberPreview from './PreviewComponents/NumberPreview';
import MultipleChoicePreview from './PreviewComponents/MultipleChoicePreview';
import CheckboxPreview from './PreviewComponents/CheckboxPreview';
import SliderPreview from './PreviewComponents/SliderPreview';
import PicturePreview from './PreviewComponents/PicturePreview';

export default function PreviewForm({ route }) {
    const sections = route.params?.sections;

    return(
        <View style={styles.container}>
            <View style={{ backgroundColor: 'white', height: 'auto', height: 'auto', }}></View>
            <Pressable style={{backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 10}} onPress={() => [console.log("Preview Form Array"), console.log(sections)]}><Text>Show Sections Array in Console</Text></Pressable>
            <ScrollView>
            {sections.map((section, index) => (
          <View key={index} style={styles.sections}>
            {section.type === 'text' && (
              <TextPreview
                question={section.question}
                onChangeQuestion={(textQuestion) => {
                  //console.log('Text Question: ', textQuestion);
                  const newSections = [...sections];
                  newSections[index].question = textQuestion;
                }}
                onDelete={() => deleteSection(index)}
              />
                )}
            {section.type === 'number' && (
              <NumberPreview
                question={section.question}
                onChangeQuestion={(numberQuestion) => {
                  //console.log('Number Question: ', numberQuestion)
                  const newSections = [...sections];
                  newSections[index].question = numberQuestion;
                  setSections(newSections);
                }}
                onDelete={() => deleteSection(index)}
              />
            )}
            {section.type === 'multiple-choice' && (
              <MultipleChoicePreview
                question={section.question}
                onChangeQuestion={(multipleChoiceQuestion) => {
                  const newSections = [...sections];
                  newSections[index].question = multipleChoiceQuestion;
                  setSections(newSections);
                }}
                options={section.options}
                onUpdateOptions={(newOptions) => updateOptions(index, newOptions)}
                onDelete={() => deleteSection(index)}
              />
              )}
            {section.type === 'checkbox' && (
              <CheckboxPreview
              question={section.question}
              onChangeQuestion={(checkboxQuestion) => {
                const newSections = [...sections];
                newSections[index].question = checkboxQuestion;
                setSections(newSections);
              }}
                options={section.options}
                onUpdateOptions={(newOptions) => updateOptions(index, newOptions)}
                onDelete={() => deleteSection(index)}
              />
            )}
            {section.type === 'slider' && (
              <SliderPreview
                question={section.question}
                minimum={section.minimum}
                maximum={section.maximum}
              />
            )}
            {section.type === 'picture' && (
              <PicturePreview
                question={section.question}
                onChangeQuestion={(pictureQuestion) => {
                  const newSections = [...sections];
                  newSections[index].question = pictureQuestion;
                  setSections(newSections);
                }}
                onDelete={() => deleteSection(index)}
              />
            )}
            
          </View>
        ))}
        </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    sections: {
      //borderWidth: 1,
      backgroundColor: '#3E4758CC',
      margin: 10,
      borderRadius: 10,
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 10,
      padding: 25,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    addSectionPressable: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      backgroundColor: 'blue',
      margin: 10,
      borderRadius: 10,
    },
    modalPressables: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 5,
      borderRadius: 10,
      borderWidth: 1,
      marginVertical: 5,
    },
  });