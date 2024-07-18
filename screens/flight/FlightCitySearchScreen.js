import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlightCitySearchScreen = props => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Origin City',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 70,
      },
      headerStyle: {
        backgroundColor: '#003580',
        height: 80,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  const [searchOrigin, setSearchOrigin] = useState('');
  const [searchCityResults, setSearchCityResults] = useState([]);
  const getSearchResuts = async text => {
    if (!text) return [];
    const result = await fetch(
      `https://flights.lowestflightfares.com/flight/getAirpotrCity?term=${text}`,
    );
    return await result.json();
  };

  useEffect(() => {
    async function originsearch() {
      setSearchCityResults(await getSearchResuts(searchOrigin));
    }
    originsearch();
  }, [searchOrigin]);
  const [origin, setOrigin] = useState('');

  const searchitempress = (iata, value) => {
    searchitempresso(iata, value);
    navigation.navigate('HomeOverview');
  };

  const searchitempresso = async (iata, value) => {
    await AsyncStorage.setItem('oiata', iata);
    await AsyncStorage.setItem('oiatacity', value);
  };

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 2,
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderColor: '#FFC72C',
          borderWidth: 3,
          borderRadius: 10,
        }}>
        <TextInput
          placeholder="Search your origin city."
          onChangeText={text => setSearchOrigin(text)}
          style={{fontSize:18,fontWeight:'bold'}}
          autoFocus = {true}
        />
        <Ionicons name="search" size={30} color="black" />
      </View>
      <View style={{padding: 10}}>
        <FlatList
          data={searchCityResults}
          renderItem={({item}) => {
            return (
              <Pressable
                onPress={() => {
                  searchitempress(item.iata, item.value);
                }}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 1,
                  borderWidth: 1,
                  padding: 1,
                  borderRadius: 5,
                }}>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 15, fontWeight: '500', padding: 5}}>
                    {item.value}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FlightCitySearchScreen;

const styles = StyleSheet.create({});
