import {Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import {Box} from 'native-base';
import List from './components/List';

const screenHeight = Dimensions.get('window').height;
const sheetMaxHeight = screenHeight - 200;
const sheetMinHeight = 200;

const MAX_Y = sheetMinHeight - sheetMaxHeight;
const MID_Y = MAX_Y / 2;
const MIN_Y = 0;

const MIN_THRESHOLD = 40;

const AnimatedBox = Animated.createAnimatedComponent(Box);
const BottomSheetReanimated = () => {
  const offsetY = useSharedValue(0);
  const savedOffset = useSharedValue(0);
  const dragGesture = Gesture.Pan()
    .onUpdate(e => {
      offsetY.value = e.translationY + savedOffset.value;
    })
    .onEnd(e => {
      if (e.translationY < 0) {
        //dragging up
        if (e.translationY > -MIN_THRESHOLD) {
          offsetY.value = savedOffset.value === MIN_Y ? MIN_Y : MID_Y;
          savedOffset.value = savedOffset.value === MIN_Y ? MIN_Y : MID_Y;
        } else if (
          e.translationY < MID_Y + MIN_THRESHOLD &&
          savedOffset.value === MIN_Y
        ) {
          offsetY.value = MAX_Y;
          savedOffset.value = MAX_Y;
        } else {
          offsetY.value = savedOffset.value === MIN_Y ? MID_Y : MAX_Y;
          savedOffset.value = savedOffset.value === MIN_Y ? MID_Y : MAX_Y;
        }
      } else {
        //dragging down
        if (e.translationY < MIN_THRESHOLD) {
          offsetY.value = savedOffset.value === MAX_Y ? MAX_Y : MID_Y;
          savedOffset.value = savedOffset.value === MAX_Y ? MAX_Y : MID_Y;
        } else if (
          e.translationY > -MID_Y + MIN_THRESHOLD &&
          savedOffset.value === MAX_Y
        ) {
          offsetY.value = MIN_Y;
          savedOffset.value = MIN_Y;
        } else {
          offsetY.value = savedOffset.value === MAX_Y ? MID_Y : MIN_Y;
          savedOffset.value = savedOffset.value === MAX_Y ? MID_Y : MIN_Y;
        }
      }
      // if (offsetY.value <= MIN_Y) {
      //   savedOffset.value = offsetY.value;
      // } else {
      //   savedOffset.value = 0;
      // }
    })
    .onFinalize(() => {});
  const animatedSheet = useAnimatedStyle(() => {
    const animatedHeight = interpolate(
      offsetY.value,
      [MAX_Y, MIN_Y],
      [sheetMaxHeight, sheetMinHeight],
      {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      },
    );
    return {
      height: withSpring(animatedHeight, {
        damping: 16,
        stiffness: 100,
        mass: 0.3,
      }),
    };
  });
  return (
    <GestureHandlerRootView style={styles.container}>
      <AnimatedBox style={[styles.sheetContainer, animatedSheet]}>
        <GestureDetector gesture={dragGesture}>
          <Box style={styles.dragbarContainer}>
            <Box style={styles.dragBar} />
          </Box>
        </GestureDetector>
        <List />
      </AnimatedBox>
    </GestureHandlerRootView>
  );
};

export default BottomSheetReanimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#E1BEE7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // height: 200,
  },
  dragbarContainer: {
    width: '100%',
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 2,
    backgroundColor: '#E1BEE7',
  },
  dragBar: {
    width: 80,
    height: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});
