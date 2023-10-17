import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../../../colors';



function MatchViewButton(){
    return(
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.ViewMatchButon}>
                <View  style={styles.textBox}>
                    <Text style={styles.title}>Match View</Text>
                </View>
                <View style={styles.iconBox} >
                    <MaterialIcons
                        name="arrow-back"
                        size={40}
                        color="white"
                        style={styles.icon}
                    />
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

function TextInputBar(){
    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
      setText(inputText);
    };
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Match #..."
          placeholderTextColor={Colors.subText} // Set the placeholder text color
          color={Colors.subText}
          onChangeText={handleTextChange}
          value={text}
        />
      </View>
    );
}

export default function MatchViewWidget(){
    return(
        <View style={styles.container}>
            <MatchViewButton />
            <TextInputBar />
        </View>
    )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'collumn',
    alignItems: 'center',
    backgroundColor: Colors.component,
    width: windowWidth * 0.9,
    height: windowHeight * 0.2,
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,

    //marginTop: 15,
  },
  input: {
    //flex: 1,
    height: windowHeight * 0.07,
    width: windowWidth * 0.85,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingLeft: 10,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 'auto',
  },
  buttonContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  ViewMatchButon: {
    borderRadius: 10,
    backgroundColor: Colors.background, 
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    //justifyContent: 'space-between',

    //paddingHorizontal: 10, // Add some horizontal padding
    
    //justifyContent: 'center',
    
    width: windowWidth * .85, // Adjust the width as a percentage of the screen width
    height: windowHeight * 0.07,
  },
  title: {
    color: Colors.subText,
    fontWeight: 'bold',
    fontSize: 25,
    
  },
  icon: {
    transform: [{ rotate: '145deg' }], // Rsotate the icon 45 degrees
    color: Colors.subText,
    
  },
  iconBox: {
    flex: 1,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginRight: 10,
    alignItems: 'flex-end',
  },
  textBox: {
    
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 10,
    
    
  },

});