import React from 'react';
import {eachDayOfInterval, endOfWeek, format, startOfWeek} from 'date-fns';
import {StyleSheet, Text, View} from 'react-native';
import {ko} from 'date-fns/locale';

export default function DaysOfWeek() {
  const startWeek = startOfWeek(new Date());
  return (
    <View style={styles.container}>
      {eachDayOfInterval({start: startWeek, end: endOfWeek(startWeek)}).map(
        (day, index) => (
          <View style={styles.dayContainer} key={index}>
            <Text>{format(day, 'eee', {locale: ko})}</Text>
          </View>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
