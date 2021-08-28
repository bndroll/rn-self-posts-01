import React from "react"
import {HeaderButton} from "react-navigation-header-buttons"
import {AntDesign} from '@expo/vector-icons'


export const AppHeaderIcon = (props) => {
    return (
        <HeaderButton {...props} IconComponent={AntDesign} color='#fff' iconSize={24}/>
    )
}

