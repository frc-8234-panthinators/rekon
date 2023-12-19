import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {useState} from 'react';


/*
const END_POSITION = 200;

export default function AnotherTest() {
  const onLeft = useSharedValue(true);
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  let startPositionX = useSharedValue(0);
  let startPositionY = useSharedValue(0);
 
  
  const panGesture = Gesture.Pan()
    .onStart((e) => {
 
    })
    .onUpdate((e) => {

       positionX.value = startPositionX.value + e.translationX;
       positionY.value = startPositionY.value + e.translationY; 

    })
    .onEnd((e) => {

      startPositionX.value = positionX.value;
      startPositionY.value = positionY.value;

      //positionX.value = withTiming((Math.round(positionX.value / 50) * 50))
      //positionY.value = withTiming((Math.round(positionY.value / 50) * 50))

    });

  const animatedStyle = useAnimatedStyle(() => ({

    //left: positionX.value, top: positionY.value,
    transform: [{translateX: positionX.value}, {translateY: positionY.value}]
 
  }));

  const [isClicked, setIsClicked] = useState(false);

  const tapGesture = Gesture.Tap()
    .maxDuration(250)
    .onStart((e) => {

      setIsClicked(!isClicked);

    }).runOnJS(true)

    //const composed = Gesture.Race(tapGesture,panGesture);
    
    

  return (
    <GestureDetector gesture={panGesture}>

   


    <View>

      
      <Animated.View style={[styles.box, animatedStyle,]} />

    </View>


      

    </GestureDetector>

  );
} */

/*

export default function App() {

  const translatex = useSharedValue(0);
  const translatey = useSharedValue(0);
  

  const pan = Gesture.Pan()

    .onUpdate((e) => {
      translatex.value = e.translationX;
      translatey.value = e.translationY;
    })

    .onEnd((e) => {
      translatex.value = 0;
      translatey.value = 0;
    })

    const style = useAnimatedStyle(() => ({
      transform: [
        { translateX: translatex.value },
        { translateY: translatey.value }
      ],
    }))

    return (
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.box, style]} />
      </GestureDetector>
    );

}

const styles = StyleSheet.create({
  box: {
    height: 120,
    width: 300,
    backgroundColor: '#b58df1',
    borderRadius: 10,
    marginBottom: 30,
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


}); */






export default function App() {
  // Declare state variables for the initial position of the object


  const [initX, setInitX] = useState(0);
  const [initY, setInitY] = useState(0);


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
      // Add the initial position to the translation
      console.log("growth")
    }).runOnJS(true)

    

    const composed = Gesture.Race(tap , pan);


  // Define the animated style for the object
  const style = useAnimatedStyle(() => ({

    height: height.value,
    width: width.value,

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

const styles = StyleSheet.create({
  box: {
    //height: 120,
    //width: 300,
    backgroundColor: '#b58df1',
    borderRadius: 10,
    marginBottom: 30,
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




