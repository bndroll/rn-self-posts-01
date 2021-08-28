import React from "react"
import {StyleSheet, Text, TouchableOpacity} from "react-native"
import {THEME} from "../../theme";


export const AppButton = ({ children, buttonStyles = {}, textStyles = {}, onPressFunc, disabled }) => {
    if (disabled) {
        buttonStyles = {...buttonStyles, backgroundColor: THEME.DANGER_COLOR}
    }

    return (
        <TouchableOpacity disabled={disabled}
                          activeOpacity={0.5}
                          onPress={onPressFunc}
                          style={{...styles.button, ...buttonStyles}}>
            <Text style={{...styles.text, ...textStyles}}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontFamily: 'open-regular',
    }
})