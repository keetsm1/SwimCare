import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { ImageBackground, Modal, Pressable, SafeAreaView, TextInput, View } from 'react-native'
import { dataStyles } from '../../.expo/styles/dataStyles'
import wave from '../../assets/images/wave.png'

export default function data() {
    const [isModalVisible, setIsModalVisible]= useState(false)

    
  return (
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
            
            <Modal visible= {isModalVisible}  transparent= {true} animationType= "slide" onRequestClose={()=> setIsModalVisible(false)} >
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

                       
                    </View>  
                </View>
            </Modal> 
        </SafeAreaView>
    </ImageBackground>
  )
}

