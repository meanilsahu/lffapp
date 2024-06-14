import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from "@react-navigation/native";

const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={{
            backgroundColor: "#003580",
            height: 75,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderColor: "#fff",
                    borderWidth: 2,
                    borderRadius: 25,
                    padding:6
                }}>
                <Ionicons name="airplane-outline" size={25} color="#fff" />
                <Text
                    style={{
                        margin:5,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 15
                    }}> Flight
                </Text>
            </Pressable>
            <Pressable
                onPress={() => navigation.navigate("HotelHome")}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',

                }}>
                <Ionicons name="bed-outline" size={24} color="#fff" />
                <Text
                    style={{
                       margin:5,
                       fontWeight: 'bold',
                       color: '#fff',
                       fontSize: 15
                    }}>Hotels
                </Text>
            </Pressable>

            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Ionicons name="bus-outline" size={25} color="#fff" />
                <Text
                    style={{
                        margin:5,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 15
                    }}>Bus
                </Text>
            </Pressable>
            <Pressable
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <MaterialCommunityIcons name="beach" size={27} color="#fff" />
                <Text
                    style={{
                        margin:5,
                        fontWeight: 'bold',
                        color: '#fff',
                        fontSize: 15
                    }}>Holiday
                </Text>
            </Pressable>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({})