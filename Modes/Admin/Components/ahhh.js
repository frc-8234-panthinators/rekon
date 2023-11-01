import React from 'react';
import { View, Dimensions, Alert } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDecay,
  withRepeat,
} from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

function Test() {

  
  const gridSize = 50;

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


  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      //Alert.alert('Box tapped!');
      console.log("isClicked")
    },
  });



  return (
    
    <View style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={1}>
            <Animated.View style={[{ width: 100, height: 100, backgroundColor: 'blue', borderRadius: 20 }, animatedStyle,]}/>
          </TapGestureHandler>
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
