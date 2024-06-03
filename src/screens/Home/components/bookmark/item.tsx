import {IBookmark} from '@/type';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface IProps {
  item: IBookmark;
}

const Item = ({item}: IProps) => (
  <View style={styles.container}>
    <View style={styles.memoContainer}>
      <View style={styles.titleContainer}>
        <Text>{item.product_name}</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text>{item.url}</Text>
      </View>
    </View>
  </View>
);

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 10,
  },
  memoContainer: {
    backgroundColor: 'white',
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
