import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {useNavigation, useRoute} from '@react-navigation/native';

const FlightTicketScreen = () => {
    const route = useRoute();
    const NRParams = route.params;
    console.log(NRParams);
  return (
    <View>
      <Text>FlightTicketScreen</Text>
    </View>
  )
}

export default FlightTicketScreen

const styles = StyleSheet.create({})