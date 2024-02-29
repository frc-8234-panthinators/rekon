//import * as React from 'react';
import { Text, View, Button, TouchableOpacity, Pressable, Dimensions, TextInput, Modal, useWindowDimensions} from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../colors';
import * as NavigationBar from 'expo-navigation-bar';





/*import Home from './Modes/Strategy/Pages/home';*/

import MatchForm from '../../Admin/Components/matchForm';
import DotBackground from '../../Admin/Components/test';


import AHH from '../../Admin/Components/ahhh'; //delete after
import AnotherTest from '../../Admin/Components/anotherTest';
import Resize from '../../Admin/Components/moveableBox';
import TEST from '../../Admin/Components/v2Components/moveableBoxv2';


import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MatchFormLayout from '../../Admin/Pages/matchFormBuilder';


const background = '#1a1b1e'

function Search(props) {
	const gotoTestStackScreen = () => {
		props.navigation.navigate('AutoMap');
	};
	return (
    <Pressable onPress={gotoTestStackScreen}>
      <Text>
        PRESS ME
      </Text>
    </Pressable>
	);
}

/*function HomeScreen() {
  
	return (
    
 
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background }}>
			<Text>Home!</Text>
      <FontAwesome name="search" size={24} color="black" />
		</View>
	);
}*/

function Preview({ route, navigation }) {
  const { matchFormId } = route.params;

  const [defaultPage, setDefaultPage] = useState(0);
  const [boxes, setBoxes] = useState([]);
  const [pages, setPages] = useState([]);
  const gridSizeForSpacing = Dimensions.get("window").width / 8;

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem(`pages_${matchFormId}`).then(jsonValue => {
        const pages = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPages(pages); // Update the state with the fetched pages array

        AsyncStorage.getItem(`defaultPage_${matchFormId}`).then(jsonValue => {
          const defaultPage = jsonValue != null ? JSON.parse(jsonValue) : pages[0]?.id || 0;
          setDefaultPage(defaultPage);

          AsyncStorage.getItem(`boxes_${defaultPage}_${matchFormId}`).then(jsonValue => {
            const boxes = jsonValue != null ? JSON.parse(jsonValue) : [];
            setBoxes(boxes); // Update the state with the fetched boxes array
          }).catch(error => {
            console.error('Failed to fetch boxes:', error);
          });
        }).catch(error => {
          console.error('Failed to fetch default page from storage:', error);
        });
      }).catch(error => {
        console.error('Failed to fetch pages:', error);
      });

    }, [])
  );

  useEffect(() => {
    console.log(`defaultPage: ${defaultPage}`);
  }, [defaultPage])

  const goToPage = (box) => {
    return Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        if (box.page) {
          const page = pages.find(page => page.id === box.page);
          if (page) {
            AsyncStorage.getItem(`boxes_${page.id}_${matchFormId}`).then(jsonValue => {
              const boxes = jsonValue != null ? JSON.parse(jsonValue) : [];
              setBoxes(boxes); // Update the state with the fetched boxes array
            }).catch(error => {
              console.error('Failed to fetch boxes:', error);
            });
          } else {
            alert('The original page that it has been mapped to has been deleted!');
          }
        }
      }).runOnJS(true);
  }

  useEffect(() => {
    console.log(`boxes: ${JSON.stringify(boxes)}`)
  }, [boxes])

  return(
    <View>
      {boxes.map((box, index) => (
        <GestureDetector key={box.id} gesture={goToPage(box)}>
          <View style={{
            height: box.height - 10,
            width: box.width - 10,
            left: box.x + gridSizeForSpacing / 5,
            top: box.y + gridSizeForSpacing / 5,
            backgroundColor: box.color,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            zIndex: box.zIndex,
            borderRadius: 10
            }}>
            <View style={{overflow: 'hidden', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
              {box.icon.length != 0 && <MaterialIcons name={box.icon} size={isNaN(parseInt(box.iconSize)) ? 0 : parseInt(box.iconSize)} color={box.iconColor} />}
              {box.text.length != 0 && <Text style={{fontSize: isNaN(parseInt(box.fontSize)) ? 0 : parseInt(box.fontSize), color: box.fontColor, fontWeight: box.bold, fontStyle: box.italic, }}>{box.text}</Text>}
            </View>
          </View>
        </GestureDetector>
      ))}
    </View>
  )
}

function HomeScreen(props) {
  const [renameVisible, setRenameVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [optionsYs, setOptionsYs] = useState([]);
  const [totalForms, setTotalForms] = useState([]);
  const [selectedOptionY, setSelectedOptionY] = useState(0);
  const scrollY = useRef(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [{name: 'Rename'}, {name: 'Preview'}, {name: 'Delete'}];
  const [temporaryName, setTemporaryName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [type, setType] = useState('Pit');
  const [adderOpen, setAdderOpen] = useState(false);
  const [pitForms, setPitForms] = useState([]);
  const [matchForms, setMatchForms] = useState([]);
  const [data, setData] = useState([]);
  const [compare, setCompare] = useState([]);
  const [nextId, setNextId] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem('pitForms').then(jsonValue => {
        const pitForms = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPitForms(pitForms); // Update the state with the fetched pitForms array
      }
      ).catch(error => {
        console.error('Failed to fetch pitForms:', error);
      });

      AsyncStorage.getItem('matchForms').then(jsonValue => {
        const matchForms = jsonValue != null ? JSON.parse(jsonValue) : [];
        setMatchForms(matchForms); // Update the state with the fetched matchForms array
      }
      ).catch(error => {
        console.error('Failed to fetch matchForms:', error);
      });

      AsyncStorage.getItem('data').then(jsonValue => {
        const data = jsonValue != null ? JSON.parse(jsonValue) : [];
        setData(data); // Update the state with the fetched data array
      }
      ).catch(error => {
        console.error('Failed to fetch data:', error);
      });

      AsyncStorage.getItem('compare').then(jsonValue => {
        const compare = jsonValue != null ? JSON.parse(jsonValue) : [];
        setCompare(compare); // Update the state with the fetched compare array
      }
      ).catch(error => {
        console.error('Failed to fetch compare:', error);
      });

      AsyncStorage.getItem('nextId').then(jsonValue => {
        const nextId = jsonValue != null ? JSON.parse(jsonValue) : 0;
        setNextId(nextId); // Update the state with the fetched nextId
      }
      ).catch(error => {
        console.error('Failed to fetch nextId:', error);
      });
    }, [])
  )

  useEffect(() => {
    const jsonValue = JSON.stringify(pitForms);
    AsyncStorage.setItem('pitForms', jsonValue).then(() => {
      console.log('Updated pitForms stored successfully');
    }).catch(error => {
      console.error('Failed to store updated pitForms:', error);
    });

    console.log(`pitForms: ${JSON.stringify(pitForms)}`);
  }, [pitForms])

  useEffect(() => {
    const jsonValue = JSON.stringify(matchForms);
    AsyncStorage.setItem('matchForms', jsonValue).then(() => {
      console.log('Updated matchForms stored successfully');
    }).catch(error => {
      console.error('Failed to store updated matchForms:', error);
    });

    console.log(`matchForms: ${JSON.stringify(matchForms)}`);
  }, [matchForms])

  useEffect(() => {
    const jsonValue = JSON.stringify(data);
    AsyncStorage.setItem('data', jsonValue).then(() => {
      console.log('Updated data stored successfully');
    }).catch(error => {
      console.error('Failed to store updated data:', error);
    });

    console.log(`data: ${JSON.stringify(data)}`);
  }, [data])

  useEffect(() => {
    const jsonValue = JSON.stringify(compare);
    AsyncStorage.setItem('compare', jsonValue).then(() => {
      console.log('Updated compare stored successfully');
    }).catch(error => {
      console.error('Failed to store updated compare:', error);
    });

    console.log(`compare: ${JSON.stringify(compare)}`);
  }, [compare])

  useEffect(() => {
    const jsonValue = JSON.stringify(nextId);
    AsyncStorage.setItem('nextId', jsonValue).then(() => {
      console.log('Updated nextId stored successfully');
    }).catch(error => {
      console.error('Failed to store updated nextId:', error);
    });

    console.log(`nextId: ${nextId}`);
  }, [nextId])

  useEffect(() => {
    forms = pitForms.concat(matchForms, data, compare);
    setTotalForms(forms);
    console.log(`totalForms: ${JSON.stringify(forms)}`);
  }, [pitForms, matchForms, data, compare]);

  const goToPitFormBuilder = (pitFormId) => {
    console.log(`Going to pit form with id of ${pitFormId}`);
  }

  const goToData = (dataId) => {
    console.log(`Going to pit form with id of ${dataId}`);
  }

  const goToCompare = (compareId) => {
    console.log(`Going to pit form with id of ${compareId}`);
  }

  const goToMatchFormPages = (matchFormId) => {
    console.log(`Going to match form page editor with id of ${matchFormId}`);
    props.navigation.navigate('Pages', {
      matchFormId: matchFormId,
    });
  };

  const openAdder = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      console.log('Opening adder');
      setAdderOpen(true);
  }).runOnJS(true);

  const closeAdder = () => {
    console.log('Closing adder');
    setAdderOpen(false);
    setTemporaryName('');
    setDropdownOpen(false);
    setType('Pit');
  }

  const openDropdown = () => {
    console.log('Opening dropdown');
    setDropdownOpen(true);
  }

  const create = () => {
    if (temporaryName.trim() !== '' && !isNameUsed(temporaryName)) {
      console.log(`Creating a new ${type} form with the name of ${temporaryName}`);
      setOptionsYs([]);
      let newForm = {id: nextId, name: temporaryName};
      if (type === 'Pit') {
        setPitForms([...pitForms, newForm]);
      } else if (type === 'Match') {
        setMatchForms([...matchForms, newForm]);
      } else if (type === 'Data') {
        setData([...data, newForm]);
      } else if (type === 'Compare') {
        setCompare([...compare, newForm]);
      }
      setNextId(prevNextId => prevNextId + 1);
      closeAdder();
    } else if (temporaryName.trim() === '') {
      alert('Name cannot be blank');
    } else {
      alert('Name is already used');
    }
  }

  const isNameUsed = (name) => {
    return pitForms.some(pitForm => pitForm.name === name) || 
      matchForms.some(matchForm => matchForm.name === name) || 
      data.some(datum => datum.name === name) || 
      compare.some(comp => comp.name === name);
  }

  const getSelectedOption = () => {
    if (pitForms.some(pitForm => pitForm.id === selectedOption)) {
      return pitForms.find(pitForm => pitForm.id === selectedOption);
    } else if (matchForms.some(matchForm => matchForm.id === selectedOption)) {
      return matchForms.find(matchForm => matchForm.id === selectedOption);
    } else if (data.some(datum => datum.id === selectedOption)) {
      return data.find(datum => datum.id === selectedOption);
    } else if (compare.some(comp => comp.id === selectedOption)) {
      return compare.find(comp => comp.id === selectedOption);
    }
  }

  const getSelectedOptionType = () => {
    if (pitForms.some(pitForm => pitForm.id === selectedOption)) {
      return 'Pit';
    } else if (matchForms.some(matchForm => matchForm.id === selectedOption)) {
      return 'Match';
    } else if (data.some(datum => datum.id === selectedOption)) {
      return 'Data';
    } else if (compare.some(comp => comp.id === selectedOption)) {
      return 'Compare';
    }
  }

  useEffect(() => {
    console.log(`temporaryName: ${temporaryName}`);
  }, [temporaryName])

  const optionSwitch = (option) => {
    switch (option) {
      case 'Rename':
        console.log('Renaming');
        setRenameVisible(true);
        setTemporaryName(getSelectedOption().name);
        break;
      case 'Preview':
        console.log('Previewing');
        if (getSelectedOptionType() === 'Match') {
          props.navigation.navigate('Preview', {
            matchFormId: selectedOption,
          });
        }
        break;
      case 'Delete':
        console.log('Deleting');
        setOptionsYs([]);
        if (getSelectedOptionType() === 'Pit') {
          setPitForms(pitForms.filter(pitForm => pitForm.id !== selectedOption));
        } else if (getSelectedOptionType() === 'Match') {
          setMatchForms(matchForms.filter(matchForm => matchForm.id !== selectedOption));
        } else if (getSelectedOptionType() === 'Data') {
          setData(data.filter(datum => datum.id !== selectedOption));
        } else if (getSelectedOptionType() === 'Compare') {
          setCompare(compare.filter(comp => comp.id !== selectedOption));
        }
        break;
      default:
        break;
    }
  }

  const handleOptionSelect = (option) => {
    optionSwitch(option);
    setOptionsVisible(false);
  }

  const openOptions = (id) => {
    return Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        setSelectedOption(id);
        setSelectedOptionY(optionsYs.find(option => option.id === id).y);
        setOptionsVisible(true);
    }).runOnJS(true);
  }

  const rename = () => {
    if (!isNameUsed(temporaryName) && temporaryName.trim() !== '') {
      if (getSelectedOptionType() === 'Pit') {
        setPitForms(pitForms.map(pitForm =>
          pitForm.id === selectedOption ? {...pitForm, name: temporaryName} : pitForm
        ));
      } else if (getSelectedOptionType() === 'Match') {
        setMatchForms(matchForms.map(matchForm =>
          matchForm.id === selectedOption ? {...matchForm, name: temporaryName} : matchForm
        ));
      } else if (getSelectedOptionType() === 'Data') {
        setData(data.map(datum =>
          datum.id === selectedOption ? {...datum, name: temporaryName} : datum
        ));
      } else if (getSelectedOptionType() === 'Compare') {
        setCompare(compare.map(comp =>
          comp.id === selectedOption ? {...comp, name: temporaryName} : comp
        ));
      }
      setTemporaryName('');
      setRenameVisible(false);
    } else if (temporaryName.trim() === '') {
      alert('Name cannot be blank');
    } else if (isNameUsed(temporaryName)){
      if (temporaryName !== getSelectedOption().name) {
        alert('Name is already used');
      } else {
        setTemporaryName('');
        setRenameVisible(false);
      }
    }
  }

  useEffect(() => {
    console.log(`optionYs: ${JSON.stringify(optionsYs)}`);
  }, [optionsYs])
  
  const {height, width} = useWindowDimensions();


  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      {adderOpen && 
        <Modal transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000', opacity: 0.5}}/>

          {dropdownOpen && 
            <>
              <Pressable style={{height: height, width: width, backgroundColor: '#000000', opacity: 0.5}} onPress={() => {setDropdownOpen(false);}} />

              <View style={{position: 'absolute', top: height / 2 - 100, right: 10, width: 200, height: 240, backgroundColor: '#aa8dce', borderRadius: 10, zIndex: 11}}>
                <TouchableOpacity onPress={() => {setType('Pit'); setDropdownOpen(false);}}>
                  <View style={{marginTop: 0, height: 65}}>
                    <MaterialIcons name='event-note' size={25} color='#312541' style={{position: 'absolute', top: 10, left: 10}}/>
                    
                    <Text style={{position: 'absolute', right: 0, top: 10, width: 150, fontSize: 24, color: '#312541'}}>Pit</Text>

                    <View style={{position: 'absolute', right: 0, top: 35, width: 150}}>
                      <Text style={{fontSize: 12, color: '#312541'}}>Form builder similar to Google Forms</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setType('Match'); setDropdownOpen(false);}}>
                  <View style={{marginTop: 0, height: 55}}>
                    <MaterialIcons name='smart-toy' size={25} color='#312541' style={{marginLeft: 10}}/>

                    <Text style={{position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: '#312541'}}>Match</Text>

                    <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                      <Text style={{fontSize: 12, color: '#312541'}}>Drag and drop button builder for match data</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setType('Data'); setDropdownOpen(false);}}>
                  <View style={{marginTop: 0, height: 55}}>
                    <MaterialIcons name='bar-chart' size={25} color='#312541' style={{marginLeft: 10}}/>

                    <Text style={{position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: '#312541'}}>Data</Text>

                    <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                      <Text style={{fontSize: 12, color: '#312541'}}>Data visualization for strategy mode</Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {setType('Compare'); setDropdownOpen(false);}}>
                  <View style={{marginTop: 0, height: 65}}>
                    <MaterialIcons name='compare-arrows' size={25} color='#312541' style={{marginLeft: 10}}/>

                    <Text style={{position: 'absolute', right: 0, top: 0, width: 150, fontSize: 24, color: '#312541'}}>Compare</Text>

                    <View style={{position: 'absolute', right: 0, top: 25, width: 150}}>
                      <Text style={{fontSize: 12, color: '#312541'}}>Build a viewer to compare teams data</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          }

          <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#312541', borderRadius: 10, zIndex: 10}}>
            <View style={{marginLeft: 10, marginTop: 10, height: 50, width: Dimensions.get('window').width - 150, borderRadius: 10, borderWidth: 2, borderColor: '#aa8dce', justifyContent: 'center'}}>
              <TextInput
                style={{color: '#aa8dce', fontSize: 24, marginLeft: 10}}
                autoFocus
                defaultValue={temporaryName}
                placeholder='Template Title'
                placeholderTextColor='#aa8dce'
                onChangeText={text => {
                  setTemporaryName(text);
                }}
              />
            </View>

            <TouchableOpacity style={{position: 'absolute', top: 10, right: 0, height: 50, width: 115, justifyContent: 'center'}} onPress={openDropdown}>
              <MaterialIcons name={type === 'Pit' ? 'event-note' : type === 'Match' ? 'smart-toy' : type === 'Data' ? 'bar-chart' : type === 'Compare' ? 'compare-arrows' : ''} size={25} color='#aa8dce'/>

              <Text style={{position: 'absolute', top: (type === 'Pit' || type === 'Data') ? 6.25 : type === 'Match' ? 10.25 : 14, left: 30, fontSize: (type === 'Pit' || type === 'Data') ? 25 : type === 'Match' ? 20 : 13.5, color: '#aa8dce'}}>{type}</Text>

              <MaterialIcons name='arrow-drop-down' size={35} color='#aa8dce' position='absolute' right={0}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={closeAdder}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={create}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Create</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }

      {renameVisible && 
        <Modal transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000', opacity: 0.5}} />

          <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#312541', borderRadius: 10, zIndex: 10}}>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: '#aa8dce', justifyContent: 'center'}}>
              <TextInput
                style={{color: '#aa8dce', fontSize: 24, marginLeft: 10}}
                autoFocus
                defaultValue={pitForms.find(pitForm => pitForm.id === selectedOption)?.name || matchForms.find(matchForm => matchForm.id === selectedOption)?.name || data.find(datum => datum.id === selectedOption)?.name || compare.find(comp => comp.id === selectedOption)?.name || ''}
                placeholder='Template Title'
                placeholderTextColor='#aa8dce'
                onChangeText={text => {
                  setTemporaryName(text);
                }
              }
              />
            </View>

            <TouchableOpacity style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setRenameVisible(false); setTemporaryName('');}}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={rename}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }

      <Text style={{position: 'absolute', left: 70, fontSize: 34, color: '#e3e2e6'}}>Templates</Text>

      <ScrollView vertical={true} style={{marginTop: 50}} onScroll={(event) => {
        scrollY.current = event.nativeEvent.contentOffset.y;
        console.log(scrollY.current);
      }}>
        <View>
          <Text style={{marginLeft: 10, fontSize: 34, color: '#e3e2e6'}}>Pit</Text>

          {pitForms.map((pitForm, index) => (
            <View key={`${pitForm.id}_${totalForms.length}`} onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const y = layout.y;
              setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: pitForm.id, y: y}]);
              console.log(`y: ${y}`);
            }}>
              <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#312541', borderRadius: 10, zIndex: 1}}>
                <Pressable style={{flexGrow: 1}} onPress={() => goToPitFormBuilder(pitForm.id)}>
                  <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                    <Text style={{marginLeft: 10, fontSize: 34, color: '#aa8dce'}}>{pitForm.name}</Text>
                  </View>
                </Pressable>
                
                <Menu renderer={renderers.NotAnimatedContextMenu}>
                  <MenuTrigger>
                    <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                      <MaterialIcons name='more-vert' size={50} color='#aa8dce'/>
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{optionsContainer: {width: 140}}} style={{backgroundColor: 'rgba(0,0,0,1)'}}>
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
            </View>
          ))}

          <Text style={{marginTop: 0, marginLeft: 10, fontSize: 34, color: '#e3e2e6'}}>Match</Text>

          {matchForms.map((matchForm, index) => (
            <View key={`${matchForm.id}_${totalForms.length}`} onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const y = layout.y;
              setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: matchForm.id, y: y}]);
              console.log(`y: ${y}`);
            }}>
              <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#312541', borderRadius: 10, zIndex: 1}}>
                <Pressable style={{flexGrow: 1}} onPress={() => goToMatchFormPages(matchForm.id)}>
                  <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                    <Text style={{marginLeft: 10, fontSize: 34, color: '#aa8dce'}}>{matchForm.name}</Text>
                  </View>
                </Pressable>
                
                <Menu renderer={renderers.NotAnimatedContextMenu}>
                  <MenuTrigger>
                    <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                      <MaterialIcons name='more-vert' size={50} color='#aa8dce'/>
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{optionsContainer: {width: 140}}} style={{backgroundColor: 'rgba(0,0,0,1)'}}>
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
            </View>
          ))}

          <Text style={{marginLeft: 10, fontSize: 34, color: '#e3e2e6'}}>Data</Text>

          {data.map((datum, index) => (
            <View key={`${datum.id}_${totalForms.length}`} onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const y = layout.y;
              setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: datum.id, y: y}]);
              console.log(`y: ${y}`);
            }}>
              <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#312541', borderRadius: 10, zIndex: 1}}>
                <Pressable style={{flexGrow: 1}} onPress={() => goToData(datum.id)}>
                  <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                    <Text style={{marginLeft: 10, fontSize: 34, color: '#aa8dce'}}>{datum.name}</Text>
                  </View>
                </Pressable>
                
                <Menu renderer={renderers.NotAnimatedContextMenu}>
                  <MenuTrigger>
                    <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                      <MaterialIcons name='more-vert' size={50} color='#aa8dce'/>
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{optionsContainer: {width: 140}}} style={{backgroundColor: 'rgba(0,0,0,1)'}}>
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
            </View>
          ))}

          <Text style={{marginLeft: 10, fontSize: 34, color: '#e3e2e6'}}>Compare</Text>

          {compare.map((comp, index) => (
            <View key={`${comp.id}_${totalForms.length}`} onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const y = layout.y;
              setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: comp.id, y: y}]);
              console.log(`y: ${y}`);
            }}>
              <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#312541', borderRadius: 10, zIndex: 1}}>
                <Pressable style={{flexGrow: 1}} onPress={() => goToCompare(comp.id)}>
                  <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                    <Text style={{marginLeft: 10, fontSize: 34, color: '#aa8dce'}}>{comp.name}</Text>
                  </View>
                </Pressable>
                
                <Menu renderer={renderers.NotAnimatedContextMenu}>
                  <MenuTrigger>
                    <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                      <MaterialIcons name='more-vert' size={50} color='#aa8dce'/>
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{optionsContainer: {width: 140}}} style={{backgroundColor: 'rgba(0,0,0,1)'}}>
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
            </View>
          ))}

          {/*optionsVisible && 
            <Modal transparent={true}>
              <TouchableOpacity onPress={() => {setOptionsVisible(false);}} style={{flex: 1}}/>

              <View style={{position: 'absolute', top: selectedOptionY + 37.5, right: 10, width: 110, height: 80, backgroundColor: '#aa8dce', borderRadius: 10, zIndex: 10}}>
                {options.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => {handleOptionSelect(option.name);}}>
                    <View style={{height: 25, marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons name={option.name === 'Rename' ? 'edit' : option.name === 'Preview' ? 'remove-red-eye' : 'delete'} size={17} color={option.name === 'Delete' ? '#a30018' : '#312541'} style={{marginLeft: 5}}/>
                      
                      <Text style={{marginLeft: 10, fontSize: 17, color: (option.name === 'Delete' ? '#a30018' : '#312541')}}>{option.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
                */}
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

function MatchFormPages(props) {
  const { matchFormId } = props.route.params;
  
  const scrollY = useRef(0);

  const options = [{name: 'Rename'}, {name: 'Delete'}];
  const [optionsYs, setOptionsYs] = useState([{}]);
  const [selectedOptionY, setSelectedOptionY] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [renameVisible, setRenameVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [adderOpen, setAdderOpen] = useState(false);
  const [temporaryName, setTemporaryName] = useState('');
  const [pages, setPages] = useState([]);
  const [nextPageId, setNextPageId] = useState(0);
  const [selectedPage, setSelectedPage] = useState(null);
  const [changingName, setChangingName] = useState(false);
  
  useEffect(() => {
    console.log(`pages: ${JSON.stringify(pages)}`);
  }, [pages])
  
  useEffect(() => {
    console.log(`selectedPage: ${selectedPage}`);
  }, [selectedPage])
  
  useFocusEffect(
    React.useCallback(() => {
      AsyncStorage.getItem(`pages_${matchFormId}`).then(jsonValue => {
        const pages = jsonValue != null ? JSON.parse(jsonValue) : [];
        setPages(pages); // Update the state with the fetched pages array
      }).catch(error => {
        console.error('Failed to fetch pages:', error);
      });
  
      AsyncStorage.getItem(`nextPageId_${matchFormId}`).then(jsonValue => {
        const nextPageId = jsonValue != null ? JSON.parse(jsonValue) :  0;
        setNextPageId(nextPageId); // Update the state with the fetched nextPageId
      })
      .catch(error => {
        console.error('Failed to fetch nextPageId from storage:', error);
      });
  
      AsyncStorage.getItem(`selectedPage_${matchFormId}`).then(jsonValue => {
        const selectedPage = jsonValue != null ? JSON.parse(jsonValue) :  0;
        setSelectedPage(selectedPage);
      }).catch(error => {
        console.error('Failed to fetch selectedPage from storage:', error);
      });
  
    }, [])
  );
  
  useEffect(() => {
    const jsonValue = JSON.stringify(pages);
  
    AsyncStorage.setItem(`pages_${matchFormId}`, jsonValue).then(() => {
      console.log('Updated pages stored successfully');
    }).catch(error => {
      console.error('Failed to store updated pages:', error);
    });
  }, [pages])

  useEffect(() => {
    pages.forEach(page => {
      if (page.defaultPage === true) {
        const jsonValue = JSON.stringify(page.id);
        AsyncStorage.setItem(`defaultPage_${matchFormId}`, jsonValue).then(() => {
          console.log('Updated defaultPage stored successfully');
        }).catch(error => {
          console.error('Failed to store updated defaultPage:', error);
        });
      }
    })
  }, [pages])
  
  useEffect(() => {
    const jsonValue = JSON.stringify(nextPageId)
    AsyncStorage.setItem(`nextPageId_${matchFormId}`, jsonValue)
    .then(() => {
        console.log('Saved nextPageId to storage');
    })
    .catch(error => {
        console.error('Failed to save nextPageId to storage:', error);
    });
  }, [nextPageId])
  
  useEffect(() => {
    const jsonValue = JSON.stringify(selectedPage);
    AsyncStorage.setItem(`selectedPage_${matchFormId}`, jsonValue).then(() => {
      console.log('Saved selectedPage to storage');
    }).catch(error => {
      console.error('Failed to store selectedPage to storage:', error);
    });
  }, [selectedPage])
  
  const nameExists = pages.some(page => page.name === temporaryName && page.id !== selectedPage);

  const addPage = () => {
    if (!nameExists && temporaryName.trim() !== '') {
      setOptionsYs([]);
      let newPages = [...pages, {id: nextPageId, name: temporaryName, defaultPage: false, showTextInput: false}];
      setPages(newPages);
      let nextPage = nextPageId +  1;
      setNextPageId(nextPage);
      setAdderOpen(false);
      setTemporaryName('');
    } else if (nameExists) {
      alert("Name already exists");
    } else if (temporaryName.trim() === '') {
      alert('Name cannot be blank');
    }
  }

  /*const addPage = Gesture.Tap()
  .maxDuration(250)
  .onStart(() => {
     let nextPage = nextPageId +  1;
      while (pages.some(page => page.name === `Page ${nextPage}`)) {
       nextPage++;
     }
     setNextPageId(nextPage);
      let newPages = [...pages, {id: nextPage, name: `Page ${nextPage}`, defaultPage: false, showTextInput: false}];
     setSelectedPage(nextPage);
     setPages(newPages);
  }).runOnJS(true);
  
  const removePage = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      const newPages = pages.filter(page => page.id !== selectedPage);
      setSelectedPage(Math.max(...newPages.map(page => page.id)));
      setPages(newPages);
  }).runOnJS(true);*/
  
  const goToPageBuilder = (pageId) => {
    props.navigation.navigate('Test', {
      pageId: pageId,
      matchFormId: matchFormId,
    });
    setSelectedPage(pageId);
  }
  
  const doubleTap = (id) => {
    return Gesture.Tap()
      .maxDelay(250)
      .numberOfTaps(2)
      .onStart(() => {
        console.log('Double Tapped!');
        let newPages = pages.map(page =>
          page.id === id ? {...page, showTextInput: true} : page
        );
        setPages(newPages);
        setSelectedPage(id);
        setChangingName(true);
      }).runOnJS(true);
  }
  
  function changePageName(id, name) {
    if (!nameExists && name.trim() !== '') {
      let newPages = pages.map(page =>
        page.id === id ? {...page, name: name} : page
      );
      setPages(newPages);
      setRenameVisible(false);
      setTemporaryName('');
    } else if (nameExists) {
      alert("Name already exists");
    } else if (name.trim() === '') {
      alert('Name cannot be blank');
    }
  }
  
  function resetAsyncStorage() {
    AsyncStorage.clear().then(() => {
        console.log('AsyncStorage is now clear');
    }).catch(error => {
        console.error('Failed to clear AsyncStorage:', error);
    });
  }
  
  const resetStorage = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      resetAsyncStorage();
  }).runOnJS(true);
  
  const preview = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      props.navigation.navigate("Preview");
  }).runOnJS(true);

  const back = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      props.navigation.goBack();
  }).runOnJS(true);

  const openAdder = Gesture.Tap()
    .maxDuration(250)
    .onStart(() => {
      setAdderOpen(true);
  }).runOnJS(true);

  const openOptions = (id) => {
    return Gesture.Tap()
      .maxDuration(250)
      .onStart(() => {
        setSelectedPage(id);
        setSelectedOptionY(optionsYs.find(option => option.id === id).y);
        setOptionsVisible(true);
    }).runOnJS(true);
  }

  const optionSwitch = (option) => {
    switch (option) {
      case 'Rename':
        console.log('Renaming');
        setRenameVisible(true);
        setTemporaryName(pages.find(page => page.id === selectedPage).name);
        break;
      case 'Delete':
        console.log('Deleting');
        setOptionsYs([]);
        setPages(pages.filter(page => page.id !== selectedPage));
        break;
      default:
        break;
    }
  }

  const handleOptionSelect = (option) => {
    optionSwitch(option);
    setOptionsVisible(false);
  }

  const { height, width } = useWindowDimensions();

  return (
    <View style={{flex: 1, backgroundColor: '#000000'}}>
      <GestureDetector gesture={back}>
        <View style={{position: 'absolute', top: 5, left: 15, width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialIcons name='arrow-back' size={40} color='#e3e2e6'/>
        </View>
      </GestureDetector>

      <Text style={{position: 'absolute', left: 70, fontSize: 34, color: '#e3e2e6'}}>Pages</Text>

      {renameVisible && 
        <Modal transparent={true}>
          <View style={{flex: 1, backgroundColor: '#000000', opacity: 0.5}} />

          <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#312541', borderRadius: 10, zIndex: 10}}>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: '#aa8dce', justifyContent: 'center'}}>
              <TextInput
                style={{color: '#aa8dce', fontSize: 24, marginLeft: 10}}
                autoFocus
                defaultValue={pages.find(page => page.id === selectedPage)?.name || ''}
                placeholder='Page Name'
                placeholderTextColor='#aa8dce'
                onChangeText={text => {
                  setTemporaryName(text);
                }
              }
              />
            </View>

            <TouchableOpacity style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setRenameVisible(false); setTemporaryName('');}}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {changePageName(selectedPage, temporaryName);}}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Submit</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }

      {adderOpen && 
        <Modal transparent={true}>
          <View style={{flex: 1, backgroundColor: 'black', opacity: 0.5}} />

          <View style={{position: 'absolute', top: height / 2 - 100, left: 10, width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#312541', borderRadius: 10, zIndex: 10}}>
            <View style={{marginLeft: 10, marginRight: 10, marginTop: 10, height: 50, borderRadius: 10, borderWidth: 2, borderColor: '#aa8dce', justifyContent: 'center'}}>
              <TextInput
                style={{color: '#aa8dce', fontSize: 24, marginLeft: 10}}
                autoFocus
                defaultValue={temporaryName}
                placeholder='Page Name'
                placeholderTextColor='#aa8dce'
                onChangeText={text => {
                  setTemporaryName(text);
                  console.log(`temporaryName: ${text}`);
                }}
              />
            </View>

            <TouchableOpacity style={{marginLeft: 10, marginTop: 5, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={() => {setAdderOpen(false); setTemporaryName('');}}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{position: 'absolute', top: 65, right: 10, height: 25, width: 100, justifyContent: 'center', alignItems: 'center'}} onPress={addPage}>
              <Text style={{fontSize: 20, color: '#aa8dce'}}>Create</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      }

      <ScrollView style={{marginTop: 50}} onScroll={(event) => {
        scrollY.current = event.nativeEvent.contentOffset.y;
        console.log(scrollY.current);
      }}>
        <View style={{height: Dimensions.get('window').height - 50}}>
          {pages.map((page, index) => (
            <View key={`${page.id}_${pages.length}`} onLayout={(event) => {
              const layout = event.nativeEvent.layout;
              const y = layout.y;
              setOptionsYs(prevOptionsYs => [...prevOptionsYs, {id: page.id, y: y}]);
              console.log(`y: ${y}`);
            }}>
              <View style={{flexDirection: 'row', height: 50, marginLeft: 10, marginRight: 10, marginTop: 10, backgroundColor: '#312541', borderRadius: 10, zIndex: 1}}>
                <Pressable style={{flexGrow: 1}} onPress={() => goToPageBuilder(page.id)}>
                  <View style={{flexGrow: 1, flexShrink: 0, zIndex: 2}}>
                    <Text style={{marginLeft: 10, fontSize: 34, color: '#aa8dce'}}>{page.name}</Text>
                  </View>
                </Pressable>
                
                <Menu renderer={renderers.NotAnimatedContextMenu}>
                  <MenuTrigger>
                    <View style={{flexShrink: 1, marginRight: -10, zIndex: 9}}>
                      <MaterialIcons name='more-vert' size={50} color='#aa8dce'/>
                    </View>
                  </MenuTrigger>

                  <MenuOptions customStyles={{optionsContainer: {width: 140}}} style={{backgroundColor: 'rgba(0,0,0,1)'}}>
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
            </View>
          ))}

          {optionsVisible && 
            <Modal transparent={true}>
              <TouchableOpacity onPress={() => {setOptionsVisible(false);}} style={{flex: 1}}/>

              <View style={{position: 'absolute', top: selectedOptionY + 60, right: 10, width: 110, height: 50, backgroundColor: '#aa8dce', borderRadius: 10, zIndex: 10}}>
                {options.map((option, index) => (
                  <TouchableOpacity key={index} onPress={() => {handleOptionSelect(option.name);}}>
                    <View style={{height: 25, marginRight: 10, flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialIcons name={option.name === 'Rename' ? 'edit' : option.name === 'Preview' ? 'remove-red-eye' : 'delete'} size={17} color={option.name === 'Delete' ? '#a30018' : '#312541'} style={{marginLeft: 5}}/>

                      <Text style={{marginLeft: 10, fontSize: 17, color: (option.name === 'Delete' ? '#a30018' : '#312541')}}>{option.name}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </Modal>
          }
        </View>
      </ScrollView>

      <GestureDetector gesture={openAdder}>
        <View style={{position: 'absolute', bottom: 10, right: 10, width: 65, height: 65, backgroundColor: '#8d53d4', borderRadius: 33}}>
          <MaterialIcons name='add' size={65} color='#e3e2e6'/>
        </View>
      </GestureDetector>

    </View>
  )

	/*return (
    <View style={{flex: 1}}>
      <ScrollView>
        {pages.map((page, index) => (
          <View key={page.id} style={{
            flex: 1,
            height: 100,
            backgroundColor: '#000000',
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            borderRadius: 10
          }}>
            <ScrollView style={{
                flex: 1,
                marginLeft: 60,
                marginRight: 135,
                marginTop: 10,
                marginBottom: 10,
                borderRadius: 10,
                }} horizontal={true}>
              
              <GestureDetector gesture={doubleTap(page.id)}>
                <View style={{flex: 1, borderRadius: 10}}>
                  {pages.find(form => form.id === page.id)?.showTextInput ? (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <TextInput
                        style={{color: '#e3e2e6', fontSize: 24}}
                        autoFocus
                        onBlur={() => {
                          let newPages = pages.map(page =>
                            page.id ={...page, showTextInput: false}
                          );
                          setPages(newPages);
                          setChangingName(false);
                        }}
                        defaultValue={pages.find(form => form.id === page.id)?.name || ''}
                        onChangeText={text => {
                          changePageName(page.id, text);
                        }}
                      />
                    </View>
                  ) : (
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                      <Text style={{color: '#e3e2e6', fontSize: pages.find(form => form.id === page.id)?.name === '' ? 13 : 24, textAlign: 'center'}}>
                        {pages.find(form => form.id === page.id)?.name || 'Double click to change name'}
                      </Text>
                    </View>
                  )}
                </View>
              </GestureDetector>
              </ScrollView>

            <GestureDetector gesture={goToPageBuilder(page.id)}>
              <View size={50} borderRadius={10} position='absolute' right={25} top={25}>
                  <MaterialIcons name='edit' size={50} color='#e3e2e6'/>
              </View>
            </GestureDetector>
          </View>
        ))}
      </ScrollView>

      {!changingName && <View>
        <GestureDetector gesture={addPage}>
          <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 75, borderRadius: 10}}>
              <MaterialIcons name='add' size={65} color='#e3e2e6'/>
          </View>
        </GestureDetector>

        <GestureDetector gesture={removePage}>
          <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 10, borderRadius: 10}}>
            <MaterialIcons name='remove' size={65} color='#e3e2e6'/>
          </View>
        </GestureDetector>

        <GestureDetector gesture={resetStorage}>
          <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 140, borderRadius: 10}}>
            <MaterialIcons name='loop' size={65} color='#e3e2e6'/>
          </View>
        </GestureDetector>

        <GestureDetector gesture={preview}>
          <View style={{width: 65, height: 65, backgroundColor: Colors.background, position: 'absolute', bottom: 10, right: 205, borderRadius: 10}}>
            <MaterialIcons name='preview' size={65} color='#e3e2e6'/>
          </View>
        </GestureDetector>
      </View>}
    </View>
	);*/
}

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

function MyTabBar({ state, descriptors, navigation }) {
  NavigationBar.setVisibilityAsync(false).then(() => {}).catch(() => {});
  NavigationBar.setBehaviorAsync('overlay-swipe').then(() => {}).catch(() => {});
  NavigationBar.setBackgroundColorAsync(Colors.background).then(() => {}).catch(() => {});
  return (
    <View style={{ flexDirection: 'row',backgroundColor: (Colors.tab) ,height:65,borderRadius:10, margin: 12, justifyContent:"center",alignItems:"center", }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;


        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        let iconName;
        if (route.name === "Home") {
          iconName = isFocused ? "home" : "home";
        } else if (route.name === "Settings") {
          iconName = isFocused ? "settings" : "settings";
        } else if (route.name === "Search") {
          iconName = isFocused ? "search" : "search";
        }


        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ 
              
              flex: 1, 
              alignItems:"center",

              backgroundColor: isFocused ? '#1a1b1e' : 'transparent',
              borderRadius: 100, 
              padding: 5, 
              margin: 20 }}
          >

           <MaterialIcons
              name={iconName}
              size={35} // Adjust the icon size as needed
              color={isFocused ? '#e3e2e6' : '#e3e2e6'}
              style={{ height: 35 }}
            />


            
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
	return (
		<Tab.Navigator /*screenOptions={{headerShown: false}}*/   tabBar={props => <MyTabBar {...props} />}>
			<Tab.Screen name="Home" component={HomeScreen}  options={{headerShown: false /*headerStyle: {
              backgroundColor: (Colors.tab)
           }*/}}/>
            <Tab.Screen name="Search" component={Search} />
			<Tab.Screen name="Settings" component={Resize}  options={{headerShown:false}} />
		</Tab.Navigator>
	);
}


import EditBar from '../../Admin/Components/v2Components/editBar';
import React, { useState, useEffect, useRef } from 'react';
import { Gesture, GestureDetector, ScrollView } from 'react-native-gesture-handler';
import { closestMatch } from 'closest-match';
import { Menu, MenuOption, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';



const Stack = createStackNavigator();

export default function Strategy() {


  
  
const [tabActive, setTabActive] = useState(false);

  function editBarShow(){
    
    setTabActive(!tabActive);
    console.log(tabActive);

  }  
 

	return (
		
			<Stack.Navigator initialRouteName="Tabs" independant={true} screenOptions={{
                cardStyle: { backgroundColor: (Colors.background) }  // Set the background color to blue
              }}/*screenOptions={{headerShown: false}}*/>
				        <Stack.Screen name="Tabs" component={MyTabs} options={{headerShown:false}} />
                <Stack.Screen name="Test" component={MatchFormLayout} options={{headerShown: false, cardStyle: {backgroundColor: '#000000'}, 
                /* headerRight: () => (<Pressable style={{ marginRight: 30 }} onPress={editBarShow}>
                                      <MaterialIcons name="edit" size={24} color="black" />
                </Pressable>) */ }} /> 
                <Stack.Screen name="AutoMap" component={MatchForm} />
                <Stack.Screen name="Preview" component={Preview} />
                <Stack.Screen name="Pages" component={MatchFormPages} options={{headerShown: false}} />
  </Stack.Navigator>
		
	);
}




/* import { Text, View, Button, TouchableOpacity } from 'react-native';


export default function Home(props) {

    const gotoTestStackScreen = () => {
		props.navigation.navigate('Test');
	};
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
			<Button title="Go to test stack screen" onPress={gotoTestStackScreen} />
		</View>
	);
}*/