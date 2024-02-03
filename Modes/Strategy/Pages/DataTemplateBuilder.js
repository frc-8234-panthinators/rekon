import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Pressable, Modal, TextInput, Switch } from 'react-native';
import Colors from '../../../colors';
import { useState, useEffect, useRef } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { normalize } from '../../CommonComponents/fontScaler';
import WidgetCarousel from '../Components/WidgetCarousel';
import { debounce } from 'lodash';
import { useSharedValue } from 'react-native-reanimated';
import { re } from 'mathjs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoPopup from '../../CommonComponents/infoPopup';
import { MaterialIcons } from '@expo/vector-icons';
import ColorPickerPopup from '../Components/ColorPicker';
import { CartesianChart, Line, Scatter } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import inter from '../../GlobalAssets/Fonts/Inter-Medium.ttf';

const storeData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        navigation.navigate('ErrorPage', {error: e.name + '\n' + e.message});
    }
};

const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        navigation.navigate('ErrorPage', {error: e.name + '\n' + e.message});
    }
};

export default function DataVis({ route, navigation }) {
    const graphFont = useFont(inter, 12);
    const [widgets, setWidgets] = useState([{position: 0, type: null, midpoint: -10000}]);
    const floatingWidget = useSharedValue({x: 0, y: 0, type: null, held: false});
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [widgetID, setWidgetID] = useState(0);
    const [scrollCheckInterval, setScrollCheckInterval] = useState(null);
    const [carouselHidden, setCarouselHidden] = useState(true);
    const [graphsHidden, setGraphsHidden] = useState(false);
    const [infoPopupVisible, setInfoPopupVisible] = useState(false);
    const [infoPopupText, setInfoPopupText] = useState('');
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedWidget, setSelectedWidget] = useState(null);
    const [scrollPadding, setScrollPadding] = useState(50);
    const [currentVisibleWidgets, setVisibleWidgets] = useState([]);
    const scrollRef = React.useRef();
    const scrollPositionRef = useRef(0);
    const leftCarousel = useRef(false);
    const contentHeight = useRef(0);
    const performanceText = "Graphs are hidden to reduce lag while dragging widgets or modifying properties. They will render once you close the widget carousel or stop editing."

    const year = 2023;

    useEffect(() => {
        getData(`DataTemplate${year}`).then((data) => {
            if (data != null) {
                setWidgets(data);
            }
        });
    }, [navigation]);
    
    function startDrag() {
        setScrollCheckInterval(setInterval(() => {
            const screenHeight = Dimensions.get('window').height;
            const calculatedY = floatingWidget.value.y + (screenHeight - 90);
            let thresholdTop = screenHeight * 0.1;
            let thresholdBottom = screenHeight * 0.9;
            if (leftCarousel.current) {
                if (calculatedY < thresholdTop && scrollPositionRef.current > 0) {
                    scrollPositionRef.current -= 40;
                } else if (calculatedY > thresholdBottom && scrollPositionRef.current < contentHeight.current - screenHeight) {
                    scrollPositionRef.current += 40;
                }
                scrollRef.current.scrollTo({ x: 0, y: scrollPositionRef.current});
            }
        }, 300))
    }

    function updateDraggable() {
        const screenHeight = Dimensions.get('window').height;
        const calculatedY = floatingWidget.value.y + (screenHeight) + scrollPositionRef.current;
        console.log(calculatedY)
        calculateInsertionIndex(calculatedY);
    }

    function hasLeftCarousel() {
        leftCarousel.current = true;
    }

    function createNewWidget(widgetType, position) {
        const newWidgets = [...widgets];
        const randomValues = Array.from({ length: 10 }, (_, i) => ({
            x: i,
            y: 40 + 30 * Math.random(),
            z: 20 + 10 * Math.random(),
        }));
        newWidgets.splice(position, 0, {position: position,
                                        type: widgetType,
                                        midpoint: 0,
                                        height: 220,
                                        id: widgetID,
                                        data: {
                                            sources: ['y', 'z'],
                                            displayNames: ['Y', 'Z'],
                                            values: randomValues,
                                            name: `New ${widgetType.charAt(0).toUpperCase() + widgetType.slice(1)} Widget`,
                                            colors: [Colors.graphPrimary, Colors.graphPrimary],
                                            displayLegend: true
                                        }
                                    }
                                    );
        setWidgetID(widgetID + 1);
        setWidgets(newWidgets);
    }

    function calculateInsertionIndex(y) {
        const index = widgets.findIndex((widget, index) => {
            if (index === widgets.length - 1) {
                return true;
            }
            const currentMidpoint = widget.midpoint;
            const nextMidpoint = widgets[index + 1].midpoint;
            return y >= currentMidpoint && y < nextMidpoint;
        });
        setPlaceholderIndex(index + 1);
        return index;
    }

    function endDrag(widgetType, createType = 'drag') {
        if (createType == 'drag') {
            createNewWidget(widgetType, placeholderIndex);
            setPlaceholderIndex(0);
            clearInterval(scrollCheckInterval);
            setScrollCheckInterval(null);
            leftCarousel.current = false;
        } else if (createType == 'tap') {
            createNewWidget(widgetType, widgets.length);
            scrollRef.current.scrollToEnd({animated: true});
        }
    }
    
    function showEditModal(widgetID) {
        setSelectedWidget(widgetID);
        setEditModalVisible(true);
    }

    function updateWidgetConfig(widgetID, parameter, value) {
        const newWidgets = [...widgets];
        console.log(newWidgets[widgetID].data[parameter])
        newWidgets[widgetID].data[parameter] = value;
        setWidgets(newWidgets);
    }

    function calcVisibleWidgets() {
        const screenHeight = Dimensions.get('window').height;
        const scrollY = scrollPositionRef.current;
        const visibleWidgets = [];

        widgets.forEach((widget) => {
            if (widget.midpoint > scrollY && widget.midpoint < scrollY + screenHeight) {
                visibleWidgets.push(widget.position);
            }
        });
        if (JSON.stringify(visibleWidgets) != JSON.stringify(currentVisibleWidgets)) {
            setVisibleWidgets(visibleWidgets);
        }
    }


const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    lowTmp: 20 + 10 * Math.random(),
    highTmp: 40 + 30 * Math.random(),
  }));

    const debouncedCalcVisible = debounce(calcVisibleWidgets, 500);
    
    return (
        <View style={styles.rootVis}>
            <View style={styles.header}>
                <Pressable hitSlop={30} onPress={() => {navigation.goBack()}}><MaterialIcons name={"arrow-back"} size={32} color={Colors.text}></MaterialIcons></Pressable>
                <Text style={{color: Colors.text, fontSize: 24}}>Data Visualization</Text>
            </View>
            {selectedWidget != null && <Modal visible={editModalVisible} animationType="fade" transparent={true} onRequestClose={() => setEditModalVisible(false)}>
                <View style={{backgroundColor: Colors.tabSelected, width: '100%', alignItems: 'center', paddingBottom: 10}}>
                    <Pressable hitSlop={30} style={{position: 'absolute', left: 10, top: 10, zIndex: 20}} onPress={() => setEditModalVisible(false)}><MaterialIcons name="close" size={30} color={Colors.tabIcons}></MaterialIcons></Pressable>
                    <Text numberOfLines={1} style={{color: Colors.text, fontSize: 24, textAlign: 'center', paddingTop: 10, maxWidth: '80%'}}>Editing {widgets[selectedWidget].data.name}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                    <ScrollView vertical={true} style={{backgroundColor: Colors.secondary, padding: 20, paddingTop: 10, width: '100%', height: '100%'}} contentContainerStyle={{alignItems: 'center'}}>
                        <Text style={{color: Colors.text, fontSize: 30}}>Global Properties</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 30, gap: 20}}>
                            <Text style={{color: Colors.text, fontSize: 20}}>Name</Text>
                            <TextInput style={styles.textInput} value={widgets[selectedWidget].data.name} onChangeText={(text) => updateWidgetConfig(selectedWidget, 'name', text)}></TextInput>
                            <Pressable hitSlop={30} onPress={() => {setInfoPopupVisible(true); setInfoPopupText("The name of the widget. This is displayed at the top of the chart.")}}><MaterialIcons name="info" size={20} color={Colors.tabIcons}></MaterialIcons></Pressable>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 30, gap: 20}}>
                           <Text style={{color: Colors.text, fontSize: 20}}>Show Legend</Text>
                           <Switch
                                trackColor={{false: Colors.secondaryDim, true: Colors.accent}}
                                thumbColor={widgets[selectedWidget].data.displayLegend ? Colors.secondaryContainer : Colors.secondaryContainer}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={(value) => updateWidgetConfig(selectedWidget, 'displayLegend', value)}
                                value={widgets[selectedWidget].data.displayLegend}
                            />
                        </View>
                        <Text style={{color: Colors.text, fontSize: 30, marginTop: 30}}>Inputs</Text>
                        {widgets[selectedWidget].data.sources.map((source, index) => {
                            return(
                                <View style={[{flex: 1, flexDirection: 'column'}, index != 0 && {marginTop: 30}]}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', marginTop: 20, gap: 20}}>
                                        <Text style={{color: Colors.text, fontSize: 26}}>Source {index+1}: {source}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20, gap: 20}}>
                                        <Text style={{color: Colors.text, fontSize: 20}}>Display Name</Text>
                                        <TextInput style={styles.textInput} value={widgets[selectedWidget].data.displayNames[index]} onChangeText={(text) => updateWidgetConfig(selectedWidget, 'displayNames', [...widgets[selectedWidget].data.displayNames.slice(0, index), text, ...widgets[selectedWidget].data.displayNames.slice(index + 1)])}></TextInput>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 20, gap: 20}}>
                                        <Text style={{color: Colors.text, fontSize: 20}}>Color</Text>
                                        <ColorPickerPopup defaultColor={widgets[selectedWidget].data.colors[index]} handleChange={(color) => {updateWidgetConfig(selectedWidget, 'colors', [...widgets[selectedWidget].data.colors.slice(0, index), color, ...widgets[selectedWidget].data.colors.slice(index + 1)])}}></ColorPickerPopup>
                                    </View>
                                </View>
                            )
                        })}
                        
                    </ScrollView>
                </View>
            </Modal>}
            <InfoPopup visible={infoPopupVisible} onClose={() => setInfoPopupVisible(false)}>
                <Text style={{color: Colors.text, fontSize: 20}}>{infoPopupText}</Text>
            </InfoPopup>
            <ScrollView ref={scrollRef} style={styles.rootVis} contentContainerStyle={{alignItems: 'center', paddingBottom: scrollPadding, gap: 10}} onContentSizeChange={(width, height) => contentHeight.current = height} onScroll={(event) => {scrollPositionRef.current = event.nativeEvent.contentOffset.y; debouncedCalcVisible()}}>
                {widgets.length == 1 && <View style={{flexDirection: 'row', gap: 10}}>
                    <Text style={{color: Colors.text}}>Try dragging a graph to the page!</Text>
                    <Pressable hitSlop={30} onPress={() => {setInfoPopupVisible(true); setInfoPopupText('Open the widget carousel with the arrow at the bottom of the screen, and touch and hold to drag a widget onto the page. Alternatively, you can tap the widget to add it to the bottom of the page.')}}><MaterialIcons name="info" size={20} color={Colors.tabIcons}></MaterialIcons></Pressable>
                </View>}
                {widgets.map((widget, index) => {
                    return (
                        <View style={styles.widgetContainer} onLayout={event => {
                            const layout = event.nativeEvent.layout;
                            setTimeout(() => {
                                if (placeholderIndex != 0) return;
                                const newWidgets = [...widgets];
                                newWidgets[index].midpoint = Math.round(layout.y + layout.height);
                                newWidgets[index].height = layout.height;
                                setWidgets(newWidgets);
                            }, index);
                        }}>
                            {widget.type != null &&
                                <View style={styles.widget}>
                                    <Text numberOfLines={1} style={{color: Colors.text, fontSize: 24, maxWidth: '90%'}}>{widget.data.name}</Text>
                                    {graphsHidden && <View style={{flexDirection: "row", alignItems: 'center', gap: 5}}>
                                        <Text style={{color: Colors.text}}>Graph Hidden For Performance</Text>
                                        <Pressable hitSlop={30} onPress={() => {setInfoPopupVisible(true); setInfoPopupText(performanceText)}}><MaterialIcons name="info" size={20} color={Colors.tabIcons}></MaterialIcons></Pressable>
                                    </View>}
                                    {widget.type == 'line' &&
                                    <View style={{flex: 1, height: '100%', width: '100%'}}>
                                        <Pressable style={{height: 220, width: '100%'}} onPress={() => showEditModal(index)}>
                                            <CartesianChart
                                                data={widget.data.values}
                                                xKey="x"
                                                yKeys={widget.data.sources}
                                                axisOptions={{ font: graphFont, labelColor: Colors.graphPrimary, lineColor: Colors.secondaryDim }}
                                                domainPadding={{ left: 20, right: 20, top: 10, bottom: 10}}
                                            >
                                                {({ points }) => (
                                                    <>
                                                        {widget.data.sources.map((source, i) => (
                                                            <>
                                                                <Line points={points[source]} curveType='bumpX' color={widget.data.colors[i]} strokeWidth={3} key={`line-${i}`} />
                                                                <Scatter radius={7} points={points[source]} color={widget.data.colors[i]} key={`scatter-${i}`} />
                                                            </>
                                                        ))}
                                                    </>
                                                )}
                                            </CartesianChart>
                                        </Pressable>
                                        {widget.data.sources.length > 1 && widget.data.displayLegend && <View style={{flexDirection: 'row', paddingLeft: 40, paddingRight: 40, alignItems: 'center', justifyContent: 'space-between'}}>
                                            {widget.data.sources.map((source, i) => {
                                                return <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                                    <View style={{backgroundColor: widget.data.colors[i], width: 20, height: 20, borderRadius: 10}}></View>
                                                    <Text numberOfLines={1} style={{color: Colors.text, fontSize: 20}}>{widget.data.displayNames[i]}</Text>
                                                </View>
                                            })}
                                        </View>}
                                    </View>
                                    }
                                </View>
                            }
                            {index + 1 == placeholderIndex && placeholderIndex != 0 && <View style={styles.placeholder} />}
                        </View>
                    );
                })}
            </ScrollView>
            <WidgetCarousel update={updateDraggable} isCarouselHidden={setCarouselHidden} leftCarousel={hasLeftCarousel} floatingWidget={floatingWidget} onEnd={endDrag} onStart={startDrag}/>
        </View>
    )
}

const styles = StyleSheet.create({
    rootVis: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        display: 'flex',
        padding: '2.5%',
    },
    header: {
        marginTop: 50,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: '25%'
    },
    placeholder: {
        borderColor: Colors.border,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        width: '100%',
        height: 220,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    widget: {
        backgroundColor: Colors.secondary,
        width: '100%',
        minHeight: 220,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    widgetContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    textInput: {
        color: Colors.text,
        fontSize: 20,
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: Colors.secondaryDim,
        borderRadius: 10,
        padding: 10,
    }
});