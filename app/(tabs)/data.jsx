import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { ImageBackground, Modal, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import wave from '../../assets/images/wave.png'
import { dataStyles } from '../../styles/dataStyles'

export default function data() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    
    const pickImageFromGallery = async() =>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

        const takePhotoWithCamera = async() =>{
        const {status} = await ImagePicker.launchCameraAsync();
        if (status !== 'granted') {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        })

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }


    return (
        <>
        <ImageBackground source = {wave} style= {dataStyles.container}>
            <SafeAreaView>
                <View style= {dataStyles.plusLocation}>
                    <Pressable onPress={ ()=> setIsModalVisible(true)}  style= {dataStyles.plusBtn} >
                        <Ionicons 
                            name= "add-circle-sharp"
                            size = {60}
                            color= "white"
                        />
                    </Pressable>
                </View>  
                
                <Modal visible= {isModalVisible}  transparent= {true} animationType= "slide" onRequestClose={()=> {setIsModalVisible(false)}} >
                    <View style = {dataStyles.modalStyle}>
                        <View style= {dataStyles.popUpMenu}>
                        <TextInput style= {dataStyles.salt}
                            placeholder= "Enter current amount of salt in pool"
                        />

                        <TextInput style = {dataStyles.chlorine}
                            placeholder= "Enter current chlorine levels"
                        />

                        <TextInput style = {dataStyles.PH}
                            placeholder='Enter current PH Levels'
                        />

                        <TextInput  style = {dataStyles.Cyanuric}
                            placeholder='Enter current level of cyanuric acid'
                        />

                        <TextInput style = {dataStyles.Alkalinity}
                            placeholder='Enter current level of Alkalinity'
                        />

                            <View style = {dataStyles.cameraBtn}>
                                <Pressable onPress={takePhotoWithCamera}>
                                    <Ionicons 
                                        name= 'camera'
                                        size = {50}
                                        color= '#041c4a'
                                    />
                                </Pressable>

                                <Text style= {dataStyles.optionText}>
                                    Take a picture or select from your gallery
                                </Text>


                                <View style = {dataStyles.uploadBtnWrapper}>
                                    <Pressable onPress= {pickImageFromGallery} style= {dataStyles.uploadBtn} >
                                        <Text style = {dataStyles.uploadText}>UPLOAD</Text>
                                    </Pressable>

                                </View>

                                <View style = {dataStyles.saveBtnWrapper}>
                                    <Pressable onPress= {null} style  = {dataStyles.saveBtn}>
                                        <Text>SAVE</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>  
                    </View>
                </Modal> 
            </SafeAreaView>
        </ImageBackground>

        </>
    )
    }

