import React from "react"
import {FlatList, StyleSheet, View} from "react-native"
import {Post} from "./Post"

export const PostList = ({data, navigation}) => {

    const openPostHandler = (post) => {
        navigation.navigate('Post', {
            postId: post.id,
            date: post.date,
            booked: post.booked
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.postsContainer}>

                <FlatList data={data}
                          keyExtractor={post => post.id.toString()}
                          renderItem={({item}) => <Post post={item}
                                                        onOpen={openPostHandler}/>}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1f1f1f'
    },
    postsContainer: {
        paddingTop: 10,
        paddingHorizontal: 10
    },
})