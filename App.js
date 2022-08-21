import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Gesture from './src/Gesture';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Gesture />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'teal',
  },
});

export default App;
