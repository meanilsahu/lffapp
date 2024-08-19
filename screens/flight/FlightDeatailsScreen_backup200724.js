import React, {useLayoutEffect, useState, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FlightDetailsSegment from '../../components/flight/FlightDetailsSegment';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {Formik, FieldArray} from 'formik';
import * as Yup from 'yup';

const calculateAge = dob => {
  const diff = Date.now() - new Date(dob).getTime();
  const age = new Date(diff).getUTCFullYear() - 1970;
  return age;
};

const getEighteenYearsAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
};

const getTwoYearsAgo = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 2);
  return date;
};

const validateCreditCard = (cardType, cardNumber) => {
  const cardRegexes = {
    CarteBlanche: /^(300|301|302|303|304|305)\d{11}$/,
    DinersClub: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    EnRoute: /^2014|2149\d{11}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MasterCard: /^5[1-5][0-9]{14}$/,
    Solo: /^3[47][0-9]{13}$/,
    Switch:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    VisaElectron:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    LaserCard:
      /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/,
    Elo: /^3[47][0-9]{13}$/,
    Hipercard: /^(606282\d{10}(\d{3})?)|(3841(0|4|6)0\d{13})$/,
    AmericanExpress: /^3[47][0-9]{13}$'/,
  };

  const regex = cardRegexes[cardType];
  return regex ? regex.test(cardNumber) : false;
};

/* const validateCreditCard = value => {
  const regex =
    /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
  return regex.test(value) || 'Invalid credit card number';
}; */

const validationSchema = Yup.object().shape({
  adults: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.date()
        .required('Date of birth is required')
        .test(
          'is-valid-age',
          'Invalid age for this category',
          function (value) {
            const age = calculateAge(value);
            if (this.path.includes('adult') && age >= 18) return true;
            return false;
          },
        ),
    }),
  ),
  childs: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.date()
        .required('Date of birth is required')
        .test(
          'is-valid-age',
          'Invalid age for this category',
          function (value) {
            const age = calculateAge(value);
            if (age >= 2 && age < 18) return true;
            return false;
          },
        ),
    }),
  ),
  infants: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('Title is required'),
      first_name: Yup.string().required('First name is required'),
      last_name: Yup.string().required('Last name is required'),
      gender: Yup.string().required('Gender is required'),
      dob: Yup.date()
        .required('Date of birth is required')
        .test(
          'is-valid-age',
          'Invalid age for this category',
          function (value) {
            const age = calculateAge(value);
            if (age < 2) return true;
            return false;
          },
        ),
    }),
  ),
  card_type: Yup.string().required('Select Credit Card Type'),

  creditCardNumber: Yup.string()
    .required('Credit card number is required')
    .test('test-credit-card', 'Invalid credit card number', function (value) {
      const {card_type} = this.parent;
      return validateCreditCard(card_type, value);
    }),
  expiration_month: Yup.string()
    .required('selrct Card Exp. Month')
    .matches(/^[0-9]{2}$/, 'Card Exp. Month is not valid'),
  expiration_year: Yup.string()
    .required('Select Card Exp. Year')
    .matches(/^[0-9]{4}$/, 'Card Exp. Month is not valid'),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV is not valid'),
  card_holder_name: Yup.string().required('Enter card Holder Name'),
  country: Yup.string().required('Select country'),
  state: Yup.string().required('Select state'),
  city: Yup.string().required('Select city'),
  zip_code: Yup.string().required('Zip code is required'),
  billing_phone: Yup.string().required('Enter billing phone no.'),
  billing_email_id: Yup.string()
    .required('Enter billing email id')
    .email('Invalid email address'),
  address1: Yup.string().required('Billing address is required'),
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

  const [countryData, setCountryData] = useState([]);
  const [countryCodeData, setCountryCodeData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const toggalDatePicker = index => {
    setShowPicker(index);
  };
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

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
      const fetchedCountriesCode = response.data.map(country => ({
        label: `${country.name} (${country.phonecode})`,
        value: {name: country.phonecode},
      }));
      setCountryCodeData(fetchedCountriesCode);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
    setLoading(false);
  };

  const NRParams = route.params;
  const itemrow = NRParams.airSelected;
  const SerachData = NRParams.searchdata;
  const adultCount = SerachData.adultsCount;
  const childCount = SerachData.childrenCount;
  const infantCount = SerachData.infantsCount;

  const leg1Segments = itemrow.leg1.segments;
  const price = itemrow.price;
  const titleOptions = [
    {label: 'Select Title', value: ''},
    {label: 'Mr.', value: 'Mr'},
    {label: 'Mrs.', value: 'Mrs'},
    {label: 'Ms.', value: 'Ms'},
    {label: 'Mstr.', value: 'MSTR'},
  ];
  const genderOptions = [
    {label: 'Select Gender', value: ''},
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  const creditcardOptions = [
    {label: 'select Card type', value: ''},
    {label: 'CarteBlanche', value: 'CarteBlanche'},
    {label: 'DinersClub', value: 'DinersClub'},
    {label: 'Discover', value: 'Discover'},
    {label: 'EnRoute', value: 'EnRoute'},
    {label: 'JCB', value: 'JCB'},
    {label: 'Maestro', value: 'Maestro'},
    {label: 'MasterCard', value: 'MasterCard'},
    {label: 'Solo', value: 'Solo'},
    {label: 'Switch', value: 'Switch'},
    {label: 'Visa', value: 'Visa'},
    {label: 'VisaElectron', value: 'VisaElectron'},
    {label: 'LaserCard', value: 'LaserCard'},
    {label: 'Elo', value: 'Elo'},
    {label: 'Hipercard', value: 'Hipercard'},
    {label: 'AmericanExpress', value: 'AmericanExpress'},
  ];
  const cexpirationMonthOptions = [
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
  const ExpirationYearOption = [
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

  const adultArray = Array.from({length: adultCount}, () => ({
    title: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    gender: '',
  }));
  const childArray = Array.from({length: childCount}, () => ({
    title: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    gender: '',
  }));
  const infantArray = Array.from({length: infantCount}, () => ({
    title: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    gender: '',
  }));

  const sections = Object.keys(itemrow)
    .filter(key => key.startsWith('leg'))
    .map(legKey => ({
      title: legKey,
      data: itemrow[legKey].segments,
    }));

  /* const handleFormSubmit = (values) => {
      // Perform any async operations (e.g., API calls)
      // Assuming these operations are completed successfully, navigate to another screen
      //navigation.navigate('NextScreen');
      let apireqpax=new Object;

        apireqpax.postdata=values;
        apireqpax.selectedItinerary=sections;
      navigation.navigate("FlightTicket",apireqpax); 
    };  
 */
  const handleFormSubmit = async values => {
    try {
      console.error('Submission error:', values);
      // Simulate async operation
      await someAsyncFunction(values);
      navigation.navigate('FlightTicket');
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        adults: adultArray,
        childs: childArray,
        infants: infantArray,
        card_type: '',
        creditCardNumber: '',
        expiration_month: '',
        expiration_year: '',
        cvv: '',
        card_holder_name: '',
        country: '',
        state: '',
        city: '',
        zip_code: '',
        billing_phone: '',
        billing_email_id: '',
        address1: '',
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}

      // onSubmit={handleFormSubmit}

      // onSubmit={(values) => Alert.alert(JSON.stringify(values))}

      //onSubmit={values => {
      // same shape as initial values
      // console.log(values);

      //sections
      /*  let apireqpax=new Object;

        apireqpax.postdata=values;
        apireqpax.selectedItinerary=sections; */
      //console.log(values);

      // navigation.navigate("FlightTicket",apireqpax);

      //  }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView contentContainerStyle={styles.container}>
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

          <Text
            style={{
              backgroundColor: '#449dd5',
              fontSize: 15,
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 5,
              padding: 10,
            }}>
            {' '}
            Traveler Details
          </Text>
          <FieldArray
            name="adults"
            render={() => (
              <View>
                {values.adults.map((adult, index) => (
                  <View key={index} style={styles.passengerContainer}>
                    <Text>Adult {index + 1}</Text>
                    <Picker
                      selectedValue={adult.title}
                      onValueChange={handleChange(`adults[${index}].title`)}
                      onBlur={handleBlur(`adults[${index}].title`)}>
                      {titleOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                    {touched.adults?.[index]?.title &&
                      errors.adults?.[index]?.title && (
                        <Text style={styles.error}>
                          {errors.adults[index].title}
                        </Text>
                      )}
                    <TextInput
                      style={styles.input}
                      placeholder="First Name"
                      onChangeText={handleChange(`adults[${index}].first_name`)}
                      onBlur={handleBlur(`adults[${index}].first_name`)}
                      value={adult.first_name}
                    />
                    {touched.adults?.[index]?.first_name &&
                      errors.adults?.[index]?.first_name && (
                        <Text style={styles.error}>
                          {errors.adults[index].first_name}
                        </Text>
                      )}

                    <TextInput
                      style={styles.input}
                      placeholder="Middle Name"
                      onChangeText={handleChange(
                        `adults[${index}].middle_name`,
                      )}
                      onBlur={handleBlur(`adults[${index}].middle_name`)}
                      value={adult.middle_name}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder="Last Name"
                      onChangeText={handleChange(`adults[${index}].last_name`)}
                      onBlur={handleBlur(`adults[${index}].last_name`)}
                      value={adult.last_name}
                    />
                    {touched.adults?.[index]?.last_name &&
                      errors.adults?.[index]?.last_name && (
                        <Text style={styles.error}>
                          {errors.adults[index].last_name}
                        </Text>
                      )}
                    <TouchableOpacity
                      onPress={() => toggalDatePicker('a-' + index)}>
                      <TextInput
                        style={styles.input}
                        placeholder="Date of Birth"
                        value={
                          adult.dob
                            ? new Date(adult.dob).toLocaleDateString()
                            : ''
                        }
                        editable={false}
                      />
                    </TouchableOpacity>
                    {errors.adults?.[index]?.dob &&
                      touched.adults?.[index]?.dob && (
                        <Text style={styles.error}>
                          {errors.adults[index].dob}
                        </Text>
                      )}
                    {showPicker == 'a-' + index && (
                      <DateTimePicker
                        mode="date"
                        value={
                          adult.dob
                            ? new Date(adult.dob)
                            : getEighteenYearsAgo()
                        }
                        maximumDate={getEighteenYearsAgo()}
                        display="spinner"
                        onChange={(event, selectedDate) => {
                          setShowPicker(false);
                          if (selectedDate) {
                            setFieldValue(
                              `adults[${index}].dob`,
                              selectedDate.toISOString(),
                            );
                          }
                        }}
                      />
                    )}
                    <Picker
                      selectedValue={adult.gender}
                      onValueChange={handleChange(`adults[${index}].gender`)}
                      onBlur={handleBlur(`adults[${index}].gender`)}>
                      {genderOptions.map((option, index) => (
                        <Picker.Item
                          key={index}
                          label={option.label}
                          value={option.value}
                        />
                      ))}
                    </Picker>
                    {touched.adults?.[index]?.gender &&
                      errors.adults?.[index]?.gender && (
                        <Text style={styles.error}>
                          {errors.adults[index].gender}
                        </Text>
                      )}
                  </View>
                ))}
              </View>
            )}
          />
          {values.childs ? (
            <FieldArray
              name="childs"
              render={() => (
                <View>
                  {values.childs.map((child, index) => (
                    <View key={index} style={styles.passengerContainer}>
                      <Text>Child {index + 1}</Text>
                      <Picker
                        selectedValue={child.title}
                        onValueChange={handleChange(`childs[${index}].title`)}
                        onBlur={handleBlur(`childs[${index}].title`)}>
                        {titleOptions.map((option, index) => (
                          <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                      {touched.childs?.[index]?.title &&
                        errors.childs?.[index]?.title && (
                          <Text style={styles.error}>
                            {errors.childs[index].title}
                          </Text>
                        )}
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onChangeText={handleChange(
                          `childs[${index}].first_name`,
                        )}
                        onBlur={handleBlur(`childs[${index}].first_name`)}
                        value={child.first_name}
                      />
                      {touched.childs?.[index]?.first_name &&
                        errors.childs?.[index]?.first_name && (
                          <Text style={styles.error}>
                            {errors.childs[index].first_name}
                          </Text>
                        )}

                      <TextInput
                        style={styles.input}
                        placeholder="Middle Name"
                        onChangeText={handleChange(
                          `childs[${index}].middle_name`,
                        )}
                        onBlur={handleBlur(`childs[${index}].middle_name`)}
                        value={child.middle_name}
                      />

                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onChangeText={handleChange(
                          `childs[${index}].last_name`,
                        )}
                        onBlur={handleBlur(`childs[${index}].last_name`)}
                        value={child.last_name}
                      />
                      {touched.childs?.[index]?.last_name &&
                        errors.childs?.[index]?.last_name && (
                          <Text style={styles.error}>
                            {errors.childs[index].last_name}
                          </Text>
                        )}

                      <TouchableOpacity
                        onPress={() => toggalDatePicker('c-' + index)}>
                        <TextInput
                          style={styles.input}
                          placeholder="Date of Birth"
                          value={
                            child.dob
                              ? new Date(child.dob).toLocaleDateString()
                              : ''
                          }
                          editable={false}
                        />
                      </TouchableOpacity>
                      {errors.childs?.[index]?.dob &&
                        touched.childs?.[index]?.dob && (
                          <Text style={styles.error}>
                            {errors.childs[index].dob}
                          </Text>
                        )}
                      {showPicker == 'c-' + index && (
                        <DateTimePicker
                          mode="date"
                          value={
                            child.dob ? new Date(child.dob) : getTwoYearsAgo()
                          }
                          maximumDate={getTwoYearsAgo()}
                          minimumDate={getEighteenYearsAgo()}
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) {
                              setFieldValue(
                                `childs[${index}].dob`,
                                selectedDate.toISOString(),
                              );
                            }
                          }}
                        />
                      )}
                      <Picker
                        selectedValue={child.gender}
                        onValueChange={handleChange(`childs[${index}].gender`)}
                        onBlur={handleBlur(`childs[${index}].gender`)}>
                        {genderOptions.map((option, index) => (
                          <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                      {touched.childs?.[index]?.gender &&
                        errors.childs?.[index]?.gender && (
                          <Text style={styles.error}>
                            {errors.childs[index].gender}
                          </Text>
                        )}
                    </View>
                  ))}
                </View>
              )}
            />
          ) : (
            ''
          )}
          {values.infants ? (
            <FieldArray
              name="infants"
              render={() => (
                <View>
                  {values.infants.map((infant, index) => (
                    <View key={index} style={styles.passengerContainer}>
                      <Text>Infant {index + 1}</Text>
                      <Picker
                        selectedValue={infant.title}
                        onValueChange={handleChange(`infants[${index}].title`)}
                        onBlur={handleBlur(`infants[${index}].title`)}>
                        {titleOptions.map((option, index) => (
                          <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                      {touched.infants?.[index]?.title &&
                        errors.infants?.[index]?.title && (
                          <Text style={styles.error}>
                            {errors.infants[index].title}
                          </Text>
                        )}
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        onChangeText={handleChange(
                          `infants[${index}].first_name`,
                        )}
                        onBlur={handleBlur(`infants[${index}].first_name`)}
                        value={infant.first_name}
                      />
                      {touched.infants?.[index]?.first_name &&
                        errors.infants?.[index]?.first_name && (
                          <Text style={styles.error}>
                            {errors.infants[index].first_name}
                          </Text>
                        )}

                      <TextInput
                        style={styles.input}
                        placeholder="Middle Name"
                        onChangeText={handleChange(
                          `infants[${index}].middle_name`,
                        )}
                        onBlur={handleBlur(`infants[${index}].middle_name`)}
                        value={infant.middle_name}
                      />

                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        onChangeText={handleChange(
                          `infants[${index}].last_name`,
                        )}
                        onBlur={handleBlur(`infants[${index}].last_name`)}
                        value={infant.last_name}
                      />
                      {touched.infants?.[index]?.last_name &&
                        errors.infants?.[index]?.last_name && (
                          <Text style={styles.error}>
                            {errors.infants[index].last_name}
                          </Text>
                        )}

                      <TouchableOpacity
                        onPress={() => toggalDatePicker('i-' + index)}>
                        <TextInput
                          style={styles.input}
                          placeholder="Date of Birth"
                          value={
                            infant.dob
                              ? new Date(infant.dob).toLocaleDateString()
                              : ''
                          }
                          editable={false}
                        />
                      </TouchableOpacity>
                      {errors.infants?.[index]?.dob &&
                        touched.infants?.[index]?.dob && (
                          <Text style={styles.error}>
                            {errors.infants[index].dob}
                          </Text>
                        )}
                      {showPicker == 'i-' + index && (
                        <DateTimePicker
                          mode="date"
                          value={infant.dob ? new Date(infant.dob) : new Date()}
                          maximumDate={getTwoYearsAgo()}
                          minimumDate={new Date()}
                          display="spinner"
                          onChange={(event, selectedDate) => {
                            setShowPicker(false);
                            if (selectedDate) {
                              setFieldValue(
                                `infants[${index}].dob`,
                                selectedDate.toISOString(),
                              );
                            }
                          }}
                        />
                      )}
                      <Picker
                        selectedValue={infant.gender}
                        onValueChange={handleChange(`infants[${index}].gender`)}
                        onBlur={handleBlur(`infants[${index}].gender`)}>
                        {genderOptions.map((option, index) => (
                          <Picker.Item
                            key={index}
                            label={option.label}
                            value={option.value}
                          />
                        ))}
                      </Picker>
                      {touched.infants?.[index]?.gender &&
                        errors.infants?.[index]?.gender && (
                          <Text style={styles.error}>
                            {errors.infants[index].gender}
                          </Text>
                        )}
                    </View>
                  ))}
                </View>
              )}
            />
          ) : (
            ''
          )}

          <Text
            style={{
              backgroundColor: '#449dd5',
              fontSize: 17,
              color: '#fff',
              borderRadius: 5,
              padding: 10,
            }}>
            Payment & Billing Details | Credit Card Information
          </Text>

          <Picker
            selectedValue={values.card_type}
            onValueChange={handleChange('card_type')}
            onBlur={handleBlur('card_type')}>
            {creditcardOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          {touched.card_type && errors.card_type && (
            <Text style={styles.error}>{errors.card_type}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            onChangeText={handleChange('creditCardNumber')}
            onBlur={handleBlur('creditCardNumber')}
            value={values.creditCardNumber}
            keyboardType="numeric"
          />
          {touched.creditCardNumber && errors.creditCardNumber && (
            <Text style={styles.error}>{errors.creditCardNumber}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Card Holder's Name"
            onChangeText={handleChange('card_holder_name')}
            onBlur={handleBlur('card_holder_name')}
            value={values.card_holder_name}
          />
          {touched.card_holder_name && errors.card_holder_name && (
            <Text style={styles.error}>{errors.card_holder_name}</Text>
          )}

          <Picker
            selectedValue={values.expiration_month}
            onValueChange={handleChange('expiration_month')}
            onBlur={handleBlur('expiration_month')}>
            {cexpirationMonthOptions.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          {touched.expiration_month && errors.expiration_month && (
            <Text style={styles.error}>{errors.expiration_month}</Text>
          )}

          <Picker
            selectedValue={values.expiration_year}
            onValueChange={handleChange('expiration_year')}
            onBlur={handleBlur('expiration_year')}>
            {ExpirationYearOption.map((option, index) => (
              <Picker.Item
                key={index}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
          {touched.expiration_year && errors.expiration_year && (
            <Text style={styles.error}>{errors.expiration_year}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="CVV"
            onChangeText={handleChange('cvv')}
            onBlur={handleBlur('cvv')}
            value={values.cvv}
            keyboardType="numeric"
          />
          {touched.cvv && errors.cvv && (
            <Text style={styles.error}>{errors.cvv}</Text>
          )}

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
                setStateData([]);
                setCityData([]);
                fetchStates(value.id);
                setFieldValue('country', value.name);
                setFieldValue('state', '');
                setFieldValue('city', '');
              } else {
                setStateData([]);
                setCityData([]);
              }
            }}
            items={countryData}
            placeholder={{label: 'Select a country', value: null}}
          />
          {errors.country && touched.country && (
            <Text style={styles.error}>{errors.country}</Text>
          )}

          <RNPickerSelect
            onValueChange={value => {
              if (value) {
                fetchCities(value.id);
                setFieldValue('state', value.name);
              } else {
                setFieldValue('state', '');
                setCityData([]);
              }
            }}
            items={stateData}
            /*  disabled={!values.state} */
            placeholder={{label: 'Select a state', value: null}}
          />

          {errors.state && touched.state && (
            <Text style={styles.error}>{errors.state}</Text>
          )}

          <RNPickerSelect
            onValueChange={value => {
              if (value) {
                setFieldValue('city', value.name);
              } else {
                setFieldValue('city', '');
              }
            }}
            items={cityData}
            placeholder={{label: 'Select a city', value: null}}
            /*       disabled={!values.state} */
          />
          {errors.city && touched.city && (
            <Text style={styles.error}>{errors.city}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Postal/Zip Code"
            onChangeText={handleChange('zip_code')}
            onBlur={handleBlur('zip_code')}
            value={values.zip_code}
          />
          {touched.zip_code && errors.zip_code && (
            <Text style={styles.error}>{errors.zip_code}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Address "
            onChangeText={handleChange('address1')}
            onBlur={handleBlur('address1')}
            value={values.address1}
          />
          {touched.address1 && errors.address1 && (
            <Text style={styles.error}>{errors.address1}</Text>
          )}
          <RNPickerSelect
            onValueChange={value => {
              if (value) {
                setFieldValue('country', value.phonecode);
              } else {
              }
            }}
            items={countryCodeData}
            placeholder={{label: 'Select a country Code', value: null}}
          />
          {errors.ccode && touched.ccode && (
            <Text style={styles.error}>{errors.ccode}</Text>
          )}
          <TextInput
            style={styles.input}
            placeholder="Billing Phone"
            onChangeText={handleChange('billing_phone')}
            onBlur={handleBlur('billing_phone')}
            value={values.billing_phone}
            keyboardType="numeric"
          />
          {touched.billing_phone && errors.billing_phone && (
            <Text style={styles.error}>{errors.billing_phone}</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email id"
            onChangeText={handleChange('billing_email_id')}
            onBlur={handleBlur('billing_email_id')}
            value={values.billing_email_id}
          />
          {touched.billing_email_id && errors.billing_email_id && (
            <Text style={styles.error}>{errors.billing_email_id}</Text>
          )}

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View>
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
            <View style={{paddingTop: 30}}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  backgroundColor: '#2a52be',
                  padding: 10,
                  width: 230,
                  height: 50,
                  borderRadius: 7,
                }}
                onPress={handleSubmit}>
                <Text style={{color: '#fff', fontSize: 18}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  passengerContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 4,
    borderRadius: 4,
  },
  error: {
    color: 'red',
  },
});

export default FlightDeatailsScreen;
