import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';

const Flightticketcard = ({ flight }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.airline}>{flight.airline}</Text>
          <Text style={styles.price}>{`$${flight.price}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.airportCode}>{flight.departure.code}</Text>
          <Text style={styles.time}>{flight.departure.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.arrow}>→</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.airportCode}>{flight.arrival.code}</Text>                         
          <Text style={styles.time}>{flight.arrival.time}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.date}>{flight.date}</Text>
        </View>
      </View>
    </Card>
  )
}

export default Flightticketcard

const styles = StyleSheet.create({
    card:{
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
  airportCode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 20,
    textAlign: 'center',
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
});