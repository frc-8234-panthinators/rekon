import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { useColors } from '../../colors';
import { MaterialIcons } from '@expo/vector-icons';

const InfoPopup = ({ visible, children, onClose }) => {
  const { Colors } = useColors();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => onClose()}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <View
          style={{
            backgroundColor: Colors.secondary,
            padding: 20,
            borderRadius: 10,
            width: '80%',
          }}
        >
        {children}
        <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity style={{backgroundColor: Colors.tabSelected, marginTop: 10, marginBottom: -10, marginRight: -10, padding: 15, paddingTop: 5, paddingBottom: 5, borderRadius: 5}} onPress={() => onClose()}>
                <Text style={{color: Colors.textDim, fontSize: 20}}>Ok</Text>
            </TouchableOpacity>
        </View>
        </View>
      </View>
    </Modal>
  );
};

export default InfoPopup;