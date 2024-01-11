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

    const [fontSize, setFontSize] = useState();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    
    const [icon, setIcon] = useState();
    const [doesIconAlreadyExist, setDoesIconAlreadyExist] = useState(false)

    const [boxes, setBoxes] = useState([]);
    const gridSize = (Dimensions.get("window").width - ((Dimensions.get("window").width / 8) / 5)) / 8

    /*useEffect(() => {
        console.log(fontSize);
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontSize: fontSize} : box
        );
        setBoxes(newBoxes);
    }, [fontSize]);*/

    function changeFontSize(id, fontSize) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontSize: fontSize} : box
        );
        setBoxes(newBoxes);
       }

    function addBox() {
        //let newBoxes = boxes.push({});
        let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: gridSize * 2, height: gridSize * 2,  color: '#b58df1', text: '', fontSize: 15, fontColor: '#000000', bold: 'normal', italic: 'normal', icon: ''}];
        let nextBox = nextBoxId + 1
        setNextBoxId(nextBox)
        setBoxes(newBoxes);
    }

    function removeBox() {
        setBoxes(boxes.filter(box => box.id !== selectedBox));
        setSelectedBox(null);
      }

    function changeFontColor(id, fontColor) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontColor: fontColor} : box
        );
        setBoxes(newBoxes)
    }

    function toggleBold(id) {
        setIsBold(!isBold);
        let newBoxes = boxes.map(box =>
            box.id === id ? { ...box, bold: box.bold === 'bold' ? 'normal' : 'bold' } : box
        )
        setBoxes(newBoxes);
    }

    function toggleItalic(id) {
        setIsItalic(!isItalic);
        let newBoxes = boxes.map(box =>
            box.id === id ? { ...box, italic: box.italic === 'italic' ? 'normal' : 'italic' } : box
        )
        setBoxes(newBoxes);
    }


    useEffect(() => {
        console.log(boxes);
        if (selectedBox !== null) {
            const selectedBoxFontSize = boxes.find(box => box.id === selectedBox)?.fontSize;
            setFontSize(selectedBoxFontSize);
        }
    }, [boxes, selectedBox]);

    useEffect(() => {
        console.log(boxes);
        if (selectedBox !== null) {
            const selectedBoxIcon = boxes.find(box => box.id === selectedBox)?.icon;
            setIcon(selectedBoxIcon);
        }
    }, [boxes, selectedBox]);

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

    function textAdder(id, newText) {
        setSelectedBoxId(id);
        //setModalVisible(true);
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, text: newText} : box
        );
        setBoxes(newBoxes);
    }

    function colorChange(id, newColor) {
        console.log(`Changing color of box ${id} to ${newColor}`);
        let newBoxes = boxes.map(box =>
          box.id === id ? {...box, color: newColor} : box
        );
        setBoxes(newBoxes);
    }

    function changeIcon(id, newIcon) {
        console.log(`Changing box icon to ${newIcon} for id ${id}`)
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, icon: newIcon} : box
        )
        setBoxes(newBoxes);
    }

    function changeIconColor(id, newColor) {
        console.log(`Changing icon color to ${newColor}`);
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, iconColor: newColor} : box
        )
        setBoxes(newBoxes);
    }

    function duplicate() {
        let selectedBoxWidth = boxes.find(box => box.id === selectedBox)?.width;
        let selectedBoxHeight = boxes.find(box => box.id === selectedBox)?.height;

        let selectedBoxX = boxes.find(box => box.id === selectedBox)?.x;
        let selectedBoxY = boxes.find(box => box.id === selectedBox)?.y;

        let selectedBoxColor = boxes.find(box => box.id === selectedBox)?.color;

        let selectedBoxText = boxes.find(box => box.id === selectedBox)?.text;
        let selectedBoxFontSize = boxes.find(box => box.id === selectedBox)?.fontSize;
        let selectedBoxFontColor = boxes.find(box => box.id === selectedBox)?.fontColor;
        let selectedBoxBold = boxes.find(box => box.id === selectedBox)?.bold;
        let selectedBoxItalic = boxes.find(box => box.id === selectedBox)?.italic;
        let selectedBoxIcon = boxes.find(box => box.id === selectedBox)?.icon;

        if (selectedBox !== null) {
            let newBoxes = [...boxes, {id: nextBoxId, x: selectedBoxX, y: selectedBoxY, width: selectedBoxWidth, height: selectedBoxHeight, color: selectedBoxColor, text: selectedBoxText, fontSize: selectedBoxFontSize, fontColor: selectedBoxFontColor, bold: selectedBoxBold, italic: selectedBoxItalic, icon: selectedBoxIcon}];
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
        if (selectedBox.icon !== '') {
            setDoesIconAlreadyExist(true);
        } else {
            setDoesIconAlreadyExist(false);
        }
        console.log(id)
     }

    function getSelectedBox(id) {
        return boxes.find(box => box.id === id);
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
                    fontSize={box.fontSize}
                    fontColor={box.fontColor}
                    bold={box.bold}
                    italic={box.italic}
                    icon={box.icon}
                    iconColor={box.iconColor}
                    iconHeight={box.iconHeight}
                    iconWidth={box.iconWidth}
                    selectedBox={selectedBox}
                    zIndex={box.id === selectedBox ? 2 : 1}
                    onSelect={handleBoxSelect} 
                    onRemove={removeBox} 
                    onMove={setBoxPos} 
                    onScale={setBoxScale}/>
                )
            })}
            
            <ToolBar
                add={addBox}
                remove={removeBox}
                selectedBox={selectedBox}
                getSelectedBox={getSelectedBox}
                duplicate={duplicate}
                colorChange={colorChange}
                textAdder={textAdder}
                fontSize={fontSize}
                icon={icon}
                doesIconAlreadyExist={doesIconAlreadyExist}
                setFontSize={setFontSize}
                setDoesIconAlreadyExist={setDoesIconAlreadyExist}
                changeFontSize={changeFontSize}
                changeFontColor={changeFontColor}
                changeIcon={changeIcon}
                changeIconColor={changeIconColor}
                isBold={isBold}
                isItalic={isItalic}
                toggleBold={toggleBold}
                toggleItalic={toggleItalic}/>
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