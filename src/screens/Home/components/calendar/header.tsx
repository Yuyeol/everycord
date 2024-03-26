import React from 'react';
import {addMonths, format} from 'date-fns';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export default function Header({currentDate, setCurrentDate}: IProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setCurrentDate(addMonths(currentDate, -1))}>
        <Icon name="left" size={16} color="black" />
      </TouchableOpacity>
      <Text>{format(currentDate, 'yyyy년 M월')}</Text>
      <TouchableOpacity
        onPress={() => setCurrentDate(addMonths(currentDate, 1))}>
        <Icon name="right" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
