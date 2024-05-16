import { FlatList, Pressable, StyleSheet, Text, View, SafeAreaView, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HotelSearchAuto from '../../components/hotel/HotelSearchAuto';

const HotelCitySearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [hotelCityId, setHotelCityId] = useState("");
  const [searchCityResults, setSearchCityResults] = useState([]);

  const getSearchResults = async (text) => {
    if (!text) return [];
    const stocks = await fetch(`https://www.go2fly.in/hotel/get_city_state?term=${text}`);
    return await stocks.json();
  };

  useEffect(() => {
    async function fetchHotelCity() {
      setSearchCityResults(await getSearchResults(searchQuery));
    }
    fetchHotelCity();
  }, [searchQuery]);

  //console.log(searchCityResults);
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 5,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderColor: "#FFC72C",
          borderWidth: 3,
          borderRadius: 10,
        }}>
        <TextInput
          placeholder='Enter Your Destination'
          onChangeText={(text) => setSearchQuery(text) }
        />
        <Ionicons name="search" size={24} color="black" onPress={() => navigation.navigate("Hotel")} />


      </View>


      <HotelSearchAuto data={searchCityResults} setSearchQuery={setSearchQuery} setHotelCityId={setHotelCityId} />
    </SafeAreaView>
  )
}

export default HotelCitySearchScreen

const styles = StyleSheet.create({})