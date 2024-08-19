import { StyleSheet, Text, View,ScrollView  } from 'react-native'
import React from 'react'
import {useNavigation, useRoute} from '@react-navigation/native';
import Flightticketcard from '../../components/flight/Flightticketcard';

const FlightTicketScreen = () => {
    const route = useRoute();
    const NRParams = route.params;
    console.log(NRParams);
    const flightDetails = {
        flightNumber: 'AB123',
        departure: 'New York',
        destination: 'London',
        date: '2024-08-15',
        passenger: 'John Doe',
      };

      const flights = [
        {
          airline: 'Airline A',
          price: 150,
          departure: { code: 'JFK', time: '10:00 AM' },
          arrival: { code: 'LAX', time: '1:00 PM' },
          date: '2024-08-15',
        },
        // Add more flight objects as needed
      ];

  return (
    <ScrollView>
      <View style={styles.container}>
      <View>
        <View><Text style={styles.title}>YOUR BOOKING CONFIRMATION EMAIL</Text></View> 
        <View><Text style={styles.title1}>Booking Status</Text></View> 
        <View><Text style={styles.titleBold}>Booking Status:</Text><Text style={styles.titlenormal}> Your Payment is being processed. The Confirmation for your itinerary will be emailed shortly.</Text></View> 
        <View><Text style={styles.titleBold}>Note:</Text> <Text style={styles.titlenormal}> This is not the e-ticket and hence, not valid for traveling. We will send you the e-tickets shortly.</Text></View>         
      </View>

     {flights.map((flight, index) => (
        <Flightticketcard key={index} flight={flight} />
      ))}

      </View>
      

    </ScrollView>
  )
}

export default FlightTicketScreen

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title1: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titleBold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titlenormal:{
    fontSize:18
  }
});