// import Calendar from '@/screens/Home/components/calendar';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

interface IBookmarkForm {
  name: string;
  url: string;
  content: string;
  category: string;
}
type BookmarkFormScreenProps = NativeStackScreenProps<
  ParamListBase,
  'BookmarkForm'
>;

const isValidUrl = (url: string) => {
  const pattern = new RegExp('^(http://|https://)');
  return pattern.test(url);
};

export default function BookmarkForm({navigation}: BookmarkFormScreenProps) {
  // 예시 메모 데이터
  const {control, setValue} = useForm<IBookmarkForm>();
  const goBack = () => {
    navigation.goBack();
  };
  const getClipboardUrl = async () => {
    const url = await Clipboard.getString();
    isValidUrl(url) && setValue('url', url);
  };
  useEffect(() => {
    getClipboardUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable onPress={getClipboardUrl}>
        <Text>Copy to Clipboard</Text>
      </Pressable>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="이름"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="url"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="URL"
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
