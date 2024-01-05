import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Box from '../Components/v2Components/moveableBoxv2';
import ToolBar from '../Components/v2Components/editBar';


export default function MatchFormLayout(){


    const [nextBoxId, setNextBoxId] = useState(0);


    const [boxes, setBoxes] = useState([]);
    function addBox() {
        //let newBoxes = boxes.push({});
        let newBoxes = [...boxes, {id: nextBoxId, x: 0, y: 0, width: 100, height: 100}];
        let nextBox = nextBoxId + 1
        setNextBoxId(nextBox)
        setBoxes(newBoxes);
    }

    function removeBox() {
        setBoxes(boxes.filter(box => box.id !== selectedBox));
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

    function duplicate() {

        let newBoxes = [...boxes, {id: nextBoxId}];
        let nextBox = nextBoxId + 1
        setNextBoxId(nextBox)
        setBoxes(newBoxes);

       }

    const [selectedBox, setSelectedBox] = useState(null);

    function handleBoxSelect(id) {
        setSelectedBox(prevId => prevId === id ? null : id);
        console.log(id)
     }
    return(
        <View style={{width: '100%', height: '100%'}}>
            {boxes.map((box, index) => {
                return (
                    <Box 
                    
                    key={box.id} 
                    id={box.id} 
                    x={box.x} 
                    y={box.y} 
                    boxHeight={box.height} 
                    boxWidth={box.width} 
                    selectedBox={selectedBox} 
                    onSelect={handleBoxSelect} 
                    onRemove={removeBox} 
                    onMove={setBoxPos} 
                    onScale={setBoxScale}/>
                )
            })}
            
            <ToolBar add={addBox} remove={removeBox} selectedBox={selectedBox}  duplicate={duplicate}/>
        </View>
    )
}