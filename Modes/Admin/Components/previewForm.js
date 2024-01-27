import React from 'react';

import { View, Text, Pressable } from 'react-native';

export default function PreviewForm({ route }) {
    const sections = route.params?.sections;

    return(
        <View>
            <View style={{ backgroundColor: 'white', height: 'auto', height: 'auto', }}></View>
            <Pressable style={{backgroundColor: 'white', margin: 10, padding: 5, borderRadius: 10}} onPress={() => [console.log("Preview Form Array"), console.log(sections)]}><Text>Show Sections Array in Console</Text></Pressable>

        </View>

    );
}