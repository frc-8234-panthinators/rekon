import React, { useState, useEffect } from 'react';
import { Pressable, TextInput, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function SliderSection(props) {
    const [ valuesCorrect, setValuesCorrect ] = useState(true);
    const [minimumValue, setMinimumValue] = useState(null);
    const [maximumValue, setMaximumValue] = useState(null);

    useEffect(() => {
        setMinimumValue(props.minimum);
        setMaximumValue(props.maximum);
    }, [props.minValue, props.maximum]);

    const editMin = (input) => {
        setValuesCorrect(true);
        const newInt = input.replace(/[^0-9]/g, '');
        setMinimumValue(newInt);
    }

    const editMax = (input) => {
        setValuesCorrect(true);
        const newInt = input.replace(/[^0-9]/g, '');
        setMaximumValue(newInt);
    }

    const compareValues = () => {
        var minValue = parseInt(minimumValue, 10);
        var maxValue = parseInt(maximumValue, 10);
        if (minimumValue && maximumValue) {
            console.log('values exist!')
            if (minValue < maxValue) {
                props.onChangeMax(maximumValue);
                props.onChangeMin(minimumValue);
                setValuesCorrect(true);
            } else {
                setMinimumValue(props.minimum);
                setMaximumValue(props.maximum);
                console.log('can not')
                setValuesCorrect(false);
            }
        } else {
            props.onChangeMax(maximumValue);
            props.onChangeMin(minimumValue);
            setValuesCorrect(true);
        }
    }

    return(
        <View style={styles.sliderSectionContainer}>
            <View style={{ flexDirection: 'colummn', flex: 1, }}>
                <Text style={styles.header}>Slider Section</Text>
                <TextInput
                    placeholder="Question"
                    value={props.question}
                    onChangeText={props.onChangeQuestion}
                    style={styles.sliderQuestion}
                />

                <Text style={{color: 'white'}}>
                    <Text>Set min and max values - </Text>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Required</Text>
                </Text>
                <View style={styles.limitsContainer}>
                    <TextInput //set minimum value
                        placeholder="min"
                        value={minimumValue}
                        onChangeText={editMin}
                        onEndEditing={compareValues}
                        style={styles.limits}
                        inputMode='numeric'
                    />
                    <TextInput //set maximum value
                        placeholder="max"
                        value={maximumValue}
                        onChangeText={editMax}
                        onEndEditing={compareValues}
                        style={styles.limits}
                        inputMode='numeric'
                    />
                </View>
                    {!valuesCorrect && <Text style={styles.warning}>Minimum has to be less than Maximum</Text>}
            </View>
            <MaterialIcons name="delete" size={30} color="red" onPress={props.onDelete} />
        </View>
    )
}

const styles = StyleSheet.create ({
    sliderSectionContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        marginBottom: 5,
        fontSize: 20,
        color: 'white'
    },
    sliderQuestion: {
        backgroundColor: '#E3E2E6',
        padding: 10,
        fontSize: 20,
        borderRadius: 10,
        marginRight: 5,   
        marginBottom: 10, 
    },
    limits: {
        backgroundColor: '#E3E2E6',
        padding: 10,
        fontSize: 15,
        borderRadius: 10,
        width: 50,    
        marginBottom: 10,
        marginHorizontal: 50,
    },
    limitsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    warning: {
        color: 'red',
        marginHorizontal: 5,
    },
})