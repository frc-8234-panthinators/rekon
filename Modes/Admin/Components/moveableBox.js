
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
import { LinearGradient } from 'expo-linear-gradient';

function ResizeBox() {
  const height = useSharedValue(100);
  const width = useSharedValue(100); // new shared value for width
  const translateY = useSharedValue(100);
  const translateX = useSharedValue(0);
  const gridSize = 50;
  const scaleGrid = 50;

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

     
      height.value = newHeight;
      width.value = newWidth;
      


      if (newHeight !== 50 && newHeight !== 300) {
      translateY.value = Math.round(ctx.startY + event.translationY / 2); // move up at half the speed
      } 

      if (newWidth !== 50 && newWidth !== 300) {
      translateX.value = Math.round(ctx.startX + event.translationX / 2); // move left
      } 
      


      
      

   
      //height.value = withTiming(Math.round(newHeight / gridSize) * gridSize);
      //width.value = withTiming(Math.round(newWidth / gridSize) * gridSize);


    },
    onEnd: (event, ctx) => {
      const newHeight = height.value;
      const newWidth = width.value;
      
      height.value = withTiming(Math.round(newHeight / scaleGrid) * scaleGrid);
      width.value = withTiming(Math.round(newWidth / scaleGrid) * scaleGrid);

      translateX.value = withTiming((Math.round(translateX.value / gridSize) * gridSize) - (width.value % 100)/2);
      translateY.value = withTiming((Math.round(translateY.value / gridSize) * gridSize) - (height.value % 100)/2);

      console.log('translateX:',translateX.value)
      console.log('translateY:',translateY.value)
      console.log('height:',height.value)
      console.log('width:',width.value)

    }
 
  });

  const animatedGrowStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      top: translateY.value,
      left: translateX.value,
      
      
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
      translateX.value = withTiming((Math.round(translateX.value / gridSize) * gridSize) - (width.value % 100)/2);
      translateY.value = withTiming((Math.round(translateY.value / gridSize) * gridSize) - (height.value % 100)/2);
      

    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    left: translateX.value,
    top: translateY.value
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

//export default ResizableBox;

export default function ResizableBox() {
  return(
    <View>
      <ResizeBox />
      <ResizeBox />
    </View>

  )
}


const styles = StyleSheet.create({
  dotGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

    userBox: {
      //width: 105, 
      //height: 105, 
      backgroundColor: 'blue', 
      borderRadius: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      
     top: 100,
      

      
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