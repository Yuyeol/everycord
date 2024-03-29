// import Calendar from '@/screens/Home/components/calendar';
import Memo from '@/screens/Home/components/memo';
import Title from '@/screens/Home/components/title';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
type HomeScreenProps = NativeStackScreenProps<ParamListBase, 'Home'>;
export default function Home({navigation}: HomeScreenProps) {
  const goMemoForm = () => {
    navigation.navigate('MemoForm');
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <Title title="일정" />
      <Title title="루틴" /> */}
      <Title title="메모" goScreen={goMemoForm} />
      <Memo />
      {/* <Calendar /> */}
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
