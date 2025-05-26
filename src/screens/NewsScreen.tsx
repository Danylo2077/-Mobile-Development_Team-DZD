import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

import NewsCard from '../components/NewsCard';
import { useGetAllPostsQuery } from '../services/api/api';
import type { NewsItem } from '../services/api/types';

type NewsScreenNavProp = NativeStackNavigationProp<RootStackParamList, 'NewsList'>;

type CategoryOption = {
  label: string;
  value: string;
};

const categories: CategoryOption[] = [
  { label: 'All', value: '' },
  { label: 'General', value: 'general' },
  { label: 'Business', value: 'business' },
  { label: 'Entertainment', value: 'entertainment' },
  { label: 'Health', value: 'health' },
  { label: 'Science', value: 'science' },
  { label: 'Sports', value: 'sports' },
  { label: 'Technology', value: 'technology' },
];

const NewsScreen: React.FC = () => {
  const navigation = useNavigation<NewsScreenNavProp>();
  const [offset, setOffset] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { data, isLoading } = useGetAllPostsQuery({
    offset,
    searchQuery,
    category: selectedCategory,
  });

  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    // on new data, reset or append
    if (data) {
      setNews(prev =>
        offset === 0 ? data.data : [...prev, ...data.data]
      );
    }
  }, [data, offset]);

  // load more when list ends
  const loadMore = () => {
    if (data?.pagination) {
      setOffset(prev => prev + data.pagination.limit);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* Search input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Пошук новин..."
        value={searchQuery}
        onChangeText={text => {
          setSearchQuery(text);
          setOffset(0);
        }}
      />

      {/* Categories scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map(({ label, value }) => (
          <TouchableOpacity
            key={value || 'all'}
            style={[
              styles.categoryButton,
              selectedCategory === value && styles.categoryButtonActive,
            ]}
            onPress={() => {
              setSelectedCategory(value);
              setOffset(0);
            }}
          >
            <Text
              style={
                selectedCategory === value
                  ? styles.categoryTextActive
                  : styles.categoryText
              }
            >
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* News list */}
      <FlatList
        data={news}
        keyExtractor={item => item.url + item.published_at}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          !isLoading ? <Text>Нічого не знайдено</Text> : null
        }
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            newsImage={item.image}
            description={decode(item.description)}
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
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  categoriesContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  categoryButton: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#007AFF',
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 13,
    lineHeight: 16,
    color: '#007AFF',
    textAlign: 'center',
  },
  categoryTextActive: {
    fontSize: 13,
    lineHeight: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NewsScreen;