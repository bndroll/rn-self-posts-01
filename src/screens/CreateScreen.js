import React, {useState} from "react"
import {Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native"
import {HeaderButtons, Item} from "react-navigation-header-buttons"
import {AppHeaderIcon} from "../components/ui/AppHeaderIcon"
import {THEME} from "../theme"
import {AppButton} from "../components/ui/AppButton"
import {Ionicons} from "@expo/vector-icons"
import {useDispatch} from "react-redux"
import {addPost} from "../store/reducers/post"
import {PhotoPicker} from "../components/PhotoPicker"


export const CreateScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [imgRef, setImgRef] = useState('')

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text: text,
            img: imgRef,
            booked: false
        }

        dispatch(addPost(post))
        navigation.navigate('Main')
    }

    const photoPickHandler = (uri) => {
        setImgRef(uri)
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Create New Post</Text>
                <TextInput value={text}
                           multiline
                           onChangeText={setText}
                           style={styles.textarea}/>
                <PhotoPicker onPick={photoPickHandler} />
                <View style={styles.buttonWrap}>
                    <AppButton textStyles={styles.buttonText}
                               buttonStyles={styles.button}
                               disabled={!imgRef || !text}
                               onPressFunc={saveHandler}>
                        <Ionicons name="create-outline" size={24} color='#000'/>
                    </AppButton>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

CreateScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Create',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item title='Toggle Drower' iconName='bars' onPress={() => navigation.toggleDrawer()}/>
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 20,
        backgroundColor: THEME.HARD_GRAY_COLOR
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'open-bold',
        marginBottom: 20,
        color: '#fff'
    },
    textarea: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 15,
        fontSize: 16
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 15,
        borderRadius: 5,
    },
    buttonWrap: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        marginLeft: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 25,
    },
    buttonText: {
        color: '#000',
        fontFamily: 'open-bold',
    }
})