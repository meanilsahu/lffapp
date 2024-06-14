import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

const Creditcard = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [passenger, setPassenger] = useState({});

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetchStates(selectedCountry);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    }
  }, [selectedState]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        'https://flights.lowestflightfares.com/userinfo/getcountryfatch',
      );
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStates = async countryId => {
    try {
      const response = await axios.get(
        `https://flights.lowestflightfares.com/userinfo/getstatefatch/?country=${countryId}`,
      );
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCities = async stateId => {
    try {
      const response = await axios.get(
        `https://flights.lowestflightfares.com/userinfo/getcityfatch/?state=${stateId}`,
      );
      setCities(response.data);
    } catch (error) {
      console.error(error);
    }
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
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
    {label: '32', value: '32'},
    {label: '33', value: '33'},
    {label: '34', value: '34'},
    {label: '35', value: '35'},
  ];
  return (
    <View>
      <Text
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
        Payment & Billing Details
      </Text>
      <Text
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
        Credit Card Information
      </Text>
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
        onChangeText={text => addcreditinfo('credit_debit_card_no', text)}
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

      <View>
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
            selectedValue={passenger.expiration_month}
            onValueChange={text => addcreditinfo('expiration_month', text)}>
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
            textAlign: 'center',
          }}>
          <Picker
            selectedValue={passenger.expiration_year}
            onValueChange={text => addcreditinfo('expiration_year', text)}>
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
          onChangeText={text => addcreditinfo('card_verification_no', text)}
          secureTextEntry={true}
        />
      </View>
      <View>
        <View
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
          Credit Card Billing Address
        </View>
        <Picker
          selectedValue={passenger.expiration_year}
          onValueChange={text => addcreditinfo('expiration_year', text)}>
          {expirationYearshOptions.map((option, index) => (
            <Picker.Item
              key={index}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
      <View>
        <RNPickerSelect
          onValueChange={value => setSelectedCountry(value)}
          items={countries.map(country => ({
            label: country.name,
            value: country.id,
          }))}
          placeholder={{label: 'Select a country', value: null}}
          style={{
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          }}
        />
        <RNPickerSelect
          onValueChange={value => setSelectedState(value)}
          items={states.map(state => ({label: state.name, value: state.id}))}
          placeholder={{label: 'Select a state', value: null}}
          style={{
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          }}
          disabled={!selectedCountry}
        />
        <RNPickerSelect
          onValueChange={value => setSelectedCity(value)}
          items={cities.map(city => ({label: city.name, value: city.id}))}
          placeholder={{label: 'Select a city', value: null}}
          style={{
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30,
          }}
          disabled={!selectedState}
        />
      </View>
    </View>
  );
};

export default Creditcard;
