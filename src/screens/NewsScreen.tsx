import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

import NewsCard from '../components/NewsCard';
import { useGetAllPostsQuery } from '../services/api/api';
import type { NewsItem } from '../services/api/types';

type NewsScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'NewsList'
>;

const NewsScreen: React.FC = () => {
  const navigation = useNavigation<NewsScreenNavProp>();

  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { data, isLoading } = useGetAllPostsQuery({ offset, searchQuery });
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (data) {
      setNews(prev =>
        offset === 0 ? data.data : [...prev, ...data.data]
      );
    }
  }, [data, offset]);

  const loadMore = () => {
    if (data?.pagination) {
      setOffset(prev => prev + data.pagination.limit);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Пошук новин..."
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          setOffset(0);
        }}
      />

      <FlatList
        data={news}
        keyExtractor={item => item.url}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !isLoading ? <Text>Нічого не знайдено</Text> : null
        }
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            newsImage={item.image}
            description={item.description}
            author={item.source}
            onCardPress={() =>
              navigation.navigate('NewsDetail', { item })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8
  }
});

export default NewsScreen;

