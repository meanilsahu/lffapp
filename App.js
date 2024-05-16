/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {StyleSheet,Text,View} from 'react-native';
import StackNavigator from './stackNavigator/StackNavigator';
import { ModalPortal } from 'react-native-modals';

const App = () => {
  return (
    <>
      <StackNavigator />
      <ModalPortal />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
export default App;