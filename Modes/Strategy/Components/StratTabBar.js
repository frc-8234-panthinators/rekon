
import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useColors } from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';





export default function MyTabBar({ state, descriptors, navigation }) {
    const { Colors } = useColors();
    NavigationBar.setVisibilityAsync(false).then(() => {}).catch(() => {});
    NavigationBar.setBehaviorAsync('overlay-swipe').then(() => {}).catch(() => {});
    NavigationBar.setBackgroundColorAsync(Colors.primary).then(() => {}).catch(() => {});
    return (
      <View style={{ flexDirection: 'row',backgroundColor: (Colors.secondary) ,height:65,borderRadius:10, margin: 12, justifyContent:"center",alignItems:"center" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
  
          let iconName;
          if (route.name === "StratHome") {
            iconName = isFocused ? "home" : "home";
          } else if (route.name === "StratSettings") {
            iconName = isFocused ? "settings" : "settings";
          } else if (route.name === "Search") {
            iconName = isFocused ? "search" : "search";
          }
  
  
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ 
                
                flex: 1, 
                alignItems:"center",
  
                backgroundColor: isFocused ? Colors.tabSelected : 'transparent',
                borderRadius: 100, 
                padding: 5, 
                margin: 20 }}
            >
  
             <MaterialIcons
                name={iconName}
                size={35} // Adjust the icon size as needed
                color={isFocused ? Colors.tabIcons : Colors.tabIcons}
                style={{ height: 35 }}
              />
  
  
              
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
  