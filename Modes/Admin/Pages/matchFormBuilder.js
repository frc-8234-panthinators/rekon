import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView, Modal, TextInput, Button, ActivityIndicator } from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Box from '../Components/v2Components/moveableBoxv2';
import ToolBar from '../Components/v2Components/editBar';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';


export default function MatchFormLayout({route, navigation}){

    const { matchFormId } = route.params;

    const [isLoading, setIsLoading] = useState(true);

    const [nextBoxId, setNextBoxId] = useState(0);
    const [nextFunctionId, setNextFunctionId] = useState(0);
    const [nextVariableId, setNextVariableId] = useState(0);

    const [functions, setFunctions] = useState([]);
    const [variables, setVariables] = useState([]);
    const [functionOptions, setFunctionOptions] = useState(false);
    const [optionId, setOptionId] = useState(null);
    const [mapScreen, setMapScreen] = useState(false);
    const mapScreenHeight = useSharedValue(0);
    const [homeMapScreen, setHomeMapScreen] = useState(true);
    const [pageMapping, setPageMapping] = useState(false);
    const [functionMapping, setFunctionMapping] = useState(false);

    const [inputText, setInputText] = useState('');
    const [selectedBoxId, setSelectedBoxId] = useState(null);
    const [selectedFunctionId, setSelectedFunctionId] = useState(null);

    const [fontSize, setFontSize] = useState();
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    
    const [icon, setIcon] = useState();
    const [doesIconAlreadyExist, setDoesIconAlreadyExist] = useState(false)

    const [boxes, setBoxes] = useState([]);
    const [matchForms, setMatchForms] = useState([]);
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

    useEffect(() => {
        console.log(`functions: ${JSON.stringify(functions)}`);
    }, [functions])

    useEffect(() => {
        console.log(`variables: ${JSON.stringify(variables)}`);
    }, [variables])

    useEffect(() => {
        // Fetch the boxes array from AsyncStorage when the component mounts
        AsyncStorage.getItem(`matchForms_${matchFormId}`).then(jsonValue => {
          const boxes = jsonValue != null ? JSON.parse(jsonValue) : [];
          setBoxes(boxes); // Update the state with the fetched boxes array
        }).catch(error => {
          console.error('Failed to fetch boxes:', error);
        });
        AsyncStorage.getItem(`nextBoxId_${matchFormId}`).then(jsonValue => {
            const nextBoxId = jsonValue != null ? JSON.parse(jsonValue) : 0;
            setNextBoxId(nextBoxId);
        }).catch(error => {
            console.error('Failed to fetch nextBoxId: ', error);
        })
        AsyncStorage.getItem(`nextFunctionId_${matchFormId}`).then(jsonValue => {
            const nextFunctionId = jsonValue != null ? JSON.parse(jsonValue) : 0;
            setNextFunctionId(nextFunctionId);
        }).catch(error => {
            console.error('Failed to fetch nextFunctionId: ', error);
        })
        AsyncStorage.getItem(`nextVariableId`).then(jsonValue => {
            const nextVariableId = jsonValue != null ? JSON.parse(jsonValue) : 0;
            setNextFunctionId(nextVariableId);
        }).catch(error => {
            console.error('Failed to fetch nextVariableId: ', error);
        })
        AsyncStorage.getItem(`variables`).then(jsonValue => {
            const variables = jsonValue != null ? JSON.parse(jsonValue) : [];
            setVariables(variables);
        }).catch(error => {
            console.error('Failed to fetch variables:', error);
        })
        AsyncStorage.getItem('matchForms').then(jsonValue => {
            const matchForms = jsonValue != null ? JSON.parse(jsonValue) : [];
            setMatchForms(matchForms); // Update the state with the fetched matchForms array
        }).catch(error => {
            console.error('Failed to fetch matchForms:', error);
        });
    }, [matchFormId]);

    useEffect(() => {
        console.log(`matchForms: ${JSON.stringify(matchForms)}`);
    }, [matchForms])

    useEffect(() => {
        // Convert the updated boxes array to a string
        const jsonValue = JSON.stringify(boxes);
      
        // Store the updated boxes array in AsyncStorage
        AsyncStorage.setItem(`matchForms_${matchFormId}`, jsonValue).then(() => {
          console.log('Updated boxes stored successfully');
        }).catch(error => {
          console.error('Failed to store updated boxes:', error);
        });
    }, [boxes]);

    useEffect(() => {
        AsyncStorage.setItem(`nextBoxId_${matchFormId}`, JSON.stringify(nextBoxId)).then(() => {
            console.log('Updated nextBoxId succesfully');
        }).catch(error => {
          console.error('Failed to save nextBoxId:', error);
        });
    }, [nextBoxId]);

    useEffect(() => {
        AsyncStorage.setItem(`nextFunctionId_${matchFormId}`, JSON.stringify(nextFunctionId)).then(() => {
            console.log('Updated nextFunctionId succesfully');
        }).catch(error => {
          console.error('Failed to save nextFunctionId:', error);
        });
    }, [nextFunctionId]);

    useEffect(() => {
        AsyncStorage.setItem(`nextVariableId`, JSON.stringify(nextVariableId)).then(() => {
            console.log('Updated nextVariableId succesfully');
        }).catch(error => {
            console.error('Failed to save nextVariableIdL', error);
        });
    }, [nextVariableId]);

    useEffect(() => {
        AsyncStorage.setItem(`variables`, JSON.stringify(variables)).then(() => {
            console.log('Updated variables succesfully');
        }).catch(error => {
            console.error('Failed to save variables:', error);
        })
    }, [variables])

    useEffect(() => {
        console.log(`selectedFunctionId: ${selectedFunctionId}`)
    }, [selectedFunctionId])

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

    useEffect(() => {
        let newBoxes = boxes.map(box =>
            box.id === selectedBox ? {...box, functions: functions} : box
        );
        setBoxes(newBoxes);
    }, [functions])
    
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


    function resetStorage() {
        AsyncStorage.clear().then(() => {
            console.log('AsyncStorage is now clear');
        }).catch(error => {
            console.error('Failed to clear AsyncStorage:', error);
        });
    }

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
        let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: gridSize * 2, height: gridSize * 2,  color: '#312541', text: '', fontSize: 15, fontColor: '#000000', bold: 'normal', italic: 'normal', icon: '', iconColor: '#000000', iconSize: 50, page: '', functions: []}];
        let nextBox = nextBoxId + 1
        setNextBoxId(nextBox)
        setBoxes(newBoxes);
    }

    function removeBox() {
        const boxToRemove = boxes.find(box => box.id === selectedBox);
        if (boxToRemove && boxToRemove.functions) {
            boxToRemove.functions.forEach(func => {
                boxes.forEach(box => {
                    if (box.id !== selectedBox && box.functions) {
                        box.functions = box.functions.map(otherFunc => {
                            if (otherFunc.varName === func.newVarName) {
                                return {...otherFunc, newVarName: '', varName: ''};
                            }
                            return otherFunc;
                        });
                    }
                });
                const newVariables = variables.filter(variable => !getSelectedBox(selectedBox).functions.some(func => func.newVarName === variable.name));
                setVariables(newVariables);
            });
        }
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
        let selectedBoxPage = boxes.find(box => box.id === selectedBox)?.page;
        let selectedBoxFunctions = boxes.find(box => box.functions === selectedBox)?.functions;

        if (selectedBox !== null) {
            let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: selectedBoxWidth, height: selectedBoxHeight, color: selectedBoxColor, text: selectedBoxText, fontSize: selectedBoxFontSize, fontColor: selectedBoxFontColor, bold: selectedBoxBold, italic: selectedBoxItalic, icon: selectedBoxIcon, iconColor: selectedBoxIconColor, iconSize: selectedBoxIconSize, page: selectedBoxPage, functions: selectedBoxFunctions}];
            let nextBox = nextBoxId + 1
            setNextBoxId(nextBox)
            setBoxes(newBoxes);
        }
       }

    const [selectedBox, setSelectedBox] = useState(null);

    function handleBoxSelect(id) {
        setSelectedBox(prevId => {
            if (prevId === id) {
                setFunctions([]);
                return null;
            } else {
                const selectedBox = boxes.find(box => box.id === id);
                if (selectedBox) {
                    setInputText(selectedBox.text);
                    setFunctions(selectedBox.functions);
                    setHomeMapScreen(true);
                    setFunctionMapping(false);
                    setPageMapping(false);
                    if (selectedBox.icon !== '') {
                        setDoesIconAlreadyExist(true);
                    } else {
                        setDoesIconAlreadyExist(false);
                    }
                }
                return id;
            }
        });
        console.log(id);
    }

    function getSelectedBox(id) {
        return boxes.find(box => box.id === id);
    }

    function map() {
        if (selectedBox !== null) {
            setMapScreen(true);
        }
    }

    const selectPage = (id, page) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                if (page === -1) {
                    console.log('Selected to not map to a page');
                    let newBoxes = boxes.map(box =>
                        box.id === id ? {...box, page: ''} : box
                    )
                    setBoxes(newBoxes);
                } else {
                    console.log(`Selected page with id ${page}`);
                    let newBoxes = boxes.map(box =>
                        box.id === id ? {...box, page: page} : box
                    )
                    setBoxes(newBoxes);
                }
                setPageMapping(false);
                setHomeMapScreen(true);
        }).runOnJS(true);
    }

    const selectVariable = (variable) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                let updatedFunctions =[...functions];
                const functionIndex = updatedFunctions.findIndex(func => func.id === selectedFunctionId);
                if (functionIndex !== -1) {
                    updateVariables(updatedFunctions[functionIndex].newVarName, '');
                    updatedFunctions[functionIndex].varName = variable.name;
                    updatedFunctions[functionIndex].newVarName = '';
                    setFunctions(updatedFunctions);
                }
        }).runOnJS(true)
    }

    const addFunction = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            if (selectedBox !== null) {
                let newFunctions = [...functions, {id: nextFunctionId, operation: '', amount: 0, varName: '', newVarName: ''}];
                let nextFunction = nextFunctionId + 1;
                setNextFunctionId(nextFunction);
                setFunctions(newFunctions);
            }
    }).runOnJS(true);

    const deleteFunction = (id) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                setFunctions(functions.filter(box => box.id !== id));
                setOptionId(null);
                setFunctionOptions(false);
        }).runOnJS(true)
    }

    const setFunctionOperation = (operation) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                let newFunctions = functions.map(func => 
                    func.id === selectedFunctionId ? {...func, operation: operation} : func  
                )
                setFunctions(newFunctions);
        }).runOnJS(true);
    }

    function updateVariables(prevName, name) {
        let updatedVariables = [...variables];
        const prevNameIndex = variables.findIndex(variable => variable.name === prevName);
        if (prevNameIndex !== -1) {
            if (name !== '') {
                updatedVariables[prevNameIndex].name = name;
                boxes.forEach(box => {
                    if (box.functions) {
                        box.functions.forEach(func => {
                            if (func.varName === prevName) {
                                func.varName = name;
                            }
                        })
                    }
                })
                setBoxes([...boxes])
            } else {
                updatedVariables.splice(prevNameIndex, 1);
            }
        } else if (name !== '') {
            updatedVariables.push({name: name, id: nextFunctionId});
            let nextVariable = nextVariableId + 1;
            setNextVariableId(nextVariable);
        }

        setVariables(updatedVariables);
    }

    const closeMapScreen = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            setMapScreen(false);
    }).runOnJS(true);

    const openPageMapping = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            setPageMapping(true);
            setHomeMapScreen(false);
    }).runOnJS(true);

    const openHomeMapScreen = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            setHomeMapScreen(true);
            setPageMapping(false);
            setFunctionMapping(false);
    }).runOnJS(true);

    const openFunctionMapping = (functionId) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                setSelectedFunctionId(functionId);
                setFunctionMapping(true);
                setHomeMapScreen(false);
        }).runOnJS(true);
    }

    const options = (functionId) => {
        return Gesture.Tap()
            .maxDuration(250)
            .onStart(() => {
                if (functionId === optionId) {
                    console.log(`Open options for ${functionId}`);
                    setFunctionOptions(!functionOptions);
                    setOptionId(functionId);
                } else {
                    console.log(`Close options for ${functionId}`);
                    setFunctionOptions(true);
                    setOptionId(functionId);
                }
        }).runOnJS(true);
    }

    useEffect(() => {
        if (mapScreen === true) {
            mapScreenHeight.value = withTiming(Dimensions.get('window').height / 2);
        } else {
            mapScreenHeight.value = withTiming(0);
        }
    }, [mapScreen])

    const mapScreenStyle = useAnimatedStyle(() => ({
        height: mapScreenHeight.value,
        width: '100%',
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#312541',
        zIndex: 4
    }))

    useEffect(() => {
        if (isLoading === true) {
            setTimeout(() => {
                setIsLoading(false);
            }, 350)
        }
    }, [])

    const back = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            navigation.goBack();
    }).runOnJS(true);

    const undo = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            undoLastAction();
    }).runOnJS(true);

    const redo = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            redoLastAction();
    }).runOnJS(true);

    return(
        <View style={{width: '100%', height: '100%'}}>

            {isLoading && boxes.length !== 0 && 
                <Modal style={{flex: 1}}>
                    <View style={{flex: 1, backgroundColor: '#000000'}}>
                        <ActivityIndicator color='#ffffff'  size='large' style={{flex: 1}}>

                        </ActivityIndicator>
                    </View>
                </Modal>
            }

            <View style={{position: 'absolute', left: 0, top: 0, width: '100%', height: 50, backgroundColor: '#000000', justifyContent: 'center'}}>
                <GestureDetector gesture={back}>
                    <View style={{position: 'absolute', left: 20, top: 5, width: 40, height: 40}}>
                        <MaterialIcons name='arrow-back' size={40} color='#e2e3e6'/>
                    </View>
                </GestureDetector>
                
                <Text style={{marginLeft: 70, fontSize: 34, color: '#e3e2e6'}}>{!isLoading ? matchForms.find(page => page.id === matchFormId).name : 'Loading...'}</Text>

                <GestureDetector gesture={undo}>
                    <View style={{position: 'absolute', right: 90, top: 5, width: 40, height: 40}}>
                        <MaterialIcons name='undo' size={40} color={history.length > 0 ? '#e2e3e6' : '#8e9099'}/>
                    </View>
                </GestureDetector>

                <GestureDetector gesture={redo}>
                    <View style={{position: 'absolute', right: 40, top: 5, width: 40, height: 40}}>
                        <MaterialIcons name='redo' size={40} color={redoHistory.length > 0 ? '#e2e3e6' : '#8e9099'}/>
                    </View>
                </GestureDetector>
            </View>

            <Animated.View style={mapScreenStyle}>
                {homeMapScreen && 
                    <>
                        <GestureDetector gesture={closeMapScreen}>
                            <View style={{width: 50, height: 50, position: 'absolute', top: 10, left: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                <MaterialIcons name='check' size={50} color='#312541'/>
                            </View>
                        </GestureDetector>

                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Mapping</Text>

                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', left: 10, top: 70}}>Page</Text>

                        {selectedBox !== null && 
                            <GestureDetector gesture={openPageMapping}>
                                <View style={{width: '95%', height: 50, position: 'absolute', left: '2.5%', top: 120, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                    {getSelectedBox(selectedBox)?.page === '' ? 
                                        <>
                                            <MaterialIcons name='not-interested' size={50} style={{paddingLeft: 10, color: '#312541'}}/>

                                            <Text style={{position: 'absolute', left: 70, top: 6.25, color: '#312541', fontSize: 25}}>Stay on current page</Text>
                                        </>
                                    : 
                                        <Text style={{position: 'absolute', left: 10, top: 6.25, color: '#312541', fontSize: 25}}>{matchForms.find(page => page.id === getSelectedBox(selectedBox)?.page) ? matchForms.find(page => page.id === getSelectedBox(selectedBox)?.page).name : 'Error'}</Text>
                                    }
                                </View>
                            </GestureDetector>
                        }

                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', left: 10, top: 170}}>Function</Text>

                        <GestureDetector gesture={addFunction}>
                            <View style={{flexDirection: 'row', height: 34, backgroundColor: '#aa8dce', marginLeft: 170, marginTop: 178.5, marginRight: 10, borderRadius: 10}}>
                                <MaterialIcons name='add' size={34} marginLeft={20}/>

                                <Text style={{fontSize: 17, color: '#312541', marginTop: 4.25, marginLeft: 10, fontWeight: 'bold'}}>Add Function</Text>
                            </View>
                        </GestureDetector>

                        {selectedBox === null && 
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
                            {functions.map((func, index) => (
                                <View key={func.id} style={{flex: 1}}>
                                    <GestureDetector gesture={options(func.id)}>
                                        <View style={{width: 25, height: 50, position: 'absolute', top: 0, right: 20, zIndex: 1}}>
                                            <View style={{position: 'absolute', right: -12.5, width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                                                <MaterialIcons name='more-vert' size={50} color={'#312541'}/>
                                            </View>
                                        </View>
                                    </GestureDetector>

                                    {functionOptions && optionId === func.id && 
                                        <GestureDetector gesture={deleteFunction(func.id)}>
                                            <View style={{width: 100, height: 35, position: 'absolute', right: 25, top: 25, zIndex: 3, backgroundColor: '#aa8dce', borderRadius: 10, borderWidth: 5, borderColor: '#312541', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                                                <Text style={{fontSize: 17.5, color: '#312541'}}>Delete</Text>

                                                <MaterialIcons name='delete' size={17.5} color='#312541'/>
                                            </View>
                                        </GestureDetector>
                                    }

                                    <GestureDetector gesture={openFunctionMapping(func.id)}>
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

                {pageMapping && 
                    <>
                        <GestureDetector gesture={openHomeMapScreen}>
                            <View style={{width: 50, height: 50, position: 'absolute', left: 10, top: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                <MaterialIcons name='arrow-back' size={50} style={{color: '#312541'}}/>
                            </View>
                        </GestureDetector>

                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Pages</Text>

                        <ScrollView style={{flex: 1, marginTop: 70}}>
                            <GestureDetector gesture={selectPage(selectedBox, -1)}>
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

                            {matchForms.map((matchForm, index) => (
                                <GestureDetector key={matchForm.id} gesture={selectPage(selectedBox, matchForm.id)}>
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
                                            {matchForm.name}
                                        </Text>
                                    </View>
                                </GestureDetector>
                            ))}
                        </ScrollView>
                    </>
                }

                {functionMapping && 
                    <>
                        <GestureDetector gesture={openHomeMapScreen}>
                            <View style={{width: 50, height: 50, position: 'absolute', left: 10, top: 10, backgroundColor: '#aa8dce', borderRadius: 10}}>
                                <MaterialIcons name='arrow-back' size={50} style={{color: '#312541'}}/>
                            </View>
                        </GestureDetector>

                        <Text style={{fontSize: 34, color: '#e3e2e6', position: 'absolute', top: 10, left: 70}}>Function</Text>

                        <ScrollView style={{marginTop: 70, marginBottom: 20}}>
                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Variable:     {functions.find(func => func.id === selectedFunctionId).varName}</Text>

                            {variables.length !== 0 && <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>Existing Variables</Text>}

                            {variables
                                .filter(variable => {
                                    const selectedFunction = functions.find(func => func.id === selectedFunctionId);
                                    return selectedFunction ? variable.name !== selectedFunction.newVarName : true;
                                })
                                .map((variable, index) => (
                                    <GestureDetector key={variable.id} gesture={selectVariable(variable)}>
                                        <View style={{flex: 1, height: 50, marginLeft: 10, marginRight: 10, marginBottom: 20, justifyContent: 'center', backgroundColor: '#aa8dce', borderRadius: 10}}>
                                            <Text style={{fontSize: 34, marginLeft: 10}}>{variable.name}</Text>
                                        </View>
                                    </GestureDetector>                                
                            ))}

                            <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>New Variable</Text>

                            <View style={{width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10, justifyContent: 'center', borderRadius: 10, borderWidth: 2.5, borderColor: '#aa8dce'}}>
                                <TextInput style={{color: '#aa8dce', fontSize: 34, marginLeft: 10}} defaultValue={[...functions].findIndex(func => func.id === selectedFunctionId) !== -1 ? [...functions][[...functions].findIndex(func => func.id === selectedFunctionId)].newVarName : ''} onChangeText={text => {
                                    const variableExists = variables.some(variable => variable.name === text);
                                    if (!variableExists) {
                                        let updatedFunctions =[...functions];
                                        const functionIndex = updatedFunctions.findIndex(func => func.id === selectedFunctionId);
                                        if (functionIndex !== -1) {
                                            updateVariables(updatedFunctions[functionIndex].newVarName, text);
                                            updatedFunctions[functionIndex].varName = text;
                                            updatedFunctions[functionIndex].newVarName = text;
                                            setFunctions(updatedFunctions);
                                        }
                                    } else {
                                        alert('Variable name already exists');
                                    }
                                }}/>
                            </View>

                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Operation:   {functions.find(func => func.id === selectedFunctionId).operation === 'add' ? '+' : functions.find(func => func.id === selectedFunctionId).operation === 'subtract' ? '-' : ''}</Text>

                            <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10}}>
                                <GestureDetector gesture={setFunctionOperation('add')}>
                                    <View style={{width: Dimensions.get('window').width / 2 - 15, height: 50, backgroundColor: '#aa8dce', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={{fontSize: 34, color: '#312541'}}>Add</Text>

                                        <MaterialIcons name='add' size={34} color={'#312541'}/>
                                    </View>
                                </GestureDetector>

                                <GestureDetector gesture={setFunctionOperation('subtract')}>
                                    <View style={{width: Dimensions.get('window').width / 2 - 15, marginLeft: 10, height: 50, backgroundColor: '#aa8dce', borderRadius: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                        <Text style={{fontSize: 34, color: '#312541'}}>Subtract</Text>

                                        <MaterialIcons name='remove' size={34} color={'#312541'}/>
                                    </View>
                                </GestureDetector>
                            </View>

                            <Text style={{fontSize: 34, color: '#e3e2e6', marginLeft: 10}}>Amount:   {functions.find(func => func.id === selectedFunctionId).amount}</Text>

                            <Text style={{fontSize: 17, color: '#aa8dce', marginLeft: 10}}>Input Value</Text>

                            <View style={{width: Dimensions.get('window').width - 20, height: 50, marginLeft: 10, marginBottom: 5, justifyContent: 'center', borderRadius: 10, borderWidth: 2.5, borderColor: '#aa8dce'}}>
                                <TextInput style={{color: '#aa8dce', fontSize: 34, marginLeft: 10}} inputMode='numeric' defaultValue={JSON.stringify(functions.find(func => func.id === selectedFunctionId).amount)} onChangeText={value => {
                                    if (value === '') {
                                        numberValue = 0;
                                    } else {
                                        numberValue = parseFloat(value);
                                    }
                                    console.log(numberValue);
                                    if (isNaN(numberValue) || value.match(/[^0-9.]/)) {
                                        alert('Amount not a number');
                                    } else {
                                        let updatedFunctions = [...functions];
                                        const functionIndex = updatedFunctions.findIndex(func => func.id === selectedFunctionId);
                                        if (functionIndex !== -1) {
                                            updatedFunctions[functionIndex].amount = numberValue;
                                            setFunctions(updatedFunctions);
                                        }
                                    }
                                }}/>
                            </View>
                        </ScrollView>
                    </>
                }
            </Animated.View>

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
            toggleItalic={toggleItalic}
            map={map}
            
            resetStorage={resetStorage}/>
    </View>
    )
}