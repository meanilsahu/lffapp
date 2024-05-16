import { StyleSheet, Text, View, FlatList, Pressable, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const HotelSearchAuto = ({ data , setSearchQuery,setHotelCityId}) => {
    const navigation = useNavigation();
    /* navigation.reset({
        index: 0,
        routes: [{ name: 'HotelHome' }],
      }) */
    return (
        <View style={{ padding: 10 }}>
            <FlatList data={data} renderItem={({ item }) => {
                return (
                    <Pressable 
                     onPress={() => {
                        setSearchQuery(item.value);
                        setHotelCityId(item.id);
                        navigation.navigate("HotelHome", {
                            input: item.value,
                            id:item.id
                        })

                    }} 
                   /*  onPress={() => navigation.navigate("HotelHome")} */
                    
                    style={{ flexDirection: "row", alignItems: "center", marginVertical:1,
                    borderWidth:1, padding:1
                    ,borderRadius:5,}}>
                        <View style={{ marginLeft:10 }}>
                            <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.value}</Text>

                        </View>
                    </Pressable>
                )

            }} />
        </View>
    )
}

export default HotelSearchAuto

const styles = StyleSheet.create({})