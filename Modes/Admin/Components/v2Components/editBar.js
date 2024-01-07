import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../../../colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';






function AllToolBar(props){

    const [isAddTextPressed, setIsAddTextPressed] = useState(false);
    const [fontSize, setFontSize] = useState(props.fontSize);
    const isBold = props.getSelectedBox(props.selectedBox)?.bold === 'bold';
    const isItalic = props.getSelectedBox(props.selectedBox)?.italic === 'italic';

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
                props.textAdder(props.selectedBox);
                setIsAddTextPressed(true);
            }
    }).runOnJS(true);

    const back = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("back");
            setIsAddTextPressed(false);
    }).runOnJS(true);

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

    const blackTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to black");
            props.changeFontColor(props.selectedBox, '#000000');
    }).runOnJS(true);

    const whiteTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to white");
            props.changeFontColor(props.selectedBox, '#FFFFFF');
    }).runOnJS(true);

    const redTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to red");
            props.changeFontColor(props.selectedBox, '#FF0000');
    }).runOnJS(true);

    const yellowTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to yellow");
            props.changeFontColor(props.selectedBox, '#FFFF00');
    }).runOnJS(true);

    const blueTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to blue");
            props.changeFontColor(props.selectedBox, '#0000FF');
    }).runOnJS(true);

    const orangeTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to orange");
            props.changeFontColor(props.selectedBox, '#FFA500');
    }).runOnJS(true);

    const greenTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to green");
            props.changeFontColor(props.selectedBox, '#00FF00');
    }).runOnJS(true);

    const purpleTextColor = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("change text color to purple");
            props.changeFontColor(props.selectedBox, '#800080');
    }).runOnJS(true);

    const addIcon = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log("add Icon")
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
            console.log("Color")
            props.colorChange(props.selectedBox, 'black');
    }).runOnJS(true);



    return(
        <ScrollView key={isAddTextPressed ? "addText" : "default"} style={styles.bar} horizontal={true} contentContainerStyle={styles.innerBar}> 
            {!isAddTextPressed && (
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
            {isAddTextPressed && (
                <>

                    <GestureDetector gesture={back}>
                        <MaterialIcons name="arrow-back" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={undo}> 
                        <MaterialIcons name="undo" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={redo}> 
                        <MaterialIcons name="redo" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <GestureDetector gesture={addText}> 
                        <MaterialIcons name="text-fields" size={34} color="#e3e2e6" />
                    </GestureDetector>

                    <TextInput
                        keyboardType='numeric'
                        value={props.fontSize.toString()}
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
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#000000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={whiteTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#FFFFFF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={redTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#FF0000"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={orangeTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#FFA500"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={yellowTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#FFFF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={greenTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#00FF00"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={blueTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#0000FF"
                        }}/>
                    </GestureDetector>

                    <GestureDetector gesture={purpleTextColor}>
                        <TouchableOpacity style={{
                            height: 34,
                            width: 34,
                            borderColor: 'gray',
                            borderWidth: 1,
                            borderRadius: 5,
                            backgroundColor: "#800080"
                        }}/>
                    </GestureDetector>

                </>
            )}
            

        </ScrollView>
    )
}



export default function ToolBar(props){

    
    const [ tabActive, setTabActive ] = useState(false);

    return( 

            <View style={{height: '100%', width: '100%'}}>
                <Pressable style={{position: 'absolute', bottom: 20, left: 20, }} onPress={() => setTabActive(!tabActive)}>  
                    <View style={[styles.showToolBar, tabActive && {borderTopRightRadius: 0,borderBottomRightRadius: 0,borderRightColor: "#e3e2e6",
        borderRightWidth: 5,}]}> 
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> 
                            
                            {tabActive ? <MaterialIcons name="chevron-left" size={54} color="#e3e2e6" /> : <MaterialIcons name="chevron-right" size={54} color="#e3e2e6" />}
                        </View>
                    </View>

                    
                </Pressable>
                {tabActive && <AllToolBar add={props.add} remove={props.remove} selectedBox={props.selectedBox} getSelectedBox={props.getSelectedBox} duplicate={props.duplicate} colorChange={props.colorChange} textAdder={props.textAdder} fontSize={props.getSelectedBox(props.selectedBox)?.fontSize} setFontSize={props.setFontSize} changeFontSize={props.changeFontSize} changeFontColor={props.changeFontColor} isBold={props.isBold} isItalic={props.isItalic} toggleBold={props.toggleBold} toggleItalic={props.toggleItalic}/>}
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
  