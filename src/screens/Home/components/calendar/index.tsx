import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '@/screens/Home/components/calendar/header';
import DaysOfWeek from '@/screens/Home/components/calendar/days-of-week';
import Days from '@/screens/Home/components/calendar/days';

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (
    <View>
      <Header currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <DaysOfWeek />
      <Days currentDate={currentDate} />
    </View>
  );
}

export default Calendar;
