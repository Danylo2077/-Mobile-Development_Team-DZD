
import React, { FC } from "react";
import { Pressable, Image, StyleSheet, Text, View } from "react-native";

type NewsCardProps = {
    title: string,
    newsImage: string,
    author: string | null,
    description?: string;
    onCardPress: () => void;
}

const NewsCard: FC<NewsCardProps> = ({
    title,
    newsImage,
    author,
    description,
    onCardPress,  // обратите внимание: латинская "C"
  }) => {
    const handlePress = () => {
      console.log("Card pressed!");
      onCardPress();
    };
  
    return (
      <Pressable style={styles.mainContainer} onPress={handlePress}>
        {newsImage?.trim() ? (
          <Image style={styles.image} source={{ uri: newsImage }} />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri:
                "https://media.istockphoto.com/id/667756162/uk/vector-breaking-news-background.jpg",
            }}
          />
        )}

        <View pointerEvents="none" style={styles.banner}>
          <Text style={styles.title}>{title}</Text>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {description}
          </Text>
          <Text style={styles.author}>Author: {author}</Text>
        </View>
      </Pressable>
    );
  };


const styles = StyleSheet.create({
    mainContainer: {
        height: 200,
        width: '100%',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        marginTop: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
        flexWrap: 'wrap', //додав для переносу тексту
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // напівпрозорий чорний фон
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start', // ширина під розмір тексту
    },
    author: {
        fontSize: 12,
        color: 'white',
        marginTop: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // напівпрозорий чорний фон
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start', // ширина під розмір тексту
    },
    description: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'white',
        marginTop: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // напівпрозорий чорний фон
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
        alignSelf: 'flex-start', // ширина під розмір тексту
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
    banner: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        backgroundColor: '#00000080',
        padding: 16,
        borderRadius: 20,
    }
})

export default NewsCard

//Джерело заглушки
//1)https://static.vecteezy.com/system/resources/previews/000/196/076/original/vector-breaking-news-background-with-text-space.jpg' }}
//2)https://media.istockphoto.com/vectors/breaking-news-vector-id1183566393?k=20&m=1183566393&s=170667a&w=0&h=o-gwNm-7Kp9o8GG2vtqZ7IIdads_Q8ikq95sCRu9MKM=
//3)https://media.istockphoto.com/id/2179232248/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/icon-of-news.jpg?s=1024x1024&w=is&k=20&c=AwcWhxtjMnyKG5bO9I2gwNKG34j9qAfiYwhVx14b9eU=
//4)https://media.istockphoto.com/id/667756162/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D1%86%D0%B5%D0%BD%D0%B7%D1%83%D1%80%D0%B0-%D0%BD%D0%BE%D0%B2%D0%B8%D0%BD%D0%B8-%D0%BA%D0%BE%D0%BD%D1%86%D0%B5%D0%BF%D1%86%D1%96%D1%8F-%D0%BA%D1%83%D0%BF%D0%B0-%D1%86%D0%B5%D0%BD%D0%B7%D1%83%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%85-%D0%B3%D0%B0%D0%B7%D0%B5%D1%82-%D0%BD%D0%B0-%D0%BF%D0%BE%D0%B4%D1%80%D1%8F%D0%BF%D0%B0%D0%BD%D0%BE%D0%BC%D1%83-%D1%81%D1%82%D0%B0%D1%80%D0%BE%D0%BC%D1%83-%D0%BB%D1%96%D1%81%D1%96-3d.jpg?s=1024x1024&w=is&k=20&c=vSSNWqdZlmMybvZ7vfz2E94akfwF1ZT0-47hHLXJhCU=

