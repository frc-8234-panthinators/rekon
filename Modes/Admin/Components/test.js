import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

function Dot({ size, spacing }) {
  return <View style={[styles.dot,{ width: size, height: size, margin: spacing}]} />;
}

function DotGrid({ numRows, numCols, dotSize, spacing}) {
  const rows = [];
  for (let row = 0; row < numRows; row++) {
    const dots = [];
    for (let col = 0; col < numCols; col++) {
      dots.push(<Dot key={col} size={dotSize} spacing={spacing}/>);
    }
    rows.push(
      <View key={row} style={styles.dotRow}>
        {dots}
      </View>
    );
  }
  return <View style={styles.dotGrid}>{rows}</View>;
}

export default function Test() {
  return (
    <View style={styles.ContContainer}>
            <View style={styles.container}>
                <DotGrid numRows={12} numCols={15} dotSize={10} spacing={20} />
            </View>
    </View>

  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {

    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    borderRadius: 10,
  },
  ContContainer: {
    //flex:  1,
    //justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems: 'center',
    
  },
  dotGrid: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  dotRow: {
    flexDirection: 'row',
  },
  dot: {
    backgroundColor: 'gray',
    //margin: 20,
    borderRadius: 10,
  },
});
