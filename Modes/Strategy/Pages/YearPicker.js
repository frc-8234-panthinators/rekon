import * as React from 'react';
import { StyleSheet, Text, ActivityIndicator, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../../../colors';
import { useState, useEffect } from 'react';
import ky from 'ky';
import Constants from '../../../constants'
import { LinearGradient } from 'expo-linear-gradient';
import { normalize } from '../../CommonComponents/fontScaler';



export default function YearPicker({ route, navigation }) {
    const team = route.params.teamId;
    const [yearData, setYearData] = useState([]);
    const [yearImages, setYearImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [doesTeamExist, setDoesTeamExist] = useState(true);
    const [serverMessage, setServerMessage] = useState('');

    function navigateToEventPick(year) {
        navigation.navigate('EventPicker', {teamId: team, year: year});
    }

    useEffect(() => {
        const displayImages = true;
        const fetchData = async () => {
            try {
                const data = await ky.get(`${Constants.API_URL}/getTeamYears?team=${team}`).json();
                setYearData(data.reverse());
                if (displayImages) {
                    let imageList = [];
                    for (const year of data) {
                        const images = await ky.get(`${Constants.API_URL}/getTeamMedia?team=${team}&year=${year}`).json();
                        if (images.message == 'build_cache') {
                            setServerMessage('Building cache, please wait...');
                        }
                        if (images.media != 'no_media') {
                            imageList.push(images.media);
                        } else {
                            imageList.push('no_media');
                        }
                    }
                    console.log(imageList);
                    setYearImages(imageList);
                }
            } catch (error) {
                if (error.name == 'TypeError') {
                    setDoesTeamExist(false);
                } else {   
                    navigation.navigate('ErrorPage', {error: error.name + '\n' + error.message});
                }
            }
            setIsLoading(false);
        };
        fetchData();
    }, [team]);

    if (!doesTeamExist) {
        return (
            <View style={styles.rootView}>
                <Text style={styles.errorText}>Team does not exist</Text>
            </View>
        )
    }

    if (isLoading) {
        return (
            <View style={styles.center}>
                <Text style={styles.messageText}>{serverMessage}</Text>
                <ActivityIndicator size={Dimensions.get('window').width*0.6} color={Colors.text} />
            </View>
        ) 
    }

    return (
        <ScrollView vertical={true} contentContainerStyle={styles.rootView}>
            <View style={styles.padding}>
                {yearData.map((year, index) => {
                    return (
                        <TouchableOpacity style={styles.year} onPress={() => {navigateToEventPick(year)}}>
                            {yearImages[index] !== "no_media" ? (
                                <View style={styles.imageContainer}>
                                    <LinearGradient
                                        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0)']}
                                        style={styles.gradientText}
                                    />
                                    <Image
                                        source={{ uri: yearImages[index] }}
                                        style={styles.cardImage}
                                    />
                                </View>
                            ) : null}
                            <Text style={styles.buttonText}>{year}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: Colors.primary,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    center: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    padding: {
        width: '90%',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    year: {
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        height: Dimensions.get('window').height * 0.3,
        width: '100%',
    },
    buttonText: {
        color: Colors.text,
        fontSize: normalize(50),
        paddingLeft: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        zIndex: 2,
    },
    errorText: {
        color: Colors.text,
        padding: 5,
        fontSize: normalize(30),
    },
    messageText: {
        color: Colors.text,
        padding: 5,
        fontSize: normalize(24),
    },
    cardImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10,
    },
    gradientText: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        borderRadius: 10,
        zIndex: 1,
    }
});