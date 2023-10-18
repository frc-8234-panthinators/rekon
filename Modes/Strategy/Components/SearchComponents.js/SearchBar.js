import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, InputAccessoryView, } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../../../colors';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function SearchIcon(props) {
  return (
    <View style={styles.iconBorder}>
      <MaterialIcons
        name="search"
        size={40}
        color={Colors.subText}
        style={styles.icon}
      />
    </View>
  );
}

function SearchInput(props) {
  const [text, setText] = useState('');

  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={Colors.subText} // Set the placeholder text color
        color={Colors.subText}
        onChangeText={handleTextChange}
        value={text}
      />
    </View>
  );
}

export default function SearchBar(props) {

  return (
    <View style={styles.container}>
      <SearchIcon />
      <SearchInput />
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'blue',
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    
  

    //marginTop: 15,
  },
  input: {
    flex: 1,
    height: windowHeight * 0.07,
    width: windowWidth * 0.7,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingLeft: 10,
    
    borderTopLeftRadius: 0, // Top-left corner rounded
    borderTopRightRadius: 10, // Top-right corner not rounded
    borderBottomLeftRadius: 0, // Bottom-left corner not rounded
    borderBottomRightRadius: 10, 
  },
  iconBorder: {
    width: windowWidth * 0.17,
    height: windowHeight * 0.07,
    borderColor: Colors.border,
    borderWidth: 2,
    

    borderTopLeftRadius: 10, // Top-left corner rounded
    borderTopRightRadius: 0, // Top-right corner not rounded
    borderBottomLeftRadius: 10, // Bottom-left corner not rounded
    borderBottomRightRadius: 0, 
  },
  icon: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

