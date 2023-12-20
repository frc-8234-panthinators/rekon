import { StyleSheet, View, Pressable, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState} from 'react';

function Box() {
  // Declare state variables for the initial position of the object
  const [initX, setInitX] = useState(0);
  const [initY, setInitY] = useState(0);
  const [initWidth, setInitWidth] = useState(100);
  const [initHeight, setInitHeight] = useState(100);
  //const gridSize = Dimensions.get("window").width / 10;
  const gridSize = 50;



  // Use shared values for the translation of the object
  const translatex = useSharedValue(initX);
  const translatey = useSharedValue(initY);

  // Define the pan gesture
  const pan = Gesture.Pan()
    .onUpdate((e) => {
      // Add the initial position to the translation
      translatex.value = initX + e.translationX;
      translatey.value = initY + e.translationY;
    }).runOnJS(true)
    .onEnd(() => {
      // Update the initial position with the current translation
      translatex.value = withTiming(Math.round(translatex.value / gridSize) * gridSize);
      translatey.value = withTiming(Math.round(translatey.value / gridSize) * gridSize);
      setInitX(translatex.value);
      setInitY(translatey.value);
      
    });

     const [isClicked, setIsClicked] = useState(false);

    const tap = Gesture.Tap()
    .onStart(() => {
      setIsClicked(!isClicked);
    }).runOnJS(true)





    const width = useSharedValue(100);
    const height = useSharedValue(100); 

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
      
      height.value = withTiming(Math.round(height.value / gridSize) * gridSize);
      width.value = withTiming(Math.round(width.value / gridSize) * gridSize);

      setInitWidth(width.value);
      setInitHeight(height.value);
      setInitX(translatex.value);
      setInitY(translatey.value);
    }).runOnJS(true);


    const growBottom = Gesture.Pan()
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
      
      height.value = withTiming(Math.round(height.value / gridSize) * gridSize);
      width.value = withTiming(Math.round(width.value / gridSize) * gridSize);

      setInitWidth(width.value);
      setInitHeight(height.value);
      setInitX(translatex.value);
      setInitY(translatey.value);
    }).runOnJS(true);

    

    const composed = Gesture.Race(tap , pan);


  // Define the animated style for the object
  const style = useAnimatedStyle(() => ({

    height: height.value - 10,
    width: width.value - 10,

    transform: [
      { translateX: translatex.value },
      { translateY: translatey.value },
    ],
  }));


  return (

  

      <GestureDetector gesture={composed}> 
        
          <Animated.View style={[styles.box, style, isClicked && styles.borderChange]}>
            <GestureDetector gesture={grow}>
              <Animated.View style={isClicked && styles.topLeftDot} />
            </GestureDetector> 
          </Animated.View> 
          
      </GestureDetector>



 


  );
}



export default function AnotherTest(){

  return(

    <View>
      
      <Box />
      <Box />
      <Box />
      <Box />

    </View>

  )
}


const styles = StyleSheet.create({
  box: {
    //height: 120,
    //width: 300,
    position: 'absolute',
    backgroundColor: '#b58df1',
    borderRadius: 10,
    //marginBottom: 30,
    

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




