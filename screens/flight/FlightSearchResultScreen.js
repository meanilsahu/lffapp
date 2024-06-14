import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  VirtualizedList,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState, useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import FlightSagementItineraryCard from '../../components/flight/FlightSagementItineraryCard';

const FlightSearchResultScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [flightResponse, SetFlightResponse] = useState([]);
  const [activeAscDes, SetActiveAscDes] = useState('price');
  const [activeAscDesVal, SetActiveAscDesVal] = useState('arrow-up-long');
  const route = useRoute();

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

  const [filteredFlights, setFilteredFlights] = useState(flightResponse);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    airline: [],
    price: [0, 1000],
    departtime: [],
    stops: [],
  });
  const [filterOptions, setFilterOptions] = useState({
    airline: [],
    price: [0, 9000],
    departtime: [],
    stops: [],
  });

  const applyFilters = () => {
    let results = flightResponse;
    if (filters.airline.length > 0) {
      results = results.filter(flight =>
        filters.airline.includes(flight.airlineName),
      );
    }

    if (filters.price.length === 2) {
      results = results.filter(
        flight =>
          flight.fare >= filters.price[0] && flight.fare <= filters.price[1],
      );
    }

    if (filters.departtime.length > 0) {
      results = results.filter(flight =>
        filters.departtime.includes(flight.departTime),
      );
    }

    if (filters.stops.length > 0) {
      results = results.filter(flight => filters.stops.includes(flight.stop));
    }
    
    setFilteredFlights(results);
    setIsModalVisible(false);
  };

  const toggleFilter = (filterType, value) => {
    setFilters(prevFilters => {
      const updatedFilter = prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter(item => item !== value)
        : [...prevFilters[filterType], value];
      return {...prevFilters, [filterType]: updatedFilter};
    });
  };

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

    const raw = JSON.stringify(route.params);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const result = await fetch(
      'https://flights.lowestflightfares.com/lffapiapp/lffApiFlightSearch',
      requestOptions,
    );
    return await result.json();
  };

  useEffect(() => {
    if (flightResponse.length > 0) return;
    setIsLoading(true);
    async function api_request_search() {
      let apires = await get_api_request_search(route.params);
      SetFlightResponse(apires.flightItineraries);
      setFilteredFlights(apires.flightItineraries);
      setIsLoading(false);
    }
    api_request_search();
  }, []);
  /* console.log(flightResponse); */
  useEffect(() => {
    const airlines = [
      ...new Set(flightResponse.map(flight => flight.airlineName)),
    ];
    const departtimes = [
      ...new Set(flightResponse.map(flight => flight.departTime)),
    ];
    const stops = [...new Set(flightResponse.map(flight => flight.stop))];
    const minPrice = Math.min(...flightResponse.map(flight => flight.fare));
    const maxPrice = Math.max(...flightResponse.map(flight => flight.fare));    
    setFilterOptions({
      airline: airlines,
      price: [minPrice, maxPrice],
      departtime: departtimes,
      stops: stops,
    });
    setFilters({...filters, price: [minPrice, maxPrice]});
  }, [flightResponse]);

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
      <Button title="Filter Flights" onPress={() => setIsModalVisible(true)} />
      {isLoading ? (
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            color: 'green',
            marginTop: 20,
          }}>
          Fetching Flight Result....
        </Text>
      ) : (
        <FlatList
          data={filteredFlights}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <FlightSagementItineraryCard itemrow={item} />
          )}
        />
      )}

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <ScrollView>
            <Text style={styles.modalTitle}>Filter Flights</Text>

            <Text style={styles.filterTitle}>Airline</Text>
            {filterOptions.airline.map((airline, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('airline', airline)}>
                <Text
                  style={{
                    ...styles.filterOption,
                    backgroundColor: filters.airline.includes(airline)
                      ? '#ccc'
                      : '#fff',
                  }}>
                  {airline}
                </Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.filterTitle}>
              Price {filterOptions.price[0] + ' - ' + filterOptions.price[1]}
            </Text>
            <MultiSlider
              values={filters.price}
              min={filterOptions.price[0]}
              max={filterOptions.price[1]}
              onValuesChange={values => setFilters({...filters, price: values})}
              step={0.1}
              selectedStyle={{backgroundColor: 'blue'}}
              unselectedStyle={{backgroundColor: 'silver'}}
              markerStyle={{backgroundColor: 'blue'}}
            />

            <Text style={styles.filterTitle}>Depart Time</Text>
            {filterOptions.departtime.map((departtime, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('departtime', departtime)}>
                <Text
                  style={{
                    ...styles.filterOption,
                    backgroundColor: filters.departtime.includes(departtime)
                      ? '#ccc'
                      : '#fff',
                  }}>
                  {departtime}
                </Text>
                
              </TouchableOpacity>
            ))}

            <Text style={styles.filterTitle}>Stops</Text>
            {filterOptions.stops.map((stop, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleFilter('stops', stop)}>
                <Text
                  style={{
                    ...styles.filterOption,
                    backgroundColor: filters.stops.includes(stop)
                      ? '#ccc'
                      : '#fff',
                  }}>
                  {stop}
                </Text>
              </TouchableOpacity>
            ))}

            <Button title="Apply Filters" onPress={applyFilters} />
            <Button title="Close" onPress={() => setIsModalVisible(false)} />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default FlightSearchResultScreen;

const styles = StyleSheet.create({
  loadingIndicator: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  flightItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  filterOption: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
