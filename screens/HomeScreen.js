import {
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Header from '../components/Header';
import DatePicker from 'react-native-date-ranges';
import {BottomModal} from 'react-native-modals';
import {ModalFooter} from 'react-native-modals';
import {ModalButton} from 'react-native-modals';
import {ModalTitle} from 'react-native-modals';
import {SlideAnimation} from 'react-native-modals';
import {ModalContent} from 'react-native-modals';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [tripType, setTripType] = useState('oneway');
  const [cabinClass,setcabinClass]=useState('economy')
  const [origin, setOrigin] = useState('');
  const [originiata, setOriginiata] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationiata, setDestinationiata] = useState('');
  const [selectedODates, setSelectedODates] = useState();
  const [selectedRDates, setSelectedRDates] = useState();
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [infant, setInfant] = useState(0);
  const [modalVisibile, setModalVisibile] = useState(false);
  

  useEffect(() => {
    searchitem();
  });

  const searchitem = async () => {
    oiata = await AsyncStorage.getItem('oiata');
    oiatacity = await AsyncStorage.getItem('oiatacity');
    diata = await AsyncStorage.getItem('diata');
    diatacity = await AsyncStorage.getItem('diatacity');
    
    setOrigin(oiatacity);
    setOriginiata(oiata);
    setDestination(diatacity);
    setDestinationiata(diata);
  };

  const mktext = 'Select Trip Date';
  const blockBefore = true;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'LowestFlightFares.com',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 70,
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerRight: () => (
        <Ionicons
          name="notifications-outline"
          size={24}
          color="#fff"
          style={{marginRight: 12}}
        />
      ),
    });
  }, []);
  const customButton = onConfirm => {
    return (
      <Button
        onPress={onConfirm}
        style={{
          container: {width: '80%', marginHorizontal: '3%'},
          text: {fontSize: 20},
        }}
        primary
        text={' '}
        title=" Done "
      />
    );
  };

  const handleOptionTripPress = option => {
    setTripType(option);
  };
  const handleOptionCabinClassPress=option=>{
    setcabinClass(option);
  }

  const tripTypeArray = [
    {
      id: 'oneway',
      tripName: 'One Way',
    },
    {
      id: 'roundtrip',
      tripName: 'Round Trip',
    }/* ,
    {
      id: 'multicity',
      tripName: 'MultiCity',
    }, */
  ];

  const cabinTypeArray= [
    {
        id:'economy',
        cabinClass:'Economy'
    },
    {
        id:'premium_economy',
        cabinClass:'PremiumEconomy'
    },
    {
        id:'business',
        cabinClass:'Business'
    },
    {
        id:'first',
        cabinClass:'First'
    }

  ]

  const handleSearchFlights = async () => {
    if(!tripType){
        Alert.alert('Error', 'Please select a Trip Type.');
        return;
    }
    if(!cabinClass){
        Alert.alert('Error', 'Please select a Cabin Class.');
        return;
    }
    if(!originiata){
        Alert.alert('Error','Please select a Origin City.');
        return;
    }
    if(!destinationiata){
        Alert.alert('Error','Please select a Destination City.');
        return;
    }
    if(!selectedODates){
        Alert.alert('Error','Please select a departure date.');
        return;
    }
    if (tripType === 'roundtrip' && !selectedRDates) {
        Alert.alert('Error', 'Please select a return date.');
        return;
    }
    if (tripType === 'roundtrip' && selectedRDates <= selectedODates) {
        Alert.alert('Error', 'Return date must be after departure date.');
        return;
    }

    try {
        let apireq=new Object;
        if (tripType === 'roundtrip') {
           
            let legs=[];
            let  seg1={
                departureCode:originiata,
                arrivalCode:destinationiata,
                outboundDate:selectedODates
              }
              legs.push(seg1);
              seg2={
                departureCode:destinationiata,
                arrivalCode:originiata,
                outboundDate:selectedRDates
              }
              legs.push(seg2);
              apireq.legs=legs;
              apireq.adultsCount=adult;
              apireq.childrenCount=children;
              apireq.infantsCount=infant;
              apireq.cabin=cabinClass;
              apireq.locale="en";
              apireq.currencyCode="USD";
              apireq.apiMeta="lffen";
              apireq.directFlight="";
              apireq.preferredCarriers="";
        }else{
         
            let legs=[];
            let  seg1={
                departureCode:originiata,
                arrivalCode:destinationiata,
                outboundDate:selectedODates
              }
              legs.push(seg1);             
              apireq.legs=legs;
              apireq.adultsCount=adult;
              apireq.childrenCount=children;
              apireq.infantsCount=infant;
              apireq.cabin=cabinClass;
              apireq.locale="en";
              apireq.currencyCode="USD";
              apireq.apiMeta="lffen";
              apireq.directFlight="";
              apireq.preferredCarriers="";

        }      
        
        navigation.navigate("FlightSearchResult",apireq);      
      } catch (error) {
        console.error('Error flight search form:', error);
        Alert.alert('Error', 'Failed to submit flight search form');
      }    
  };

  return (
    <>
      <View>
        {<Header />}
        <ScrollView>
          <View
            style={{
              margin: 10,
              borderColor: '#FFC72C',
              borderWidth: 3,
              borderRadius: 6,
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 10,
                padding: 5,
              }}>
              {tripTypeArray.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionTripPress(item.id)}
                  style={{}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#003580',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5,
                      }}>
                      {tripType == item.id && (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#003580',
                          }}
                        />
                      )}
                    </View>
                    <Text style={{margin: 5, fontSize: 15, fontWeight: 'bold'}}>
                      {item.tripName}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            {/* Destination */}
            <Pressable
              onPress={() => navigation.navigate('FlightCitySearch')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 5,
                borderColor: '#FFC72C',
                borderWidth: 1,
                paddingVertical: 5,
              }}>
              <FontAwesome5 name="plane-departure" size={24} color="black" />

              <TextInput
                style={{fontSize: 15}}
                placeholderTextColor="black"
                placeholder={origin ? origin : 'Enter Your Origin'}
                editable={false}

              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('FlightDestinationCitySearch')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap:10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 1,
                paddingVertical: 7,
              }}>
              <FontAwesome5 name="plane-arrival" size={24} color="black" />

              <TextInput
                style={{fontSize: 15}}
                placeholderTextColor="black"
                placeholder={
                  destination ? destination : 'Enter Your Destination'
                }
                editable={false}
              />
            </Pressable>
            {/* Check in date range  */}
  
            {tripType==='oneway' &&(     
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 15,
              }}>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                  },
                  headerStyle: {
                    backgroundColor: '#003580',
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                  },
                }}
                returnFormat='YYYY-MM-DD'
                headFormat='YYYY-MM-DD'
                markText={mktext}
                blockBefore={blockBefore}
                selectedBgColor="#0047AB"
                customButton={onConfirm => customButton(onConfirm)}
                onConfirm={(startDate) =>
                  setSelectedODates(startDate.currentDate)
                }
                allowFontScaling={false}
                placeholder={'Select Your Dates'}
                mode={'single'}
              />
            </Pressable>
                )}
             {tripType==='roundtrip' && (     
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 15,
              }}>
              <Ionicons name="calendar-outline" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderRadius: 0,
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                   
                  },
                  headerStyle: {
                    backgroundColor: '#003580',
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginRight: 'auto',
                  },
                }}
                returnFormat='YYYY-MM-DD'
                headFormat='YYYY-MM-DD'
                markText={mktext}
                blockBefore={blockBefore}
                selectedBgColor="#0047AB"
                customButton={onConfirm => customButton(onConfirm)}
                onConfirm={(selectdate) => { 
                    setSelectedODates(selectdate.startDate),
                    setSelectedRDates(selectdate.endDate) 
                }
                  
                }
                allowFontScaling={false}
                placeholder={'Select Your Dates'}
                mode={'range'}
              />
            </Pressable>
                )}

            {/* Room and Guest */}
            <Pressable
              onPress={() => setModalVisibile(!modalVisibile)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 7,
              }}>
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor="red"
                editable={false}
                placeholder={` ${adult} Adult  ${children} Children ${infant} Infant | ${cabinClass} `}
                style={{fontSize:15}}
              />
            </Pressable>
            {/* Serach button */}
            <Pressable
              style={{
                paddingHorizontal: 10,
                borderColor: '#FFC72C',
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: '#2a52be',
              }}>
              <Text
                onPress={handleSearchFlights}
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: '500',
                  color: '#fff',
                }}>
                Search{' '}
              </Text>
            </Pressable>
          </View>
          <Text style={{fontSize: 18, marginHorizontal: 10, fontWeight: 700}}>
            Travel More Spend Less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 150,
                height: 110,
                marginTop: 10,
                backgroundColor: '#003580',
                borderRadius: 10,
                padding: 15,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginVertical: 5,
                }}>
                Genius
              </Text>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: 400}}>
                You are ate geniun level one in our loyalty program
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 150,
                height: 110,
                marginTop: 10,
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{fontSize: 12, fontWeight: 'bold', marginVertical: 5}}>
                15% Discounts
              </Text>
              <Text style={{fontSize: 12, fontWeight: 400}}>
                Compleate 5 Stays to unlock Genius level 2
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 150,
                height: 110,
                marginTop: 10,
                backgroundColor: '#003580',
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginVertical: 5,
                }}>
                Genius
              </Text>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: 400}}>
                You are ate geniun level one in our loyalty program
              </Text>
            </Pressable>
          </ScrollView>
          <Pressable
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 50, resizeMode: 'cover'}}
              source={{
                uri: 'https://www.lowestflightfares.com/wp-content/uploads/2022/12/lowest-logo.png',
              }}
            />
          </Pressable>
          <Pressable
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 50, resizeMode: 'cover'}}
              source={{
                uri: 'https://www.lowestflightfares.com/wp-content/uploads/2022/12/lowest-logo.png',
              }}
            />
          </Pressable>
          <Pressable
            style={{
              marginTop: 30,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 200, height: 50, resizeMode: 'cover'}}
              source={{
                uri: 'https://www.lowestflightfares.com/wp-content/uploads/2022/12/lowest-logo.png',
              }}
            />
          </Pressable>
        </ScrollView>
      </View>
      <BottomModal
        swipeThreshold={200}
        onBackdropPress={() => setModalVisibile(!modalVisibile)}
        swipeDirection={['up', 'down']}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                color: '#fff',
                backgroundColor: '#003580',
              }}
              onPress={() => setModalVisibile(!modalVisibile)}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Travellers" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
        visible={modalVisibile}
        onTouchOutside={() => setModalVisibile(!modalVisibile)}>
        <ModalContent style={{width: '100%', height: 360}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>Adult</Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <Pressable
                onPress={() => setAdult(Math.max(1, adult - 1))}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  {adult}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setAdult(c => c + 1)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={{fontSize:20, fontWeight: '600'}}>Child</Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <Pressable
                onPress={() => setChildren(Math.max(1, children - 1))}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setChildren(c => c + 1)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={{fontSize: 20, fontWeight: '600'}}>Infant</Text>
            <Pressable
              style={{flexDirection: 'row', alignItems: 'center', gap: 15}}>
              <Pressable
                onPress={() => setInfant(Math.max(0, infant - 1))}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  {infant}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setInfant(c => c + 1)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 13,
                  borderColor: '#BEBEBE',
                  backgroundColor: '#E0E0E0',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 20,
                    fontWeight: '600',
                    paddingHorizontal: 6,
                  }}>
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
          <Text style={{fontSize:20,fontWeight:'700'}}>Cabin Class</Text>
          <View
              style={{               
                margin: 10,
                padding: 5,
              }}>
              {cabinTypeArray.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleOptionCabinClassPress(item.id)}
                  style={{}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        height: 24,
                        width: 24,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor: '#003580',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 5,
                      }}>
                      {cabinClass == item.id && (
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: '#003580',
                          }}
                        />
                      )}
                    </View>
                    <Text style={{margin: 5, fontSize: 15, fontWeight: 'bold'}}>
                      {item.cabinClass}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
