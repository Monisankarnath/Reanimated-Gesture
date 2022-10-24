import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ListItem = ({item}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );
};
const List = () => {
  return (
    <FlatList
      data={Array(20).fill('List Item')}
      renderItem={ListItem}
      keyExtractor={(_, index) => index}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
  },
});
