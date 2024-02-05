import * as React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, TouchableOpacity, Dimensions } from 'react-native';
import { useColors } from '../../../colors';
import { useState } from 'react';
import ky from 'ky';
import Constants from '../../../constants';
import { normalize } from '../../CommonComponents/fontScaler';
import { debounce } from 'lodash';



export default function Search(props) {
    const { Colors } = useColors();
    const [searchResults, setSearchResults] = useState([]);
    
    const debouncedGetSearchResults = debounce(getSearchResults, 100);
    
    async function getSearchResults(text) {
        const results = await ky.get(`${Constants.API_URL}/searchV2?search=${text}`).json();
        setSearchResults(results);
    }
    
    function navigateToYearPick(text) {
        if (text == '') {
            text = searchResults[0].item.team_number;
        }
        props.navigation.navigate('YearPicker', {teamId: text});
    }

    const styles = StyleSheet.create({
        rootView: {
            backgroundColor: Colors.primary,
            width: '100%',
            minHeight: '100%',
            display: 'flex',
            padding: 10,
            alignItems: 'center',
        },
        search: {
            backgroundColor: Colors.secondary,
            color: Colors.text,
            padding: 10,
            height: Dimensions.get('window').height * 0.10,
            width: '100%',
            borderRadius: 10,
            fontSize: Dimensions.get('window').height * 0.05,
        },
        buttonText: {
            color: Colors.textDim,
            fontSize: normalize(15),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            zIndex: 2,
            marginTop: 10,
        },
        teamNumber: {
            color: Colors.text,
            fontSize: normalize(20),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            zIndex: 2,
        },
        buttonHeader: {
            color: Colors.text,
            fontSize: normalize(20),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            zIndex: 2,
        },
        event: {
            backgroundColor: Colors.secondary,
            minHeight: Dimensions.get('window').height * 0.10,
            width: '100%',
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 20
        },
        searchResults: {
            width: '100%',
            display: 'flex',
            gap: 0,
            marginBottom: 20,
            marginTop: 10,
        }
    });

    return (
        <View style={styles.rootView}>
            <TextInput style={styles.search} placeholder="Search" placeholderTextColor={Colors.text} onSubmitEditing={text => navigateToYearPick('')} onChangeText={text => {debouncedGetSearchResults(text)}}/>
            <ScrollView vertical={true} style={styles.searchResults} contentContainerStyle={{alignItems: 'center',}}>
                {searchResults.map((result, index) => {
                    const team = result.item;
                    return (
                        <TouchableOpacity style={[styles.event, index == 0 && {borderTopLeftRadius: 10, borderTopRightRadius: 10}, index == 4 && {borderBottomLeftRadius: 10, borderBottomRightRadius: 10}, index != 4 && {borderBottomColor: Colors.border, borderBottomWidth: 2,}]} onPress={() => {navigateToYearPick(team.team_number)}}>
                            <Text style={styles.teamNumber}>{team.team_number}</Text>
                            <View>
                                <Text style={styles.buttonHeader}>{team.nickname}</Text>
                                <Text numberOfLines={2} style={[styles.buttonText, {fontStyle: 'italic',}]}>{team.city}, {team.state_prov}, {team.country}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    )
    
}