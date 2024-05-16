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
  Platform,
  Button,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlightDetailsSegment from '../../components/flight/FlightDetailsSegment';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal'

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
  }, []);

  const itemrow = route.params;
  //console.log(itemrow);
  const leg1Segments = itemrow.leg1.segments;
  const leg2Segments = itemrow.leg2.segments;
  const price = itemrow.price;
  const continueBooking = () => {
    Alert.alert('Error', 'continueBooking');
  };
  
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(false);

  

  const validateDOB = () => {
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    if (date < eighteenYearsAgo) {
      console.log('Valid DOB. Adult.');
    } else {
      console.log('Not an adult.');
    }
  };

  const [adultCount, setAdultCount] = useState(8); // Default adult count
  const [childCount, setChildCount] = useState(2); // Default child count
  const [infantCount, setInfantCount] = useState(2); // Default infant count

  const [passengerInfo, setPassengerInfo] = useState(
    Array.from({length: adultCount}, () => ({
      title: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      gender: '',
      dob_date_assign: new Date(),
      dob_date: '',
      email: '',
      ccode: '',
      mobile: '',
    })),
  );

  const titleOptions = [
    {label: 'Mr.', value: 'Mr'},
    {label: 'Mrs.', value: 'Mrs'},
    {label: 'Ms.', value: 'Ms'},
    {label: 'Mstr.', value: 'MSTR'},
  ];
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  const countrycodeOptions = [
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
    {label: '+1 (United States)', value: '1'},
    {label: '+44 (United Kingdom)', value: '44'},
    {label: '+91 (India)', value: '91'},
  ];
  const toggalDatePicker = index => {
    setShowPicker(index);
  };
  const handleDOBChange = ({type}, selectedDate, index) => {
    if (type == 'set') {
      if (Platform.OS === 'android') {
        const updatedPassengerInfo = [...passengerInfo];
        const currentDate = selectedDate || adults[index].dob_date;
        updatedPassengerInfo[index].dob_date_assign = currentDate;
        updatedPassengerInfo[index].dob_date = dateformateDOB(currentDate);
        setPassengerInfo(updatedPassengerInfo);
        console.log(passengerInfo);
        setShowPicker(null);
      }
    }
  };

  const dateformateDOB = newDate => {
    let date = new Date(newDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChangeAdt = (index, key, value) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index][key] = value;
    setPassengerInfo(updatedPassengerInfo);
    //console.log(passengerInfo);
  };
  const [selectedCountry, setSelectedCountry] = useState(null); // Default selected country

  const onSelectCountry = (country) => {
    setSelectedCountry(country);
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
                <FlightDetailsSegment segdata={segment} index={index} />
              ))}

      {/* <FlatList
        data={itemrow.leg1.segments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FlightDetailsSegment segdata={item} />}
      /> */}


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
                <FlightDetailsSegment segdata={segment} index={index} />
              ))}
         {/*      <FlatList
        data={itemrow.leg2.segments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <FlightDetailsSegment segdata={item} />}
      /> */}
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
              {passengerInfo.map((passenger, i) => (
                <View
                  key={i}
                  style={{
                    marginBottom: 20,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '500',
                      padding: 1,
                    }}>{`Adult ${i + 1}:`}</Text>
                  <View
                    style={{
                      borderColor: 'lightblue',
                      borderWidth: 1,
                      borderRadius: 5,
                      margin: 10,
                      fontSize: 18,
                      width: 120,
                      height: 42,
                      textAlign: 'center',
                    }}>
                    <Picker
                      selectedValue={passenger.title}
                      onValueChange={text =>
                        handleInputChangeAdt(i, 'title', text)
                      }>
                      {titleOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                  <TextInput
                    value={passenger.first_name}
                    placeholder="First Name"
                    onChangeText={text =>
                      handleInputChangeAdt(i, 'first_name', text)
                    }
                    style={{
                      margin: 10,
                      height: 42,
                      width: 175,
                      borderColor: '#449dd5',
                      borderWidth: 1,
                      borderRadius: 7,
                      padding: 10,
                      fontSize: 18,
                    }}
                  />
                  <TextInput
                    value={passenger.middle_name}
                    placeholder="Middle Name"
                    onChangeText={text =>
                      handleInputChangeAdt(i, 'middle_name', text)
                    }
                    style={{
                      margin: 10,
                      height: 42,
                      width: 175,
                      borderColor: '#449dd5',
                      borderWidth: 1,
                      borderRadius: 7,
                      padding: 10,
                      fontSize: 18,
                    }}
                  />
                  <TextInput
                    value={passenger.last_name}
                    placeholder="Last Name"
                    onChangeText={text =>
                      handleInputChangeAdt(i, 'last_name', text)
                    }
                    style={{
                      margin: 10,
                      height: 42,
                      width: 175,
                      borderColor: '#449dd5',
                      borderWidth: 1,
                      borderRadius: 7,
                      padding: 10,
                      fontSize: 18,
                    }}
                  />
                  <View
                    style={{
                      borderColor: 'lightblue',
                      borderWidth: 1,
                      borderRadius: 5,
                      margin: 10,
                      fontSize: 18,
                      width: 170,
                      height: 42,
                      textAlign: 'center',
                    }}>
                    <Picker
                      selectedValue={passenger.gender}
                      onValueChange={(text, index) =>
                        handleInputChangeAdt(i, 'gender', text)
                      }>
                      {genderOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>

                  <View>
                    <Pressable
                      title={`Select Adult ${i + 1} DOB`}
                      onPress={() => toggalDatePicker(i)}>
                      <TextInput
                        style={{
                          margin: 10,
                          height: 42,
                          width: 175,
                          borderColor: '#449dd5',
                          borderWidth: 1,
                          borderRadius: 7,
                          padding: 10,
                          fontSize: 18,
                        }}
                        value={passenger.dob_date}
                        placeholder="Date of Birth"
                        editable={false}
                      />
                    </Pressable>
                  </View>
                  {showPicker === i && (
                    <DateTimePicker
                      value={passenger.dob_date_assign}
                      mode="date"
                      display="spinner"
                      onChange={(event, date) =>
                        handleDOBChange(event, date, i)
                      }
                    />
                  )}

                  
                  {i == 0 && (
                    <>
                      <TextInput
                        style={{
                          margin: 10,
                          height: 42,
                          width: 370,
                          borderColor: '#449dd5',
                          borderWidth: 1,
                          borderRadius: 7,
                          padding: 10,
                          fontSize: 18,
                        }}
                        value={passenger.email}
                        placeholder="Email"
                        onChangeText={text =>
                          handleInputChangeAdt(i, 'email', text)
                        }
                        keyboardType="email-address"
                      />
<View style={{ borderColor: 'lightblue',
                          borderWidth: 1,
                          borderRadius: 5,
                          margin: 10,
                          fontSize: 18,
                          width: 130,
                          height: 42,
                           }}>
                         
      <CountryPicker
        {...{
          onSelect: onSelectCountry,
          withFlag: true, // Show flag
          withCountryNameButton: false, // Hide country name button
          withFilter: false,
          withAlphaFilter: true,
          withCallingCode: true, // Show calling code
          withEmoji: false, // Hide emoji
          placeholder:""
        }}
        visible={false} // Set to true to make the modal visible
      />
         {selectedCountry && (
        <View style={{ flexDirection:'row',margin:0,padding:0}}>
        {/*   <Text>Selected Country Flag: {selectedCountry.flag}</Text> */}
          <Image
   source={{uri: selectedCountry.flag}}
   style={{ width:40, height: 30}}
   />
          <Text style={{fontSize:16,}}> (+{selectedCountry.callingCode[0]}) </Text>
        </View>
      )}
    </View>


{/* <View style={{ borderColor: 'lightblue',
                          borderWidth: 1,
                          borderRadius: 5,
                          margin: 10,
                          fontSize: 18,
                          width: 130,
                          height: 42,
                          textAlign: 'center', }}>
      <CountryPicker
        {...{
          onSelect: onSelectCountry,
          withFlag: true,
          withCountryNameButton: false, // Hide country name button
          withFilter: true,
          withAlphaFilter: true,
          withCallingCode: true, // Show calling code
          withEmoji: false, // Hide emoji
        }}
        visible={true} // Set to true to make the modal visible
      />
      <Text>Selected Country Code: {countryDialCode}</Text>
    </View> */}

      {/* <View  style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          borderRadius: 5,
                          margin: 10,
                          fontSize: 18,
                          width: 130,
                          height: 42,
                          textAlign: 'center',
                        }}>
      
        <CountryPicker
      

          countryCode={countryCode.cca2}
          withFilter
          withFlag
          withCountryNameButton
          withAlphaFilter
          withCallingCode
          withEmoji
          onSelect={(country) => setCountryCode(country)}

        />
     { countryCode && (
      <>
         <Text>(+ {countryCode.callingCode})  </Text>
      </>
    )
    } 


        
    </View> */}
                     { /* <View
                        style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          borderRadius: 5,
                          margin: 10,
                          fontSize: 18,
                          width: 130,
                          height: 42,
                          textAlign: 'center',
                        }}>
                        <Picker
                          selectedValue={passenger.ccode}
                          onValueChange={text =>
                            handleInputChangeAdt(i, 'ccode', text)
                          }>
                          {countrycodeOptions.map((option, index) => (
                            <Picker.Item
                              key={index}
                              label={option.label}
                              value={option.value}
                            />
                          ))}
                        </Picker>
                      </View> */ }
                      <TextInput
                        style={{
                          margin: 10,
                          height: 42,
                          width: 220,
                          borderColor: '#449dd5',
                          borderWidth: 1,
                          borderRadius: 7,
                          padding: 10,
                          fontSize: 18,
                        }}
                        value={passenger.mobile}
                        placeholder="Mobile"
                        onChangeText={text =>
                          handleInputChangeAdt(i, 'mobile', text)
                        }
                        keyboardType="phone-pad"
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
              /* position: 'absolute',  */
              bottom: 0,
              left: 0,
              right: 0,
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