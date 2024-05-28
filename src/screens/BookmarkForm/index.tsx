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
import Icon from 'react-native-vector-icons/Fontisto';
import SpacerY from '@/components/spacer-y';
import getDataFromHTML from '@/utils/getDataFromHTML';
import isValidUrl from '@/utils/isValidUrl';
import getHTML from '@/utils/getHTML';

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

export default function BookmarkForm({navigation}: BookmarkFormScreenProps) {
  // 예시 메모 데이터
  const {control, setValue, watch} = useForm<IBookmarkForm>();
  const goBack = () => {
    navigation.goBack();
  };
  // watch url
  const url = watch('url');
  const setClipboardUrl = async () => {
    const copiedUrl = await Clipboard.getString();
    isValidUrl(copiedUrl) && setValue('url', copiedUrl);
    copiedUrl;
  };

  useEffect(() => {
    if (!url) return;
    const siteName = url.includes('musinsa') ? 'musinsa' : '';
    getHTML(url).then(html => {
      if (html) {
        const data = getDataFromHTML(html, siteName);
        data;
      }
    });
  }, [url]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.urlInput}>
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
            <Pressable onPress={setClipboardUrl}>
              <Icon name="paste" size={16} color="black" />
            </Pressable>
          </View>
          <SpacerY height={10} />
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                placeholder="제목"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
        </View>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          <Text>저장</Text>
        </TouchableOpacity>
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
  urlInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
