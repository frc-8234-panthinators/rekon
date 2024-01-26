import { StyleSheet, View, Pressable, Dimensions, Button, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Box( { id, selectedBox, onSelect, onMove, onScale, boxHeight, boxWidth, boxX, boxY, color, text, fontSize, fontColor, bold, italic, icon, zIndex, iconColor, iconSize}) {
  // Declare state variables for the initial position of the object
  const [initX, setInitX] = useState(0);
  const [initY, setInitY] = useState(0);
  const [initWidth, setInitWidth] = useState(100);
  const [initHeight, setInitHeight] = useState(100);
  //const gridSize = Dimensions.get("window").width / 4;
  const gridSize = (Dimensions.get("window").width - ((Dimensions.get("window").width / 8) / 5)) / 8;
  const gridSizeForSpacing = Dimensions.get("window").width / 8

  // Use shared values for the translation of the object
  const translatex = useSharedValue(initX);
  const translatey = useSharedValue(initY);

  useEffect(() => {
    translatex.value = withTiming(Math.round(boxX / gridSize) * gridSize);
    translatey.value = withTiming(Math.round(boxY / gridSize) * gridSize);
    width.value = withTiming(boxWidth);
    height.value = withTiming(boxHeight);
    setInitX(Math.round(boxX / gridSize) * gridSize);
    setInitY(Math.round(boxY / gridSize) * gridSize);
  }, [boxX, boxY, boxWidth, boxHeight]);

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
      let newX = Math.round(translatex.value / gridSize) * gridSize;
      let newY = Math.round(translatey.value / gridSize) * gridSize;

      // Update the initial position with the current translation
      translatex.value = withTiming(newX, /*undefined, checkX()*/ );
      translatey.value = withTiming(newY);
      console.log(newY + height.value)
      console.log(Dimensions.get('window').height)
      if (newX + width.value > Dimensions.get("window").width) {
        //console.log("Right Side!");
        newX = Math.round((Dimensions.get("window").width - width.value) / gridSize) * gridSize;
      } else if (newY + height.value > Dimensions.get("window").height - (gridSize * 2)) {
        console.log("Lower Side!");
        newY = Math.round(((Dimensions.get("window").height - height.value) / gridSize) - 2) * gridSize;
      }

      if (newX < 0) {
        //console.log("Left Side!");
        newX = 0;
      } else if (newY < 0) {
        //console.log("Upper Side!");
        newY = 0;
      }

      translatex.value = withTiming(newX);
      translatey.value = withTiming(newY);
      setInitY(newY);
      setInitX(newX);
      onMove(id, newX, newY)
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

      newWidth = Math.max(gridSize, newWidth); // minimum width
      newWidth = Math.min(gridSize * 6, newWidth); // maximum width
      newHeight = Math.max(gridSize, newHeight); // minimum height
      newHeight = Math.min(gridSize * 6, newHeight); // maximum height

      // Update the width and height values
      width.value = newWidth >= 0 ? newWidth : 0;
      height.value = newHeight >= 0 ? newHeight : 0;

      if (newHeight !== gridSize && newHeight !== gridSize * 6) {
        translatey.value = initY + e.translationY;
      }
      if (newWidth !== gridSize && newWidth !== gridSize * 6) {
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
      setInitX(Math.round(translatex.value / gridSize) * gridSize);
      setInitY(Math.round(translatey.value / gridSize) * gridSize);

      onScale(id, Math.round(width.value / gridSize) * gridSize, Math.round(height.value / gridSize) * gridSize, Math.round(translatex.value / gridSize) * gridSize, Math.round(translatey.value / gridSize) * gridSize)

    }).runOnJS(true);




    

    const composed = Gesture.Race(tap , pan);


  // Define the animated style for the object
  const style = useAnimatedStyle(() => ({

    height: height.value - 10,
    width: width.value - 10,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: zIndex,


    transform: [
      { translateX: translatex.value + gridSizeForSpacing / 5 },
      { translateY: translatey.value + gridSizeForSpacing / 5 },
    ],
  }));


  return (

  

    <GestureDetector gesture={composed}> 

    



    <Animated.View style={[styles.box, style, id === selectedBox && styles.borderChange]}>
      <View style={{overflow: 'hidden', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        {icon.length != 0 && <MaterialIcons name={icon} size={isNaN(parseInt(iconSize)) ? 0 : parseInt(iconSize)} color={iconColor} />}
        {text.length != 0 && <Text style={{fontSize: isNaN(parseInt(fontSize)) ? 0 : parseInt(fontSize), color: fontColor, fontWeight: bold, fontStyle: italic, }}>{text}</Text>}
      </View>

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
    //overflow: 'hidden'
  
    

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