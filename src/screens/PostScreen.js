import React, {useCallback, useEffect} from "react"
import {Alert, Image, ScrollView, StyleSheet, View} from "react-native"
import {AntDesign} from '@expo/vector-icons'

import {THEME} from "../theme"
import {AppText} from "../components/ui/AppText"
import {AppButton} from "../components/ui/AppButton"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/ui/AppHeaderIcon"
import {useDispatch, useSelector} from "react-redux"
import {removePost, toggleBooked} from "../store/reducers/post"


export const PostScreen = ({navigation}) => {
    const postId = navigation.getParam('postId'),
          post = useSelector(state => state.post.allPosts.find(post => post.id === postId)),
          dispatch = useDispatch()

    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))

    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(post))
    }, [dispatch, post])

    useEffect(() => {
        navigation.setParams({booked})
    }, [booked])

    useEffect(() => {
        navigation.setParams({toggleHandler})
    }, [toggleHandler])

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить пост",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                {
                    text: "Удалить",
                    onPress() {
                        navigation.goBack()
                        dispatch(removePost(postId))
                    },
                    style: "destructive"
                }
            ],
            {cancelable: false},
        )
    }

    if (!post) {
        return null
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView style={styles.contentWrap}>
                <Image style={styles.image} source={{uri: post.img}}/>
                <View style={styles.textWrap}>
                    <AppText>{post.text}</AppText>
                </View>
                <AppText textStyles={{textAlign: 'center'}}>
                    {(new Date(post.date).toLocaleDateString()).split('/').join('.')}
                </AppText>
            </ScrollView>

            <View style={styles.buttonWrap}>
                <AppButton onPressFunc={removeHandler} buttonStyles={styles.button}>
                    <AntDesign name="delete" size={30} color="#ffffff"/>
                </AppButton>
            </View>
        </View>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const booked = navigation.getParam('booked'),
          toggleHandler = navigation.getParam('toggleHandler')

    const iconName = booked ? 'star' : 'staro'

    return {
        headerTitle: `Post`,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item title='Take photo' iconName={iconName} onPress={toggleHandler} />
            </HeaderButtons>
        ),
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: THEME.HARD_GRAY_COLOR
    },
    contentWrap: {
        padding: 10,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
    textWrap: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        paddingBottom: 10,
        marginBottom: 10,
    },
    buttonWrap: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.HARD_GRAY_COLOR,
        paddingVertical: '2.5%'
    },
    button: {
        width: '95%',
        backgroundColor: THEME.DANGER_COLOR,
        paddingVertical: 25,
    }
})