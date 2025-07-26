import { useState } from 'react'
import { ImageBackground, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'
import { homeStyles } from '../../.expo/styles/homeStyles'
import wave from '../../assets/images/wave.png'

export default function home() {
  const [poolSize, setPoolSize] = useState('')
  const [saltAdded, setSaltAdded] = useState('')
  const [chlorineAdded, setChlorineAdded] = useState('')
  const [phLevels, setPHLevels] = useState('')
  const [acid, setAcid] = useState('')
  const [alkinityLevels, setAlknityLevels] = useState('')
  
  const [dosages, setDosages] = useState(null)

  function handleCalculate (){
    const V  = parseFloat(poolSize)       || 0;
    const S  = parseFloat(saltAdded)      || 0;
    const C  = parseFloat(chlorineAdded)  || 0;
    const P  = parseFloat(phLevels)       || 0;
    const A  = parseFloat(acid)           || 0;
    const AK = parseFloat(alkinityLevels) || 0;

    const results = calculateDosages(V, S, C, P, A, AK);
    setDosages(results);

  }
  return (
    <ImageBackground source= {wave} style={homeStyles.container}>
      <SafeAreaView>

        <TextInput 
         style = {homeStyles.inputPoolSize}
         value  = {poolSize}
         onChangeText={setPoolSize}
         placeholder='Enter Pool Size in Liters'
         keyboardType='numeric'
        />

        <TextInput
          style= {homeStyles.inputSaltAdded}
          value= {saltAdded}
          onChangeText={setSaltAdded}
          placeholder= 'Enter quantity of salt added in kg'
          keyboardType='numeric'
        />

        <TextInput 
          style= {homeStyles.inputChlorineAdded}
          value = {chlorineAdded}
          onChangeText={setChlorineAdded}
          placeholder= "Enter quantity of chlorine added in kg"
          keyboardType='numeric'
        />

        <TextInput 
          style= {homeStyles.inputPhLevels}
          value= {phLevels}
          onChangeText={setPHLevels}
          placeholder= "Enter PH Levels"
          keyboardType='numeric'
        />

        <TextInput 
          style= {homeStyles.inputAcid}
          value= {acid}
          onChangeText= {setAcid}
          placeholder= "Cyanuric Acid (ppm)"
          keyboardType='numeric'
        />

        <TextInput 
          style= {homeStyles.inputAlkinity}
          value = {alkinityLevels}
          onChangeText= {setAlknityLevels}
          placeholder= "Total Alkalinity (ppm)"
          keyboardType='numeric'
        />

        <View style= {homeStyles.btnWrapper}>
          <Pressable onPress= {handleCalculate} style = {homeStyles.calculateDosagesBtn}>
            <Text>Calculate Dosages</Text>
          </Pressable>
        </View>

        <View style = {homeStyles.results}>
          {dosages && (
          <View style={homeStyles.results}>
            <Text style={homeStyles.resultsTitle}>Recommended Additions</Text>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Salt:</Text>
              <Text style={homeStyles.resultValue}>
                {dosages.salt_g.toFixed(1)} g
              </Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Chlorine:</Text>
              <Text style={homeStyles.resultValue}>
                {dosages.chlorine_g.toFixed(1)} g
              </Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>CYA:</Text>
              <Text style={homeStyles.resultValue}>
                {dosages.cya_g.toFixed(1)} g
              </Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Alkalinity:</Text>
              <Text style={homeStyles.resultValue}>
                {dosages.bicarb_g.toFixed(1)} g
              </Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Acid:</Text>
              <Text style={homeStyles.resultValue}>
                {dosages.acid_mL.toFixed(1)} mL
              </Text>
            </View>
      </View>
      )}
      </View>

      </SafeAreaView>
    </ImageBackground>
  )
}

function calculateDosages(size, salt, chlorine, ph, acid, alkalinity){
  const V= size //Volume
  const S= salt //salt
  const C= chlorine //Chlorine
  const P = ph //PH
  const A= acid //cyanaric acid
  const AK = alkalinity //akiniity


  const saltTarget= 3100
  let salt_g=  (saltTarget- S) * V/1000
  
  const chlorineTarget= 2
  let chlorine_g= (chlorineTarget- C) * V/1000

  const cyaTarget = 40;
  let cya_g= (cyaTarget- A) * V/1000

  const taTarget= 100
  let bicarb_g= (taTarget- AK) * V /1000 

  const PHTarget=  7.5
  const deltaPH= P - PHTarget

  let acid_mL = deltaPH * V  * 0.0189

  if ((salt_g || chlorine_g || cya_g || bicarb_g || acid_mL ) <= 0){
      salt_g= 0
      chlorine_g=0
      cya_g=0
      bicarb_g= 0
      acid_mL= 0
  }

  return{
    salt_g,
    chlorine_g,
    cya_g,
    bicarb_g,
    acid_mL,
  };
}

