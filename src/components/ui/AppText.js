import React from "react"
import {StyleSheet, Text} from "react-native"


export const AppText = ({children, textStyles = {}}) => {
    return (
        <Text style={{...styles.text, ...textStyles}}>{children}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: '#fff',
        fontFamily: 'open-regular',
    }
})