import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Dimensions } from 'react-native';
import { Gesture, GestureDetector, ScrollView, TextInput } from 'react-native-gesture-handler';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';

export default function Teamates() {
    const [scouts, setScouts] = useState([]);
    const [admins, setAdmins] = useState([])
    const [adderOpen, setAdderOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [temporaryName, setTemporaryName] = useState('');
    const [teamateType, setTeamateType] = useState('Scout');
    const [nextId, setNextId] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            AsyncStorage.getItem('scouts').then(jsonValue => {
                const scouts = jsonValue !== null ? JSON.parse(jsonValue) : [];
                setScouts(scouts);
            }).catch(error => {
                console.error('Failed to fetch scouts:', error);
            })

            AsyncStorage.getItem('admins').then(jsonValue => {
                const admins = jsonValue !== null ? JSON.parse(jsonValue) : [];
                setAdmins(admins);
            }).catch(error => {
                console.error('Failed to fetch admins:', error);
            })
        }, [])
    )

    useEffect(() => {
        const jsonValue = JSON.stringify(scouts);
        AsyncStorage.setItem('scouts', jsonValue).then(() => {
            console.log('Updated scouts successfully');
        }).catch(error => {
            console.error('Failed to store updated scouts:', error);
        })
    }, [scouts])

    useEffect(() => {
        const jsonValue = JSON.stringify(admins);
        AsyncStorage.setItem('admins', jsonValue).then(() => {
            console.log('Updated admins successfully');
        }).catch(error => {
            console.error('Failed to store updated admins:', error);
        })
    }, [admins])

    const goToTeamate = (id) => {
        console.log(`Going to teamate with id ${id}`);
    }

    const isNameUsed = (name) => {
        return scouts.some(scout => scout.name === name) || 
          admins.some(admin => admin.name === name);
      }

    const addTeamate = (type) => {
        if (temporaryName.trim() !== '' && !isNameUsed(temporaryName)) {
            console.log(`Creating a new ${type} form with the name of ${temporaryName}`);
            let newTeamate = {id: nextId, name: temporaryName, teamsAssigned: []};
            if (type === 'Scout') {
              setScouts([...scouts, newTeamate]);
            } else if (type === 'Admin') {
              setAdmins([...admins, newTeamate]);
            }
            setNextId(prevNextId => prevNextId + 1);
            setAdderOpen(false);
            setTemporaryName('');
            setTeamateType('Scout');
            console.log(`adding teamate with type ${type}`);
          } else if (temporaryName.trim() === '') {
            alert('Name cannot be blank');
          } else {
            alert('Name is already used');
          }
    }

    const openAdder = Gesture.Tap()
        .maxDuration(250)
        .onStart(() => {
            console.log('Opening adder');
            setAdderOpen(true);
    }).runOnJS(true);

    return(
        <View style={{flex: 1, backgroundColor: '#000000'}}>
            <Text style={{position: 'absolute', left: 10, fontWeight: '500', fontSize: 34, color: '#e3e2e6'}}>Teamates</Text>

            {adderOpen && 
                <Modal transparent={true}>
                    <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}} />

                    {dropdownOpen && 
                        <>
                            <Pressable style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, backgroundColor: '#000000', opacity: 0.5}} onPress={() => {setDropdownOpen(false);}} />

                            <View style={{position: 'absolute', top: Dimensions.get('window').height / 2 - 100, right: 10, width: 200, height: 130, backgroundColor: '#aa8dce', borderRadius: 10, zIndex: 11}}>
                                <Pressable onPress={() => {setTeamateType('Scout'); setDropdownOpen(false);}}>
                                    <View style={{marginTop: 0, height: 65}}>
                                        <MaterialIcons name='person' size={25} color='#312541' style={{position: 'absolute', top: 15, left: 10}}/>
                                        
                                        <Text style={{position: 'absolute', right: 0, top: 10, width: 150, fontSize: 24, color: '#312541'}}>Scout</Text>

                                        <View style={{position: 'absolute', right: 0, top: 40, width: 150}}>
                                            <Text style={{fontSize: 12, color: '#312541'}}>Data analysis and collection only</Text>
                                        </View>
                                    </View>
                                </Pressable>

                                <Pressable onPress={() => {setTeamateType('Admin'); setDropdownOpen(false);}}>
                                    <View style={{marginTop: 5, height: 55}}>
                                        <MaterialIcons name='key' size={25} color='#312541' style={{marginLeft: 10, marginTop: 5}}/>

                                        <Text style={{position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: '#312541'}}>Admin</Text>

                                        <View style={{position: 'absolute', right: 0, top: 30, width: 150}}>
                                            <Text style={{fontSize: 12, color: '#312541'}}>All privilages</Text>
                                        </View>
                                    </View>
                                </Pressable>
                            </View>
                        </>
                    }

                    <View style={{position: 'absolute', top: Dimensions.get('window').height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#312541', borderRadius: 10, zIndex: 10}}>
                        <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, width: Dimensions.get('window').width - 150, borderRadius: 10, borderWidth: 2, borderColor: '#aa8dce', justifyContent: 'center'}}>
                            <TextInput
                                style={{color: '#aa8dce', fontSize: 24, marginLeft: 10}}
                                autoFocus
                                defaultValue={temporaryName}
                                placeholder='Teamate Name'
                                placeholderTextColor='#aa8dce'
                                onChangeText={text => {
                                setTemporaryName(text);
                                console.log(`temporaryName: ${text}`);
                                }}
                            />
                        </View>

                        <Pressable style={{position: 'absolute', top: 10, right: 0, height: 50, width: 115, justifyContent: 'center'}} onPress={() => setDropdownOpen(true)}>
                            <MaterialIcons name={teamateType === 'Scout' ? 'person' : teamateType === 'Admin' ? 'key' : ''} size={25} color='#aa8dce'/>

                            <Text style={{position: 'absolute', top: teamateType === 'Scout' ? 6.25 : teamateType === 'Admin' ? 10.25 : 14, left: 30, fontSize: teamateType === 'Scout' ? 25 : teamateType === 'Admin' ? 20 : 13.5, color: '#aa8dce'}}>{teamateType}</Text>

                            <MaterialIcons name='arrow-drop-down' size={35} color='#aa8dce' position='absolute' right={0}/>
                        </Pressable>

                        <Pressable style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setAdderOpen(false); setTemporaryName(''); setTeamateType('Scout');}}>
                            <Text style={{fontSize: 20, color: '#aa8dce'}}>Cancel</Text>
                        </Pressable>

                        <Pressable style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => addTeamate(teamateType)}>
                            <Text style={{fontSize: 20, color: '#aa8dce'}}>Create</Text>
                        </Pressable>
                    </View>
                </Modal>
            }

            <ScrollView vertical={true} style={{marginTop: 60}}>
                <View>
                    <Text style={{marginLeft: 10, fontSize: 30, fontWeight: '500', color: '#e3e2e6'}}>Scouts</Text>

                    {scouts.map((scout, index) => (
                        <View key={scout.id} style={{flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 10, height: 60, borderRadius: 10, backgroundColor: '#312541', alignItems: 'center'}}>
                            <Pressable style={{flexGrow: 1}} onPress={() => goToTeamate(scout.id)}>
                                <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2, justifyContent: 'center'}}>
                                    <Text style={{marginLeft: 10, fontSize: 25, color: '#aa8dce'}}>{scout.name}</Text>
                                </View>
                            </Pressable>

                            <Menu renderer={renderers.NotAnimatedContextMenu}>
                                <MenuTrigger /*onPress={() => setSelectedOption(scout.id)}*/>
                                    <View style={{flexShrink: 1, height: '100%', marginRight: -0, zIndex: 9, justifyContent: 'center'}}>
                                        <MaterialIcons name='more-vert' size={40} color='#aa8dce'/>
                                    </View>
                                </MenuTrigger>

                                <MenuOptions customStyles={{optionsContainer: {width: 140, backgroundColor: 'transparent'}}}>
                                    <MenuOption style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#aa8dce'}} onSelect={() => handleOptionSelect('Rename')}>
                                        <MaterialIcons name='edit' size={20} color='#312541' style={{marginLeft: 5}}/>
                                        
                                        <Text style={{marginLeft: 10, fontSize: 20, color: '#312541'}}>Rename</Text>
                                    </MenuOption>

                                    <MenuOption style={{marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#aa8dce'}} onSelect={() => handleOptionSelect('Preview')}>
                                        <MaterialIcons name='remove-red-eye' size={20} color='#312541' style={{marginLeft: 5}}/>
                                        
                                        <Text style={{marginLeft: 10, fontSize: 20, color: '#312541'}}>Preview</Text>
                                    </MenuOption>

                                    <MenuOption style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginRight: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#aa8dce'}} onSelect={() => handleOptionSelect('Delete')}>
                                        <MaterialIcons name='delete' size={20} color='#a30018' style={{marginLeft: 5}}/>
                                        
                                        <Text style={{marginLeft: 10, fontSize: 20, color: '#a30018'}}>Delete</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    ))}

                    <Text style={{marginLeft: 10, fontSize: 30, color: '#e3e2e6'}}>Admin</Text>
                    
                    {admins.map((admin, index) => (
                        <View key={admin.id} style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 60, borderRadius: 10, backgroundColor: '#312541'}}>
                            <Pressable style={{flexGrow: 1}} onPress={() => goToTeamate(admin.id)}>
                                <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2, justifyContent: 'center'}}>
                                    <Text style={{marginLeft: 10, fontSize: 25, color: '#aa8dce'}}>{admin.name}</Text>
                                </View>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <GestureDetector gesture={openAdder}>
                <View style={{width: 65, height: 65, backgroundColor: '#8d53d4', position: 'absolute', bottom: 10, right: 10, borderRadius: 33}}>
                    <MaterialIcons name='add' size={65} color='#e3e2e6'/>
                </View>
            </GestureDetector>
        </View>
    )
}