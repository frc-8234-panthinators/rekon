
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler  } from 'react-native-gesture-handler';
import React, {useState} from 'react';
import { runOnJS } from 'react-native-reanimated';

const ResizableBox = () => {
  const height = useSharedValue(100);
  const width = useSharedValue(100); // new shared value for width
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);

  const growGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startWidth = width.value;
      ctx.startHeight = height.value;
      ctx.startY = translateY.value;
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      let newHeight = ctx.startHeight - event.translationY;
      newHeight = Math.max(50, newHeight); // minimum height
      newHeight = Math.min(300, newHeight); // maximum height

      let newWidth = ctx.startWidth - event.translationX; // calculate the new width
      newWidth = Math.max(50, newWidth); // minimum width
      newWidth = Math.min(300, newWidth); // maximum width


      if (newHeight !== 50 && newHeight !== 300) {
        translateY.value = ctx.startY + event.translationY / 2; // move up at half the speed
      }

      height.value = newHeight;

      if (newWidth !== 50 && newWidth !== 300) {
        translateX.value = ctx.startX + event.translationX / 2; // move left
      }

      width.value = newWidth;


      height.value = withTiming(Math.round(newHeight / 50) * 50);
      width.value = withTiming(Math.round(newWidth / 50) * 50);

    },
 
  });

  const animatedGrowStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
      
      
    };
  });
/*
  const animatedInnerStyle = useAnimatedStyle(() => {


    return {
      height: height.value - 15, // 80% of the outer box's height
      width: width.value - 15, // 80% of the outer box's width
      transform: [{ translateY: translateY.value }, { translateX: translateX.value }],
      
      
    };
  }); */

  

  const gridSize = 50;

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
      //runOnJS(setIsClickedFalse)();
      
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




  const [isClicked, setIsClicked] = useState(false);

  const isClickedToggle = () => {
    setIsClicked(!isClicked);
  }

  const onClick = useAnimatedGestureHandler({
    onActive: () => {
      runOnJS(isClickedToggle)();
    },
  });




  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

        <TapGestureHandler onGestureEvent={onClick} numberOfTaps={1}>
          <Animated.View style={[styles.userBox, animatedGrowStyle, isClicked && styles.borderChange]}> 
              <PanGestureHandler onGestureEvent={growGesture}><Animated.View style={[ isClicked && styles.topLeftDot]} /></PanGestureHandler>
          </Animated.View> 
          </TapGestureHandler>
          
        </Animated.View>
    </PanGestureHandler>

    



    /*
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler onGestureEvent={growGesture}>
        <Animated.View style={[ styles.outBox, animatedGrowStyle]}>
            <View style={styles.dot} />
            <Animated.View style={[styles.userBox, animatedInnerStyle]} />
            <View style={styles.dot} />
            
        </Animated.View>
      </PanGestureHandler>      
    </View> */
  );
};

export default ResizableBox;


const styles = StyleSheet.create({
    userBox: {
      //width: 105, 
      //height: 105, 
      backgroundColor: 'blue', 
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      

      
      //position: 'absolute',
      //transform: [{ translateX: 0 }, { translateY: 0 }],
     
      
    },
    outBox: {
      //width: 120, 
      //height: 120, 
      backgroundColor: 'gray',  //save for testing
      position: 'absolute',
      //transform: [{ translateX: 0 }, { translateY: 0 }],

    },




    topLeftDot: {
      width: 25,
      height: 25,
      borderRadius: 100,
      color: 'black',
      backgroundColor: 'black',
      position: 'absolute',
      top: -12.5,
      left: -12.5,
   
  },

  borderChange: {
      borderColor: 'black',
      borderWidth: 5,
      
  },
})