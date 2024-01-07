import { StyleSheet, Text, View, Pressable, Dimensions, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../../../colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';






function AllToolBar(props){

    const [isAddTextPressed, setIsAddTextPressed] = useState(false);
    const [fontSize, setFontSize] = useState(props.fontSize);

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
                </>
            )}
            

        </ScrollView>
    )
}



export default function ToolBar(props){

    
    const [ tabActive, setTabActive ] = useState(false);
    console.log('selectedBox', props.selectedBox);
    console.log('fontSize', props.getSelectedBox(props.selectedBox)?.fontSize);

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
                {tabActive && <AllToolBar add={props.add} remove={props.remove} selectedBox={props.selectedBox} getSelectedBox={props.getSelectedBox} duplicate={props.duplicate} colorChange={props.colorChange} textAdder={props.textAdder} fontSize={props.getSelectedBox(props.selectedBox)?.fontSize} setFontSize={props.setFontSize} changeFontSize={props.changeFontSize}/>}
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
  