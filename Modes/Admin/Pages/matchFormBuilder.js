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
    const [redoHistory, setRedoHistory] = useState([])
    const gridSize = (Dimensions.get("window").width - ((Dimensions.get("window").width / 8) / 5)) / 8

    /*useEffect(() => {
        console.log(fontSize);
        let newBoxes = boxes.map(box =>
            box.id === id ? {...box, fontSize: fontSize} : box
        );
        setBoxes(newBoxes);
    }, [fontSize]);*/

    useEffect(() => {
        console.log('history:', history)
    }, [history])

    const findDifferences = (prevObj, newObj) => {
        const changes = {};
        Object.keys(newObj).forEach(key => {
          // Skip functions, undefined values, or objects
          if (typeof newObj[key] === 'function' || newObj[key] === undefined || typeof newObj[key] === 'object' || typeof newObj[key] === NaN) {
            return;
          }
          if (prevObj[key] !== newObj[key]) {
            // Store the change as a string describing the change
            if (typeof newObj[key] === 'string') {
                changes[key] = `From ${prevObj[key]} to ${newObj[key]}`
            } else {
                changes[key] = newObj[key] - prevObj[key];
            }
          }
        });
        return changes;
    };

    useEffect(() => {
        const prevBoxes = prevBoxesRef.current || [];
      
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

        // Take the last action from the history
        const lastAction = history[history.length - 1];

        // Determine the type of action and reverse it
        switch (lastAction.type) {
            case 'add':
                // To undo an add, we remove the box that was added
                setBoxes(boxes.filter(box => box.id !== lastAction.box.id));
                break;
            case 'remove':
                // To undo a remove, we add the box back to the boxes array
                setBoxes([...boxes, lastAction.box]);
                break;
            case 'update':
                // To undo an update, we revert the changes of the specific box
                setBoxes(boxes.map(box => {
                    if (box.id === lastAction.id) {
                        // Revert changes for this box
                        const revertedBox = { ...box };
                        Object.keys(lastAction.changes).forEach(key => {
                            if (typeof lastAction.changes[key] === 'string') {
                                // Assuming the change format is "From <value1> to <value2>"
                                const changeParts = lastAction.changes[key].match(/From (.*) to (.*)/);
                                if (changeParts && changeParts.length === 3) {
                                    revertedBox[key] = changeParts[1]; // Extract the 'from' value
                                }
                            } else {
                                // For numeric changes, subtract the change from the current value
                                revertedBox[key] -= lastAction.changes[key];
                            }
                        });
                        console.log('Reverted box:', revertedBox)
                        return revertedBox;
                    }
                    return box; // No changes for other boxes
                }));
                break;
            default:
                // Handle other action types if necessary
                break;
        }
        // Remove the last action from history and add it to redoHistory
        setHistory(history.slice(0, -1));
        setRedoHistory([...redoHistory, lastAction]);
    }

    const redoLastAction = () => {
        if (redoHistory.length === 0) {
          // No actions to redo
          return;
        }
      
        // Take the last action from the redo stack
        const lastAction = redoHistory[redoHistory.length - 1];
        // Remove the last action from the redo stack
        setRedoHistory(redoHistory.slice(0, -1));
      
        // Apply the last action to the boxes state
        switch (lastAction.type) {
          case 'add':
            // To redo an add, we add the box back to the boxes array
            setBoxes([...boxes, lastAction.box]);
            break;
          case 'remove':
            // To redo a remove, we remove the box from the boxes array
            setBoxes(boxes.filter(box => box.id !== lastAction.box.id));
            break;
          case 'update':
            // To redo an update, we apply the changes to the specific box
            setBoxes(boxes.map(box => {
                if (box.id === lastAction.id) {
                    // Apply changes to this box
                    const updatedBox = { ...box };
                    Object.keys(lastAction.changes).forEach(key => {
                        if (typeof lastAction.changes[key] === 'string') {
                            updatedBox[key] = lastAction.changes[key].split(", to: ")[1]; // Extract the 'to' value
                        } else {
                            // Handle non-string values appropriately
                            updatedBox[key] = lastAction.changes[key]; // Use the original value if it's not a string
                        }
                    });                    
                    return updatedBox;
                }
                return box; // No changes for other boxes
              }));
            break;
          default:
            // Handle other action types if necessary
            break;
        }
      
        // Add the last action back to the history
        setHistory([...history, lastAction]);
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
        let selectedBoxIconColor = boxes.find(box => box.id === selectedBox)?.iconColor;
        let selectedBoxIconSize = boxes.find(box => box.id === selectedBox)?.iconSize;

        if (selectedBox !== null) {
            let newBoxes = [...boxes, {id: nextBoxId, x: selectedBoxX, y: selectedBoxY, width: selectedBoxWidth, height: selectedBoxHeight, color: selectedBoxColor, text: selectedBoxText, fontSize: selectedBoxFontSize, fontColor: selectedBoxFontColor, bold: selectedBoxBold, italic: selectedBoxItalic, icon: selectedBoxIcon, iconColor: selectedBoxIconColor, iconSize: selectedBoxIconSize}];
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