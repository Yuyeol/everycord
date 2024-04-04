import React from 'react';
import 'react-native-url-polyfill/auto';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MemoForm from '@/screens/MemoForm';
import Home from '@/screens/Home';

export type RootStackParamList = {
  // 페이지에 넘겨주는 파라미터를 타이핑. 아직 사용하지 않지만 우선해서 넣어둠.
  Home: undefined;
  MemoForm: undefined;
  // ex. detail/[id] 경로가 있을 경우 Details: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* 헤더 제거 */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MemoForm"
          component={MemoForm}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
