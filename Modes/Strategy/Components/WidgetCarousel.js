import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

export default function WidgetCarousel(props) {
  const [floatingWidgetVisible, setFloatingWidgetVisible] = useState(false);
  const floatingWidgetPosition = useSharedValue({ x: 0, y: 0 });
  const [hasHeld, setHasHeld] = useState(false);

  const widgetPositions = props.widgetPositions;

  const longPressGesture = Gesture.LongPress({ minDurationMs: 1000 })
    .runOnJS(true)
    .shouldCancelWhenOutside(false)
    .maxDistance(100000)
    .onStart((event) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setFloatingWidgetVisible(true);
      floatingWidgetPosition.value = { x: event.x, y: event.y };
      setHasHeld(true);
    })
    .onTouchesMove((event) => {
      if (!hasHeld) return;
      floatingWidgetPosition.value = { x: event.allTouches[0].x, y: event.allTouches[0].y };
      
      for (const widget of widgetPositions) {
        if (widget.x < event.allTouches[0].y ) {
          break;
        }
      }
    })
    .onEnd(() => {
      setHasHeld(false);
    });

  const floatingWidgetStyle = useAnimatedStyle(() => {
    return {
      left: floatingWidgetPosition.value.x - 100,
      top: floatingWidgetPosition.value.y - 100,
    };
  });

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <GestureDetector gesture={longPressGesture}>
          <View style={[styles.widget,]}>
            <Text>Widget 1</Text>
          </View>
        </GestureDetector>
        <View style={styles.widget}>
          <Text>Widget 2</Text>
        </View>
        <View style={styles.widget}>
          <Text>Widget 3</Text>
        </View>
        <View style={styles.widget}>
          <Text>Widget 4</Text>
        </View>
        <View style={styles.widget}>
          <Text>Widget 5</Text>
        </View>
      </ScrollView>
      {floatingWidgetVisible && (
        <Animated.View style={[styles.floatingWidget, floatingWidgetStyle]}>
          <Text>Floating Widget</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widget: {
    width: 200,
    height: 200,
    backgroundColor: 'gray',
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingWidget: {
    position: 'absolute',
    width: 200,
    height: 200,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
