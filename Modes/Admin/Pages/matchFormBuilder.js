import { StyleSheet, Text, View, Pressable, Dimensions, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Box from '../Components/v2Components/moveableBoxv2';
import ToolBar from '../Components/v2Components/editBar';


export default function MatchFormLayout(){
  const [boxes, setBoxes] = useState([{id: 0, x: 0, y: 0}]);

  function addBox() {
      let newBoxes = [...boxes, {id: boxes.length, x: 0, y: 0}];
      setBoxes(newBoxes);
  }

  useEffect(() => {
      console.log(`${new Date().toISOString()} - Boxes:`, boxes);
  }, [boxes]);

  function moveBox(id, newX, newY) {
      let newBoxes = boxes.map(box => 
          box.id === id ? {...box, x: newX, y: newY} : box
      );
      setBoxes(newBoxes);
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
                    moveBox={moveBox} 
                    boxes={boxes}
                />
              )
          })}
          
          <ToolBar add={addBox}/>
      </View>
  )
}