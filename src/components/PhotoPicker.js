import React, {useState} from "react"
import {Alert, Image, StyleSheet, View} from "react-native"
import {AppButton} from "./ui/AppButton"
import * as Permission from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'



async function askPermissions() {
    const {status} = await Permission.askAsync(
        Permission.CAMERA
    )

    if (status !== 'granted') {
        Alert.alert('Error', `U haven't given permission to use the camera`)
        return false
    }

    return true
}

export const PhotoPicker = ({onPick}) => {
    const [image, setImage] = useState(null)

    const takePhoto = async () => {
        const hasPermissions = await askPermissions()

        if (!hasPermissions) {
            return
        }

        const image = await ImagePicker.launchCameraAsync({
            quality: 0.7,
            allowsEditing: true,
            aspect: [16, 9]
        })

        setImage(image.uri)
        onPick(image.uri)
    }

    return (
        <View style={styles.wrapper}>
            {image && <Image style={styles.image} source={{uri: image}} />}
            <AppButton buttonStyles={styles.makePhotoButton}
                       textStyles={styles.makePhotoText}
                       onPressFunc={takePhoto}>Make a Photo</AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
    },
    makePhotoButton: {
        marginTop: 20,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    makePhotoText: {
        color: '#000'
    }
})