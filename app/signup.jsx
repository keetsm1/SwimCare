import { useRouter } from 'expo-router'
import { ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import wave from '../assets/images/wave.png'
import { signupStyles } from '../styles/signupStyles'
const signup = () => {
    const router = useRouter();
  return (
    <ImageBackground source = {wave} style = {signupStyles.imageContainer}>
     <SafeAreaView style= {signupStyles.safeArea}>
 

        <View style= {signupStyles.screenCenter}>

            <View>
                <Text style= {signupStyles.title}>Create an Account:</Text>
            </View>
            <View style = {signupStyles.inputContainer}>
                <TextInput placeholder= "Enter your email"/>
            </View>

            <View style = {signupStyles.inputContainer}>
                <TextInput placeholder= "Re-enter your email"/>
            </View>

            <View style = {signupStyles.inputContainer}>
                <TextInput placeholder= "Choose a password" secureTextEntry= {true}/>
            </View>


            <View style = {signupStyles.inputContainer}>
                <TextInput placeholder= "Re-enter the password" secureTextEntry= {true}/>
            </View>

            <View style= {signupStyles.loginBtnWrapper}>
                <Pressable onPress ={null}>
                    <Text style = {signupStyles.loginText}>LOGIN</Text>
                </Pressable>

            </View>

            <Pressable onPress= {()=> router.navigate('/authentication') }>
                <Text style={signupStyles.backToLogin}>Back to login page!</Text>
            </Pressable>
        </View>



     </SafeAreaView>
    </ImageBackground>
  )
}

export default signup