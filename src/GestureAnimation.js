import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import {CloseIcon} from './assets';

const GestureAnimation = () => {
  return (
    <View style={styles.container}>
      <Text>Gesture Handler</Text>
    </View>
  );
};

export default GestureAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
