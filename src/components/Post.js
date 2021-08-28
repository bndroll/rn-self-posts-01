import React from "react"
import {ImageBackground, StyleSheet, View, TouchableOpacity} from "react-native"

import {AppText} from "./ui/AppText"


export const Post = ({post, onOpen}) => {
    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground style={styles.image} source={{uri: post.img}}>
                    <View style={styles.textWrap}>
                        <AppText>{(new Date(post.date).toLocaleDateString()).split('/').join('.')}</AppText>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        paddingBottom: 15,
        overflow: 'hidden',
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)'
    },
    image: {
        width: '100%',
        height: 200,
    },
    textWrap: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        padding: 5,
        alignItems: 'center',
        width: '100%',
    }
})