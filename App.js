import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import BottomSheetPanResponder from './src/BottomSheetPanResponder';
import GestureAnimation from './src/GestureAnimation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <BottomSheetPanResponder />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
