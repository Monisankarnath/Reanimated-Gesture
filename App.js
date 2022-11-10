import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheetPanResponder from './src/BottomSheetPanResponder';
import BottomSheetReanimated from './src/BottomSheetReanimated';
import GestureAnimation from './src/GestureAnimation';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <BottomSheetReanimated />
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
