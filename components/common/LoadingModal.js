import React from 'react';
import { View,Text, ActivityIndicator, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const LoadingModal = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible} backdropOpacity={0} transparent={true} statusBarTranslucent={false}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ActivityIndicator size="large" color="#0000ff" />
             {/*  <Text style={styles.modalText}>Loading...</Text> */}
            </View>
        </View>      
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#0000"
  },
  modalView:{
    margin:20,
    width:200,
    height:70,
    backgroundColor:"white",
    borderRadius:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{
        width:0,
        height:2
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },
  modalText:{
    marginVertical:15,
    textAlign:"center",
    fontSize:17,
    marginLeft:15
  }
});

export default LoadingModal;