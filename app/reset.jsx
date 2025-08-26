import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import wave from '../assets/images/wave.png'
import { resetStyles } from '../styles/resetStyles'

const reset = () => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleReset = async() => {
        try{
            setError('')
            setLoading(true)
            await sendPasswordResetEmail(getAuth(), email.trim())
            alert('Password reset email sent. Please check your inbox and spam folder.')
            router.push('/')
        }catch(e){
            if (e?.code === 'auth/invalid-email') setError('Invalid email.')
            else if (e?.code === 'auth/user-not-found') setError('No account for this email.')
            else setError('Reset failed. Please try again.')
            console.error(e)
    }
    finally{
        setLoading(false)
    }
    }
  return (
    <ImageBackground source = {wave} style = {resetStyles.imageContainer}>
        <SafeAreaView style= {resetStyles.safeArea}>

            <Text style = {resetStyles.resetText}>Reset your password</Text>

            <TextInput style = {resetStyles.emailInput}
            placeholder= "Enter email for reset"
            autoCapitalize='none'
            keyboardType='email-address'
            value= {email}
            onChangeText= {setEmail}
            />

            {error ? <Text style= {resetStyles.errorText}>{error}</Text> : null}

            <View style= {resetStyles.resetBtnContainer}>
                <Pressable onPress= {loading ? undefined : handleReset} disabled= {loading}>
                    <Text style= {resetStyles.resetBtnText}>{loading ? 'Sending…' : 'Send Reset Email'}</Text>
                </Pressable>
            </View>

            <View style = {resetStyles.backToLoginContainer}>
    
                    <Pressable onPress= {()=> router.navigate('/')}>
                        <Text style= {resetStyles.backToLogin}>Back to Login</Text>
                    </Pressable>

                </View>
        </SafeAreaView>
    </ImageBackground>

  )
}

export default reset