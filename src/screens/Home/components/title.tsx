import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  title: string;
  goScreen: () => void;
}

function Title({title, goScreen}: IProps) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <TouchableOpacity onPress={goScreen}>
        <Icon name="form" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Title;
