import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, ImageBackground, Modal, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import wave from '../../assets/images/wave.png'
import { addEntry, getEntries, initDB } from '../../components/db'
import { dataStyles } from '../../styles/dataStyles'

export default function data() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);

    const [salt, setSalt] = useState('');
    const [chlorine, setChlorine] = useState('');
    const [ph, setPh] = useState('');
    const [cyanuric, setCyanuric] = useState('');
    const [alkalinity, setAlkalinity] = useState('');
    
    const [entries, setEntries] = useState([]);
    const loadEntries = useCallback(async () => {
        try{
            const rows = await getEntries();
            setEntries(rows);

        }catch (error) {
            console.error('Error loading entries:', error);
            Alert.alert('Error', 'Failed to load entries. Please try again.');
        }
    }, []);


    useEffect(() => {
    initDB()
        .then(() => {console.log('Database initialized')} loadEntries())
        .catch((error) => console.error('Error initializing database:', error));
    }, []);

    const ensurePhotosDirAsync = async ()=> {
        const dir = FileSystem.documentDirectory + 'photos/';
        const info = await FileSystem.getInfoAsync(dir);
        if (!info.exists) {
            await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
        }
        return dir;
    }

    const copyIntoAppStorageAsync = async (srcUri) => {
        const dir = await ensurePhotosDirAsync();
        const extGuess = srcUri.split('.').pop()?.toLowerCase();
        const filename = `${Date.now()}.${extGuess && extGuess.length <= 5 ? extGuess : 'jpg'}`;
        const dest = `${dir}/${filename}`;
        await FileSystem.copyAsync({ from: srcUri, to: dest });
        return dest;
    };

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
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Camera permission not granted', 'Please allow camera access to take a photo.');
            console.log('Camera permission not granted');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
        });
        
        console.log(' Camera result:', result); 

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    }

    const handleSave = async ()=> {
        try{

            let finalUri = null;
            if(imageUri){
                finalUri = await copyIntoAppStorageAsync(imageUri);
            }


            await addEntry({
                salt: parseFloat(salt) || null,
                chlorine: parseFloat(chlorine) || null,
                ph: parseFloat(ph) || null,
                cyanuric: parseFloat(cyanuric) || null,
                alkalinity: parseFloat(alkalinity) || null,
                uri: finalUri, // use the saved URI
                createdAt: new Date().toISOString(), // optional, defaults to now()
            });

            setImageUri(null); // reset image URI
            setSalt('');
            setChlorine('');
            setPh('');
            setCyanuric('');
            setAlkalinity('');
            setIsModalVisible(false); // close modal after saving

            await loadEntries(); // reload entries to reflect the new one
            Alert.alert('Success', 'Entry saved successfully!');
        }catch (e) {
            console.error('Error saving entry:', e);
            Alert.alert('Error', 'Failed to save entry. Please try again.');
        }
    };

    return (
        <>
        <ImageBackground source = {wave} style= {dataStyles.container}>
            <SafeAreaView>
                <View style= {dataStyles.list}>
                    <FlatList>
                        data= {[getEntries()]}
                        renderItem= {()=> (
                            <View style= {dataStyles.listItem}>
                                <Text style= {dataStyles.listText}>Salt: {salt}</Text>
                                <Text style= {dataStyles.listText}>Chlorine: {chlorine}</Text>
                                <Text style= {dataStyles.listText}>PH: {ph}</Text>
                                <Text style= {dataStyles.listText}>Cyanuric: {cyanuric}</Text>
                                <Text style= {dataStyles.listText}>Alkalinity: {alkalinity}</Text>
                                {imageUri ? <Image source={{ uri: imageUri }} style={dataStyles.image} /> : null}
                            </View>
                        )}
                    </FlatList>


                </View>

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
                            value = {salt}
                            onChangeText = {setSalt}
                        />

                        <TextInput style = {dataStyles.chlorine}
                            placeholder= "Enter current chlorine levels"
                            value = {chlorine}
                            onChangeText = {setChlorine}
                        />

                        <TextInput style = {dataStyles.PH}
                            placeholder='Enter current PH Levels'
                            value= {ph}
                            onChangeText = {setPh}
                        />

                        <TextInput  style = {dataStyles.Cyanuric}
                            placeholder='Enter current level of cyanuric acid'
                            value = {cyanuric}
                            onChangeText = {setCyanuric}
                        />

                        <TextInput style = {dataStyles.Alkalinity}
                            placeholder='Enter current level of Alkalinity'
                            value = {alkalinity}
                            onChangeText = {setAlkalinity}
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
                                    <Pressable onPress= {handleSave} style  = {dataStyles.saveBtn}>
                                        <Text>SAVE</Text>
                                    </Pressable>
                                </View>

                                {imageUri ? <Text style={{ textAlign: 'center', marginTop: 8 }}>Image ready to save ✓</Text> : null}

                            </View>
                        </View>  
                    </View>
                </Modal> 
            </SafeAreaView>
        </ImageBackground>

        </>
    )
    }

