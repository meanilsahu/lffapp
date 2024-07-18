import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const FlightSagementItineraryCard = ({itemrow, searchdata}) => {
  const navigation = useNavigation();

  let price = itemrow.price;
  let segmdata = itemrow;
  const {width, height} = Dimensions.get('window');

  let newNavData = new Object();
  newNavData.airSelected = itemrow;
  newNavData.searchdata = searchdata;

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('FlightDeatails', newNavData)}
        style={{
          padding: 5,
          margin: 10,
          backgroundColor: 'white',
          borderRadius: 5,
          flexWrap: 'wrap',
        }}>
        {/* Segment End */}
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 30, width: 35}}
            source={{
              uri: `https://flights.lowestflightfares.com/b2b/assets/flight-img/${segmdata.leg1.airlinecode}.png`,
            }}
          />
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {segmdata.leg1.airlinename}
          </Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
          {segmdata.leg1 && (
          <View
            style={{
              padding: 1,
              margin: 2,
            }}>
            <View style={{padding: 0, flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 7,
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.departTime}
                </Text>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.departureAirportCode}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.elapsedTime}
                </Text>

                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.totalduration}
                </Text>
                <View
                  style={{
                    width: 150,
                    height: 2,
                    backgroundColor: 'skyblue',
                  }}>
                  <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                    {segmdata.leg1.stopLabel}
                  </Text>
                </View>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.stopLabel}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 7,
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.arrivalTime}
                </Text>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.arrivalAirportCode}
                </Text>
              </View>
            </View>
          </View>
            )}
          {segmdata.leg2 && (
          <View
            style={{
              padding: 1,
              margin: 2,
            }}>
            <View style={{padding: 0, flexDirection: 'row'}}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 7,
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.departTime}
                </Text>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.departureAirportCode}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 0,
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.elapsedTime}
                </Text>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.totalduration}
                </Text>
                <View
                  style={{
                    width: 150,
                    height: 2,
                    backgroundColor: 'skyblue',
                  }}></View>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.stopLabel}
                </Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 7,
                }}>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.arrivalTime}
                </Text>
                <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
                  {segmdata.leg1.arrivalAirportCode}
                </Text>
              </View>
            </View>
          </View>
              )}  
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                paddingTop: 0,
                color: '#4285f4',
              }}>
              <FontAwesome name="usd" size={20} color="#4285f4" />{' '}
              {price.pricePerAdult}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default FlightSagementItineraryCard;

const styles = StyleSheet.create({});
