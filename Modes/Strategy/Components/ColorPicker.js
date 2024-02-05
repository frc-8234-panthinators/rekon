import React, { useState } from 'react';
import { Modal, View, Pressable, Text } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { useColors } from '../../../colors';

const ColorPickerPopup = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#000000');
    const { Colors } = useColors();

    const changeColor = props.handleChange;
    const defaultColor = props.defaultColor;

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleSaveColor = () => {
        changeColor(selectedColor);
        setModalVisible(false);
    };

    return (
        <View style={{flex: 1}}>
            <Pressable style={{backgroundColor: defaultColor, padding: 15, borderRadius: 10, flex: 1}} onPress={() => setModalVisible(true)}></Pressable>
            <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, padding: 20, gap: 20, backgroundColor: Colors.primary}}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <View style={{width: '50%', height: 50, backgroundColor: defaultColor}}></View>
                        <View style={{width: '50%', height: 50, backgroundColor: selectedColor}}></View>
                    </View>
                    <ColorPicker
                        color={defaultColor}
                        onColorChange={handleColorChange}
                        style={{ flex: 1 }}
                    />
                    <View style={{flexDirection: 'row', width: '100%', gap: 10}}>
                        <Pressable style={{backgroundColor: Colors.text, padding: 15, borderRadius: 10, alignItems: 'center', width: '49%'}} onPress={() => setModalVisible(false)}><Text style={{fontSize: 20, color: Colors.primary}}>Cancel</Text></Pressable>
                        <Pressable style={{backgroundColor: Colors.text, padding: 15, borderRadius: 10, alignItems: 'center', width: '49%'}} onPress={handleSaveColor}><Text style={{fontSize: 20, color: Colors.primary}}>Save Color</Text></Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ColorPickerPopup;

