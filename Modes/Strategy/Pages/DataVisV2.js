import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import { useState, useEffect } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import WidgetCarousel from '../Components/WidgetCarousel';
import { debounce } from 'lodash';
import { useSharedValue } from 'react-native-reanimated';
import { re } from 'mathjs';

export default function DataVis({ route, navigation }) {
    const [widgets, setWidgets] = useState([{position: 0, type: null, midpoint: -10000}]);
    const floatingWidget = useSharedValue({x: 0, y: 0, type: null, held: false});
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [widgetID, setWidgetID] = useState(0);
    
    function updateDraggable() {
        calculateInsertionIndex(floatingWidget.value.y);
    }

    useEffect(() => {
        console.log(JSON.stringify(widgets, null, 2))
    }, [widgets]);

    function createNewWidget(widgetType, position) {
        const newWidgets = [...widgets];
        newWidgets.splice(position, 0, {position: position, type: widgetType, midpoint: 0, id: widgetID});
        setWidgetID(widgetID + 1);
        setWidgets(newWidgets);
    }

    function calculateInsertionIndex(y) {
        const index = widgets.findIndex((widget, index) => {
            if (index === widgets.length - 1) {
                return true; // Place the floatingWidget at the end if it's below all midpoints
            }
            const currentMidpoint = widget.midpoint;
            const nextMidpoint = widgets[index + 1].midpoint;
            return y >= currentMidpoint && y < nextMidpoint;
        });
        setPlaceholderIndex(index + 1);
        return index;
    }

    function endDrag(widgetType) {
        createNewWidget(widgetType, placeholderIndex);
        setPlaceholderIndex(0);
    }
    
    return (
        <View style={styles.rootVis}>
            <ScrollView style={styles.rootVis} contentContainerStyle={{alignItems: 'center',}}>
                {widgets.length == 1 && <Text style={{color: Colors.text}}>Try dragging a graph to the page!</Text>}
                {widgets.map((widget, index) => {
                    return (
                        <View style={styles.widgetContainer} onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            setTimeout(() => {
                                if (placeholderIndex != 0) return;
                                const newWidgets = [...widgets];
                                newWidgets[index].midpoint = Math.round(layout.y + layout.height/2);
                                setWidgets(newWidgets);
                            }, index);
                        }}>
                            {index + 1 == placeholderIndex && placeholderIndex != 0 && <View style={styles.placeholder} />}
                            {widget.type != null && <View style={styles.widget} key={widget.id}>
                                <Text style={{color: Colors.text}}>Type: {widget.type}</Text>
                                <Text style={{color: Colors.text}}>Position: {widget.midpoint}</Text>
                                <Text style={{color: Colors.text}}>ID: {widget.id}</Text>
                            </View>}
                        </View>
                    );
                })}
            </ScrollView>
            <WidgetCarousel update={updateDraggable} floatingWidget={floatingWidget} onEnd={endDrag}/>
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
        backgroundColor: Colors.secondary,
        width: Dimensions.get("window").width*0.86,
        minHeight: 220,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    widgetContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    }
});