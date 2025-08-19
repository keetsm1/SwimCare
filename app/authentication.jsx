import { Image, ImageBackground, SafeAreaView, View } from 'react-native'
import logo from '../assets/images/logo.png'
import wave from '../assets/images/wave.png'
import { authStyles } from '../styles/authStyles'
const authentication = () => {
  return (
    <ImageBackground source = {wave} style = {authStyles.imageContainer}>
      <SafeAreaView style={authStyles.safeArea}>
          <View style = {authStyles.logoWrap}>
            <Image source = {logo} style = {authStyles.logo}>

            </Image>
          </View>
        </SafeAreaView>
    </ImageBackground>
)}

export default authentication