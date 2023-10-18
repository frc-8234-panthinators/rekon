import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Keyboard } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';
import SearchBar from '../Components/SearchComponents.js/SearchBar';
import YourStats from '../Components/SearchComponents.js/YourTeamStats';
import MatchViewWidget from '../Components/SearchComponents.js/MatchViewWidget';
import CompareAndQuickpick from '../Components/SearchComponents.js/Compare-QuickWids';

export default function StratSearch(props) {
  const [isKeyboardActive, setIsKeyboardActive] = React.useState(false);

  React.useEffect(() => {
    // Add event listeners to detect keyboard changes
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      // Remove event listeners when the component unmounts
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const keyboardDidShow = () => {
    setIsKeyboardActive(true);
  };

  const keyboardDidHide = () => {
    setIsKeyboardActive(false);
  };

  return (
    <View style={styles.container}>
      {isKeyboardActive && <View style={styles.overlay} />}
      <View style={styles.space}>
        <YourStats />
      </View>

      <View style={styles.space}>
        <CompareAndQuickpick />
      </View>

      <View style={styles.space}>
        <MatchViewWidget />
      </View>

      <View style={isKeyboardActive ? styles.CoolSearch : styles.space}>
        <SearchBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: Colors.background,
  },
  space: {
    marginBottom: 'auto',
  },
  CoolSearch: {
    position: 'absolute',
    marginTop: 100,
    marginBottom: 'auto',
    zIndex: 2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 1,
  },
});
