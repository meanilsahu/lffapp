import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Segment from './Segment';

const FlightSagementItineraryCard = ({itemrow}) => {
  const navigation = useNavigation(); 

  let price = itemrow.price;
  const {width, height} = Dimensions.get('window');

  return (
    <View>
      <Pressable
        onPress={() => navigation.navigate('FlightDeatails', itemrow)}
        style={{
          padding: 5,
          margin: 10,
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 5,
          flexWrap: 'wrap',
        }}>
        {/* Segment End */}

        <FlatList
          data={itemrow.leg1.segments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Segment segdata={item} />}
        />

        {/* Segment End */}
        {itemrow.leg2 && (
          <View>
        <View
          style={{
            width: width - width / 3,
            height: 1,
            backgroundColor: 'skyblue',
          }}>
          <Text>Return flight</Text>
        </View>      
        <FlatList
          data={itemrow.leg2.segments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <Segment segdata={item} />}
        />
        </View>
        )}
        {/* Segment End */}
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 0}}>
            <FontAwesome name="usd" size={20} color="black" />{' '}
            {price.pricePerAdult}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FlightSagementItineraryCard;

const styles = StyleSheet.create({});
