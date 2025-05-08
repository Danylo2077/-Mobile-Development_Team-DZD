import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from '../screens/NewsScreen';
import NewsDetail from '../screens/NewsDetailScreen';
import { NewsItem } from '../services/api/types';

export type RootStackParamList = {
  NewsList: undefined;
  NewsDetail: { item: NewsItem };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="NewsList" component={NewsList} options={{ title: 'Новити' }} />
        <Stack.Screen name="NewsDetail" component={NewsDetail} options={{ title: 'Стаття' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
