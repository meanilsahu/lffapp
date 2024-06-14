import { Button, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DatePicker from "react-native-date-ranges"
import { BottomModal } from "react-native-modals";
import { ModalFooter } from "react-native-modals";
import { ModalButton } from "react-native-modals";
import { ModalTitle } from "react-native-modals";
import { SlideAnimation } from "react-native-modals";
import { ModalContent } from "react-native-modals";

const HotelHomeScreen = () => {
    const navigation = useNavigation();
    const [selectedDates, setSelectedDates] = useState();
    const [rooms, setRooms] = useState(1);
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [modalVisibile, setModalVisibile] = useState(false);
    const route = useRoute();
    console.log(route.params);

    const mktext = "Stay Date"
    const blockBefore = true;
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            title: 'Hotel',
            headerTitleStyle: {
                fontSize: 20,
                fontWeight: "bold",
                color: "#fff",
                marginLeft: 70

            },
            headerStyle: {
                backgroundColor: "#003580",
                height: 70,
                borderBottomColor: "transparent",
                shadowColor: "transparent"
            },
            headerRight: () => (
                <Ionicons name="notifications-outline" onPress={() => navigation.navigate("Main")} size={24} color="#fff" style={{ marginRight: 12 }} />
            )

        })
    }, [])
    const customButton = (onConfirm) => {
        return (
            <Button
                onPress={onConfirm}
                style={{ container: { width: '80%', marginHorizontal: '3%' }, text: { fontSize: 20 } }}
                primary
                text={' '}
                title=' Done '
            />
        )
    };
    return (

        <>
            <View>
                <ScrollView>
                    <View
                        style={{
                            margin: 10,
                            borderColor: "#FFC72C",
                            borderWidth: 3,
                            borderRadius: 6,
                        }}
                    >
                        {/* Destination */}
                        <Pressable
                            onPress={() => navigation.navigate("HotelCitySearch")}

                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                paddingHorizontal: 10,
                                borderColor: "#FFC72C",
                                borderWidth: 1,
                                paddingVertical: 7,
                            }}
                        >
                            <Ionicons name="search" size={24} color="black" />

                            <TextInput placeholderTextColor="black"
                                placeholder={route?.params ? route.params.input : "Enter Your Destination"} style={{}} />
                        </Pressable>
                        {/* Check in date range  */}
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                paddingHorizontal: 10,
                                borderColor: "#FFC72C",
                                borderWidth: 2,
                                paddingVertical: 15,
                            }}
                        >
                            <Ionicons name="calendar-outline" size={24} color="black" />
                            <DatePicker
                                style={{
                                    width: 350,
                                    height: 30,
                                    borderRadius: 0,
                                    borderWidth: 0,
                                    borderColor: "transparent",
                                }}
                                customStyles={{
                                    placeholderText: {
                                        fontSize: 12,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginRight: "auto",
                                    },
                                    headerStyle: {
                                        backgroundColor: "#003580",
                                    },
                                    contentText: {
                                        fontSize: 12,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginRight: "auto",
                                    },
                                }}
                                markText={mktext}
                                blockBefore={blockBefore}
                                selectedBgColor="#0047AB"
                                customButton={(onConfirm) => customButton(onConfirm)}
                                onConfirm={(startDate, endDate) =>
                                    setSelectedDates(startDate, endDate)
                                }
                                allowFontScaling={false}
                                placeholder={"Select Your Dates"}
                                mode={"range"}
                            />
                        </Pressable>
                        {/* Room and Guest */}
                        <Pressable
                            onPress={() => setModalVisibile(!modalVisibile)}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                paddingHorizontal: 10,
                                borderColor: "#FFC72C",
                                borderWidth: 2,
                                paddingVertical: 7,
                            }}
                        >
                            <Ionicons name="person-outline" size={24} color="black" />
                            <TextInput placeholderTextColor="red"
                                editable={false}

                                placeholder={` ${rooms} room • ${adults} adults • ${children} Children`} />
                        </Pressable>
                        {/* Serach button */}
                        <Pressable
                            style={{
                                paddingHorizontal: 10,
                                borderColor: "#FFC72C",
                                borderWidth: 2,
                                paddingVertical: 15,
                                backgroundColor: "#2a52be",
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 12,
                                    fontWeight: "500",
                                    color: "#fff",
                                }}
                            >
                                Search </Text>
                        </Pressable>
                    </View>
                    <Text style={{ fontSize: 14, marginHorizontal: 10, fontWeight: 700 }}>Travel More Spend Less</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Pressable style={{ width: 150, height: 110, marginTop: 10, backgroundColor: "#003580", borderRadius: 10, padding: 15, marginHorizontal: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold", marginVertical: 5 }}>Genius</Text>
                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: 400 }}>You are ate geniun level one in our loyalty program</Text>
                        </Pressable>
                        <Pressable style={{ width: 150, height: 110, marginTop: 10, borderWidth: 2, borderRadius: 10, padding: 20, marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 12, fontWeight: "bold", marginVertical: 5 }}>15% Discounts</Text>
                            <Text style={{ fontSize: 12, fontWeight: 400 }}>Compleate 5 Stays to unlock Genius level 2</Text>
                        </Pressable>
                        <Pressable style={{ width: 150, height: 110, marginTop: 10, backgroundColor: "#003580", borderRadius: 10, padding: 20, marginHorizontal: 20 }}>
                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: "bold", marginVertical: 5 }}>Genius</Text>
                            <Text style={{ color: "#fff", fontSize: 12, fontWeight: 400 }}>You are ate geniun level one in our loyalty program</Text>
                        </Pressable>
                    </ScrollView>
                    <Pressable style={{ marginTop: 30, justifyContent: "center", alignItems: "center" }}>
                        <Image
                            style={{ width: 200, height: 50, resizeMode: "cover" }}
                            source={{ uri: "https://www.lowestflightfares.com/wp-content/uploads/2022/12/lowest-logo.png" }}


                        />






                    </Pressable>



                </ScrollView>
            </View>
            <BottomModal
                swipeThreshold={200}
                onBackdropPress={() => setModalVisibile(!modalVisibile)}
                swipeDirection={['up', 'down']}
                footer={<ModalFooter>
                    <ModalButton text="Apply"
                        style={{
                            marginBottom: 20,
                            color: "#fff",
                            backgroundColor: "#003580",
                        }}
                        onPress={() => setModalVisibile(!modalVisibile)}
                    />
                </ModalFooter>
                }
                modalTitle={<ModalTitle title="Select rooms and guests" />}
                modalAnimation={
                    new SlideAnimation({
                        slideFrom: "bottom",
                    })
                }
                onHardwareBackPress={() => setModalVisibile(!modalVisibile)}
                visible={modalVisibile}
                onTouchOutside={() => setModalVisibile(!modalVisibile)}


            >
                <ModalContent style={{ width: "100%", height: 310 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
                        <Pressable
                            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        >
                            <Pressable
                                onPress={() => setRooms(Math.max(1, rooms - 1))}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>

                            <Pressable>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "500",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    {rooms}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setRooms((c) => c + 1)}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
                        <Pressable
                            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        >
                            <Pressable
                                onPress={() => setAdults(Math.max(1, adults - 1))}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>

                            <Pressable>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "500",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    {adults}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setAdults((c) => c + 1)}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginVertical: 15,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
                        <Pressable
                            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        >
                            <Pressable
                                onPress={() => setChildren(Math.max(0, children - 1))}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    -
                                </Text>
                            </Pressable>

                            <Pressable>
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "500",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    {children}
                                </Text>
                            </Pressable>

                            <Pressable
                                onPress={() => setChildren((c) => c + 1)}
                                style={{
                                    width: 26,
                                    height: 26,
                                    borderRadius: 13,
                                    borderColor: "#BEBEBE",
                                    backgroundColor: "#E0E0E0",
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: "center",
                                        fontSize: 20,
                                        fontWeight: "600",
                                        paddingHorizontal: 6,
                                    }}
                                >
                                    +
                                </Text>
                            </Pressable>
                        </Pressable>
                    </View>
                </ModalContent>
            </BottomModal>
        </>
    )
}



export default HotelHomeScreen

const styles = StyleSheet.create({})