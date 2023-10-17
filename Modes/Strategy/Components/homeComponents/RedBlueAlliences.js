import Colors from '../../../../colors';
import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity } from 'react-native';


function Both(props){
    return(
        <View style={styles.both}>

            <View style={styles.nums}>
                <View style={styles.textCont}>
                    <Text style={styles.altText}>{props.numText}</Text>
                </View>
                
            </View>
            <TouchableOpacity style={styles.teams} /*function goes here or rather the variable for the function depending on team...ahhh*/ >
                <View style={styles.textCont}>
                    <Text style={styles.altText}>{props.teamText}</Text>
                </View>
                
            </TouchableOpacity>

        </View>
        

    )
}

export default function RedBlueCards(props) {
  return (
     <View style={styles.container}>
      <Text style={styles.text}>{props.Title + ' Alliance'}</Text>
      <View style={{ ...styles.card, backgroundColor: props.Color }}>
        
        <Both numText={props.RBnum + '1'} teamText={props.Team1} />
        <Both numText={props.RBnum + '2'} teamText={props.Team2} />
        <Both numText={props.RBnum + '3'} teamText={props.Team3} />

      </View>
    </View>
  );
}



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    
    //justifyContent: 'center',
    //alignItems: 'center',
    
  },
  card: {
    
    //backgroundColor: Colors.blue,
    borderRadius: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
   // paddingVertical: '40px', // Adjust the height by changing this value
   // paddingHorizontal: '20px',
    width: windowWidth * 0.9, // Adjust the width as a percentage of the screen width
    height: windowHeight * 0.23,
    marginBottom: 5,
  },

  text:{
    fontWeight: 'bold',
    fontSize: 20,
    color: Colors.mainText,
    
  },

  teams: {
    //backgroundColor: ,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    borderTopLeftRadius: 0, // Top-left corner rounded
    borderTopRightRadius: 10, // Top-right corner not rounded
    borderBottomLeftRadius: 0, // Bottom-left corner not rounded
    borderBottomRightRadius: 10, // Bottom-right corner rounded
    //paddingVertical: '40px', // Adjust the height by changing this value
   // paddingHorizontal: '20px',
    //width: 250, // Adjust the width as a percentage of the screen width
    width: windowWidth * 0.7,
    height: windowHeight * 0.065,
    //right: 10,
    //marginBottom: 10,
    

  },

  nums: {
    //backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    borderTopLeftRadius: 10, // Top-left corner rounded
    borderTopRightRadius: 0, // Top-right corner not rounded
    borderBottomLeftRadius: 10, // Bottom-left corner not rounded
    borderBottomRightRadius: 0, // Bottom-right corner rounded
    //paddingVertical: '40px', // Adjust the height by changing this value
   // paddingHorizontal: '20px',
    //width: 45, // Adjust the width as a percentage of the screen width
    width: windowWidth * 0.13,
    height: windowHeight * 0.065,
    //left: 10,
  },
  both: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    //marginBottom: 3,
    marginTop: 6,
  },
  altText: {

    fontWeight: 'bold',
    textAlign: 'center',
    bottom: 1.5,
    color: Colors.subText,
   
  },
  textCont: {
    flex: 1,
    justifyContent: 'center',
    
  }

});