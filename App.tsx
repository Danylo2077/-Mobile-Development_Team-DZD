import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useGetAllPostsQuery } from './src/services/api/api';

function App(): React.JSX.Element {
  const { data } = useGetAllPostsQuery();
  console.log(data);

  return (
    <View style={styles.mainContainer}>
      <Text>React Native App</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
