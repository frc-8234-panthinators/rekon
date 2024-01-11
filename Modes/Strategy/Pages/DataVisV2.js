import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import { useState, useEffect } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import WidgetCarousel from '../Components/WidgetCarousel';

export default function DataVis({ route, navigation }) {
    const [widgets, setWidgets] = useState([]);
    const [widgetMidpoints, setWidgetMidpoints] = useState([]);

    function createNewWidget(widgetType, position) {
        const newWidgets = [...widgets];
        newWidgets.splice(position, 0, {position: position, type: widgetType, midpoint: 0})
        newWidgets.splice(newWidgets.findIndex(widget => widget.type == 'placeholder'), 1);
        setWidgets(newWidgets);
    }

    function createWidgetPositionPlaceholder(position) {
        console.log('created placeholder')
        const newWidgets = [...widgets];
        newWidgets.splice(newWidgets.findIndex(widget => widget.type == 'placeholder'), 1);
        newWidgets[position] = {position: position, type: 'placeholder', midpoint: 0};
        setWidgets(newWidgets);
    }

    function getWidgetMidpoints() {
        const newWidgets = [...widgets];
        for (let i = 0; i < newWidgets.length; i++) {
            newWidgets[i].midpoint = widgetMidpoints[i];
        }
        setWidgets(newWidgets);
    }

    return (
        <View style={styles.rootVis}>
            <ScrollView style={styles.rootVis} contentContainerStyle={{alignItems: 'center',}}>
                {widgets.length == 0 && <Text style={{color: Colors.text}}>Try dragging a graph to the page!</Text>}
                {widgets.map((widget, index) => {
                    if (widget.type == 'placeholder') {
                        return (
                            <View style={styles.placeholder}></View>
                        );
                    } else {
                        return (
                            <View onLayout={event => {
                                const layout = event.nativeEvent.layout;
                                const newWidgets = [...widgets];
                                newWidgets[index] = layout.height/2;
                                setWidgetMidpoints(newWidgets);
                            }} style={styles.widget}>
                                <Text style={{color: Colors.text}}>Type: {widget.type}</Text>
                            </View>
                        );
                    }
                })}
            </ScrollView>
            <WidgetCarousel existingWidgets={widgets} createPlaceholder={createWidgetPositionPlaceholder} createWidget={createNewWidget} refreshMidpoints={getWidgetMidpoints}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootVis: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: 10,
    },
    placeholder: {
        borderColor: Colors.border,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        width: Dimensions.get("window").width*0.86,
        height: 220,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    widget: {
        backgroundColor: Colors.primary,
        width: Dimensions.get("window").width*0.86,
        height: 220,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    }
});