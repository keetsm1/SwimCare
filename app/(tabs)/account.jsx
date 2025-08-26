import { getAuth, signOut } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, Pressable, SafeAreaView, Text, View } from 'react-native';
import wave from '../../assets/images/wave.png';
import { accountStyles } from '../../styles/accountStyles';

export default function Account() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(getAuth());
            router.replace('/');
        } catch (error) {
            console.error('Error signing out: ', error);
        } finally {
            setLoading(false);
        }
    };
  return (
    
    <ImageBackground source={wave} style={accountStyles.imageContainer}>
      <SafeAreaView style={accountStyles.safeArea}>
        <View style={accountStyles.content}>
          <View style={accountStyles.card}>
            <Text style={accountStyles.title}>Your Account</Text>
            <Text style={accountStyles.subtitle}>Manage your preferences</Text>

            <View style={accountStyles.divider} />

            <View style={accountStyles.logoutBtnWrapper}>
              <Pressable style={accountStyles.logoutBtn} onPress={loading ? null : handleLogout} disabled={loading}>
                <Text style={accountStyles.logoutBtnText}>Logout</Text>
              </Pressable>
            </View>

            <Text style={accountStyles.footerText}>Thanks for using SwimCare 💧</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
