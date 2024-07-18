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
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  adults: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      dob: Yup.date().required('Date of birth is required').nullable(),
    })
  ),
  children: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      dob: Yup.date().required('Date of birth is required').nullable(),
    })
  ),
  infants: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      dob: Yup.date().required('Date of birth is required').nullable(),
    })
  ),
  creditCardNumber: Yup.string()
    .required('Credit card number is required')
    .matches(/^[0-9]{16}$/, 'Credit card number is not valid'),
  expiryDate: Yup.string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Expiry date is not valid'),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV is not valid'),
  billingAddress: Yup.string().required('Billing address is required'),
});

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


  const adultArray=Array.from({length: adultCount}, () => ({
    title: '',
    first_name: '',
    last_name: '',
    dob: '',
  }));


  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      adults: adultArray,
      creditCardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const { fields: adultFields } = useFieldArray({
    control,
    name: 'adults',
  });

  const { fields: childFields,  } = useFieldArray({
    control,
    name: 'children',
  });

  const { fields: infantFields,  } = useFieldArray({
    control,
    name: 'infants',
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Adults</Text>
      {/* {adultFields.map((adult, index) => (
        <View key={adult.id} style={styles.passengerContainer}>
          <Text>Adult {index + 1}</Text>
          <Controller
            control={control}
            name={`adults[${index}].title`}
            render={({ onChange, value }) => (
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={onChange}
              >
                <Picker.Item label="Mr" value="Mr" />
                <Picker.Item label="Mrs" value="Mrs" />
                <Picker.Item label="Ms" value="Ms" />
                <Picker.Item label="Miss" value="Miss" />
                <Picker.Item label="Dr" value="Dr" />
              </Picker>
            )}
          />
          {errors.adults?.[index]?.title && (
            <Text style={styles.error}>{errors.adults[index].title.message}</Text>
          )}
          <Controller
            control={control}
            name={`adults[${index}].first_name`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.adults?.[index]?.first_name && (
            <Text style={styles.error}>{errors.adults[index].first_name.message}</Text>
          )}
          <Controller
            control={control}
            name={`adults[${index}].last_name`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.adults?.[index]?.last_name && (
            <Text style={styles.error}>{errors.adults[index].last_name.message}</Text>
          )}
          <Controller
            control={control}
            name={`adults[${index}].dob`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.adults?.[index]?.dob && (
            <Text style={styles.error}>{errors.adults[index].dob.message}</Text>
          )}
          
        </View>
      ))}
      
      <Text style={styles.header}>Children</Text>
      {childFields.map((child, index) => (
        <View key={child.id} style={styles.passengerContainer}>
          <Text>Child {index + 1}</Text>
          <Controller
            control={control}
            name={`children[${index}].title`}
            render={({ onChange, value }) => (
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={onChange}
              >
                <Picker.Item label="Mr" value="Mr" />
                <Picker.Item label="Mrs" value="Mrs" />
                <Picker.Item label="Ms" value="Ms" />
                <Picker.Item label="Miss" value="Miss" />
                <Picker.Item label="Dr" value="Dr" />
              </Picker>
            )}
          />
          {errors.children?.[index]?.title && (
            <Text style={styles.error}>{errors.children[index].title.message}</Text>
          )}
          <Controller
            control={control}
            name={`children[${index}].firstName`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.children?.[index]?.firstName && (
            <Text style={styles.error}>{errors.children[index].firstName.message}</Text>
          )}
          <Controller
            control={control}
            name={`children[${index}].lastName`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.children?.[index]?.lastName && (
            <Text style={styles.error}>{errors.children[index].lastName.message}</Text>
          )}
          <Controller
            control={control}
            name={`children[${index}].dob`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.children?.[index]?.dob && (
            <Text style={styles.error}>{errors.children[index].dob.message}</Text>
          )}
          
        </View>
      ))}
      
      <Text style={styles.header}>Infants</Text>
      {infantFields.map((infant, index) => (
        <View key={infant.id} style={styles.passengerContainer}>
          <Text>Infant {index + 1}</Text>
          <Controller
            control={control}
            name={`infants[${index}].title`}
            render={({ onChange, value }) => (
              <Picker
                selectedValue={value}
                style={styles.picker}
                onValueChange={onChange}
              >
                <Picker.Item label="Mr" value="Mr" />
                <Picker.Item label="Mrs" value="Mrs" />
                <Picker.Item label="Ms" value="Ms" />
                <Picker.Item label="Miss" value="Miss" />
                <Picker.Item label="Dr" value="Dr" />
              </Picker>
            )}
          />
          {errors.infants?.[index]?.title && (
            <Text style={styles.error}>{errors.infants[index].title.message}</Text>
          )}
          <Controller
            control={control}
            name={`infants[${index}].firstName`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.infants?.[index]?.firstName && (
            <Text style={styles.error}>{errors.infants[index].firstName.message}</Text>
          )}
          <Controller
            control={control}
            name={`infants[${index}].lastName`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.infants?.[index]?.lastName && (
            <Text style={styles.error}>{errors.infants[index].lastName.message}</Text>
          )}
          <Controller
            control={control}
            name={`infants[${index}].dob`}
            render={({ onChange, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.infants?.[index]?.dob && (
            <Text style={styles.error}>{errors.infants[index].dob.message}</Text>
          )}
          
        </View>
      ))} */}
      
      <Controller
        control={control}
        name="creditCardNumber"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
      {errors.creditCardNumber && (
        <Text style={styles.error}>{errors.creditCardNumber.message}</Text>
      )}
      <Controller
        control={control}
        name="expiryDate"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            placeholder="Expiry Date (MM/YY)"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.expiryDate && (
        <Text style={styles.error}>{errors.expiryDate.message}</Text>
      )}
      <Controller
        control={control}
        name="cvv"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            placeholder="CVV"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            keyboardType="numeric"
          />
        )}
      />
      {errors.cvv && (
        <Text style={styles.error}>{errors.cvv.message}</Text>
      )}
      <Controller
        control={control}
        name="billingAddress"
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            placeholder="Billing Address"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.billingAddress && (
        <Text style={styles.error}>{errors.billingAddress.message}</Text>
      )}
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passengerContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default FlightDeatailsScreen;