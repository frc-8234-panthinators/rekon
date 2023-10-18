import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../../../colors';
import { useLinkProps } from '@react-navigation/native';


function TextInputBar(props){
    const [text, setText] = useState('');

    const handleTextChange = (inputText) => {
      setText(inputText);
    };
  
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={props.placeHolder}
          placeholderTextColor={Colors.subText} // Set the placeholder text color
          color={Colors.subText}
          onChangeText={handleTextChange}
          value={text}
        />
      </View>
    );
}

function AddComareTextField() {
    return(
        
        <View style={styles.plusContainer}>
            <TouchableOpacity style={styles.plusButton}>
                <View style={styles.plusIconContainer}>
                    <MaterialIcons
                            name="add"
                            size={35}
                            color="white"
                            style={styles.plusIcon}
                        />
                </View>
            </TouchableOpacity>
        </View>
    )
}



function CompareWidget() {
    return(
        <View>
            <TouchableOpacity style={styles.titleButton}>
                <Text style={styles.titleText}>Compare</Text>
                <MaterialIcons
                        name="arrow-back"
                        size={35}
                        color="white"
                        style={styles.icon}
                    />
            </TouchableOpacity>
            <TextInputBar placeHolder='Enter Team #1...'/>
            <TextInputBar placeHolder='Enter Team #2...'/>
            <AddComareTextField />
            
        </View>
    )
}

function QuickPickWidget() {
    return(
        <View>
            <TouchableOpacity style={styles.titleButton}>
                <Text style={styles.titleText}>PickList</Text>
                <MaterialIcons
                        name="arrow-back"
                        size={35}
                        color="white"
                        style={styles.icon}
                    />
            </TouchableOpacity>
            <Text style={styles.listText}>List 1 Title</Text>
            <TextInputBar placeHolder='QuickPick...'/>
            <Text style={styles.listText}>List 2 Title</Text>
            <TextInputBar placeHolder='QuickPick...'/>
            
        </View>
    )
}


export default function CompareAndQuickpick(){
    return(
        <View style={styles.container}>
            <View style={styles.widBox}>
                <CompareWidget />
            </View>
            <View style={styles.widBox}>
                <QuickPickWidget />
            </View>
        </View>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    //backgroundColor: 'blue',
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,

    //marginTop: 15,
  },
  widBox: {
    backgroundColor: Colors.component,
    width: windowWidth * 0.44, //adjust for width between widgets
    height: windowHeight * 0.35,
    borderRadius: 10,
  },
  titleButton:{
    backgroundColor: Colors.background,
    width: windowWidth * .38, // Adjust the width as a percentage of the screen width
    height: windowHeight * 0.07,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    color: Colors.subText,
    fontWeight: 'bold',
    fontSize: 20,

  },
  icon: {
    transform: [{ rotate: '145deg' }], // Rsotate the icon 45 degrees
    color: Colors.subText,
  },
  input: {
    //flex: 1,
    height: windowHeight * 0.07,
    width: windowWidth * 0.38,
    borderWidth: 2,
    borderColor: Colors.border,
    paddingLeft: 10,
    borderRadius: 10,
  },
  inputContainer: {
    //marginBottom: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  plusButton: {
    height: windowHeight * 0.07,
    width: windowWidth * 0.38,
    borderWidth: 2,
    borderColor: Colors.border,
    marginTop: 10,
    borderRadius: 10,
 
  },
  plusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconContainer: {
    flex: 1,
    //marginTop: 'auto',
    //marginBottom: 'auto',
    //marginLeft: 'auto',
    //marginRight: 'auto',

    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {

    //marginLeft: 'auto',
    //marginRight: 'auto',
  },
  listText: {
    color: Colors.subText,
    fontSize: 15,
    fontWeight: 'bold',
    
    
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',


  },

  

});