import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, Modal, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Box from '../Components/v2Components/moveableBoxv2';
import ToolBar from '../Components/v2Components/editBar';


export default function MatchFormLayout(){


    const [nextBoxId, setNextBoxId] = useState(0);

    const [modalVisible, setModalVisible] = useState(false);
    const [inputText, setInputText] = useState('');
    const [selectedBoxId, setSelectedBoxId] = useState(null);

    const [boxes, setBoxes] = useState([]);
    function addBox() {
        //let newBoxes = boxes.push({});
        let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: 100, height: 100,  color: '#b58df1', text: ''}];
        let nextBox = nextBoxId + 1
        setNextBoxId(nextBox)
        setBoxes(newBoxes);
    }

    function removeBox() {
        setBoxes(boxes.filter(box => box.id !== selectedBox));
        setSelectedBox(null);
      }




    useEffect(() => {
        console.log(boxes);
    }, [boxes]);

    function setBoxPos(id, newX, newY) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, x: newX, y: newY} : box
        );
        setBoxes(newBoxes);
    }

    function setBoxScale(id, newW, newH) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, width: newW, height: newH} : box
        );
        setBoxes(newBoxes);
    }

    function textAdder(id) {
        setSelectedBoxId(id);
        setModalVisible(true);
    }

    function colorChange(id, newColor) {
        console.log(`Changing color of box ${id} to ${newColor}`);
        let newBoxes = boxes.map(box =>
          box.id === id ? {...box, color: newColor} : box
        );
        setBoxes(newBoxes);
       }

    function duplicate() {
        let selectedBoxWidth = boxes.find(box => box.id === selectedBox)?.width;
        let selectedBoxHeight = boxes.find(box => box.id === selectedBox)?.height;

        let selectedBoxX = boxes.find(box => box.id === selectedBox)?.x;
        let selectedBoxY = boxes.find(box => box.id === selectedBox)?.y;

        let selectedBoxColor = boxes.find(box => box.id === selectedBox)?.color;

        if (selectedBox !== null) {
            let newBoxes = [...boxes, {id: nextBoxId, x: selectedBoxX, y: selectedBoxY, width: selectedBoxWidth, height: selectedBoxHeight, color: selectedBoxColor}];
            let nextBox = nextBoxId + 1
            setNextBoxId(nextBox)
            setBoxes(newBoxes);
        }
       }

    const [selectedBox, setSelectedBox] = useState(null);

    function handleBoxSelect(id) {
        setSelectedBox(prevId => prevId === id ? null : id);
        const selectedBox = boxes.find(box => box.id === id);
        if (selectedBox) {
            setInputText(selectedBox.text);
        }
        console.log(id)
     }
    return(
        <View style={{width: '100%', height: '100%'}}>
            {boxes.map((box, index) => {
                return (
                    <Box 
                    
                    key={box.id} 
                    id={box.id} 
                    boxX={box.x} 
                    boxY={box.y} 
                    boxHeight={box.height} 
                    boxWidth={box.width} 
                    color={box.color}
                    text={box.text}
                    selectedBox={selectedBox} 
                    onSelect={handleBoxSelect} 
                    onRemove={removeBox} 
                    onMove={setBoxPos} 
                    onScale={setBoxScale}/>
                )
            })}
            
            <ToolBar add={addBox} remove={removeBox} selectedBox={selectedBox} duplicate={duplicate} colorChange={colorChange} textAdder={textAdder}/>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{marginTop: 250}}>
                    <View>
                        <TextInput
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={text => setInputText(text)}
                            value={inputText}
                        />

                        <View style={{margin: 20}}>
                            <Button
                                onPress={() => {
                                    let newBoxes = boxes.map(box =>
                                        box.id === selectedBoxId ? {...box, text: inputText} : box
                                    );
                                    setBoxes(newBoxes);
                                    setModalVisible(!modalVisible);
                                }}
                                title="Submit"
                                color="#841584"
                            />
                            <Button
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                                title="Cancel"
                                color="#841584"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}