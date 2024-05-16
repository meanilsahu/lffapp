import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FlightSagementItineraryCard from '../../components/flight/FlightSagementItineraryCard';

const FlightSearchResultScreen = () => {
  const [loading, setLoading] = useState(false);
  const [flightResponse, SetFlightResponse] = useState([]);
  const [activeAscDes, SetActiveAscDes] = useState('price');
  const [activeAscDesVal, SetActiveAscDesVal] = useState('arrow-up-long');
  const route = useRoute();
  //console.log(route.params);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'DEL to MIA  12 Jun | 2 Traveler| Ecomomy',
      headerTitleStyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 70,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  const ascdescFilter = a => {
    if (activeAscDes == a) {
      if (activeAscDesVal == 'arrow-down-long') {
        SetActiveAscDesVal('arrow-up-long');
      } else {
        SetActiveAscDesVal('arrow-down-long');
      }
    }
    SetActiveAscDes(a);
  };
  const get_api_request_search = async req => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic amV0Y29zdDpqZXRjb3N0QDIy');

    const raw = JSON.stringify({
      legs: [
        {
          departureCode: 'SJO',
          arrivalCode: 'MDE',
          outboundDate: '2024-07-16',
        },
        {
          departureCode: 'MDE',
          arrivalCode: 'SJO',
          outboundDate: '2024-07-24',
        },
      ],
      adultsCount: '2',
      childrenCount: '1',
      infantsCount: '1',
      cabin: 'economy',
      currencyCode: 'USD',
      locale: 'en',
      apiMeta: 'jetcostUSD',
      directFlight: '',
      preferredCarriers: null,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const result = await fetch(
      'https://api.lffbo.com/airservices/rest/airSearch_metaby_dymmydata',
      requestOptions,
    );
    return await result.json();
  };

  useEffect(() => {
    if (flightResponse.length > 0) return;
    setLoading(true);
    const apireq = api_request_search();

    async function api_request_search() {
      let apires = await get_api_request_search(route.params);
      SetFlightResponse(apires.flightItineraries);
      /*  apires.array.forEach(element => {
        flightResponse(element.flightItineraries)
      }); */
      //console.log(apires.flightItineraries);
      //const fli = apires.flightItineraries;
    }
    api_request_search();
    setLoading(false);
  }, []);
  /* console.log(flightResponse); */
  return (
    <View>
      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: 'white',
        }}>
        <Pressable
          onPress={() => ascdescFilter('departure')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: '500', marginRight: 5}}>
            Departure
          </Text>
          {activeAscDes == 'departure' && (
            <FontAwesome6 name={activeAscDesVal} size={20} color="green" />
          )}
        </Pressable>       

        <Pressable
          onPress={() => ascdescFilter('duration')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: '500', marginRight: 5}}>
            Duration
          </Text>
          {activeAscDes == 'duration' && (
            <FontAwesome6 name={activeAscDesVal} size={20} color="green" />
          )}
        </Pressable>
        <Pressable
          onPress={() => ascdescFilter('arrival')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: '500', marginRight: 5}}>
            Arrival
          </Text>
          {activeAscDes == 'arrival' && (
            <FontAwesome6 name={activeAscDesVal} size={20} color="green" />
          )}
        </Pressable>
        <Pressable
          onPress={() => ascdescFilter('price')}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: '500', marginRight: 5}}>
            Price
          </Text>
          {activeAscDes == 'price' && (
            <FontAwesome6 name={activeAscDesVal} size={20} color="green" />
          )}
        </Pressable>
      </Pressable>
      {loading ? (
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'green',
          }}>
          Fetching Flight Result....
        </Text>
      ) : (
        <FlatList
          data={flightResponse}
          renderItem={({item}) => (           

            <FlightSagementItineraryCard
              itemrow={item}
            
            />
          )}
          keyExtractor={item => item.deeplinkUrl}
        />
      )}
    </View>
  );
};

export default FlightSearchResultScreen;

const styles = StyleSheet.create({});
