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
    return(
        <View style={{width: '100%', height: '100%'}}>
            {boxes.map((box, index) => {
                return (
                    <Box key={index} />
                )
            })}
            
            <ToolBar add={addBox}/>
        </View>
    )
}