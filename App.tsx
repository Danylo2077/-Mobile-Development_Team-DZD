import React from 'react';
import {
  StyleSheet
} from 'react-native';
import { useGetAllPostsQuery } from './src/services/api/api';
import { store } from './src/store';
import { Provider } from 'react-redux';
import News from './src/screens/NewsScreen';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <News />
    </Provider>
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
