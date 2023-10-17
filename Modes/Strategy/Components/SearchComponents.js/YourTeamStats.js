import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../../../../colors';

import SearchPageVars from '../../../../SearchPageVars';













function Parts(props) {

    if (props.title == 'Auto'){
        return(

            <View>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={styles.CurrentBox}>
                    <Text style={styles.NumText}>{SearchPageVars.Auto}</Text>
                </View>
            </View>
            
        )
    }
    else if (props.title == 'Teleop'){
        return(

            <View>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={styles.NextBox}>
                    <Text style={styles.NumText}>{SearchPageVars.Teleop}</Text>
                </View>
            </View>
            
        )
    }
    else if (props.title == 'Endgame'){
        return(

            <View>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={styles.NextBox}>
                    <Text style={styles.NumText}>{SearchPageVars.Endgame}</Text>
                </View>
            </View>
            
        )
    }
    else if (props.title == 'Total'){
        return(

            <View>
                <Text style={styles.titleText}>{props.title}</Text>
                <View style={styles.LoadBox}>
                    <Text style={styles.NumText}>{SearchPageVars.Total}</Text>
                </View>
            </View>
            
        )
    }


    
}


function AutoTeleEndTotal(props){
    return(
        <View style={styles.wrap}>
            <View style={styles.test}>
                <Parts title='Auto' />
                <Parts title='Teleop' />
                <Parts title='Endgame' />
                <Parts title='Total' /> 
            </View>
            
        </View>
    )
}




export default function YourStats(props) {
  return (
    <View style={styles.container}>
        <Text style={styles.YourStatsText}>Your Teams Stats:</Text>
        <AutoTeleEndTotal />
        
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.component,
    flexDirection: 'collumn',
    alignItems: 'center',
    //backgroundColor: 'blue',
    width: windowWidth * 0.9,
    height: windowHeight * 0.17,
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 10,


  },
  wrap:{
    //width: windowWidth * 0.9,
    //height: windowHeight * 0.05,
    //marginTop: 20,
    marginBottom: 50,
    
  },


test: {
    //borderRadius: 10,
    //width: windowWidth * .9, // Adjust the width as a percentage of the screen width
    //height: windowHeight * 0.1,
    //flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-evenly',
    //alignItems: 'center',
    //marginBottom: -5,
    marginLeft: 'auto',
    marginRight: 'auto',    
    
},
CurrentBox: {
    backgroundColor: Colors.innerComponent,
    //width: 100,
    width: windowWidth * 0.2,
    height: windowHeight * 0.05,
    marginRight: 0,
    marginLeft: 10,
    

    borderTopLeftRadius: 10, // Top-left corner rounded
    borderTopRightRadius: 0, // Top-right corner not rounded
    borderBottomLeftRadius: 10, // Bottom-left corner not rounded
    borderBottomRightRadius: 0, 

    //flex: 1,
    //justifyContent: 'center',
},
NextBox: {
    backgroundColor: Colors.innerComponent,
    width: windowWidth * 0.2,
    height: windowHeight * 0.05,
    marginRight: 0,
    marginLeft: 5,
    borderradious: 0,

    //flex: 1,
    //justifyContent: 'center',
},
LoadBox: {
    backgroundColor: Colors.innerComponent,
    width: windowWidth * 0.2,
    height: windowHeight * 0.05,
    marginRight: 10,
    marginLeft: 5,

    borderTopLeftRadius: 0, // Top-left corner rounded
    borderTopRightRadius: 10, // Top-right corner not rounded
    borderBottomLeftRadius: 0, // Bottom-left corner not rounded
    borderBottomRightRadius: 10, 

    //flex: 1,
    //justifyContent: 'center',
},
titleText: {

    //fontWeight: 'normal',
    textAlign: 'center',
    marginTop: 2,
    color: Colors.subText,
    
   
  },
  NumText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    left: -2,
    color: Colors.background,
  },
  encourageText:{
    color: Colors.subText,
    fontSize: 15,
    
    marginTop: 10,
    marginBottom: 10,
  },
  YourStatsText:{
    color: Colors.subText,
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 5,
  },






});
