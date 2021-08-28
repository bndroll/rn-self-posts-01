import React from "react"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/ui/AppHeaderIcon"
import {PostList} from "../components/PostList"
import {useSelector} from "react-redux"
import {StyleSheet, Text, View} from "react-native";
import {THEME} from "../theme";


export const BookedScreen = ({navigation}) => {
    const bookedPosts = useSelector(state => state.post.bookedPosts)

    if (bookedPosts.length === 0) {
        return (
            <View style={styles.center}>
                <Text style={styles.text}>
                    You don't have booked posts <Text style={styles.smile}>:(</Text>
                </Text>
            </View>
        )
    }

    return <PostList data={bookedPosts} navigation={navigation} />
}

BookedScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Booked Posts',
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