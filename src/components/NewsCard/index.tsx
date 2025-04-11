import { FC } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
type NewCardProps = {
    title: string,
    newsImage: string,
    author: string | null,
    description?: string,

}
const NewsCard: FC<NewCardProps> = ({ title, newsImage, author, description }) => {
    return <View style={styles.mainContainer}>
        <Image style={styles.image} source={{uri: newsImage}}/>
        <View style={styles.banner}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{title}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>{description}</Text>
        <Text style={styles.author}>{author}</Text>
        </View>
        </View>
        
}

const styles = StyleSheet.create({
    mainContainer: {
        height: 150,
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
    },
    author: {
        fontSize: 12,
        color: 'white',
        marginTop: 16,

    },
    description: {
        fontStyle: 'italic',
        fontSize: 12,
        color: 'white',
        marginTop: 16,
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
export default NewsCard;