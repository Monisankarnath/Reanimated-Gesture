import {Box} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';

import List from './components/List';

const BottomSheetReanimated = () => {
  return (
    <Box style={styles.sheetContainer}>
      <Box style={styles.dragbarContainer}>
        <Box style={styles.dragBar} />
      </Box>
      <List />
    </Box>
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
    height: 200,
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
