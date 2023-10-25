import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

export default function AHH({ margin = 20, backgroundColor = 'red' }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const width = windowWidth * 0.9;
  const height = windowHeight * 0.8;

  // Calculate the number of dots based on window dimensions and margin
  const dotSize = 10;
  const dotsPerRow = Math.ceil(width / (dotSize + margin));
  const dotsPerColumn = Math.ceil(height / (dotSize + margin));

  // Create an array of dots
  const dots = [];
  for (let row = 0; row < dotsPerColumn; row++) {
    for (let col = 0; col < dotsPerRow; col++) {
      dots.push(<View key={`${row}-${col}`} style={[styles.dot, { marginRight: margin, marginBottom: margin }]} />);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.grid, { backgroundColor: backgroundColor }]}>
        {dots}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: 'black', // You can change this background color
  },
});
