import React from 'react';
import {
  ScrollView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Pressable,
  Linking,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NewsDetail'>;

export default function NewsDetailScreen({ route }: Props) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      {item.image?.trim() !== '' && (
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.headerImage}
        >
          <View style={styles.headerOverlay} />
          <Text style={styles.headerTitle} numberOfLines={2}>
            {item.title}
          </Text>
        </ImageBackground>
      )}

      <View style={styles.content}>
        <Text style={styles.meta}>
          {item.source} • {new Date(item.published_at).toLocaleString()}
        </Text>
        <Text style={styles.description}>{item.description}</Text>

        <Pressable
          style={styles.button}
          onPress={() => Linking.openURL(item.url)}
        >
          <Text style={styles.buttonText}>Читать полностью</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  headerImage: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-end',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  content: {
    padding: 16,
  },
  meta: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },

  button: {
    marginTop: 24,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
