import React, {useRef} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text, Dimensions} from 'react-native';
import DotBackground from './test';



export default function MatchForm(){
  const pan = useRef(new Animated.ValueXY()).current;
  const isClicked = true; //adds borders and dots used to drag to resize, make this active on click

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;





  const boxHeight = 100;
  const boxWidth = 100;
  
  const outBoxHeight = boxHeight + 15;
  const outBoxWidth = boxWidth + 15;

  return (

    <View>
        
        <View style={styles.container}>
            <Animated.View style={{transform: [{translateX: pan.x}, {translateY: pan.y}],}}{...panResponder.panHandlers}>
                
                <View style={[styles.outBox, {height: outBoxHeight, width: outBoxWidth}]}>
                    
                    <View style={[isClicked && styles.dot, styles.topRightDot]}/>
                    <View style={[isClicked && styles.dot, styles.topLeftDot]}/>
                    

                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={[styles.box, {height: boxHeight, width: boxWidth}, isClicked && styles.borderChange]} />
                        </View>

                    <View style={[isClicked && styles.dot, styles.bottomRightDot]}/>
                    <View style={[isClicked && styles.dot, styles.bottomLeftDot]}/>
                    
                    
                </View>
                
            
                
            </Animated.View>
        </View>
        <DotBackground />
    </View>

  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1,
      
    },

    outBox: {
        height: 115,
        width: 115,
        //backgroundColor: 'red',
        position: 'absolute',
        //flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
    },
    box: {
      height: 100,
      width: 100,
      backgroundColor: 'red',
      borderRadius: 5,
      //position: 'relative',
      //marginLeft: 'auto',
      //marginRight: 'auto',
      //marginTop: 'auto',
      //marginBottom: 'auto',
      justifyContent: 'center',
      alignItems: 'center',
 
    },






    dot: {
        width: 20,
        height: 20,
        borderRadius: 100,
        color: 'black',
        backgroundColor: 'black',
        position: 'relative',
        //top: 0,
        //right: 0,
        zIndex: 1,
        //flexDirection: 'row',
        //transform: [{translateX: 0}, {translateY: 0}],
    },
    topRightDot: {
        top: 0,
        right: 0,
        position: 'absolute',
      },
    topLeftDot: {
        top: 0,
        left: 0,
        position: 'absolute',
      },
    bottomLeftDot: {
        bottom: 0,
        left: 0,
        position: 'absolute',
      },
    bottomRightDot: {
        bottom: 0,
        right: 0,
        position: 'absolute',
      },
      borderChange: {
        borderColor: 'black',
        borderWidth: 5,
      },

  });