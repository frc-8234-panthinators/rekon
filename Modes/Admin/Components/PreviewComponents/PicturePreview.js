import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, StyleSheet, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

export default function PicturePreview(props) {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageDimensions, setImageDimensions] = useState({width: 1, height: 1});

    const handleImageSelection = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
            alert('Sorry, we need camera and gallery permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const asset = result.assets[0];
            const resolvedSource = Image.resolveAssetSource(asset);
            const { width, height } = resolvedSource;

            setSelectedImage(asset.uri);
            setImageDimensions({ width, height });
        }
    };

    const handleImageLoad = (event) => {
        console.log('it was called!!!');
        const { width, height } = event.nativeEvent.source;
        console.log(`Image dimensions: ${width}x${height}`);
        setImageDimensions({ width, height });
    }

    return (
        <View style={styles.pictureSectionContainer}>
            <View style={{ flex: 1 }}>
                <Text style={styles.header}>{props.question}</Text>
                {selectedImage ? (
                    <Pressable onPress={handleImageSelection} style={[styles.imagePressable]}>
                        <Image
                            source={{ uri: selectedImage }} 
                            style={[styles.image, { aspectRatio: imageDimensions.width / imageDimensions.height, }]} 
                            onLoad={handleImageLoad}
                        />
                    </Pressable>
                ) : (
                    <View style={styles.uploadBox}>
                        <Pressable style={styles.cameraIcon} onPress={handleImageSelection}>
                            <MaterialIcons name="file-upload" size={30}/>
                            <View style={{justifyContent: 'center'}}><Text style={{fontSize: 20}}>Upload Image</Text></View>
                        </Pressable>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pictureSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    header: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
    },
    pictureQuestion: {
        backgroundColor: '#E3E2E6',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginRight: 5,    
    },
    uploadBox: {
        backgroundColor: '#E3E2E6',
        borderWidth: 1,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
        marginRight: 5,
        justifyContent: 'center',
    },
    cameraIcon: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        alignSelf: 'center',
        padding: 5,
        borderRadius: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        height: undefined,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    imagePressable: {
        width: '100%',
        maxHeight: '100%',
        alignContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        alignSelf: 'center',
    }

});