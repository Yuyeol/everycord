// import Calendar from '@/screens/Home/components/calendar';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface IBookmarkForm {
  title: string;
  content: string;
  category: string;
}
type BookmarkFormScreenProps = NativeStackScreenProps<
  ParamListBase,
  'BookmarkForm'
>;
export default function BookmarkForm({navigation}: BookmarkFormScreenProps) {
  // 예시 메모 데이터
  const {control} = useForm<IBookmarkForm>();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="title"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="제목"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <View style={styles.contentContainer}>
            <Controller
              control={control}
              name="content"
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  placeholder="내용"
                  multiline={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </View>
        </View>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text>취소</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// 스타일 정의
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  formContainer: {
    padding: 10,
    marginTop: 20,
  },
  contentContainer: {
    height: 400,
  },
  button: {
    backgroundColor: 'lightgray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
});
