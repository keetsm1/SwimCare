import { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import wave from '../../assets/images/wave.png';
import { getEntries } from '../../components/db';
import { analyticsStyles } from '../../styles/analyticsStyles';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#0f172a',
  backgroundGradientTo: '#1e293b',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  propsForDots: { r: '3' },
};

export default function Analytics() {
  const [labels, setLabels] = useState([]);
  const [phValues, setPhValues] = useState([]);

  useEffect(() => {
    (async () => {
      const rows = await getEntries();
      if (!rows.length) return;

      const sorted = [...rows].sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );

      setLabels(sorted.map(r => new Date(r.createdAt).toLocaleDateString()));

      // 🔵 force convert to numbers
      setPhValues(sorted.map(r => r.ph != null ? Number(r.ph) : 0));
    })();
  }, []);

  const hasData = phValues.length > 0 && phValues.some(v => Number.isFinite(v) && v !== 0);

  return (
    <ImageBackground source={wave} style={analyticsStyles.imageContainer} resizeMode="cover">
      <SafeAreaView style={analyticsStyles.safeArea}>
        <ScrollView contentContainerStyle={analyticsStyles.scrollBody}>
          <Text style={analyticsStyles.title}></Text>

          <View style={analyticsStyles.card}>
            <Text style={analyticsStyles.cardTitle}>pH over time</Text>
            {hasData ? (
              <LineChart
                data={{ labels, datasets: [{ data: phValues }] }}
                width={screenWidth - 32}
                height={240}
                chartConfig={chartConfig}
                bezier
                style={analyticsStyles.chart}
              />
            ) : (
              <View style={analyticsStyles.emptyState}>
                <Text style={analyticsStyles.emptyText}>No pH data yet. Add a few entries!</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
