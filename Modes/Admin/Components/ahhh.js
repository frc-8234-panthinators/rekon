//import React from 'react';
import React, {useRef, useState} from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDecay,
  withRepeat,
} from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';

import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function Test() {

  
  const gridSize = 50;
  //const isClicked = true;
  const [isClicked, setIsClicked] = useState(false);


  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      translateX.value = withTiming(Math.round(translateX.value / gridSize) * gridSize);
      translateY.value = withTiming(Math.round(translateY.value / gridSize) * gridSize);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const isClickedToggle = () => {
    setIsClicked(!isClicked);
  }
  const onClick = useAnimatedGestureHandler({
    onActive: () => {
      runOnJS(isClickedToggle)();
    },
  });

  return (
    
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[animatedStyle,]}>
          <View style={styles.outBox}>

            <View style={[isClicked && styles.dot, styles.topLeftDot]} />
            <View style={[isClicked && styles.dot, styles.topRightDot]} />

            <TapGestureHandler onGestureEvent={onClick} numberOfTaps={1}>
              <Animated.View style={[styles.userBox, isClicked && styles.borderChange]}/>
            </TapGestureHandler>

              <View style={[isClicked && styles.dot, styles.bottomLeftDot]} />
              <View style={[isClicked && styles.dot, styles.bottomRightDot]} />



          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
    
  );
}



export default function AHH(){


  return(
    
      <Test/>  
  )
}


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    userBox: {
      width: 105, 
      height: 105, 
      backgroundColor: 'blue', 
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
    },
    outBox: {
      width: 120, 
      height: 120, 
      //backgroundColor: 'gray',  //save for testing
    },




    dot: {
      width: 20,
      height: 20,
      borderRadius: 100,
      color: 'black',
      backgroundColor: 'black',
      position: 'relative',
      zIndex: 1,

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
})