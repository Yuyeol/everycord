import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import React from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';

interface IProps {
  currentDate: Date;
}
const handleDayPress = (day: Date) => {
  const formattedDate = format(day, 'yyyy년 MM월 dd일');
  console.log(formattedDate);
};

export default function Days({currentDate}: IProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const daysArray = eachDayOfInterval({start: startDate, end: endDate});
  const renderItem = ({item}: {item: Date}) => (
    <TouchableOpacity
      onPress={() => handleDayPress(item)}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        style={{
          color: monthStart.getMonth() === item.getMonth() ? 'black' : 'gray',
        }}>
        {format(item, 'd')}
      </Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={daysArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={7}
    />
  );
}
