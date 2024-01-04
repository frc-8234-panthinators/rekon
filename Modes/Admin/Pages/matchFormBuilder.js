import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Box from '../Components/v2Components/moveableBoxv2';
import ToolBar from '../Components/v2Components/editBar';


export default function MatchFormLayout(){
    const [boxes, setBoxes] = useState([]);
    function addBox() {
        //let newBoxes = boxes.push({});
        let newBoxes = [...boxes, {}];
        setBoxes(newBoxes);
    }

    function removeBox(id) {
        //setBoxes(prevBoxes => prevBoxes.filter(box => box.id !== id));
        setBoxes(prevBoxes => prevBoxes.filter((_, index) => index !== id));
        console.log(id)
       }

    const [selectedBox, setSelectedBox] = useState(null);

    function handleBoxSelect(id) {
        //setSelectedBox(prevId => prevId === id ? null : id);
        console.log(id)
     }
    return(
        <View style={{width: '100%', height: '100%'}}>
            {boxes.map((box, index) => {
                return (
                    <Box key={index} id={index} selectedBox={selectedBox} onSelect={handleBoxSelect} />
                )
            })}
            
            <ToolBar add={addBox} remove={removeBox} selectedBox={selectedBox}/>
        </View>
    )
}