// import Calendar from '@/screens/Home/components/calendar';
import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/Fontisto';
import SpacerY from '@/components/spacer-y';
import getDataFromHTML from '@/utils/getDataFromHTML';
import isValidUrl from '@/utils/isValidUrl';
import getHTML from '@/utils/getHTML';
import {IBookmarkForm, IProductData} from '@/type';
import HookFormInput from '@/components/hook-form-input';

type BookmarkFormScreenProps = NativeStackScreenProps<
  ParamListBase,
  'BookmarkForm'
>;

export default function BookmarkForm({navigation}: BookmarkFormScreenProps) {
  const [productData, setProductData] = useState<IProductData | undefined>();
  console.log(productData);

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
        setProductData(data);
      }
    });
  }, [url]);
  useEffect(() => {
    if (!productData) return;
    setValue('product_name', productData.name);
  }, [productData, setValue]);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <Text style={styles.buttonText}>취소</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goBack} style={styles.button}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.urlInput}>
            <HookFormInput control={control} name="url" placeholder="URL" />
            <Pressable onPress={setClipboardUrl}>
              <Icon name="paste" size={16} color="black" />
            </Pressable>
          </View>
          <SpacerY height={5} />
          <View style={styles.urlInput}>
            <HookFormInput
              control={control}
              name="category"
              placeholder="카테고리"
            />
            <Pressable>
              <Icon name="search" size={16} color="black" />
            </Pressable>
          </View>
          <SpacerY height={5} />
          <HookFormInput
            control={control}
            name="shop_name"
            placeholder="쇼핑몰 이름"
          />
          <SpacerY height={5} />
          <HookFormInput
            control={control}
            name="product_name"
            placeholder="제품 이름"
          />
        </View>
        <View>
          {productData && (
            <Image
              source={{uri: productData.img}}
              style={{width: 100, height: 100}}
            />
          )}
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'gray',
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
});
