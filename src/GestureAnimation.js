import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
  Directions,
} from 'react-native-gesture-handler';
import {CloseIcon} from './assets';

const size = 100;
const closeIconSize = 50;
const {width, height} = Dimensions.get('window');
const closeIconCenter = {x: 50 - width / 2, y: 15};

const GestureAnimation = () => {
  const w = useSharedValue(size);
  const h = useSharedValue(size);
  const rad = useSharedValue(size / 2);
  const isBallPressed = useSharedValue(false);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const savedBall = useSharedValue({x: 0, y: 0});
  const scaleBall = useSharedValue(1);
  const isFullScreen = useSharedValue(false);

  const ballOpacity = useDerivedValue(() => {
    if (
      offsetY.value > closeIconCenter.y - 35 &&
      offsetX.value < closeIconCenter.x + 35 &&
      offsetX.value > closeIconCenter.x - 35
    ) {
      return withTiming(0.5);
    }
    return withTiming(1);
  });

  const doubleTabGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        savedBall.value = {
          x: 0,
          y: 0,
        };
        if (!isFullScreen.value) {
          w.value = width;
          h.value = height;
          rad.value = 0;
          isFullScreen.value = true;
          offsetX.value = withTiming(0);
          offsetY.value = withTiming(0);
        } else {
          w.value = size;
          h.value = size;
          rad.value = size / 2;
          isFullScreen.value = false;
          offsetX.value = withSpring(0);
          offsetY.value = withSpring(0);
        }
      }
    });

  const dragGesture = Gesture.Pan()
    .onUpdate(e => {
      isBallPressed.value = true;
      offsetX.value = e.translationX + savedBall.value.x;
      offsetY.value = e.translationY + savedBall.value.y;
      if (!isFullScreen.value) {
        if (
          offsetY.value > closeIconCenter.y - 55 &&
          offsetX.value < closeIconCenter.x + 55 &&
          offsetX.value > closeIconCenter.x - 55
        ) {
          scaleBall.value = withSpring(0.5);
        } else {
          scaleBall.value = withSpring(1);
        }
      }
    })
    .onEnd(() => {
      savedBall.value = {
        x: offsetX.value,
        y: offsetY.value,
      };
    })
    .onFinalize(() => {
      isBallPressed.value = false;
      if (!isFullScreen.value) {
        if (
          offsetY.value > closeIconCenter.y - 55 &&
          offsetX.value < closeIconCenter.x + 55 &&
          offsetX.value > closeIconCenter.x - 55
        ) {
          offsetX.value = withTiming(closeIconCenter.x);
          offsetY.value = withTiming(closeIconCenter.y);
          offsetY.value = withDelay(300, withSpring(closeIconCenter.y + 65));
          offsetX.value = withDelay(500, withSpring(0));
          savedBall.value = {
            x: 0,
            y: 0,
          };
        }
      } else {
        savedBall.value = {
          x: 0,
          y: 0,
        };
        offsetX.value = withTiming(0);
        offsetY.value = withTiming(0);
      }
    });
  const animatedBall = useAnimatedStyle(() => {
    return {
      width: withTiming(w.value),
      height: withTiming(h.value),
      borderRadius: withTiming(rad.value),
      transform: [
        {translateX: offsetX.value},
        {translateY: offsetY.value},
        {scale: scaleBall.value},
      ],
      opacity: ballOpacity.value,
    };
  });
  const animatedCloseIcon = useAnimatedStyle(() => {
    return {
      opacity: isBallPressed.value
        ? withTiming(1)
        : withDelay(300, withTiming(0)),
      transform: [
        {scale: withSpring(isBallPressed.value ? 1.2 : 1)},
        {
          translateY: isBallPressed.value
            ? withSpring(0)
            : withDelay(300, withSpring(65)),
        },
      ],
    };
  });
  const flingGesture = Gesture.Fling()
    .direction(Directions.UP)
    .hitSlop({right: 0, bottom: 0, width: 100})
    .onEnd(() => {
      offsetX.value = withSpring(0);
      offsetY.value = withSpring(0);
      scaleBall.value = 1;
    });
  const composedGesture = Gesture.Exclusive(dragGesture, doubleTabGesture);
  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={flingGesture}>
        <Animated.View style={styles.container}>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.ball, animatedBall]} />
          </GestureDetector>
          <Animated.View style={[styles.closeContainer, animatedCloseIcon]}>
            <CloseIcon />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default GestureAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ball: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'teal',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
  },
  closeContainer: {
    width: closeIconSize,
    height: closeIconSize,
    borderRadius: closeIconSize / 2,
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});
