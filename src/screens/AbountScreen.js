import React from "react"
import {StyleSheet, Text, View} from "react-native"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/ui/AppHeaderIcon"
import {THEME} from "../theme"


export const AboutScreen = () => {
    return (
        <View style={styles.center}>
            <Text style={styles.text}>This is the best personal note app</Text>
            <Text style={styles.text}>App version <Text style={styles.version}>1.0.0</Text></Text>
        </View>
    )
}

AboutScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'About',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Toggle Drower' iconName='bars' onPress={() => navigation.toggleDrawer()} />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.HARD_GRAY_COLOR
    },
    text: {
        color: '#fff',
    },
    version: {
        fontFamily: 'open-bold',
        fontSize: 16
    }
})