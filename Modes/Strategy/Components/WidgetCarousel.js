import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Dimensions} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import { create } from 'mathjs';
import Colors from '../../../colors';
import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';

export default function WidgetCarousel(props) {
  const [floatingWidgetVisible, setFloatingWidgetVisible] = useState(false);
  const floatingWidgetPosition = useSharedValue({ x: 0, y: 0 });
  const carouselPosition = useSharedValue(-220)
  const [hasHeld, setHasHeld] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState('line');
  const [carouselHidden, setCarouselHidden] = useState(true);
  const floatingWidget = props.floatingWidget;
  const endDrag = props.onEnd;
  const update = props.update;
  const startDrag = props.onStart;
  const leftCarousel = props.leftCarousel;
  const isCarouselHidden = props.isCarouselHidden;
  
  useEffect(() => {
    isCarouselHidden(carouselHidden);
    if (carouselHidden) {
      carouselPosition.value = withTiming(-220);
    } else {
      carouselPosition.value = withTiming(0);
    }
  }, [carouselHidden])
  
  const dragGesture = Gesture.LongPress({ minDurationMs: 1000 })
    .runOnJS(true)
    .shouldCancelWhenOutside(false)
    .maxDistance(10000000000)
    .onStart((event) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      startDrag();
      setFloatingWidgetVisible(true);
      floatingWidgetPosition.value = { x: event.absoluteX, y: event.absoluteY - (Dimensions.get('window').height - 300) + carouselPosition.value};
      setHasHeld(true);
      floatingWidget.value = { x: event.absoluteX, y: event.absoluteY - (Dimensions.get('window').height - 300) + carouselPosition.value, type: selectedWidget, held: true }
    })
    .onTouchesMove((event) => {
      if (!hasHeld) return;
      floatingWidgetPosition.value = { x: event.allTouches[0].absoluteX, y: event.allTouches[0].absoluteY - (Dimensions.get('window').height - 300) + carouselPosition.value};
      floatingWidget.value = { x: event.allTouches[0].absoluteX, y: event.allTouches[0].absoluteY - (Dimensions.get('window').height - 300) + carouselPosition.value, type: selectedWidget, held: true }

      if (!carouselHidden && event.allTouches[0].y < 0) {
        setCarouselHidden(true);
        leftCarousel();
      }
      update();
    })
    .onEnd(() => {
      setHasHeld(false);
      setFloatingWidgetVisible(false);
      floatingWidget.value = { x: 0, y: 0, type: null, held: false }
      endDrag(selectedWidget);
      setCarouselHidden(false);
    });

  const selectLine = Gesture.LongPress({ minDurationMs: 500 })
    .runOnJS(true)
    .onStart((event) => {
      console.log('line selected')
      setSelectedWidget('line');
    });

  const selectPie = Gesture.LongPress({ minDurationMs: 500 })
    .runOnJS(true)
    .onStart((event) => {
      console.log('pie selected')
      setSelectedWidget('pie');
    })
  
  const selectBar = Gesture.LongPress({ minDurationMs: 500 })
    .runOnJS(true)
    .onStart((event) => {
      console.log('bar selected')
      setSelectedWidget('bar');
    })

  const tapLine = Gesture.Tap()
    .runOnJS(true)
    .maxDuration(200)
    .onEnd((event) => {
      endDrag('line', 'tap');
    });

  const tapPie = Gesture.Tap()
    .runOnJS(true)
    .maxDuration(200)
    .onEnd((event) => {
      endDrag('pie', 'tap');
    });

  const tapBar = Gesture.Tap()
    .runOnJS(true)
    .maxDuration(200)
    .onEnd((event) => {
      endDrag('bar', 'tap');
    });

  const lineWidgetGesture = Gesture.Simultaneous(selectLine, dragGesture, tapLine);
  const pieWidgetGesture = Gesture.Simultaneous(selectPie, dragGesture, tapPie);
  const barWidgetGesture = Gesture.Simultaneous(selectBar, dragGesture, tapBar);

  const floatingWidgetStyle = useAnimatedStyle(() => {
    return {
      left: floatingWidgetPosition.value.x - 100,
      top: floatingWidgetPosition.value.y - 100,
    };
  });

  const carouselAnimationStyle = useAnimatedStyle(() => {
    return {
      bottom: carouselPosition.value
    }
  });

  return (
    <Animated.View style={[styles.container, carouselAnimationStyle]}>
      <Pressable hitSlop={30} style={styles.openButton} onPress={() => setCarouselHidden(!carouselHidden)}>
        <MaterialIcons name={carouselHidden ? 'expand-less' : 'expand-more'} size={30} color={Colors.tabIcons}></MaterialIcons>
      </Pressable>
      <ScrollView style={styles.scrollContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
        <GestureDetector gesture={lineWidgetGesture}>
          <View style={[styles.widget,]}>
            <Image source={require('./WidgetAssets/line.png')} style={{width: 200, height: 200}}></Image>
          </View>
        </GestureDetector>
        <GestureDetector gesture={pieWidgetGesture}>
          <View style={styles.widget}>
            <Image source={require('./WidgetAssets/pie.png')} style={{width: 200, height: 200}}></Image>
          </View>
        </GestureDetector>
        <GestureDetector gesture={barWidgetGesture}>
          <View style={styles.widget}>
            <Image source={require('./WidgetAssets/bar.png')} style={{width: 200, height: 200}}></Image>
          </View>
        </GestureDetector>
        <View style={styles.widget}>
          <Text>Widget 4</Text>
        </View>
        <View style={styles.widget}>
          <Text>Widget 5</Text>
        </View>
      </ScrollView>
      {floatingWidgetVisible && (
        <Animated.View style={[styles.floatingWidget, floatingWidgetStyle]}>
          {selectedWidget == 'line' && (
            <Image source={require('./WidgetAssets/line.png')} style={{width: 200, height: 200}}></Image>
          )}
          {selectedWidget == 'pie' && (
            <Image source={require('./WidgetAssets/pie.png')} style={{width: 200, height: 200}}></Image>
          )}
          {selectedWidget == 'bar' && (
            <Image source={require('./WidgetAssets/bar.png')} style={{width: 200, height: 200}}></Image>
          )}
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    minWidth: Dimensions.get('screen').width,
    backgroundColor: Colors.secondary
  },
  scrollContainer: {
    
  },
  widget: {
    width: 200,
    height: 200,
    backgroundColor: Colors.secondaryContainer,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  floatingWidget: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: Colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  openButton: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    backgroundColor: Colors.accent,
    justifyContent: 'center',
  }
});
