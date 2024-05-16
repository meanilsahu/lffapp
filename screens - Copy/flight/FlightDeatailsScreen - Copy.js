import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Image,
  window,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlightDetailsSegment from '../../components/flight/FlightDetailsSegment';
const {width, height} = Dimensions.get('window');
const getUID = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};
const getUID2 = () => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };

  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
};
const FlightDeatailsScreen = () => {
  const route = useRoute();
  const [passengerInfo, setPassengerInfo] = useState('');

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: `Flight Details`,
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
    for (let i = 0; i < adultCount; i++) {
      setPassengerInfo(prevInfo => [...prevInfo, { title: '', first_name: '', middle_name: '',last_name:'',gender:'',dob_date:'',email:'',ccode:'',mobile:'' }]);
    }
  }, []);

  const itemrow = route.params;
  //console.log(itemrow);
  const leg1Segments = itemrow.leg1.segments;
  const leg2Segments = itemrow.leg2.segments;
  const price = itemrow.price;
  const continueBooking = () => {
    Alert.alert('Error', 'continueBooking');
  };
  
  const [adultCount, setAdultCount] = useState(4); // Default adult count
  const [childCount, setChildCount] = useState(2); // Default child count
  const [infantCount, setInfantCount] = useState(2); // Default infant count
  
  
  const [selectedTitle, setSelectedTitle] = useState('');

  const titleOptions = [
    { label: 'Mr.', value: 'Mr' },
    { label: 'Mrs.', value: 'Mrs' },
    { label: 'Ms.', value: 'Ms' },
    { label: 'Mstr.', value: 'MSTR' },
  ];
  const genderOptions=[
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ]
  const countrycodeOptions=[
    { label: '+1 (United States)', value: '1' },
    { label: '+44 (United Kingdom)', value: '44' },
    { label: '+91 (India)', value: '91' },
  ]


  const handleInputChange = (type, index, key, value) => {

   
    const updatedPassengerInfo = {...passengerInfo};
    
     updatedPassengerInfo[index][key] = value;
    setPassengerInfo(updatedPassengerInfo);
    
  };
  const renderPassengerAdult = (type, count) => {
    

    let fields = [];
    /* for (let i = 0; i <= count; i++) { */
    
   /*  } */
    return fields;
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {leg1Segments && (
            <View>
              <Text
                style={{
                  backgroundColor: '#449dd5',
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 5,
                  padding: 10,
                }}>
                Onward Segment
              </Text>
              {leg1Segments.map((segment, index) => (
                <FlightDetailsSegment segdata={segment} index={getUID()} />
              ))}
            </View>
          )}
          {leg2Segments && (
            <View>
              <Text
                style={{
                  backgroundColor: '#449dd5',
                  fontSize: 20,
                  color: '#fff',
                  fontWeight: 'bold',
                  borderRadius: 5,
                  padding: 10,
                }}>
                Return Segment
              </Text>
              {leg2Segments.map((segment, index) => (
                <FlightDetailsSegment segdata={segment} index={getUID2()} />
              ))}
            </View>
          )}
          <View>
            <Text
              style={{
                backgroundColor: '#449dd5',
                fontSize: 20,
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 5,
                padding: 10,
              }}>
              {' '}
              Traveler Details
            </Text>
            <View style={{padding: 10}}>
              <Text>Adults:</Text>
              { passengerInfo.map((passenger, index) => (
    
        <View key={i} style={{marginBottom: 20}}>
          <Text style={{fontSize: 16, fontWeight: '500'}}>{`${
            type.charAt(0).toUpperCase() + type.slice(1)
          } ${i + 1}:`}</Text>

      <Picker  
        selectedValue={passenger.title}      
        onValueChange={text => handleInputChange(type, i, 'title', text)}
      >
        {titleOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>

          <TextInput
            placeholder="First Name"
            onChangeText={text => handleInputChange(type, i, 'first_name', text)}
            style={{
              margin: 10,
              height: 42,
              width:250,
              borderColor: '#449dd5',
              borderWidth: 2,
              borderRadius:7,
              padding:10,
              fontSize:18,
              fontWeight:'bold'
            }}
          />
          <TextInput
            placeholder="Middle Name"
            onChangeText={text => handleInputChange(type, i, 'middle_name', text)}
            style={{
              margin: 10,
              height: 42,
              width:250,
              borderColor: '#449dd5',
              borderWidth: 2,
              borderRadius:7,
              padding:10,
              fontSize:18,
              fontWeight:'bold'
            }}
          />
          <TextInput
            placeholder="Last Name"
            onChangeText={text => handleInputChange(type, i, 'last_name', text)}
            style={{
              margin: 10,
              height: 42,
              width:250,
              borderColor: '#449dd5',
              borderWidth: 2,
              borderRadius:7,
              padding:10,
              fontSize:18,
              fontWeight:'bold'
            }}
          />
          <Picker
        selectedValue={selectedTitle}
        onValueChange={(text,index )=> handleInputChange(type, i, 'gender', text)}
      >
        {genderOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
      <TextInput
            placeholder="Date of Birth (YYYY-MM-DD)"
            onChangeText={text => handleInputChange(type, i, 'dob_date', text)}
          />
          {i==0 && (
            <>
            <TextInput
            placeholder="Email"
            onChangeText={text => handleInputChange(type, i, 'email', text)}
            style={{marginBottom: 10}}
          />
          <Picker
        selectedValue={selectedTitle}
        onValueChange={text => handleInputChange(type, i, 'ccode', text)}
      >
        {countrycodeOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
          <TextInput
            placeholder="Mobile"
            onChangeText={text => handleInputChange(type, i, 'mobile', text)}
            style={{marginBottom: 10}}
          />
            </>

          )}          
         
        </View>
      
    ))}

            {/*   {renderPassengerAdult('adults', adultCount)} */}

              {/* <Text>Children:</Text>

              {renderPassengerAdult('children', childCount)}

              <Text>Infants:</Text>

              {renderPassengerAdult('infants', infantCount)} */}
            </View>
          </View>

          <View
            style={{
              backgroundColor: '#7f8c99',
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: 15,
                  margin: 3,
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                Total Amount
              </Text>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 30,
                    margin: 10,
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  <FontAwesome name="usd" size={30} color="black" />{' '}
                  {price.pricePerAdult}
                  {'   '}
                  <AntDesign name="infocirlceo" size={30} color="black" />
                </Text>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Pressable
                style={{
                  marginTop: 15,
                  paddingHorizontal: 10,
                  borderColor: '#FFC72C',
                  borderWidth: 2,
                  paddingVertical: 15,
                  borderRadius: 7,
                  backgroundColor: '#2a52be',
                  width: width - width / 2,
                }}>
                <Text
                  onPress={continueBooking}
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    color: '#fff',
                  }}>
                  Continue Booking
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default FlightDeatailsScreen;

const styles = StyleSheet.create({});
