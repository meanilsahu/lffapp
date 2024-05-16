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

   

  const leg1Segments=itemrow.leg1.segments;
  const leg2Segments=itemrow.leg2.segments;
  
  let price=itemrow.price;
  const { width, height } = Dimensions.get("window");
  const getUID =() => {     
    const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
    
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
   }
  
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
        renderItem={({ item }) => <Segment segdata={item} />}
      />
       
      {/*  {
          leg1Segments.map((segment, index) => (
          
            <Segment 
            segdata={segment}
            index={index.toString()}
            />
        
          ))
          
          } */}
     
        {/* Segment End */}   
        <View style={{
              width:width-width/3,
              height: 1,
              backgroundColor: 'skyblue',
            }}><Text>Return flight</Text></View> 
        {/* Segment Start */}  
        <FlatList
        data={itemrow.leg2.segments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Segment segdata={item} />}
      />

        {/* {
          leg2Segments.map((segment, index) => (
          
            <Segment 
            segdata={segment}
            index={index.toString()}
            />
        
          ))} */}
        {/* Segment End */}      
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 10,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', paddingTop: 0}}>
            <FontAwesome name="usd" size={20} color="black" /> {price.pricePerAdult}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default FlightSagementItineraryCard;

const styles = StyleSheet.create({});
