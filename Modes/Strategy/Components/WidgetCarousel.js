import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';

export default function WidgetCarousel() {
  const [floatingWidgetVisible, setFloatingWidgetVisible] = useState(false);
  const [floatingWidgetPosition, setFloatingWidgetPosition] = useState({ x: 0, y: 0 });

  const longPressGesture = Gesture.LongPress({ minDurationMs: 1000 })

  const floatingWidgetStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(floatingWidgetPosition.x) },
        { translateY: withTiming(floatingWidgetPosition.y) },
      ],
    };
  });

  const panGesture = Gesture.Pan()
    .onUpdate(({ translationX, translationY }) => {
      setFloatingWidgetPosition({ x: translationX, y: translationY });
    }
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <GestureDetector>
          <View style={styles.widget}>
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
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.floatingWidget, floatingWidgetStyle]}>
            <Text>Floating Widget</Text>
          </Animated.View>
        </GestureDetector>
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
