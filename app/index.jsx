import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from '@react-native-firebase/auth'
import { Redirect, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import logo from '../assets/images/logo.png'
import wave from '../assets/images/wave.png'
import { authStyles } from '../styles/authStyles'
 
const index = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading, setLoading] = useState(false);


  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function handleAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const auth = getAuth();
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) return <Redirect href="/home" />

  const handleLogin = async()=>{
    try{
      setError(null);
      setLoading(true);
      await signInWithEmailAndPassword(getAuth(), email.trim(), password);

    }catch(e){
      if (e?.code === 'auth/invalid-email') setError('Invalid email.');                                     
      else if (e?.code === 'auth/user-not-found') setError('No account for this email.');               
      else if (e?.code === 'auth/wrong-password') setError('Incorrect password.');                          
      else setError('Login failed. Please try again.');                                                      
      console.error(e);
    }finally{
      setLoading(false);
    }
  };
  return (
    <ImageBackground source = {wave} style = {authStyles.imageContainer}>
      <SafeAreaView style={authStyles.safeArea}>

          <View style = {authStyles.logoWrap}>
            <Image source = {logo} style = {authStyles.logo}>
            </Image>
          </View>

          <View style= {authStyles.textInputEmail}>
               <TextInput 
               placeholder= "Enter your email"
               autoCapitalize='none'
               keyboardType='email-address'
               value = {email}
               onChangeText= {setEmail}
               />
          </View>
          
          <View style = {authStyles.textInputPassword}>
                <TextInput 
                placeholder='Enter your password' 
                secureTextEntry= {true}
                value = {password}
                onChangeText= {setPassword}
                />  
          </View>


          <View style= {authStyles.loginBtnContainer}>
            <Pressable onPress= {loading ? undefined : handleLogin} disabled={loading}>
              <Text style= {authStyles.loginText}>{loading ? 'Logging in…' : 'Login'}</Text>
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

export default index