import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import GestureAnimation from './src/GestureAnimation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <GestureAnimation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
