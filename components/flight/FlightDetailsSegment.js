import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

let FlightDetailsSegment = ({segdata,index}) => {
  let segmdata = segdata;
  let DdateTimeString = segmdata.departureDateTime;
  let DdateTime = new Date(DdateTimeString);
  let Dhours = DdateTime.getHours();
  let Dminutes = DdateTime.getMinutes();
  let Dampm = Dhours >= 12 ? 'pm' : 'am';
  let DhoursTD=Dhours > 9  ? Dhours: `0${Dhours}`;
  let DminutesTD=Dminutes > 9 ? Dminutes: `0${Dminutes}`;
  let dformattedTime = `${DhoursTD}:${DminutesTD} ${Dampm}`;

  let AdateTimeString = segmdata.departureDateTime;
  let AdateTime = new Date(AdateTimeString);
  let Ahours = AdateTime.getHours();
  let Aminutes = AdateTime.getMinutes();
  let Aampm = Ahours >= 12 ? 'pm' : 'am';
  let AhoursTD=Ahours > 9 ? Ahours: `0${Dhours}`;
  let AminutesTD=Aminutes > 9 ? Aminutes: `0${Aminutes}`;
  let aformattedTime = `${AhoursTD}:${AminutesTD} ${Aampm}`;
  

  return (
    <View
      style={{
        padding: 1,
        margin: 5,
        flexDirection: 'row',        
      }}
      key={index}
      >
      <View style={{padding:0, alignItems: 'center',
            justifyContent: 'space-between',}}>
        <Image
          style={{height: 30, width: 35}}
          source={{
            uri: `https://flights.lowestflightfares.com/b2b/assets/flight-img/${segmdata.airlineCode}.png`,
          }}
        />
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>
          {segmdata.airlineCode}-{segmdata.flightNumber}
        </Text>
      </View>
      <View style={{padding:0, flexDirection: 'row'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:10
          }}>
          <Text style={{fontSize: 16,  fontWeight: 'bold'}}>
           {dformattedTime}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {segmdata.departureAirportCode}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding:10,
          }}>
          <Text style={{fontSize: 16,  fontWeight: 'bold'}}>
            {segmdata.elapsedTime}
          </Text>
          <Text
            style={{
              width: 75,
              height: 2,
              backgroundColor: 'skyblue',
            }}></Text>
          <Text style={{fontSize: 16,  fontWeight: 'bold'}}>  </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
          }}>
          <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
           {aformattedTime}
          </Text>
          <Text style={{fontSize: 16, padding: 0, fontWeight: 'bold'}}>
            {segmdata.arrivalAirportCode}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FlightDetailsSegment;

const styles = StyleSheet.create({});
