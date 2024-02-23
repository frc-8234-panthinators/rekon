import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, ScrollView, TextInput, LogBox } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../../../colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { isColor } from 'react-native-reanimated';
import Fuse from 'fuse.js';





function AllToolBar(props){
    //LogBox.ignoreAllLogs();
    const closest_match = require('closest-match');
    const iconNames = require('./icon_names.json');

    const searchEngine = new Fuse(iconNames, {
        keys: ['name', 'id'],
    });

    const [search, setSearch] = useState('');

    const [fontSize, setFontSize] = useState(props.fontSize);
    const isBold = props.getSelectedBox(props.selectedBox)?.bold === 'bold';
    const isItalic = props.getSelectedBox(props.selectedBox)?.italic === 'italic';

    const [matches, setMatches] = useState([]);

    const colorMap = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#FF0000',
        yellow: '#FFFF00',
        blue: '#0000FF',
        orange: '#FFA500',
        green: '#00FF00',
        purple: '#800080',
        altPurple: '#312541',
    };

    const addBox = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            props.add();
    }).runOnJS(true);

    const duplicate = Gesture.Tap()
        
        .onStart(() => {
        console.log("Duplicate")
        props.duplicate();
    }).runOnJS(true);

    const redo = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("redo");
            props.redoLastAction();
    }).runOnJS(true);

    const undo = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("undo");
            props.undoLastAction();
    }).runOnJS(true);

    const addText = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            if (props.selectedBox !== null) {
                console.log("add Text");
                props.setIsAddTextPressed(true);
            }
    }).runOnJS(true);

    /*const back = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("back");
            props.setIsAddTextPressed(false);
            props.setIsColorPressed(false);
    }).runOnJS(true);*/

    const bold = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("bold");
            props.toggleBold(props.selectedBox);
    }).runOnJS(true);

    const italic = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
        console.log("italic");
        props.toggleItalic(props.selectedBox);
    }).runOnJS(true);

    const changeTextColor = (colorName) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                console.log(`change text color to ${colorName}`);
                props.changeFontColor(props.selectedBox, colorMap[colorName]);
            }).runOnJS(true);
    };

    const changeIcon = (icon) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                console.log(`changing icon to ${icon}`);
                props.changeIcon(props.selectedBox, icon)
                props.setDoesIconAlreadyExist(true);
        }).runOnJS(true);
    }

    const blackTextColor = changeTextColor('black');
    const whiteTextColor = changeTextColor('white');
    const redTextColor = changeTextColor('red');
    const yellowTextColor = changeTextColor('yellow');
    const blueTextColor = changeTextColor('blue');
    const orangeTextColor = changeTextColor('orange');
    const greenTextColor = changeTextColor('green');
    const purpleTextColor = changeTextColor('purple');
    const altPurpleTextColor = changeTextColor('altPurple');

    const changeBoxColor = (colorName) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                console.log(`change text color to ${colorName}`);
                props.colorChange(props.selectedBox, colorMap[colorName]);
            }).runOnJS(true);
    };

    const blackBoxColor = changeBoxColor('black');
    const whiteBoxColor = changeBoxColor('white');
    const redBoxColor = changeBoxColor('red');
    const yellowBoxColor = changeBoxColor('yellow');
    const blueBoxColor = changeBoxColor('blue');
    const orangeBoxColor = changeBoxColor('orange');
    const greenBoxColor = changeBoxColor('green');
    const purpleBoxColor = changeBoxColor('purple');
    const altPurpleBoxColor = changeBoxColor('altPurple');

    const addIcon = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            if (props.selectedBox !== null) {
                console.log("add Icon");
                props.setIsIconPressed(true);
                if (props.icon !== '') {
                    props.setDoesIconAlreadyExist(true);
                }
            }
    }).runOnJS(true);

    const changeIconColor = (colorName) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                console.log(`change icon color to ${colorName}`);
                props.changeIconColor(props.selectedBox, colorMap[colorName]);
        }).runOnJS(true);
    };

    const blackIconColor = changeIconColor('black');
    const whiteIconColor = changeIconColor('white');
    const redIconColor = changeIconColor('red');
    const yellowIconColor = changeIconColor('yellow');
    const blueIconColor = changeIconColor('blue');
    const orangeIconColor = changeIconColor('orange');
    const greenIconColor = changeIconColor('green');
    const purpleIconColor = changeIconColor('purple');
    const altPurpleIconColor = changeIconColor('altPurple');
    
    const changeToSearch = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("Changing to search");
            props.setChangeToSearch(true);
            props.setDoesIconAlreadyExist(false);
    }).runOnJS(true);

    const remove = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("Delete");
            props.remove(props.selectedBox);
    }).runOnJS(true);

    /*const map = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("Map");
    }).runOnJS(true);*/

    const color = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            if (props.selectedBox !== null) {
                console.log("Color")
                props.setIsColorPressed(true);
            }
    }).runOnJS(true);

    const resetStorage = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            props.resetStorage();
    }).runOnJS(true);

    const back = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            props.setIsAddTextPressed(false);
            props.setIsColorPressed(false);
            props.setIsIconPressed(false);
    }).runOnJS(true);

    const colorBoxStyle = {
        height: 34,
        width: 34,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 17,
    };

    const coloringCircleStyle = {
        height: 55,
        width: 55,
        borderColor: '#aa8dce',
        borderWidth: 2,
        borderRadius: 28,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    };

    const buttonStyle = {
        height: 55,
        width: 55,
        borderRadius: 10,
        backgroundColor: '#aa8dce',
        marginLeft: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    };



    useEffect(() => {
        console.log(`props.tabBarType: ${props.tabBarType}`);
    }, [props.tabBarType])

    return(
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
            <GestureDetector gesture={props.tabBarType === 0 ? props.changeTabBarType(1) : props.changeTabBarType(0)}>
                <View style={{width: '100%', height: 30, marginBottom: 0, backgroundColor: '#8d53d4', zIndex: 5, alignItems:'center'}}>
                    <MaterialIcons name={props.tabBarType === 0 ? 'expand-less' : 'expand-more'} color='#e3e2e6' size={30}/>
                </View>
            </GestureDetector>

            <Animated.View style={props.tabBarStyle}>
                {(props.tabBarType === 2 || props.tabBarType === 1 || props.tabBarType === 0) && 
                    <ScrollView style={{flex: 1}}>
                        <GestureDetector gesture={props.changeTabBarType(3)}>
                            <View style={{width: 200, height: 200, margin: 10, borderRadius: 10, backgroundColor: '#aa8dce', alignItems: 'center'}}>
                                <Text style={{fontSize: 34, color: '#312541', position: 'absolute', bottom: 10}}>Button</Text>
                            </View>
                        </GestureDetector>
                    </ScrollView>
                }
                {props.tabBarType === 3 && 
                    <View flex={1} flexDirection='row'>
                        {(props.isAddTextPressed || props.isColorPressed || props.isIconPressed) && (
                            <GestureDetector gesture={back}>
                                <View style={buttonStyle}>
                                    <MaterialIcons name='chevron-left' size={55} color='#312541'/>
                                </View>
                            </GestureDetector>
                        )}

                        <View style={{position: 'absolute', left: 75, top: 10, width: 5, height: 55, backgroundColor: '#aa8dce', borderRadius: 10}} />
                        
                        {!props.isAddTextPressed && !props.isColorPressed && !props.isIconPressed && (
                            <>
                                <GestureDetector gesture={props.changeTabBarType(2)}>
                                    <View style={buttonStyle}>
                                        <MaterialIcons name='check' size={55} color='#312541'/>
                                    </View>
                                </GestureDetector>

                                <ScrollView style={{position: 'absolute', left: 95, width: Dimensions.get('window').width - 95}} horizontal={true}>
                                    <GestureDetector gesture={addBox}>
                                        <View style={{...buttonStyle, marginLeft: 0}}>
                                            <MaterialIcons name='add' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={resetStorage}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='loop' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={remove}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='delete' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={duplicate}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='content-copy' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={color}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='color-lens' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={addText}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='text-fields' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={addIcon}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name='add-reaction' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>

                                    <GestureDetector gesture={props.changeTabBarType(4)}>
                                        <View style={{...buttonStyle, marginRight: 10}}>
                                            <MaterialIcons name='map' size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>
                                </ScrollView>
                            </>)}
                        {props.isAddTextPressed && (
                            <ScrollView style={{marginLeft: 30, width: Dimensions.get('window').width - 95}} horizontal={true}>
                                <TextInput
                                    value={props.text ? props.text.toString() : ''}
                                    onChangeText={(newText) => {
                                        console.log('New text:', newText);
                                        props.setFontSize(newText);
                                        props.textAdder(props.selectedBox, newText);
                                    }}
                                    placeholder='Enter Text'
                                    style={{
                                        marginTop: 10,
                                        height: 55,
                                        width: 165,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                    }}
                                />

                                <TextInput
                                    keyboardType='numeric'
                                    value={props.fontSize ? props.fontSize.toString() : ''}
                                    onChangeText={(newFontSize) => {
                                        console.log('New font size:', newFontSize);
                                        props.setFontSize(newFontSize);
                                        props.changeFontSize(props.selectedBox, newFontSize);
                                    }}
                                    placeholder='px'
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        height: 55,
                                        width: 55,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                    }}
                                />

                                <GestureDetector gesture={bold}>
                                    <View style={buttonStyle}>
                                        <MaterialIcons name='format-bold' size={55} color={isBold ? '#8d53d4' : '#312541'}/>
                                    </View>
                                </GestureDetector>

                                <GestureDetector gesture={italic}>
                                    <View style={buttonStyle}>
                                        <MaterialIcons name='format-italic' size={55} color={isItalic ? '#8d53d4' : '#312541'}/>
                                    </View>
                                </GestureDetector>

                                <GestureDetector gesture={blackTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#000000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={whiteTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#ffffff'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={redTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FF0000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={orangeTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFA500'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={yellowTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFFF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={greenTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#00FF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={blueTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#0000FF'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={purpleTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#800080'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={altPurpleTextColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#312541'}}/>
                                </GestureDetector>
                            </ScrollView>)}
                        {props.isColorPressed && (
                            <ScrollView style={{marginLeft: 30, width: Dimensions.get('window').width - 95}} horizontal={true}>
                                <GestureDetector gesture={blackBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, marginLeft: 0, backgroundColor: '#000000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={whiteBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#ffffff'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={redBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FF0000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={orangeBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFA500'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={yellowBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFFF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={greenBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#00FF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={blueBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#0000FF'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={purpleBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#800080'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={altPurpleBoxColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#312541'}}/>
                                </GestureDetector>
                            </ScrollView>
                        )}
                        {props.isIconPressed && !props.doesIconAlreadyExist && (
                            <ScrollView style={{marginLeft: 30, width: Dimensions.get('window').width - 95}} horizontal={true}>
                                <TextInput
                                    value={search}
                                    onChangeText={(search) => {
                                        let results = searchEngine.search(search).map((match) => match.item.id);
                                        results = results.slice(0, 5);
                                        console.log(results);
                                        setMatches(results);
                                        setSearch(search);
                                    }}
                                    placeholder='Search Icons'
                                    style={{
                                        marginTop: 10,
                                        height: 55,
                                        width: 165,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                    }}
                                />

                                {search.length > 0 && matches.map((match, index) => (
                                    <GestureDetector gesture={changeIcon(match)} key={index}>
                                        <View style={buttonStyle}>
                                            <MaterialIcons name={match} size={55} color='#312541'/>
                                        </View>
                                    </GestureDetector>
                                ))}
                            </ScrollView>)}
                        {props.isIconPressed && props.doesIconAlreadyExist && (
                            <ScrollView style={{marginLeft: 30, width: Dimensions.get('window').width - 95}} horizontal={true}>
                                <GestureDetector gesture={changeToSearch}>
                                    <View style={{...buttonStyle, marginLeft: 0}}>
                                        <MaterialIcons name='search' size={55} color='#312541'/>
                                        </View>
                                </GestureDetector>

                                <TextInput
                                    keyboardType='numeric'
                                    value={props.iconSize ? props.iconSize.toString() : ''}
                                    onChangeText={(newIconSize) => {
                                        console.log('New icon size:', newIconSize);
                                        props.changeIconSize(props.selectedBox, newIconSize);
                                    }}
                                    placeholder='px'
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 10,
                                        height: 55,
                                        width: 55,
                                        borderColor: 'gray',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        backgroundColor: '#ffffff',
                                        textAlign: 'center',
                                    }}
                                />

                                <GestureDetector gesture={blackIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#000000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={whiteIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#ffffff'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={redIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FF0000'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={orangeIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFA500'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={yellowIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#FFFF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={greenIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#00FF00'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={blueIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#0000FF'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={purpleIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#800080'}}/>
                                </GestureDetector>

                                <GestureDetector gesture={altPurpleIconColor}>
                                    <TouchableOpacity style={{...coloringCircleStyle, backgroundColor: '#312541'}}/>
                                </GestureDetector>
                            </ScrollView>)}
                    </View>
                }
                {props.tabBarType === 4 && (
                    <>
                                {props.homeMapScreen && 
                                    <>
                                        <GestureDetector gesture={props.changeTabBarType(3)}>
                                            <View style={{width: 50, height: 50, position: 'absolute', top: 10, left: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                <MaterialIcons name='check' size={50} color='#312541'/>
                                            </View>
                                        </GestureDetector>
                        
                                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Mapping</Text>
                        
                                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', left: 10, top: 70}}>Page</Text>
                        
                                        {props.selectedBox !== null && 
                                            <GestureDetector gesture={props.openPageMapping}>
                                                <View style={{width: '95%', height: 50, position: 'absolute', left: '2.5%', top: 120, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                    {props.getSelectedBox(props.selectedBox)?.page === '' ? 
                                                        <>
                                                            <MaterialIcons name='not-interested' size={50} style={{paddingLeft: 10, color: '#312541'}}/>
                        
                                                            <Text style={{position: 'absolute', left: 70, top: 6.25, color: '#312541', fontSize: 25}}>Stay on current page</Text>
                                                        </>
                                                    : 
                                                        <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>{props.pages.find(page => page.id === props.getSelectedBox(props.selectedBox)?.page) ? props.pages.find(page => page.id === props.getSelectedBox(props.selectedBox)?.page).name : 'Error'}</Text>
                                                    }
                                                </View>
                                            </GestureDetector>
                                        }
                        
                                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', left: 10, top: 170}}>Function</Text>
                
                                        <GestureDetector gesture={props.addFunction}>
                                            <View style={{flexDirection: 'row', height: 34, backgroundColor: '#aa8dce', marginLeft: 170, marginTop: 178.5, marginRight: 10, borderRadius: 10}}>
                                                <MaterialIcons name='add' size={34} marginLeft={20}/>
                        
                                                <Text style={{fontSize: 17, color: '#312541', marginTop: 4.25, marginLeft: 10, fontWeight: 'bold'}}>Add Function</Text>
                                            </View>
                                        </GestureDetector>
                        
                                        {props.selectedBox === null && 
                                            <>
                                                <View style={{width: '95%', height: 50, position: 'absolute', left: '2.5%', top: 120, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                    <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>Error: No button is selected</Text>
                                                </View>
                        
                                                <View style={{width: '95%', height: 50, position: 'absolute', left: '2.5%', top: 220, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                    <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>Error: No button is selected</Text>
                                                </View>
                                            </>
                                        }
                        
                                        <ScrollView style={{width: '100%', height: 125, position: 'absolute', top: 220}}>
                                            {props.functions.map((func, index) => (
                                                <View key={func.id} style={{flex: 1}}>
                                                    <GestureDetector gesture={props.options(func.id)}>
                                                        <View style={{width: 25, height: 50, position: 'absolute', top: 0, right: 20, zIndex: 1}}>
                                                            <View style={{position: 'absolute', right: -12.5, width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                                                <MaterialIcons name='more-vert' size={50} color={'#312541'}/>
                                                            </View>
                                                        </View>
                                                    </GestureDetector>
                        
                                                    {props.functionOptions && props.optionId === func.id && 
                                                        <GestureDetector gesture={props.deleteFunction(func.id)}>
                                                            <View style={{width: 100, height: 35, position: 'absolute', right: 25, top: 25, zIndex: 3, backgroundColor: '#aa8dce', borderRadius: 10, borderWidth: 5, borderColor: '#312541', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                                <Text style={{fontSize: 17.5, color: '#312541'}}>Delete</Text>
                        
                                                                <MaterialIcons name='delete' size={17.5} color='#312541'/>
                                                            </View>
                                                        </GestureDetector>
                                                    }
                        
                                                    <GestureDetector gesture={props.openFunctionMapping(func.id)}>
                                                        <View style={{width: '95%', height: 50, marginLeft: '2.5%', marginBottom: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                            {func.operation !== '' ? 
                                                                <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>{`${func.operation === 'add' ? '+' : func.operation === 'subtract' ? '-' : ''}${func.varName === '' ? 'Function has no variable' : func.amount} ${func.varName}`}</Text>
                                                            :
                                                                <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>{func.varName !== '' ? 'No operation selected' : 'Function has no variable'}</Text>
                                                            }
                                                        </View>
                                                    </GestureDetector>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </>
                                }
                        
                                {props.pageMapping && 
                                    <>
                                        <GestureDetector gesture={props.openHomeMapScreen}>
                                            <View style={{width: 50, height: 50, position: 'absolute', left: 10, top: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                <MaterialIcons name='arrow-back' size={50} style={{color: '#312541'}}/>
                                            </View>
                                        </GestureDetector>
                        
                                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Pages</Text>
                        
                                        <ScrollView style={{flex: 1, marginTop: 70}}>
                                            <GestureDetector gesture={props.selectPage(props.selectedBox, -1)}>
                                                <View style={{
                                                    flex: 1,
                                                    height: 50,
                                                    backgroundColor: '#aa8dce',
                                                    marginBottom: 10,
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    borderRadius: 10,
                                                    justifyContent: 'center',
                                                }}>
                                                    <MaterialIcons name='not-interested' size={50} style={{paddingLeft: 10, color: '#312541'}}/>
                        
                                                    <Text style={{position: 'absolute', left: 70, top: 6.25, color: '#312541', fontSize: 25}}>Stay on current page</Text>
                                                </View>
                                            </GestureDetector>
                        
                                            {props.pages.map((page, index) => (
                                                <GestureDetector key={page.id} gesture={props.selectPage(props.selectedBox, page.id)}>
                                                    <View style={{
                                                        flex: 1,
                                                        height: 50,
                                                        backgroundColor: '#aa8dce',
                                                        marginBottom: 10,
                                                        marginLeft: 10,
                                                        marginRight: 10,
                                                        borderRadius: 10,
                                                        justifyContent: 'center',
                                                    }}>
                                                        <Text style={{color: '#312541', fontSize: 25, marginLeft: 20}}>
                                                            {page.name}
                                                        </Text>
                                                    </View>
                                                </GestureDetector>
                                            ))}
                                        </ScrollView>
                                    </>
                                }
                        
                                {props.functionMapping && 
                                    <>
                                        <GestureDetector gesture={props.openHomeMapScreen}>
                                            <View style={{width: 50, height: 50, position: 'absolute', left: 10, top: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                <MaterialIcons name='arrow-back' size={50} style={{color: '#312541'}}/>
                                            </View>
                                        </GestureDetector>
                        
                                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Function</Text>
                        
                                        <ScrollView style={{marginTop: 70, marginBottom: 20}}>
                                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Variable:     {props.functions.find(func => func.id === props.selectedFunctionId).varName}</Text>
                
                                            {props.variables.length !== 0 && <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>Existing Variables</Text>}
                        
                                            {props.variables
                                                .filter(variable => {
                                                    const selectedFunction = props.functions.find(func => func.id === props.selectedFunctionId);
                                                    return selectedFunction ? variable.name !== selectedFunction.newVarName : true;
                                                })
                                                .map((variable, index) => (
                                                    <GestureDetector key={variable.id} gesture={props.selectVariable(variable)}>
                                                        <View style={{flex: 1, height: 50, marginLeft: 10, marginRight: 10, marginBottom: 20, justifyContent: 'center', backgroundColor: '#aa8dce', borderRadius: 10}}>
                                                            <Text style={{fontSize: 34, marginLeft: 10}}>{variable.name}</Text>
                                                        </View>
                                                    </GestureDetector>                                
                                            ))}
                        
                                            <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>New Variable</Text>
                        
                                            <View style={{width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10, justifyContent: 'center', borderRadius: 10, borderWidth: 2.5, borderColor: '#aa8dce'}}>
                                                <TextInput style={{color: '#aa8dce', fontSize: 34, marginLeft: 10}} defaultValue={[...props.functions].findIndex(func => func.id === props.selectedFunctionId) !== -1 ? [...props.functions][[...props.functions].findIndex(func => func.id === props.selectedFunctionId)].newVarName : ''} onChangeText={text => {
                                                    const variableExists = props.variables.some(variable => variable.name === text);
                                                    if (!variableExists) {
                                                        let updatedFunctions =[...props.functions];
                                                        const functionIndex = updatedFunctions.findIndex(func => func.id === props.selectedFunctionId);
                                                        if (functionIndex !== -1) {
                                                            props.updateVariables(updatedFunctions[functionIndex].newVarName, text);
                                                            updatedFunctions[functionIndex].varName = text;
                                                            updatedFunctions[functionIndex].newVarName = text;
                                                            props.setFunctions(updatedFunctions);
                                                        }
                                                    } else {
                                                        alert('Variable name already exists');
                                                    }
                                                }}/>
                                            </View>
                        
                                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Operation:   {props.functions.find(func => func.id === props.selectedFunctionId).operation === 'add' ? '+' : props.functions.find(func => func.id === props.selectedFunctionId).operation === 'subtract' ? '-' : ''}</Text>
                        
                                            <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10}}>
                                                <GestureDetector gesture={props.setFunctionOperation('add')}>
                                                    <View style={{width: Dimensions.get('window').width / 2 - 15, height: 50, backgroundColor: '#aa8dce', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                                        <Text style={{fontSize: 34, color: '#312541'}}>Add</Text>
                    
                                                        <MaterialIcons name='add' size={34} color={'#312541'}/>
                                                    </View>
                                                </GestureDetector>
                        
                                                <GestureDetector gesture={props.setFunctionOperation('subtract')}>
                                                    <View style={{width: Dimensions.get('window').width / 2 - 15, marginLeft: 10, height: 50, backgroundColor: '#aa8dce', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                                        <Text style={{fontSize: 34, color: '#312541'}}>Subtract</Text>
                        
                                                        <MaterialIcons name='remove' size={34} color={'#312541'}/>
                                                    </View>
                                                </GestureDetector>
                                            </View>
                        
                                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Amount:   {props.functions.find(func => func.id === props.selectedFunctionId).amount}</Text>
                        
                                            <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>Input Value</Text>
                        
                                            <View style={{width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10, marginBottom: 5, justifyContent: 'center', borderRadius: 10, borderWidth: 2.5, borderColor: '#aa8dce'}}>
                                                <TextInput style={{color: '#aa8dce', fontSize: 34, marginLeft: 10}} inputMode='numeric' defaultValue={JSON.stringify(props.functions.find(func => func.id === props.selectedFunctionId).amount)} onChangeText={value => {
                                                    if (value === '') {
                                                        numberValue = 0;
                                                    } else {
                                                        numberValue = parseFloat(value);
                                                    }
                                                    console.log(numberValue);
                                                    if (isNaN(numberValue) || value.match(/[^0-9.]/)) {
                                                        alert('Amount not a number');
                                                    } else {
                                                        let updatedFunctions = [...props.functions];
                                                        const functionIndex = updatedFunctions.findIndex(func => func.id === props.selectedFunctionId);
                                                        if (functionIndex !== -1) {
                                                            updatedFunctions[functionIndex].amount = numberValue;
                                                            props.setFunctions(updatedFunctions);
                                                        }
                                                    }
                                                }}/>
                                            </View>
                                        </ScrollView>
                                    </>
                                }
                    </>
                )}
            </Animated.View>
        </View>
    )

    /*return(
        <ScrollView key={props.isAddTextPressed || props.isColorPressed || props.isIconPressed ? "otherBar" : "default"} style={styles.bar} horizontal={true} contentContainerStyle={styles.innerBar}> 
            {!props.isAddTextPressed && !props.isColorPressed && !props.isIconPressed && (
                <>
                    <GestureDetector gesture={addBox}> 
                        <MaterialIcons name="add" size={34} color="#e3e2e6" fontWeight="bold"/> 
                    </GestureDetector>

                    <GestureDetector gesture={resetStorage}>
                        <MaterialIcons name="loop" size={34} color="#e3e2e6"/>
                    </GestureDetector>

                    <GestureDetector gesture={remove}> 
                        <MaterialIcons name="delete" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={duplicate}> 
                        <MaterialIcons name="content-copy" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={color}> 
                        <MaterialIcons name="format-color-fill" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={addText}> 
                        <MaterialIcons name="text-fields" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={addIcon}> 
                        <MaterialIcons name="add-reaction" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={map}> 
                        <MaterialIcons name="map" size={34} color="#e3e2e6" />
                    </GestureDetector>
                </>
            )}
            {props.isAddTextPressed && (
                <>

                    <TextInput
                        value={props.text ? props.text.toString() : ''}
                        onChangeText={(newText) => {
                            console.log('New text:', newText);
                            props.setFontSize(newText);
                            props.textAdder(props.selectedBox, newText);
                        }}
                        placeholder='Enter Text'
                        style={{
                            height: 34,
                            width: 102,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                        }}
                    />

                    <TextInput
                        keyboardType='numeric'
                        value={props.fontSize ? props.fontSize.toString() : ''}
                        onChangeText={(newFontSize) => {
                            console.log('New font size:', newFontSize);
                            props.setFontSize(newFontSize);
                            props.changeFontSize(props.selectedBox, newFontSize);
                        }}
                        placeholder='px'
                        style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                        }}
                    />

                    <GestureDetector gesture={bold}> 
                        <MaterialIcons name="format-bold" size={42} color={isBold ? '#48BBD8' : '#e3e2e6'} />
                    </GestureDetector>

                    <GestureDetector gesture={italic}> 
                        <MaterialIcons name="format-italic" size={42} color={isItalic ? '#48BBD8' : '#e3e2e6'} />
                    </GestureDetector>

                    <GestureDetector gesture={blackTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#000000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={whiteTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFFFF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={redTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FF0000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={orangeTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFA500"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={yellowTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={greenTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#00FF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={blueTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#0000FF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={purpleTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#800080"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={altPurpleTextColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#312541"
                        }}/>
                    </GestureDetector>

                </>
            )}
            {props.isColorPressed && (
                <>                    
                    <GestureDetector gesture={blackBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#000000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={whiteBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFFFF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={redBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FF0000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={orangeBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFA500"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={yellowBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={greenBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#00FF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={blueBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#0000FF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={purpleBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#800080"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={altPurpleBoxColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#312541"
                        }}/>
                    </GestureDetector>
                </>
            )}
            {props.isIconPressed && !props.doesIconAlreadyExist && (
                <>
                    <TextInput
                        value={search}
                        onChangeText={(search) => {
                            let results = searchEngine.search(search).map((match) => match.item.id);
                            results = results.slice(0, 5);
                            console.log(results);
                            setMatches(results);
                            setSearch(search);
                        }}
                        placeholder='Search Icons'
                        style={{
                            height: 34,
                            width: 102,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                        }}
                    />

                    {search.length > 0 && matches.map((match, index) => (
                        <GestureDetector gesture={changeIcon(match)} key={index}>
                            <View>
                                <MaterialIcons name={match} size={34} color="#e3e2e6" />
                            </View>
                        </GestureDetector>
                    ))}
                </>
            )}
            {props.isIconPressed && props.doesIconAlreadyExist && (
                <>
                    <GestureDetector gesture={changeToSearch}>
                        <MaterialIcons name={"search"} size={34} color="#e3e2e6"/>
                    </GestureDetector>

                    <TextInput
                        keyboardType='numeric'
                        value={props.iconSize ? props.iconSize.toString() : ''}
                        onChangeText={(newIconSize) => {
                            console.log('New icon size:', newIconSize);
                            props.changeIconSize(props.selectedBox, newIconSize);
                        }}
                        placeholder='px'
                        style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: '#fff',
                            textAlign: 'center',
                        }}
                    />

                    <GestureDetector gesture={blackIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#000000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={whiteIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFFFF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={redIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FF0000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={orangeIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFA500"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={yellowIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#FFFF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={greenIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#00FF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={blueIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#0000FF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={purpleIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#800080"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={altPurpleIconColor}>
                        <TouchableOpacity style={{...colorBoxStyle, backgroundColor: "#312541"
                        }}/>
                    </GestureDetector>
                </>
            )}
            

        </ScrollView>
    )*/
}



export default function ToolBar(props){

    
    const [ tabActive, setTabActive ] = useState(false);
    const [isAddTextPressed, setIsAddTextPressed] = useState(false);
    const [isColorPressed, setIsColorPressed] = useState(false);
    const [isIconPressed, setIsIconPressed] = useState(false);
    const [changeToSearch, setChangeToSearch] = useState(false);
   

    const handlePress = () => {
        if (isAddTextPressed || isColorPressed || isIconPressed) {
            setIsAddTextPressed(false);
            setIsColorPressed(false);
            setIsIconPressed(false);
        } else {
            setTabActive(!tabActive);
        }
      };

    return( 

            <View style={{height: '100%', width: '100%', zIndex: 3}}>
                {/*<Pressable style={{position: 'absolute', bottom: 20, left: 20, }} onPress={handlePress}>  
                    <View style={[styles.showToolBar, tabActive && {borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightColor: "#e3e2e6", borderRightWidth: 5,}]}> 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                            
                        {(isAddTextPressed || isColorPressed || isIconPressed) ? <MaterialIcons name="check" size={54} color="#e3e2e6" /> : (tabActive ? <MaterialIcons name="chevron-left" size={54} color="#e3e2e6" /> : <MaterialIcons name="chevron-right" size={54} color="#e3e2e6" />)}
                        </View>
                    </View>

                    
                </Pressable>*/}
                {<AllToolBar
                
                    add={props.add}
                    remove={props.remove}
                    selectedBox={props.selectedBox}
                    getSelectedBox={props.getSelectedBox}
                    duplicate={props.duplicate}
                    colorChange={props.colorChange}
                    textAdder={props.textAdder}
                    boxes={props.boxes}
                    undoLastAction={props.undoLastAction}
                    redoLastAction={props.redoLastAction}
                    setBoxes={props.setBoxes}
                    setFontSize={props.setFontSize}
                    setIconSize={props.setIconSize}
                    changeFontSize={props.changeFontSize}
                    changeIconSize={props.changeIconSize}
                    changeFontColor={props.changeFontColor}
                    changeIcon={props.changeIcon}
                    changeIconColor={props.changeIconColor}
                    isBold={props.isBold}
                    isItalic={props.isItalic}
                    toggleBold={props.toggleBold}
                    toggleItalic={props.toggleItalic}
                    map={props.map}
                    icon={props.getSelectedBox(props.selectedBox)?.icon}
                    text={props.getSelectedBox(props.selectedBox)?.text}
                    iconSize={props.getSelectedBox(props.selectedBox)?.iconSize}
                    fontSize={props.getSelectedBox(props.selectedBox)?.fontSize}
                    isAddTextPressed={isAddTextPressed}
                    isColorPressed={isColorPressed}
                    isIconPressed={isIconPressed}
                    changeToSearch={changeToSearch}



                    doesIconAlreadyExist={props.doesIconAlreadyExist}
                    setIsAddTextPressed={setIsAddTextPressed}
                    setIsColorPressed={setIsColorPressed}
                    setIsIconPressed={setIsIconPressed}
                    setChangeToSearch={setChangeToSearch}
                    setDoesIconAlreadyExist={props.setDoesIconAlreadyExist}

                    resetStorage={props.resetStorage}

                    tabBarStyle={props.tabBarStyle}
                    tabBarType={props.tabBarType}
                    changeTabBarType={props.changeTabBarType}
                    tabBarHeight={props.tabBarHeight}

                    optionId={props.optionId}
                    setOptionId={props.setOptionId}
                    functionOptions={props.functionOptions}
                    setFunctionOptions={props.setFunctionOptions}
                    mapScreen={props.mapScreen}
                    homeMapScreen={props.homeMapScreen}
                    pageMapping={props.pageMapping}
                    functionMapping={props.functionMapping}
                    functions={props.functions}
                    variables={props.variables}
                    pages={props.pages}
                    selectedFunctionId={props.selectedFunctionId}
                    setFunctions={props.setFunctions}
                    setVariables={props.setVariables}
                    setPages={props.setPages}
                    setHomeMapScreen={props.setHomeMapScreen}
                    setPageMapping={props.setPageMapping}
                    setFunctionMapping={props.setFunctionMapping}
                    setMapScreen={props.setMapScreen}
                    setSelectedFunctionId={props.setSelectedFunctionId}
                    addFunction={props.addFunction}
                    selectPage={props.selectPage}
                    selectVariable={props.selectVariable}
                    setFunctionOperation={props.setFunctionOperation}
                    updateVariables={props.updateVariables}
                    deleteFunction={props.deleteFunction}
                    options={props.options}
                    //closeMapScreen={props.closeMapScreen}
                    openPageMapping={props.openPageMapping}
                    openFunctionMapping={props.openFunctionMapping}
                    openHomeMapScreen={props.openHomeMapScreen}

                
                />}

                
            </View>

            


    )
}


width  = Dimensions.get("window").width - 105;


const styles = StyleSheet.create({
    bar: {
        flexDirection: "row",
        width: width,
        height: 65,
        bottom: 20,
        backgroundColor: colors.background,
        position: 'absolute',
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        left: 85,

        
        borderRadius: 10,
        //display: 'flex'

        
        
    },
    innerBar: {
        alignItems: "center",
        flexDirection: 'row',
        gap: 30,
        paddingLeft: 20,
        paddingRight: 20
    },
    showToolBar: {
        width: 65,
        height: 65,
        borderRadius: 10,
        backgroundColor: colors.background,

  
        //opacity: 0.5, 
        
        zIndex: 1,
        


      },

});
  