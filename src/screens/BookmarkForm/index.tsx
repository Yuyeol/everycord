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
const DomParser = require('react-native-html-parser').DOMParser;

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

const fetchData = async (url: string) => {
  if (!isValidUrl(url)) return;
  try {
    const response = await fetch(url);
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

const getItemsFromMusinsa = (doc: any) => {
  const scripts = doc.getElementsByTagName('script');
  let targetScript = null;
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].textContent.includes("'original_price':")) {
      targetScript = scripts[i].textContent;
      break;
    }
  }
  var itemsStringMatch = targetScript.match(
    /'items': (\[(?:\s*{[\s\S]*?}\s*,?\s*)+\])/,
  );
  if (itemsStringMatch && itemsStringMatch[1]) {
    // 추출된 배열 문자열이 JSON 형식에 맞도록 작은따옴표를 큰따옴표로 변환
    var itemsArrayString = itemsStringMatch[1].replace(/'/g, '"');
    try {
      var items = JSON.parse(itemsArrayString);
      return {
        img: items[0].img,
        name: items[0].name,
        originalPrice: items[0].original_price,
        price: items[0].price,
      };
    } catch (e) {
      console.error('JSON parsing error:', e);
    }
  }
};

const getDataFromHTML = (html: string, siteName: string) => {
  const parser = new DomParser();
  const doc = parser.parseFromString(html, 'text/html');
  if (siteName === 'musinsa') {
    getItemsFromMusinsa(doc);
  }
};

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
  };
  useEffect(() => {
    setClipboardUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!url) return;
    const siteName = url.includes('musinsa') ? 'musinsa' : '';
    fetchData(url).then(html => {
      if (html) {
        const data = getDataFromHTML(html, siteName);
        data;
      }
    });
  }, [url]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable onPress={setClipboardUrl}>
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
