import { Ionicons } from '@expo/vector-icons'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Image, ImageBackground, Modal, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import wave from '../../assets/images/wave.png'
import { addEntry, deletePhoto, getEntries, initDB } from '../../components/db'
import { dataStyles } from '../../styles/dataStyles'

export default function data() {

    const [previewUri, setPreviewUri] = useState(null);

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
            console.log('rows from DB:', rows);
            setEntries(rows);

        }catch (error) {
            console.error('Error loading entries:', error);
            Alert.alert('Error', 'Failed to load entries. Please try again.');
        }
    }, []);


    useEffect(() => {
    initDB()
        .then(() => {console.log('Database initialized'); loadEntries();})
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
                uri: finalUri, // use th    e saved URI
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


    const deleteIfFileExists = async (uri) => {
        try{
            if (!uri) return;
            const info = await FileSystem.getInfoAsync(uri);
            if (info.exists) await  FileSystem.deleteAsync(uri, {idempotent: true});
        }catch (e){
            console.warn("could not delete this file", e)
        }
    }

    const handleDelete = async (id, uri) => {
        try{
            await deletePhoto(id);
            await deleteIfFileExists(uri);
            await loadEntries();
        }catch(e){
            console.error('Delete failed:', e);
            Alert.alert('Error', 'Failed to delete entry.');
        }
    }

    const confirmDelete = (id, uri) => {
        Alert.alert(
        'Delete entry?',
        'This will remove the entry and its photo from app storage.',
        [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => handleDelete(id, uri) },
        ],
        { cancelable: true }
        );
  };
   return (
  <ImageBackground source={wave} style={dataStyles.container} imageStyle={dataStyles.bgImage}>
    <View style={dataStyles.bgOverlay} />
    
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[dataStyles.list, { flex: 1 }]}>
        <FlatList
          style={{ flex: 1 }}
          data={entries}
          keyExtractor={(item, i) => String(item?.id ?? item?.createdAt ?? i)}
          contentContainerStyle={{ padding: 12, paddingBottom: 96 }}
          ListEmptyComponent={
            <View style ={dataStyles.emptyContent}>
            <Text style={dataStyles.emptyText}>
            </Text>
            </View>
          }
          renderItem={({ item }) => (
            <Pressable
                onLongPress={() => confirmDelete(item.id, item.uri)}
                delayLongPress={300}
                android_ripple={{ color: '#e6e6e6' }}
                style={({ pressed }) => [{ opacity: pressed ? 0.96 : 1 }]}
            
            >
            <View style={dataStyles.listItem}>
              <Text style={dataStyles.listText}>Salt: {item.salt ?? '—'}</Text>
              <Text style={dataStyles.listText}>Chlorine: {item.chlorine ?? '—'}</Text>
              <Text style={dataStyles.listText}>PH: {item.ph ?? '—'}</Text>
              <Text style={dataStyles.listText}>Cyanuric: {item.cyanuric ?? '—'}</Text>
              <Text style={dataStyles.listText}>Alkalinity: {item.alkalinity ?? '—'}</Text>
               {item.uri ? (
                 <Pressable onPress={() => setPreviewUri(item.uri)}>
                    <Image source={{ uri: item.uri }} style={dataStyles.image} />
                  </Pressable>
                  ) : null}
              <Text style={dataStyles.timestamp}>
                {new Date(item.createdAt ?? item.created_at ?? Date.now()).toLocaleString()}
              </Text>
            </View>
            </Pressable>
          )}
        />
      </View>

      <Pressable onPress={() => setIsModalVisible(true)} style={dataStyles.fab}>
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </SafeAreaView>

    <Modal
      visible={isModalVisible}
      transparent
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={dataStyles.modalStyle}>
        <View style={dataStyles.popUpMenu}>
          <TextInput
            style={dataStyles.salt}
            placeholder="Enter current amount of salt in pool"
            value={salt}
            onChangeText={setSalt}
            keyboardType="numeric"
          />
          <TextInput
            style={dataStyles.chlorine}
            placeholder="Enter current chlorine levels"
            value={chlorine}
            onChangeText={setChlorine}
            keyboardType="numeric"
          />
          <TextInput
            style={dataStyles.PH}
            placeholder="Enter current PH Levels"
            value={ph}
            onChangeText={setPh}
            keyboardType="numeric"
          />
          <TextInput
            style={dataStyles.Cyanuric}
            placeholder="Enter current level of cyanuric acid"
            value={cyanuric}
            onChangeText={setCyanuric}
            keyboardType="numeric"
          />
          <TextInput
            style={dataStyles.Alkalinity}
            placeholder="Enter current level of Alkalinity"
            value={alkalinity}
            onChangeText={setAlkalinity}
            keyboardType="numeric"
          />

          <View style={dataStyles.cameraBtn}>
            <Pressable onPress={takePhotoWithCamera}>
              <Ionicons name="camera" size={50} color="#041c4a" />
            </Pressable>
            <Text style={dataStyles.optionText}>
              Take a picture or select from your gallery
            </Text>
            <View style={dataStyles.uploadBtnWrapper}>
              <Pressable onPress={pickImageFromGallery} style={dataStyles.uploadBtn}>
                <Text style={dataStyles.uploadText}>UPLOAD</Text>
              </Pressable>
            </View>
            <View style={dataStyles.saveBtnWrapper}>
              <Pressable onPress={handleSave} style={dataStyles.saveBtn}>
                <Text style={{ color: '#041c4a', fontWeight: '700' }}>SAVE</Text>
              </Pressable>
            </View>
            {imageUri ? (
              <Text style={{ textAlign: 'center', marginTop: 8 }}>
                Image ready to save ✓
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>

    <Modal
        visible={!!previewUri}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewUri(null)}
      >
        <Pressable
          onPress={() => setPreviewUri(null)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {previewUri ? (
            <Image
              source={{ uri: previewUri }}
              resizeMode="contain"
              style={{ width: '92%', height: '80%', borderRadius: 12 }}
            />
          ) : null}
        </Pressable>
      </Modal>
  </ImageBackground>
);

    }

