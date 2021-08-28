import React, {useEffect} from "react"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/ui/AppHeaderIcon"
import {PostList} from "../components/PostList"
import {useDispatch, useSelector} from "react-redux"
import {loadPosts} from "../store/reducers/post"
import {ActivityIndicator, StyleSheet, Text, View} from "react-native"
import {THEME} from "../theme"


export const MainScreen = ({navigation}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch])

    const allPosts = useSelector(state => state.post.allPosts)
    const loading = useSelector(state => state.post.loading)

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator color='#fff' />
            </View>
        )
    }

    if (allPosts.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>
                    You don't have posts <Text style={styles.smile}>:(</Text>
                </Text>
            </View>
        )
    }

    return <PostList data={allPosts} navigation={navigation} />
}

MainScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'My Blog',
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Take photo' iconName='camerao' onPress={() => navigation.push('Create')} />
        </HeaderButtons>
    ),
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Toggle Drower' iconName='bars' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.HARD_GRAY_COLOR,
    },
    text: {
        color: '#fff',
        fontSize: 16
    },
    smile: {
        fontFamily: 'open-bold',
        fontSize: 22,
    }
})