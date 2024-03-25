import Memo from '@/screens/Home/components/memo';
import Title from '@/screens/Home/components/title';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

function Home() {
  // 예시 메모 데이터

  return (
    <SafeAreaView style={styles.safeArea}>
      <Title title="일정" />
      <Title title="루틴" />
      <Title title="메모" />
      <Memo />
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Home;
