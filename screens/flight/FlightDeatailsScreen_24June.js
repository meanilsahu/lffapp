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
  SectionList,
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

  const NRParams = route.params;
  const itemrow = NRParams.airSelected;
  const SerachData = NRParams.searchdata;

  const adultCount = SerachData.adultsCount;
  const childCount = SerachData.childrenCount;
  const infantCount = SerachData.infantsCount;

  const leg1Segments = itemrow.leg1.segments;

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

  const dateformateDOB = newDate => {
    let date = new Date(newDate);
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [adultInfo, setAdultInfo] = useState(
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

  const [childInfo, setChildInfo] = useState(
    Array.from({length: childCount}, () => ({
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
  const [infantInfo, setInfantInfo] = useState(
    Array.from({length: infantCount}, () => ({
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

  const toggalDatePicker = index => {
    setShowPicker(index);
  };
  const handleDOBChangeAdult = ({type}, selectedDate, index) => {
    if (type == 'set') {
      if (Platform.OS === 'android') {
        const updatedAdultInfo = [...adultInfo];
        const currentDate = selectedDate || adults[index].dob_date;
        updatedAdultInfo[index].dob_date_assign = currentDate;
        updatedAdultInfo[index].dob_date = dateformateDOB(currentDate);
        setAdultInfo(updatedAdultInfo);
        console.log(adultInfo);
        setShowPicker(null);
      }
    }
  };

  const handleDOBChangeChild = ({type}, selectedDate, index) => {
    if (type == 'set') {
      if (Platform.OS === 'android') {
        const updatedChildInfo = [...childInfo];
        const currentDate = selectedDate || adults[index].dob_date;
        updatedChildInfo[index].dob_date_assign = currentDate;
        updatedChildInfo[index].dob_date = dateformateDOB(currentDate);
        setChildInfo(updatedChildInfo);
        console.log(childInfo);
        setShowPicker(null);
      }
    }
  };

  const handleDOBChangeInfant = ({type}, selectedDate, index) => {
    if (type == 'set') {
      if (Platform.OS === 'android') {
        const updatedInfantInfo = [...infantInfo];
        const currentDate = selectedDate || adults[index].dob_date;
        updatedInfantInfo[index].dob_date_assign = currentDate;
        updatedInfantInfo[index].dob_date = dateformateDOB(currentDate);
        setInfantInfo(updatedInfantInfo);
        console.log(infantInfo);
        setShowPicker(null);
      }
    }
  };

  const handleInputChangeAdt = (index, key, value) => {
    const updatedAdultInfo = [...adultInfo];
    updatedAdultInfo[index][key] = value;
    setAdultInfo(updatedAdultInfo);
  };

  const handleInputChangeChi = (index, key, value) => {
    const updatedChildInfo = [...childInfo];
    updatedChildInfo[index][key] = value;
    setChildInfo(updatedChildInfo);
  };

  const handleInputChangeInf = (index, key, value) => {
    const updatedInfantInfo = [...infantInfo];
    updatedInfantInfo[index][key] = value;
    setInfantInfo(updatedInfantInfo);
  };

  const [selectedCountry, setSelectedCountry] = useState({
    callingCode: ['1'],
    cca2: 'US',
    currency: ['USD'],
    flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAeCAMAAABpA6zvAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAj1QTFRF4bm96r/B6b/B3a6y5bO15bK1wltjyF1j8unr+vDx+vDwyHB2z3J31ZSZ3JicGS9dJTplITdjGjBdKDxnHjNhGzFfKT1oHzZjQjJXtzxFvT1EGjBedYKdXWyNFStaIDVih5OrRFV7FCpZLkJsjpmvdYKeGC5cWmyNQDFWuD5Hvj9GM0dwRlh9NEdwOEtzLEBqTF2BLUFrOUx0M0dvPVB2KT9pTFJ1HDJfeIWgFy1bJjpmhI+oNklxFi1bS12BY3KRFixbUmOF9/f5////aHaUVGSGIjdjPlF3Gi9dfYqkU2SGaHeVUGKFSk5ySlt/PlB3MkZvMUVuKz9qV2eJKz9pO093QDFVtjpCvDpBFSxbgo6nUWKEEilYJjtmj5qwOUxzEihYFCtaa3mXFCxbRDpfRFZ7KDxoJzxnXW2NKT5pYXCQQFJ5UF6BTl+DHjNgcH6aO051HjRhYnGQS1yAUGCD9fT1/vv8/vv7Fy1cfYmjT1+DiZSsZ3aUFS1cRkBkO011M0ZvMERtQVN5QlR6LEBrQ1V7Ok10N0pyL0VvQTBVtTc/uzc+coCcW2qLhJCpLkJri5atc4CcWGmLR0drHzRhITZiaXiWRVd8c4GdIDZiWGiKJTpmPE92YG+PL0NtKj5pJztnIDZjTlh76c/S8dbX8dXXdoOfXm2NiZWsEylZL0JskJuxd4SfFy5cW22OQDNXukZOwUZNwEZNJDllPVB3P1F4MkdwSzxfu0ZOzdLczNHbzdHbzNDb1tPb8NXXWNrergAAAA90Uk5T/v7+/v7+/v7+/v7+/v7+6a2FXwAAAAFiS0dEQ2fQDWIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAITSURBVDjLY+AXEOQXEhbhFxUT5RcRFuIXFODnFxCXkJRCAwzSMrJy8gqKSsoqykqKCvJysqpqaqrqGppaaICBX1tZR1dP38DQyNBAX09XR9nYxMTY1IyBkQkVMPDzm1sYWFpZ29jaWFtZ2lmYq9nbqzk4OjmjAQZpF1dpNwt3D0NPQw93CzdpL29zc28fX2YWVlTAwO/nryzmFRAYFBwUGOAlpuzvFxLiFxoWHoEGGPgjpaOiY2Lj4hPi42JjoqOkE5OS5JJT2NjRAIOQY2paeoZNpn6WfqZNRnpaqmNsrGN2DgcnFypg4M/KzXPLLyjUV9UvLMh3y8stKiwsKi4pLStHBQz8FaKVVYmx1XpKetWxiVWVog41Nba1ddw8aICBv77Bv7HJsLmltaXZsKnRv6Gtvb2to7OrGw0w8Pf0ysn3NSf2T+hPbO6Tl+udqKY2cdJkXj40wMA/Zeq06XnpM7TztGek502fNjNv1qxCaSwBzp8+e9YcMeG58+bPmyssNmfW7AXFxQsWLlq8ZCkqYOBftlxJfkXqylWrV61MXSGvtHzN2rVr1q3fsHETKmAQMNLdHLtFefP8rfM3K2+J3axrJCBgtG37DgyFO3ft2rlz1+6dO/fs3LkbxATjvfuWolvtTCRg4CMSMHQTCRh4iAQM5UQCBi4iAQM7kYAhgkjAwEokID7AmYgEDFpEAgYpIgEA2hc6qEvsr/QAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTMtMTAtMDdUMTM6MTU6MTUrMDI6MDDoZk8yAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDEzLTEwLTA3VDEzOjE1OjE1KzAyOjAwmTv3jgAAAABJRU5ErkJggg==',
    name: 'United States',
    region: 'Americas',
    subregion: 'North America',
  });
  const onSelectCountry = country => {
    setSelectedCountry(country);
  };

  const addcreditinfo = (filedtype,filedvalue) => {
    //console.log('hello');

    console.log(filedtype);
    console.log(filedvalue);

    if(filedtype=="credit_debit_card_no"){
      const formattedNumber = number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();


    }


  };

  const sections = Object.keys(itemrow)
    .filter(key => key.startsWith('leg'))
    .map(legKey => ({
      title: legKey,
      data: itemrow[legKey].segments,
    }));

  
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View>
            <SectionList
              sections={sections}
              keyExtractor={item =>
                `${item.flightNumber}-${item.departureDateTime}`
              }
              renderItem={({item}) => (
                <View>
                  <Text>
                    <FlightDetailsSegment
                      segdata={item}
                      index={item.flightNumber}
                    />
                  </Text>
                </View>
              )}
              renderSectionHeader={({section: {title}}) => (
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
                  {title == 'leg1' && 'Onward Segment'}{' '}
                  {title == 'leg2' && 'Return Segment'}
                </Text>
              )}
              scrollEnabled={false}
              nestedScrollEnabled={true}
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
              {' '}
              Traveler Details
            </Text>
            <View style={{padding: 10}}>
              {adultInfo.map((passenger, i) => (
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
                        handleDOBChangeAdult(event, date, i)
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
                            withFlag: true /* Show flag */,
                            withCountryNameButton: false /* Hide country name button */,
                            withFilter: false,
                            withAlphaFilter: true,
                            withCallingCode: true /* Show calling code */,
                            withEmoji: false /* Hide emoji */,
                            placeholder: '',
                          }}
                          visible={
                            false
                          } /* Set to true to make the modal visible */
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

              {childInfo.map((passenger, i) => (
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
                    }}>{`Child ${i + 1}:`}</Text>
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
                        handleInputChangeChi(i, 'title', text)
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
                      handleInputChangeChi(i, 'first_name', text)
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
                      handleInputChangeChi(i, 'middle_name', text)
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
                      handleInputChangeChi(i, 'last_name', text)
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
                        handleInputChangeChi(i, 'gender', text)
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
                      title={`Select Child ${i + 1} DOB`}
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
                        handleDOBChangeChild(event, date, i)
                      }
                    />
                  )}
                </View>
              ))}

              {infantInfo.map((passenger, i) => (
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
                    }}>{`Infant ${i + 1}:`}</Text>
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
                        handleInputChangeInf(i, 'title', text)
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
                      handleInputChangeInf(i, 'first_name', text)
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
                      handleInputChangeInf(i, 'middle_name', text)
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
                      handleInputChangeInf(i, 'last_name', text)
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
                        handleInputChangeInf(i, 'gender', text)
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
                      title={`Select Child ${i + 1} DOB`}
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
                        handleDOBChangeInfant(event, date, i)
                      }
                    />
                  )}
                </View>
              ))}
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
                        fetchStates(
                          value.id,
                        ); /* Fetch states based on selected country */
                      } else {
                        setSelectedCountryAdd({name: '', id: null});
                        setStateData(
                          [],
                        ); /* Clear states when no country is selected */
                        setCityData(
                          [],
                        ); /* Clear cities when no country is selected */
                      }
                    }}
                    items={countryData}
                    placeholder={{label: 'Select a country', value: null}}
                  />
                  <RNPickerSelect
                    onValueChange={value => {
                      if (value) {
                        setSelectedState(value);
                        fetchCities(
                          value.id,
                        ); /* Fetch cities based on selected state */
                      } else {
                        setSelectedState({name: '', id: null});
                        setCityData(
                          [],
                        ); /* Clear cities when no state is selected */
                      }
                    }}
                    items={stateData}
                    placeholder={{label: 'Select a state', value: null}}
                    disabled={
                      !selectedCountryAdd.id
                    } /* Disable if no country is selected */
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
                    disabled={
                      !selectedState.id
                    } /* Disable if no state is selected */
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
