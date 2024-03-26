import {IMemo} from '@/screens/Home/components/memo';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Item = ({item}: {item: IMemo}) => (
  <View style={styles.memoItem}>
    <View style={styles.titleContainer}>
      <Text>{item.title}</Text>
    </View>
    <View style={styles.contentContainer}>
      <Text>{item.content}</Text>
    </View>
  </View>
);

// 스타일 정의
const styles = StyleSheet.create({
  memoItem: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  titleContainer: {
    backgroundColor: 'gray',
    padding: 5,
  },
  contentContainer: {
    padding: 5,
  },
});

export default Item;
