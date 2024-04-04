import {useGetMemos} from '@/hooks/useGetMemos';
import Item from '@/screens/Home/components/memo/item';
import {IMemo} from '@/type';
import React from 'react';
import {FlatList, View, StyleSheet, Text, Pressable} from 'react-native';

interface IRenderItem {
  item: IMemo;
}

function Memo() {
  const {memos} = useGetMemos();
  const renderItem = ({item}: IRenderItem) => <Item item={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={memos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2} // 그리드 칼럼 수
        style={styles.flatList}
      />
      <Pressable style={styles.moreButton}>
        <Text style={styles.moreButtonText}>더보기</Text>
      </Pressable>
    </View>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {padding: 10},
  flatList: {},

  moreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 999,
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  moreButtonText: {
    fontSize: 12,
  },
});

export default Memo;
