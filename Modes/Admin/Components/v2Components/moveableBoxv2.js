import { StyleSheet, View, Pressable, Dimensions, Button, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState, useEffect} from 'react';

export default function Box( { id, selectedBox, onSelect, onMove, onScale, boxHeight, boxWidth, boxX, boxY, color, text}) {
  // Declare state variables for the initial position of the object
  const [initX, setInitX] = useState(0);
  const [initY, setInitY] = useState(0);
  const [initWidth, setInitWidth] = useState(100);
  const [initHeight, setInitHeight] = useState(100);
  //const gridSize = Dimensions.get("window").width / 4;
  const gridSize = 50;

  // Use shared values for the translation of the object
  const translatex = useSharedValue(initX);
  const translatey = useSharedValue(initY);

  function checkX() {
    let newX = translatex.value;
    console.log('callback')
    if (translatex.value < 0){
      console.log(initX)
      newX = initX;
      translatex.value = withTiming(newX, undefined, setInitX(translatex.value));
    } else {
      setInitX(translatex.value);
    }
  }

    
  

  // Define the pan gesture
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // Add the initial position to the translation
      translatex.value = initX + e.translationX;
      translatey.value = initY + e.translationY;
    }).runOnJS(true)
    .onEnd((e) => {
      // Update the initial position with the current translation
      translatex.value = withTiming(Math.round(translatex.value / gridSize) * gridSize, /*undefined, checkX()*/ );
      translatey.value = withTiming(Math.round(translatey.value / gridSize) * gridSize);
      if (translatex.value + width.value >= Dimensions.get("window").width) {
        //console.log("Right Side!");
        translatex.value = withTiming(Math.round(initX / gridSize) * gridSize);
        translatey.value = withTiming(Math.round(initY / gridSize) * gridSize);
      } else if (translatex.value <= 0) {
        //console.log("Left Side!");
        translatex.value = withTiming(Math.round(initX / gridSize) * gridSize);
        translatey.value = withTiming(Math.round(initY / gridSize) * gridSize);
      } else if (translatey.value <= 0) {
        //console.log("Upper Side!");
        translatex.value = withTiming(Math.round(initX / gridSize) * gridSize);
        translatey.value = withTiming(Math.round(initY / gridSize) * gridSize);
      } else if (translatey.value + height.value >= Dimensions.get("window").height - 160) {
        //console.log("Lower Side!");
        translatex.value = withTiming(Math.round(initX / gridSize) * gridSize);
        translatey.value = withTiming(Math.round(initY / gridSize) * gridSize);
      } else {
        setInitY(translatey.value);
        setInitX(translatex.value);
      }
      onMove(id, Math.round(initX / gridSize) * gridSize, Math.round(initY / gridSize) * gridSize)
    });




    

    const [isClicked, setIsClicked] = useState(false);

    const tap = Gesture.Tap()
    .onStart((props) => {
      //setIsClicked(!isClicked);
      //props.onSelect(props.id);
      onSelect(id)
    }).runOnJS(true)


    const width = useSharedValue(boxWidth);
    const height = useSharedValue(boxHeight); 

    const grow = Gesture.Pan()
    .onUpdate((e) => {
      // Calculate the new width and height based on the translation
      let newWidth = initWidth - e.translationX;
      let newHeight = initHeight - e.translationY;

      newWidth = Math.max(50, newWidth); // minimum width
      newWidth = Math.min(300, newWidth); // maximum width
      newHeight = Math.max(50, newHeight); // minimum height
      newHeight = Math.min(300, newHeight); // maximum height

      // Update the width and height values
      width.value = newWidth >= 0 ? newWidth : 0;
      height.value = newHeight >= 0 ? newHeight : 0;

      if (newHeight !== 50 && newHeight !== 300) {
        translatey.value = initY + e.translationY;
      }
      if (newWidth !== 50 && newWidth !== 300) {
        translatex.value = initX + e.translationX;
      }
      
    })
    .onEnd(() => {
      // Update the initial position with the current translation

      translatex.value = withTiming(Math.round(translatex.value / gridSize) * gridSize);
      translatey.value = withTiming(Math.round(translatey.value / gridSize) * gridSize);
      
      width.value = withTiming(Math.round(width.value / gridSize) * gridSize);
      height.value = withTiming(Math.round(height.value / gridSize) * gridSize);

      setInitWidth(width.value);
      setInitHeight(height.value);
      setInitX(translatex.value);
      setInitY(translatey.value);

      onScale(id, Math.round(width.value / gridSize) * gridSize, Math.round(height.value / gridSize) * gridSize)

    }).runOnJS(true);




    

    const composed = Gesture.Race(tap , pan);


  // Define the animated style for the object
  const style = useAnimatedStyle(() => ({

    height: height.value - 10,
    width: width.value - 10,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [
      { translateX: translatex.value + 10 },
      { translateY: translatey.value + 10 },
    ],
  }));


  return (

  

      <GestureDetector gesture={composed}> 
        
          <Animated.View style={[styles.box, style, id === selectedBox && styles.borderChange]}>
            <Text>{text}</Text>
            <GestureDetector gesture={grow}>
              <Animated.View style={id === selectedBox && styles.topLeftDot} />
            </GestureDetector> 
          </Animated.View> 
          
      </GestureDetector>



 


  );
}

import ToolBar from './editBar';
import Strategy from '../../../Strategy/Pages/home';






const styles = StyleSheet.create({
  box: {
    //height: 120,
    //width: 300,
    position: 'absolute',
    backgroundColor: '#b58df1',
    borderRadius: 10,
    //marginBottom: 30,
    

  },



  bar: {
    flex: 1,
    width: 100,
    height: 400,
    backgroundColor: 'blue',
    position: 'absolute',
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


});