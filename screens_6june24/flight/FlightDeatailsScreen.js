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
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlightDetailsSegment from '../../components/flight/FlightDetailsSegment';
import DateTimePicker from '@react-native-community/datetimepicker';
import CountryPicker from 'react-native-country-picker-modal';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import CheckBox from '@react-native-community/checkbox';

const {width, height} = Dimensions.get('window');

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

  const [adultCount, setAdultCount] = useState(1); // Default adult count
  const [childCount, setChildCount] = useState(1); // Default child count
  const [infantCount, setInfantCount] = useState(1); // Default infant count

  const [selectedCountryAdd, setSelectedCountryAdd] = useState({
    name: '',
    id: null,
  });
  const [selectedState, setSelectedState] = useState({name: '', id: null});
  const [selectedCity, setSelectedCity] = useState({name: '', id: null});
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passenger, setPassenger] = useState({});
  const [isSelected, setSelection] = useState(false);

  const handleTermsPress = () => {
    Linking.openURL('https://www.lowestflightfares.com/terms-and-condition/');
  };

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://flights.lowestflightfares.com/userinfo/getcountryfatch',
      );
      const fetchedCountries = response.data.map(country => ({
        label: country.name,
        value: {name: country.name, id: country.id},
      }));
      setCountryData(fetchedCountries);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    setLoading(false);
  };

  const fetchStates = async countryId => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://flights.lowestflightfares.com/userinfo/getstatefatch/?country=${countryId}`,
      );
      const fetchedStates = response.data.map(state => ({
        label: state.name,
        value: {name: state.name, id: state.id},
      }));
      setStateData(fetchedStates);
      setCityData([]);
      setSelectedState({name: '', id: null});
      setSelectedCity({name: '', id: null});
    } catch (error) {
      console.error('Error fetching states:', error);
    }
    setLoading(false);
  };

  const fetchCities = async stateId => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://flights.lowestflightfares.com/userinfo/getcityfatch/?state=${stateId}`,
      );
      const fetchedCities = response.data.map(city => ({
        label: city.name,
        value: {name: city.name, id: city.id},
      }));
      setCityData(fetchedCities);
      setSelectedCity({name: '', id: null});
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const creditcardOptions = [
    {label: 'Carte Blanche', value: 'CarteBlanche'},
    {label: 'Diners Club', value: 'DinersClub'},
    {label: 'Discover', value: 'Discover'},
    {label: 'EnRoute', value: 'EnRoute'},
    {label: 'JCB', value: 'JCB'},
    {label: 'Maestro', value: 'Maestro'},
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'Solo', value: 'Solo'},
    {label: 'Switch', value: 'Switch'},
    {label: 'Visa', value: 'Visa'},
    {label: 'Visa Electron', value: 'VisaElectron'},
    {label: 'LaserCard', value: 'LaserCard'},
    {label: 'Elo', value: 'Elo'},
    {label: 'Hipercard', value: 'Hipercard'},
  ];

  const expirationMonthOptions = [
    {label: '01', value: '01'},
    {label: '02', value: '02'},
    {label: '03', value: '03'},
    {label: '04', value: '04'},
    {label: '05', value: '05'},
    {label: '06', value: '06'},
    {label: '07', value: '07'},
    {label: '08', value: '08'},
    {label: '09', value: '09'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
  ];
  const expirationYearshOptions = [
    {label: '2024', value: '2024'},
    {label: '2025', value: '2025'},
    {label: '2026', value: '2026'},
    {label: '2027', value: '2027'},
    {label: '2028', value: '2028'},
    {label: '2029', value: '2029'},
    {label: '2030', value: '2030'},
    {label: '2031', value: '2031'},
    {label: '2032', value: '2032'},
    {label: '2033', value: '2033'},
    {label: '2034', value: '2034'},
    {label: '2035', value: '2035'},
  ];

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

  const onSelectCountry = country => {
    setSelectedCountry(country);
  };

  const addcreditinfo = () => {
    console.log('hello');
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
                      <View
                        style={{
                          borderColor: 'lightblue',
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
                            placeholder: '',
                          }}
                          visible={false} // Set to true to make the modal visible
                        />
                        {selectedCountry && (
                          <View
                            style={{
                              flexDirection: 'row',
                              margin: 0,
                              padding: 0,
                            }}>
                            {/*   <Text>Selected Country Flag: {selectedCountry.flag}</Text> */}
                            <Image
                              source={{uri: selectedCountry.flag}}
                              style={{width: 40, height: 30}}
                            />
                            <Text style={{fontSize: 16}}>
                              {' '}
                              (+{selectedCountry.callingCode[0]}){' '}
                            </Text>
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
                      {/* <View
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
                      </View> */}
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
                Payment & Billing Details | Credit Card Information
              </Text>
              <View
                style={{
                  borderColor: 'lightblue',
                  borderWidth: 1,
                  borderRadius: 5,
                  margin: 10,
                  fontSize: 18,
                  height: 42,
                  textAlign: 'center',
                }}>
                <Picker
                  selectedValue={passenger.card_type}
                  onValueChange={text => addcreditinfo('card_type', text)}>
                  {creditcardOptions.map((option, index) => (
                    <Picker.Item
                      key={index}
                      label={option.label}
                      value={option.value}
                    />
                  ))}
                </Picker>
              </View>
              <View>
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
                  value={passenger.credit_debit_card_no}
                  placeholder="Credit/Debit Card No"
                  onChangeText={text =>
                    addcreditinfo('credit_debit_card_no', text)
                  }
                  keyboardType="phone-pad"
                />
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
                  value={passenger.card_holder_name}
                  placeholder="Card Holder's Name"
                  onChangeText={text => addcreditinfo('card_holder_name', text)}
                />
              </View>
              <View>
                <View style={{padding: 10, flex: 1}}>
                  <View
                    style={{
                      borderColor: 'lightblue',
                      borderWidth: 1,
                      borderRadius: 5,
                      margin: 10,
                      fontSize: 18,
                      width: 120,
                      height: 42,
                    }}>
                    <Picker
                      selectedValue={passenger.expiration_month}
                      onValueChange={text =>
                        addcreditinfo('expiration_month', text)
                      }>
                      {expirationMonthOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                  <View
                    style={{
                      borderColor: 'lightblue',
                      borderWidth: 1,
                      borderRadius: 5,
                      margin: 10,
                      fontSize: 18,
                      width: 120,
                      height: 42,
                    }}>
                    <Picker
                      selectedValue={passenger.expiration_year}
                      onValueChange={text =>
                        addcreditinfo('expiration_year', text)
                      }>
                      {expirationYearshOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                  </View>
                </View>
                <View>
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
                    value={passenger.card_verification_no}
                    placeholder="Card Verification No."
                    onChangeText={text =>
                      addcreditinfo('card_verification_no', text)
                    }
                    secureTextEntry={true}
                  />
                </View>
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
                    Credit Card Billing Address
                  </Text>
                  <RNPickerSelect
                    onValueChange={value => {
                      if (value) {
                        setSelectedCountryAdd(value);
                        fetchStates(value.id); // Fetch states based on selected country
                      } else {
                        setSelectedCountryAdd({name: '', id: null});
                        setStateData([]); // Clear states when no country is selected
                        setCityData([]); // Clear cities when no country is selected
                      }
                    }}
                    items={countryData}
                    placeholder={{label: 'Select a country', value: null}}
                  />
                  <RNPickerSelect
                    onValueChange={value => {
                      if (value) {
                        setSelectedState(value);
                        fetchCities(value.id); // Fetch cities based on selected state
                      } else {
                        setSelectedState({name: '', id: null});
                        setCityData([]); // Clear cities when no state is selected
                      }
                    }}
                    items={stateData}
                    placeholder={{label: 'Select a state', value: null}}
                    disabled={!selectedCountryAdd.id} // Disable if no country is selected
                  />
                  <RNPickerSelect
                    onValueChange={value => {
                      if (value) {
                        setSelectedCity(value);
                      } else {
                        setSelectedCity({name: '', id: null});
                      }
                    }}
                    items={cityData}
                    placeholder={{label: 'Select a city', value: null}}
                    disabled={!selectedState.id} // Disable if no state is selected
                  />
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
                    value={passenger.zip_code}
                    placeholder="Postal/Zip Code"
                    onChangeText={text => addcreditinfo('zip_code', text)}
                  />
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
                    value={passenger.address1}
                    placeholder="Address "
                    onChangeText={text => addcreditinfo('address1', text)}
                  />
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
                    value={passenger.billing_phone}
                    placeholder="Billing Phone "
                    onChangeText={text => addcreditinfo('billing_phone', text)}
                    keyboardType="phone-pad"
                  />
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
                    value={passenger.billing_mobile_phone}
                    placeholder="Mobile Phone"
                    onChangeText={text =>
                      addcreditinfo('billing_mobile_phone', text)
                    }
                    keyboardType="phone-pad"
                  />
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
                    value={passenger.billing_email_id}
                    placeholder="Email"
                    onChangeText={text =>
                      addcreditinfo('billing_email_id', text)
                    }
                  />

                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 20,
                      alignItems: 'center',
                    }}>
                    <CheckBox
                      value={isSelected}
                      onValueChange={setSelection}
                      style={{alignSelf: 'center'}}
                    />
                    <Pressable onPress={handleTermsPress}>
                      <Text
                        style={{
                          margin: 8,
                          color: 'blue',
                          textDecorationLine: 'underline',
                        }}>
                        I agree to the Terms and Conditions
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
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
