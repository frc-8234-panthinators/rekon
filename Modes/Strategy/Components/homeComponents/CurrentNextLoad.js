import Colors from '../../../../colors';
import * as React from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import StratHomePageVars from '../../../../StratHomePageVars';


function Parts(props) {

    if (props.title == 'Current'){
        return(
            <View style={styles.CurrentBox}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.NumText}>{StratHomePageVars.CurrentNum}</Text>
            </View>
        )
    }
    else if (props.title == 'Next'){
        return(
            <View style={styles.NextBox}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.NumText}>{StratHomePageVars.NextNum}</Text>
            </View>
        )
    }
    else if (props.title == 'Load'){
        return(
            <View style={styles.LoadBox}>
                <Text style={styles.titleText}>{props.title}</Text>
                <Text style={styles.NumText}>{StratHomePageVars.LoadNum}</Text>
            </View>
        )
    }


    
}


export default function CurrentNextLoad(props){
    return(
        <View style={styles.container}>
            <Text style={styles.outTitleText}>Matches</Text>
            <View style={styles.test}>
                <Parts title='Current' />
                <Parts title='Next' />
                <Parts title='Load' /> 
            </View>
            
        </View>
    )
}




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
        //flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
        //alignItems: 'center',
       

        //marginBottom: 25,

    },
    test: {
        borderRadius: 10,
        width: windowWidth * .9, // Adjust the width as a percentage of the screen width
        height: windowHeight * 0.1,
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        //alignItems: 'center',
        marginBottom: -5,
        
        
    },
    CurrentBox: {
        backgroundColor: Colors.component,
        //width: 100,
        width: windowWidth * 0.279,
        height: windowHeight * 0.085,
        marginRight: 10,
        marginLeft: 10,

        borderTopLeftRadius: 10, // Top-left corner rounded
        borderTopRightRadius: 0, // Top-right corner not rounded
        borderBottomLeftRadius: 10, // Bottom-left corner not rounded
        borderBottomRightRadius: 0, 

        //flex: 1,
        //justifyContent: 'center',
    },
    NextBox: {
        backgroundColor: Colors.component,
        width: windowWidth * 0.279,
        height: windowHeight * 0.085,
        marginRight: 10,
        marginLeft: 10,
        borderradious: 0,

        //flex: 1,
        //justifyContent: 'center',
    },
    LoadBox: {
        backgroundColor: Colors.component,
        width: windowWidth * 0.279,
        height: windowHeight * 0.085,
        marginRight: 10,
        marginLeft: 10,

        borderTopLeftRadius: 0, // Top-left corner rounded
        borderTopRightRadius: 10, // Top-right corner not rounded
        borderBottomLeftRadius: 0, // Bottom-left corner not rounded
        borderBottomRightRadius: 10, 

        //flex: 1,
        //justifyContent: 'center',
    },
    titleText: {

        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 2,
        color: Colors.subText,
       
      },
      NumText: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        left: -2,
        color: Colors.subText,
      },
      outTitleText: {
        fontWeight: 'bold',
        fontSize: 32,
        color: Colors.mainText,
      },

    


});