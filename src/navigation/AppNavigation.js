import React from "react"
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {AntDesign} from '@expo/vector-icons'

import {MainScreen} from "../screens/MainScreen"
import {PostScreen} from "../screens/PostScreen"
import {THEME} from "../theme"
import {BookedScreen} from "../screens/BookedScreen"
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs"
import {createDrawerNavigator} from "react-navigation-drawer"
import {AboutScreen} from "../screens/AbountScreen"
import {CreateScreen} from "../screens/CreateScreen";


const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: THEME.MAIN_COLOR
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            letterSpacing: 1,
        },
    }
}

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: PostScreen
}, navigatorOptions )

const BookedNavigator = createStackNavigator({
    Booked: BookedScreen,
    Post: PostScreen
}, navigatorOptions )

const BottomNavigator = createMaterialBottomTabNavigator({
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: 'All',
            tabBarIcon: info => <AntDesign name='switcher' size={24} color={info.tintColor} />
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: 'Booked',
            tabBarIcon: info => <AntDesign name='star' size={24} color={info.tintColor} />
        }
    }
}, {
    activeColorDark: '#fff',
    shifting: true,
    barStyle: {
        backgroundColor: '#000',
        padding: 5,
    }
})

const AboutNavigator = createStackNavigator({
    About: AboutScreen
}, navigatorOptions)

const CreateNavigator = createStackNavigator({
    Create: CreateScreen
}, navigatorOptions)

const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerIcon: info => <AntDesign name="pausecircleo" size={24} color={info.tintColor} />
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerIcon: info => <AntDesign name="infocirlceo" size={24} color={info.tintColor} />
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerIcon: info => <AntDesign name="pluscircleo" size={24} color={info.tintColor} />
        }
    }
}, {
    drawerBackgroundColor: '#000',
    contentOptions: {
        activeTintColor: '#fff',
        inactiveTintColor: '#eee',
        itemsContainerStyle: {
            marginTop: 40,
        },
    }
})

export const AppNavigation = createAppContainer(MainNavigator)