import { useMemo, useState } from 'react';
import { FlatList, ImageBackground, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View, useColorScheme } from 'react-native';
import wave from '../../assets/images/wave.png';
import { homeStyles } from '../../styles/homeStyles';

function UnitSelect({ value, onChange, options = [], style }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        style={[
          {
            width: 110,
            height: 48,
            borderRadius: 12,
            backgroundColor: 'rgba(255,255,255,0.94)',
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}
      >
        <Text style={{ fontSize: 14 }}>{value}</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.25)' }}
          onPress={() => setOpen(false)}
        >
          <View
            style={{
              position: 'absolute',
              left: 20,
              right: 20,
              bottom: 40,
              borderRadius: 16,
              padding: 12,
              backgroundColor: '#fff',
              maxHeight: 320,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(o) => o.value}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  style={{ paddingVertical: 12, paddingHorizontal: 8, borderRadius: 10 }}
                >
                  <Text style={{ fontSize: 16 }}>{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}


const toDisplayWeight = (grams, unit) => {
  if (unit === 'kg') return grams / 1000;
  if (unit === 'lb') return grams / 453.59237;
  return grams; // g
};

const toDisplayVolume = (mL, unit) => {
  if (unit === 'L') return mL / 1000;
  if (unit === 'fl_oz') return mL / 29.5735296;
  return mL; // mL
};

// Convert pool size input to liters
const toLiters = (value, unit) => {
  const v = parseFloat(value) || 0;
  return unit === 'gal' ? v * 3.785411784 : v;
};

export default function Home() {
  // Inputs
  const [poolSize, setPoolSize] = useState('');
  const [poolUnit, setPoolUnit] = useState('L'); // 'L' | 'gal'
   const isDark = useColorScheme() === 'dark';
  const [saltLevel, setSaltLevel] = useState('');
  const [chlorineLevel, setChlorineLevel] = useState('');
  const [phLevels, setPHLevels] = useState('');
  const [cyaLevel, setCyaLevel] = useState('');
  const [alkinityLevels, setAlknityLevels] = useState('');

  // Output units
  const [weightUnit, setWeightUnit] = useState('kg'); // g | kg | lb
  const [acidUnit, setAcidUnit] = useState('L'); // mL | L | fl_oz

  const [dosages, setDosages] = useState(null);

  function handleCalculate() {
    const V_L = toLiters(poolSize, poolUnit); // liters
    const Sppm = parseFloat(saltLevel) || 0;
    const Cppm = parseFloat(chlorineLevel) || 0;
    const P = parseFloat(phLevels) || 0;
    const CYA = parseFloat(cyaLevel) || 0;
    const TA = parseFloat(alkinityLevels) || 0;

    const results = calculateDosages(V_L, Sppm, Cppm, P, CYA, TA);
    setDosages(results);
  }

  const formatted = useMemo(() => {
    if (!dosages) return null;
    return {
      salt: toDisplayWeight(dosages.salt_g, weightUnit),
      chlorine: toDisplayWeight(dosages.chlorine_g, weightUnit),
      cya: toDisplayWeight(dosages.cya_g, weightUnit),
      bicarb: toDisplayWeight(dosages.bicarb_g, weightUnit),
      acid: toDisplayVolume(dosages.acid_mL, acidUnit),
    };
  }, [dosages, weightUnit, acidUnit]);

  return (
    <ImageBackground source={wave} style={homeStyles.container}>
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >

        <View style={homeStyles.inputRow}>
          <TextInput
            style={[homeStyles.inputPoolSize, homeStyles.inputFlex]}
            value={poolSize}
            onChangeText={setPoolSize}
            placeholder="Pool Size"
            placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
            keyboardType="numeric"
          />
          <UnitSelect
            value={poolUnit}
            onChange={setPoolUnit}
            options={[
              { label: 'L', value: 'L' },
              { label: 'gal', value: 'gal' },
            ]}
          />
        </View>

        <TextInput
          style={homeStyles.inputSaltAdded}
          value={saltLevel}
          onChangeText={setSaltLevel}
          placeholder="Current Salt (ppm)"
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
          keyboardType="numeric"
        />

        <TextInput
          style={homeStyles.inputChlorineAdded}
          value={chlorineLevel}
          onChangeText={setChlorineLevel}
          placeholder="Free Chlorine (ppm)"
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
          keyboardType="numeric"
        />

        <TextInput
          style={homeStyles.inputPhLevels}
          value={phLevels}
          onChangeText={setPHLevels}
          placeholder="pH"
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
          keyboardType="numeric"
        />

        <TextInput
          style={homeStyles.inputAcid}
          value={cyaLevel}
          onChangeText={setCyaLevel}
          placeholder="Cyanuric Acid (ppm)"
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
          keyboardType="numeric"
        />

        <TextInput
          style={homeStyles.inputAlkinity}
          value={alkinityLevels}
          onChangeText={setAlknityLevels}
          placeholder="Total Alkalinity (ppm)"
          placeholderTextColor={isDark ? "#9CA3AF" : "#6B7280"} 
          keyboardType="numeric"
        />

        {/* Result unit pickers */}
        <View style={homeStyles.inputRow}>
          <View style={[homeStyles.inputFlex, { opacity: 0.6, paddingVertical: 14 }]}>
            <Text>Result weight unit</Text>
          </View>
          <UnitSelect
            value={weightUnit}
            onChange={setWeightUnit}
            options={[
              { label: 'kg', value: 'kg' },
              { label: 'g', value: 'g' },
              { label: 'lb', value: 'lb' },
            ]}
          />
        </View>

        <View style={homeStyles.inputRow}>
          <View style={[homeStyles.inputFlex, { opacity: 0.6, paddingVertical: 14 }]}>
            <Text>Acid volume unit</Text>
          </View>
          <UnitSelect
            value={acidUnit}
            onChange={setAcidUnit}
            options={[
              { label: 'L', value: 'L' },
              { label: 'mL', value: 'mL' },
              { label: 'fl oz', value: 'fl_oz' },
            ]}
          />
        </View>

        <View style={homeStyles.btnWrapper}>
          <Pressable onPress={handleCalculate} style={homeStyles.calculateDosagesBtn}>
            <Text style = {{color: 'white'}}>Calculate Dosages</Text>
          </Pressable>
        </View>

        {formatted && (
          <View style={homeStyles.results}>
            <Text style={homeStyles.resultsTitle}>Recommended Additions</Text>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Salt:</Text>
              <Text style={homeStyles.resultValue}>{formatted.salt.toFixed(2)} {weightUnit}</Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Chlorine:</Text>
              <Text style={homeStyles.resultValue}>{formatted.chlorine.toFixed(2)} {weightUnit}</Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>CYA:</Text>
              <Text style={homeStyles.resultValue}>{formatted.cya.toFixed(2)} {weightUnit}</Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Alkalinity (Bicarb):</Text>
              <Text style={homeStyles.resultValue}>{formatted.bicarb.toFixed(2)} {weightUnit}</Text>
            </View>

            <View style={homeStyles.resultRow}>
              <Text style={homeStyles.resultLabel}>Acid:</Text>
              <Text style={homeStyles.resultValue}>{formatted.acid.toFixed(2)} {acidUnit}</Text>
            </View>
          </View>
        )}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

// --- Dosage math ---
function calculateDosages(sizeL, salt_ppm, chlorine_ppm, ph, cya_ppm, ta_ppm) {
  const V = sizeL;

  const saltTarget = 3100;
  let salt_g = (saltTarget - salt_ppm) * V / 1000;

  const chlorineTarget = 2;
  let chlorine_g = (chlorineTarget - chlorine_ppm) * V / 1000;

  const cyaTarget = 40;
  let cya_g = (cyaTarget - cya_ppm) * V / 1000;

  const taTarget = 100;
  let bicarb_g = (taTarget - ta_ppm) * V / 1000;

  const PHTarget = 7.5;
  const deltaPH = ph - PHTarget;
  let acid_mL = deltaPH * V * 0.0189;

  if (salt_g < 0) salt_g = 0;
  if (chlorine_g < 0) chlorine_g = 0;
  if (cya_g < 0) cya_g = 0;
  if (bicarb_g < 0) bicarb_g = 0;
  if (acid_mL < 0) acid_mL = 0;

  return { salt_g, chlorine_g, cya_g, bicarb_g, acid_mL };
}
