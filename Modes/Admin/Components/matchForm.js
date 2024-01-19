import React, { useState } from 'react';
import { ScrollView, Pressable, Text, Modal, View, StyleSheet, Dimensions } from 'react-native';

import TextSection from './SurveyComponents/TextSection';
import NumberSection from './SurveyComponents/NumberSection';
import MultipleChoiceSection from './SurveyComponents/MultipleChoiceSection';
import CheckboxSection from './SurveyComponents/CheckboxSection';
import SliderSection from './SurveyComponents/SliderSection';
import PictureSection from './SurveyComponents/PictureSection';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function MatchForm(){

  const [sections, setSections] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const addSection = (sectionType, sectionOptions = []) => {
    setSections([...sections, { type: sectionType, options: sectionOptions }]);
    setModalVisible(false);
  };

  const deleteSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  const updateOptions = (index, newOptions) => {
    const newSections = [...sections];
    newSections[index].options = newOptions;
    setSections(newSections);
  };

  //logs the question types and its properties in the console
  sections.forEach((section, index) => {
    console.log('   New Update')
    console.log(`Section ${index + 1}:`);
    console.log(`Type: ${section.type}`);
    console.log(`Question: ${section.question}`);

    if (section.minimum) {
      console.log(`Minimum: ${section.minimum}`)
    }

    if (section.maximum) {
      console.log(`Maximum: ${section.maximum}`)
    }

    if (section.options && section.options.length > 0) {
      console.log('Options:');
      section.options.forEach((option, i) => {
        console.log(`  Option ${i + 1}: ${option}`);
      });
    }
  });
  
  

  return(
    <View style={styles.container}>
      <ScrollView>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Pressable style={styles.modalPressables} onPress={() => addSection('text')}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Text Section</Text>
                </View>
              </Pressable>
              <Pressable style={styles.modalPressables} onPress={() => addSection('multiple-choice', ['Option 1', 'Option 2'])}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Multiple Choice Section</Text>
                </View>
              </Pressable>
              <Pressable style={styles.modalPressables} onPress={() => addSection('checkbox', ['Option 1', 'Option 2'])}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Checkbox Section</Text>
                </View>
              </Pressable>
              <Pressable style={styles.modalPressables} onPress={() => addSection('number')}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Number Section</Text>
                </View>
              </Pressable>
              <Pressable style={styles.modalPressables} onPress={() => addSection('slider')}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Slider Section</Text>
                </View>
              </Pressable>
              <Pressable style={styles.modalPressables} onPress={() => addSection('picture')}>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                  <Text>Add Picture Section</Text>
                </View>
              </Pressable>
              <Pressable style={[styles.modalPressables, {marginTop: 20}]} onPress={() => setModalVisible(false)}>
                <Text>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {sections.map((section, index) => (
          <View key={index} style={styles.sections}>
            {section.type === 'text' && (
              <TextSection
                question={section.question}
                onChangeQuestion={(textQuestion) => {
                  //console.log('Text Question: ', textQuestion);
                  const newSections = [...sections];
                  newSections[index].question = textQuestion;
                  setSections(newSections);
                }}
                onDelete={() => deleteSection(index)}
              />
            )}
            {section.type === 'multiple-choice' && (
              <MultipleChoiceSection
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
            {section.type === 'number' && (
              <NumberSection
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
            {section.type === 'checkbox' && (
              <CheckboxSection
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
              <SliderSection
                question={section.question}
                minimum={section.minimum}
                maximum={section.maximum}
                onChangeQuestion={(sliderQuestion) => {
                  const newSections = [...sections];
                  newSections[index].question = sliderQuestion;
                  setSections(newSections);
                }}
                onChangeMin={(minimum) => {
                  const newSections = [...sections];
                  newSections[index].minimum = minimum;
                  setSections(newSections);
                }}
                onChangeMax={(maximum) => {
                  const newSections = [...sections];
                  newSections[index].maximum = maximum;
                  setSections(newSections);
                }}
                onDelete={() => deleteSection(index)}
              />
            )}
            {section.type === 'picture' && (
              <PictureSection
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
      <Pressable style={styles.addSectionPressable} onPress={() => setModalVisible(true)}>
        <Text style={{color: 'white', fontSize: 20}}>Add New Section</Text>
      </Pressable>
    </View>
  ); 
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


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
  },
});