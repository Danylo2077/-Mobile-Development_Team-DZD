import {useEffect, useState} from 'react';
import NewsCard from '../components/NewsCard';
import {useGetAllPostsQuery} from '../services/api/api';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {NewsItem} from '../services/api/types';

const News = () => {
  const [offset, setOffset] = useState(0);
  const {data, refetch, isLoading} = useGetAllPostsQuery(offset);
  const [news, setNews] = useState<NewsItem[]>([]);
  console.log(data);
  useEffect(() => {
    if (offset) {
      refetch();
    }
  }, [offset, refetch]);

  useEffect(() => {
    if (data) {
      if (offset) {
        setNews([...news, ...data?.data]);
      } else {
        setNews(data?.data);
      }
    }
  }, [data?.data]);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        style={styles.listContainer}
        keyExtractor={item => item.url}
        data={news}
        renderItem={({item}) => (
          <NewsCard
            title={item.title}
            newsImage={item.image}
            description={item.description}
            author={item.source}
          />
        )}
        onEndReached={() => {
          setOffset(prevValue => prevValue + 25);
        }}
        onEndReachedThreshold={0.1}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {flex: 1, paddingHorizontal: 16},
  listContainer: {flex: 1},
});

export default News;
