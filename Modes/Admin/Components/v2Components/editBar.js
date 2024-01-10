import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, ScrollView, TextInput, Modal, LogBox } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../../../colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { isColor } from 'react-native-reanimated';

const closest_match = require('closest-match');

const iconNames = require('./icon_names.json');






function AllToolBar(props){
    LogBox.ignoreAllLogs();
    const [fontSize, setFontSize] = useState(props.fontSize);
    const isBold = props.getSelectedBox(props.selectedBox)?.bold === 'bold';
    const isItalic = props.getSelectedBox(props.selectedBox)?.italic === 'italic';
    const [openSearch, setOpenSearch] = useState(false);
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
            console.log("redo")
    }).runOnJS(true);

    const undo = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("undo")
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

    const blackTextColor = changeTextColor('black');
    const whiteTextColor = changeTextColor('white');
    const redTextColor = changeTextColor('red');
    const yellowTextColor = changeTextColor('yellow');
    const blueTextColor = changeTextColor('blue');
    const orangeTextColor = changeTextColor('orange');
    const greenTextColor = changeTextColor('green');
    const purpleTextColor = changeTextColor('purple');

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

    const addIcon = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            setOpenSearch(true);
        }).runOnJS(true);
    const remove = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("Delete")
            props.remove(props.selectedBox);
    }).runOnJS(true);
    const map = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("Map")
    }).runOnJS(true);
    const color = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            if (props.selectedBox !== null) {
                console.log("Color")
                props.setIsColorPressed(true);
            }
    }).runOnJS(true);

    const colorBoxStyle = {
        height: 34,
        width: 34,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 17,
    };

    function SearchIcons(query) {
        if (query === '') {
            setMatches([]);
            return;
        }
        let matches = closest_match.closestMatch(query.toLowerCase(), iconNames, true)
        console.log(matches)
        setMatches(matches);
    }


    return(
        <ScrollView key={props.isAddTextPressed || props.isColorPressed ? "addTextOrColor" : "default"} style={styles.bar} horizontal={true} contentContainerStyle={styles.innerBar}> 
            {!props.isAddTextPressed && !props.isColorPressed && (
                <>
                    <GestureDetector gesture={addBox}> 
                        <MaterialIcons name="add" size={34} color="#e3e2e6" fontWeight="bold"/> 
                    </GestureDetector>

                    <GestureDetector gesture={undo}> 
                        <MaterialIcons name="undo" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={redo}> 
                        <MaterialIcons name="redo" size={34} color="#e3e2e6" />
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
                        <MaterialIcons name="emoji-emotions" size={34} color="#e3e2e6" />
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
                        <FontAwesome name="bold" size={34} color={isBold ? '#48BBD8' : '#e3e2e6'} />
                    </GestureDetector>

                    <GestureDetector gesture={italic}> 
                        <FontAwesome name="italic" size={34} color={isItalic ? '#48BBD8' : '#e3e2e6'} />
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
                </>
            )}
            {openSearch && (
                <Modal transparent={true}>
                    <View style={{height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#000000aa'}}>
                        <View style={{height: '80%', width: '90%', backgroundColor: colors.background, transform: [{translateY: -20}], borderRadius: 10}}>
                            <View style={{flexDirection: 'row', margin: 10}}>
                                <Pressable onPress={() => setOpenSearch(false)}>
                                    <MaterialIcons name="close" size={40} color={'white'} />
                                </Pressable>
                                <TextInput style={{height: 40, flexGrow: 1, backgroundColor: '#fff', borderRadius: 10, marginRight: 10, marginLeft: 10, paddingLeft: 10}} placeholder="Search" onChangeText={SearchIcons}/>
                            </View>
                            <ScrollView style={{height: '80%', width: '100%'}} contentContainerStyle={{flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center'}}>
                                {matches.map((iconName) => {
                                    return (
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <Pressable onPress={() => {
                                                setOpenSearch(false);
                                                props.getSelectedBox(props.selectedBox).icon = iconName;
                                            }}>
                                                <MaterialIcons name={iconName} size={80} color={'white'} style={{margin: 10}}/>
                                            </Pressable>
                                            <Text style={{color: 'white', textAlign: 'center', fontSize: 30}}>{iconName}</Text>
                                        </View>
                                    );
                                }
                                )}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                )
            }
            

        </ScrollView>
    )
}



export default function ToolBar(props){

    
    const [ tabActive, setTabActive ] = useState(false);
    const [isAddTextPressed, setIsAddTextPressed] = useState(false);
    const [isColorPressed, setIsColorPressed] = useState(false);

    const handlePress = () => {
        if (isAddTextPressed || isColorPressed) {
            setIsAddTextPressed(false);
            setIsColorPressed(false);
        } else {
            setTabActive(!tabActive);
        }
      };

    return( 

            <View style={{height: '100%', width: '100%'}}>
                <Pressable style={{position: 'absolute', bottom: 20, left: 20, }} onPress={handlePress}>  
                    <View style={[styles.showToolBar, tabActive && {borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRightColor: "#e3e2e6", borderRightWidth: 5,}]}> 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                            
                        {(isAddTextPressed || isColorPressed) ? <MaterialIcons name="check" size={54} color="#e3e2e6" /> : (tabActive ? <MaterialIcons name="chevron-left" size={54} color="#e3e2e6" /> : <MaterialIcons name="chevron-right" size={54} color="#e3e2e6" />)}
                        </View>
                    </View>

                    
                </Pressable>
                {tabActive && <AllToolBar
                
                add={props.add}
                remove={props.remove}
                selectedBox={props.selectedBox}
                getSelectedBox={props.getSelectedBox}
                duplicate={props.duplicate}
                colorChange={props.colorChange}
                textAdder={props.textAdder}
                setFontSize={props.setFontSize} 
                changeFontSize={props.changeFontSize}
                changeFontColor={props.changeFontColor}
                isBold={props.isBold}
                isItalic={props.isItalic}
                toggleBold={props.toggleBold}
                toggleItalic={props.toggleItalic}
                text={props.getSelectedBox(props.selectedBox)?.text}
                fontSize={props.getSelectedBox(props.selectedBox)?.fontSize}
                isAddTextPressed={isAddTextPressed}
                isColorPressed={isColorPressed}
                setIsAddTextPressed={setIsAddTextPressed}
                setIsColorPressed={setIsColorPressed}
                
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
  