import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/ConfigureStore'
const store = ConfigureStore();

// Component Connect to redux has to come over the connect()[inside Redux] function 
export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
    // <View style={styles.container}>
    // <View >

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
