import { ImageBackground, SafeAreaView } from 'react-native'
import wave from '../assets/images/wave.png'
import { authStyles } from '../styles/authStyles'

const authentication = () => {
  return (
    <ImageBackground source = {wave} style = {authStyles.imageContainer}>
      <SafeAreaView style={authStyles.safeArea}>
          
        </SafeAreaView>
    </ImageBackground>
)}

export default authentication