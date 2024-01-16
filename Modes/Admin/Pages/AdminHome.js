import * as React from 'react';
import { Text, View, Button, TouchableOpacity, Dimensions, StyleSheet, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import PieChartComponent from '../../CommonComponents/PieChart';
import ScoutingModeVars from '../../../ScoutingModeVars';

function TotalPercentDone(){
    return(
        <View style={styles.outBox}>
            <Text style={styles.titleText}>Admin</Text>
            <View style={styles.container}>
                <PieChartComponent percentCompleted={ScoutingModeVars.adminPercentCompleted} />
            </View>
        </View>
        
    )
}

function IndividualBoxes(){
    return(
        <View style={styles.ScrollBox}> 
        <View style={{flexDirection: 'row',}}> 
            <View style={styles.userColor} />
            <Text style={{fontSize: 30, color: 'white', top: 10, left: 20,}}>Jonas</Text>
        </View>

        <View style={{flexDirection: 'row',}}>   
            <Text style={{fontSize: 20, color: 'white', left: 10, top: 15}}>Teams left:</Text>
            <Text style={{fontSize: 20, color: 'white', position: 'absolute', right: 10, top: 15}} >10</Text>
        </View>

        <View style={{width: windowWidth * 0.4, backgroundColor: 'white', height: 3, marginLeft: windowWidth * 0.05, top: 25}}/>

   
    </View>
    )
}



function IndividualReports(){
    return(
        <View style={styles.outBox}>
            <Text style={styles.titleText}>Reports</Text>
            <ScrollView horizontal={true} scrollEnabled={true} contentContainerStyle={styles.ScrollContainer}>
                <IndividualBoxes />
                <IndividualBoxes />
                <IndividualBoxes /> 
                <IndividualBoxes />
            </ScrollView>
        </View>
        
    )
}







export default function AdminHomepage(){


    return(
        <View style={{backgroundColor: Colors.background, width: '100%', height: '100%'}}>
            <TotalPercentDone />
            <IndividualReports />
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
    height: windowHeight * 0.35,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 10,
    marginBottom: -20,

  },
  outBox: {
    marginTop: 25, //adjusts whole thing from the top
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 32,
    color: Colors.subText,
    marginLeft: windowWidth * 0.05,
  },

  ScrollContainer: {
    //flexDirection: 'collumn',
    //alignItems: 'center',
    
    //backgroundColor: 'grey',
    //width: '100%',
    height: windowHeight * 0.35,
    marginLeft: windowWidth * 0.025,
    //marginLeft: 'auto',
    //marginRight: 'auto',
    //borderRadius: 10,
    //marginBottom: -20,
    //flexDirection: 'row',
    //justifyContent: 'center'

  },

  ScrollBox: {
    width: windowWidth * 0.5,
    //height: '100%',
    backgroundColor: Colors.component,
    borderRadius: 10,
    margin: windowWidth * 0.025,
    overflow: 'hidden'
   
  },

  userColor: {
    width:50, 
    height: 50, 
    borderRadius: 100, 
    backgroundColor: 'green',
    top: 10,
    left: 10
  }

});