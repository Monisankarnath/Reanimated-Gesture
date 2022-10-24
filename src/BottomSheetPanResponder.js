import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import List from './components/List';

const screenHeight = Dimensions.get('window').height;
const sheetMaxHeight = screenHeight - 200;
const sheetMinHeight = 100;

const MAX_Y = sheetMinHeight - sheetMaxHeight;
const MID_Y = MAX_Y / 2;
const MIN_Y = 0;

const THRESHOLD = 60;

const BottomSheetPanResponder = () => {
  const lastRef = useRef(0);
  const sheetRef = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        sheetRef.setOffset(lastRef.current);
      },
      onPanResponderMove: (_, gesture) => {
        sheetRef.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        sheetRef.flattenOffset();

        if (gesture.dy > 0) {
          //dragging down
          if (gesture.dy <= THRESHOLD) {
            lastRef.current === MAX_Y ? autoSpring(MAX_Y) : autoSpring(MID_Y);
          } else if (lastRef.current === MAX_Y) {
            autoSpring(MID_Y);
          } else {
            autoSpring(MIN_Y);
          }
        } else {
          //dragging up
          if (gesture.dy >= -THRESHOLD) {
            lastRef.current === MIN_Y ? autoSpring(MIN_Y) : autoSpring(MID_Y);
          } else {
            lastRef.current === MIN_Y ? autoSpring(MID_Y) : autoSpring(MAX_Y);
          }
        }
      },
    }),
  ).current;

  const autoSpring = value => {
    lastRef.current = value;
    Animated.spring(sheetRef, {
      toValue: lastRef.current,
      useNativeDriver: false,
    }).start();
  };
  const animatedStyles = {
    height: sheetRef.interpolate({
      inputRange: [MAX_Y, MIN_Y],
      outputRange: [sheetMaxHeight, sheetMinHeight],
      extrapolate: 'clamp',
    }),
  };
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sheetContainer, animatedStyles]}>
        <View style={styles.dragbarContainer} {...panResponder.panHandlers}>
          <View style={styles.dragBar} />
        </View>
        <List />
      </Animated.View>
    </View>
  );
};

export default BottomSheetPanResponder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEBEE',
  },
  sheetContainer: {
    backgroundColor: '#E1BEE7',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    elevation: 20,
    shadowColor: '#52006A',
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
