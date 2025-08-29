import { createUserWithEmailAndPassword, getAuth, signOut } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, Text, TextInput, View, useColorScheme } from 'react-native'
import wave from '../assets/images/wave.png'
import { signupStyles } from '../styles/signupStyles'
const signup = () => {
    const isDark = useColorScheme() === 'dark'
    const [email, setEmail] = useState('');
    const [email2, setEmail2] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp= async()=>{
        if (!email || !email2 || !password || !password2){
            setError('Please fill in all fields');
            return;
        }
        if (email.trim() != email2.trim()){
            setError('Emails do not match');
            return;
        }
        if (password != password2){
            setError('Passwords do not match');
            return;
        }
        const passwordRegex = /^(?=.*[A-Z]).{10,}$/; 

        if (!passwordRegex.test(password)) {
        setError('Password must be at least 10 characters and contain at least one uppercase letter.');
        return;
    }

        try{
            setLoading(true);
            await createUserWithEmailAndPassword(getAuth(), email.trim(), password);
            await signOut(getAuth());
            router.replace('/');
        } catch (error){
            if (error.code === 'auth/email-already-in-use'){
                setError('That email address is already in use!');
            }
            else if( error.code  === 'auth/invalid-email'){
                setError('That email address is invalid!');
            }
            else if(error.code === 'auth/weak-password'){
                setError('Password should be at least 10 characters!');  
            }
            else{
                setError('Something went wrong. Please try again later.');
                console.error(error);
            }
        }
        finally{
                setLoading(false);
            };
    }

    const router = useRouter();
  return (
    <ImageBackground source = {wave} style = {signupStyles.imageContainer}>
     <SafeAreaView style= {signupStyles.safeArea}>
 

        <View style= {signupStyles.screenCenter}>

            <View>
                <Text style= {signupStyles.title}>Create an Account:</Text>
            </View>

            <View style = {signupStyles.inputContainer}>
                <TextInput 
                placeholder= "Enter your email"
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'} // darker gray for dark mode
                autoCapitalize='none'
                keyboardType='email-address'
                value = {email}
                onChangeText = {setEmail}
                />
            </View>

            <View style = {signupStyles.inputContainer}>
                <TextInput 
                placeholder= "Re-enter your email"
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'} 
                autoCapitalize='none'
                keyboardType='email-address'
                value = {email2}
                onChangeText = {setEmail2}
                />
            </View>

            <View style = {signupStyles.inputContainer}>
                <TextInput 
                placeholder= "Choose a password" 
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'} 
                secureTextEntry= {true}
                value={password}
                onChangeText={setPassword}
                />
            </View>


            <View style = {signupStyles.inputContainer}>
                <TextInput 
                placeholder= "Re-enter the password" 
                placeholderTextColor={isDark ? '#9CA3AF' : '#6B7280'} 
                secureTextEntry= {true}
                value={password2}
                onChangeText={setPassword2}
                />
            </View>

            <View style= {signupStyles.loginBtnWrapper}>
                <Pressable onPress ={loading ? null : handleSignUp} disabled={loading}>
                    <Text style = {signupStyles.loginText}>{loading ? 'Creating....' : 'Create Account'}</Text>
                </Pressable>

            </View>

            <Pressable onPress= {()=> router.navigate('/') }>
                <Text style={signupStyles.backToLogin}>Back to login page!</Text>
            </Pressable>
        </View>
     </SafeAreaView>
    </ImageBackground>
  )
}

export default signup