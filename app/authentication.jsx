import { useRouter } from 'expo-router'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import logo from '../assets/images/logo.png'
import wave from '../assets/images/wave.png'
import { authStyles } from '../styles/authStyles'
const authentication = () => {
  const router = useRouter();

  return (
    <ImageBackground source = {wave} style = {authStyles.imageContainer}>
      <SafeAreaView style={authStyles.safeArea}>

          <View style = {authStyles.logoWrap}>
            <Image source = {logo} style = {authStyles.logo}>
            </Image>
          </View>

          <View style= {authStyles.textInputEmail}>
               <TextInput placeholder= "Enter your email"/>
          </View>
          
          <View style = {authStyles.textInputPassword}>
                <TextInput placeholder='Enter your password' secureTextEntry= {true}/>  
          </View>


          <View style= {authStyles.loginBtnContainer}>
            <Pressable>
              <Text style= {authStyles.loginText}>Login</Text>
            </Pressable>
          </View>

          <View style = {authStyles.signUpContainer}>

            <Pressable onPress= {()=> router.navigate('/signup')}>
              <Text style= {authStyles.signUp}>Sign Up!</Text>
            </Pressable>

          </View>

        </SafeAreaView>
    </ImageBackground>
)}

export default authentication