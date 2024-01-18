import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, Modal, TextInput, Button } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
    const prevBoxesRef = useRef();
    const [history, setHistory] = useState([]);
    const [shouldRecordHistory, setShouldRecordHistory] = useState(true);
    const [redoHistory, setRedoHistory] = useState([])
    const gridSize = (Dimensions.get("window").width - ((Dimensions.get("window").width / 8) / 5)) / 8

    /*useEffect(() => {
        console.log(fontSize);
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontSize: fontSize} : box
        );
        setBoxes(newBoxes);
    }, [fontSize]);*/

    /*useEffect(() => {
        console.log('history:', history)
    }, [history])

    useEffect(() => {
        console.log('redoHistory', redoHistory)
    }, [redoHistory])*/

    const findDifferences = (prevObj, newObj) => {
        const changes = {};
        Object.keys(newObj).forEach(key => {
          // Skip functions, undefined values, or objects
          if (typeof newObj[key] === 'function' || newObj[key] === undefined || typeof newObj[key] === 'object' || typeof newObj[key] === NaN) {
            return;
          }
          if (prevObj[key] !== newObj[key]) {
            if (newObj[key] !== prevObj[key]) {
                // Store the change as a string describing the change
                changes[key] = `${prevObj[key]} to ${newObj[key]}`
            }
          }
        });
        return changes;
    };

    useEffect(() => {
        if (!shouldRecordHistory) {
            setShouldRecordHistory(true);
            prevBoxesRef.current = boxes;
            return;
        }
        const prevBoxes = prevBoxesRef.current || [];
        
        setRedoHistory([]);
      
        // Detect added boxes
        const addedBoxes = boxes.filter(box => !prevBoxes.some(prevBox => prevBox.id === box.id));
        addedBoxes.forEach(box => {
          const addEntry = { type: 'add', box: { ...box } };
          setHistory(prevHistory => [...prevHistory, addEntry]);
        });
      
        // Detect removed boxes
        const removedBoxes = prevBoxes.filter(prevBox => !boxes.some(box => box.id === prevBox.id));
        removedBoxes.forEach(box => {
          const removeEntry = { type: 'remove', box: { ...box } };
          setHistory(prevHistory => [...prevHistory, removeEntry]);
        });
      
        // Detect updated boxes
        const updates = boxes.map((box, index) => {
            const prevBox = prevBoxes[index];
            if (prevBox && box.id === prevBox.id) {
              const differences = findDifferences(prevBox, box);
              if (Object.keys(differences).length > 0) {
                return { type: 'update', id: box.id, changes: differences };
              }
            }
            return null;
          }).filter(change => change !== null);
        
          if (updates.length > 0) {
            setHistory(prevHistory => [...prevHistory, ...updates]);
        }
      
        // Update the ref to the current boxes
        prevBoxesRef.current = boxes;
      }, [boxes]);

      const undoLastAction = () => {
        if (history.length === 0) {
            // No actions to undo
            return;
        }
    
        setShouldRecordHistory(false);
    
        const lastAction = history[history.length - 1];
        applyAction(lastAction, 'undo');
    
        setHistory(history.slice(0, -1));
        setRedoHistory([...redoHistory, lastAction]);
    };
    
    const redoLastAction = () => {
        if (redoHistory.length === 0) {
            // No actions to redo
            return;
        }
    
        setShouldRecordHistory(false);
    
        const lastAction = redoHistory[redoHistory.length - 1];
        applyAction(lastAction, 'redo');
    
        setRedoHistory(redoHistory.slice(0, -1));
        setHistory([...history, lastAction]);
    };
    
    const applyAction = (action, type) => {
        let newBoxes;
        switch (action.type) {
            case 'add':
                newBoxes = type === 'undo' ? boxes.filter(box => box.id !== action.box.id) : [...boxes, action.box];
                break;
            case 'remove':
                newBoxes = type === 'undo' ? [...boxes, action.box] : boxes.filter(box => box.id !== action.box.id);
                break;
            case 'update':
                newBoxes = boxes.map(box => {
                    if (box.id === action.id) {
                        const updatedBox = { ...box };
                        if (action.changes && typeof action.changes === 'object') {
                            Object.keys(action.changes).forEach(key => {
                                //if (typeof action.changes[key] === 'string') {
                                    const values = action.changes[key].split(" to ");
                                    if (type === 'undo') {
                                        updatedBox[key] = values[0];
                                    } else if (type === 'redo') {
                                        updatedBox[key] = values[1];
                                    }
                                    console.log(`values[0]: ${values[0]}, values[1]: ${values[1]}`)
                                /*} else {
                                    console.log(`box[key]: ${box[key]}, action.changes[key]: ${action.changes[key]}`)
                                    // If the value is not a string, it should be a numeric difference
                                    updatedBox[key] = type === 'undo' ? box[key] - action.changes[key] : box[key] + action.changes[key];
                                }*/
                            });
                        }
                        return updatedBox;
                    }
                    return box;
                });
                break;
            default:
                // Handle other action types if necessary
                break;
        }
        setBoxes(newBoxes);
    };


    function changeFontSize(id, fontSize) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontSize: fontSize} : box
        );
        setBoxes(newBoxes);
       }

    function changeIconSize(id, iconSize) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, iconSize: iconSize} : box
        );
        setBoxes(newBoxes);
    }

    function addBox() {
        //let newBoxes = boxes.push({});
        let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: gridSize * 2, height: gridSize * 2,  color: '#b58df1', text: '', fontSize: 15, fontColor: '#000000', bold: 'normal', italic: 'normal', icon: '', iconColor: '#000000', iconSize: 50}];
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

    function setBoxScale(id, newW, newH, newX, newY) {
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, width: newW, height: newH, x: newX, y: newY} : box
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

        /*let selectedBoxX = boxes.find(box => box.id === selectedBox)?.x;
        let selectedBoxY = boxes.find(box => box.id === selectedBox)?.y;*/

        let selectedBoxColor = boxes.find(box => box.id === selectedBox)?.color;

        let selectedBoxText = boxes.find(box => box.id === selectedBox)?.text;
        let selectedBoxFontSize = boxes.find(box => box.id === selectedBox)?.fontSize;
        let selectedBoxFontColor = boxes.find(box => box.id === selectedBox)?.fontColor;
        let selectedBoxBold = boxes.find(box => box.id === selectedBox)?.bold;
        let selectedBoxItalic = boxes.find(box => box.id === selectedBox)?.italic;
        let selectedBoxIcon = boxes.find(box => box.id === selectedBox)?.icon;
        let selectedBoxIconColor = boxes.find(box => box.id === selectedBox)?.iconColor;
        let selectedBoxIconSize = boxes.find(box => box.id === selectedBox)?.iconSize;

        if (selectedBox !== null) {
            let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: selectedBoxWidth, height: selectedBoxHeight, color: selectedBoxColor, text: selectedBoxText, fontSize: selectedBoxFontSize, fontColor: selectedBoxFontColor, bold: selectedBoxBold, italic: selectedBoxItalic, icon: selectedBoxIcon, iconColor: selectedBoxIconColor, iconSize: selectedBoxIconSize}];
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
                    iconSize={box.iconSize}
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
                boxes={boxes}
                fontSize={fontSize}
                icon={icon}
                undoLastAction={undoLastAction}
                redoLastAction={redoLastAction}
                doesIconAlreadyExist={doesIconAlreadyExist}
                setBoxes={setBoxes}
                setFontSize={setFontSize}
                setDoesIconAlreadyExist={setDoesIconAlreadyExist}
                changeFontSize={changeFontSize}
                changeFontColor={changeFontColor}
                changeIcon={changeIcon}
                changeIconColor={changeIconColor}
                changeIconSize={changeIconSize}
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