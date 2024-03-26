import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface IProps {
  title: string;
}

function Title({title}: IProps) {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleText}>{title}</Text>
      <View>
        <Icon name="form" size={16} color="black" />
      </View>
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
