import { useEffect, useMemo, useState } from 'react';
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
  const [series, setSeries] = useState({
    ph: [],
    chlorine: [],
    salt: [],
    alkalinity: [],
    cyanuric: [],
  });

  useEffect(() => {
    (async () => {
      const rows = await getEntries();
      if (!rows?.length) return;

      const sorted = [...rows].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      const dateLabels = sorted.map(r => new Date(r.createdAt).toLocaleDateString());
      setLabels(thinLabels(dateLabels));

      const num = (v) => (v != null && v !== '' ? Number(v) : 0);

      setSeries({
        ph:         sorted.map(r => num(r.ph)),
        chlorine:   sorted.map(r => num(r.chlorine)),
        salt:       sorted.map(r => num(r.salt)),
        alkalinity: sorted.map(r => num(r.alkalinity)),
        cyanuric:   sorted.map(r => num(r.cyanuric)),
      });
    })();
  }, []);

  const metrics = useMemo(() => ([
    { title: 'pH over time', key: 'ph' },
    { title: 'Chlorine over time (ppm)', key: 'chlorine' },
    { title: 'Salt over time (ppm)', key: 'salt' },
    { title: 'Alkalinity over time (ppm)', key: 'alkalinity' },
    { title: 'Cyanuric Acid over time (ppm)', key: 'cyanuric' },
  ]), []);

  const hasData = (arr) => arr.length > 0 && arr.some(v => Number.isFinite(v) && v !== 0);

  return (
    <ImageBackground source={wave} style={analyticsStyles.imageContainer} resizeMode="cover">
      <SafeAreaView style={analyticsStyles.safeArea}>
        <ScrollView contentContainerStyle={analyticsStyles.scrollBody}>

          {metrics.map(({ title, key }) => (
            <ChartCard
              key={key}
              title={title}
              labels={labels}
              data={series[key]}
              showEmpty={!hasData(series[key])}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

function ChartCard({ title, labels, data, showEmpty }) {
  const [cardW, setCardW] = useState(0);

  const onLayout = (e) => setCardW(e.nativeEvent.layout.width);
  const chartW = Math.max(0, cardW - 24); // card has 12px horizontal padding on each side

  return (
    <View style={analyticsStyles.card} onLayout={onLayout}>
      <Text style={analyticsStyles.cardTitle}>{title}</Text>

      {showEmpty ? (
        <View style={analyticsStyles.emptyState}>
          <Text style={analyticsStyles.emptyText}>No data yet. Add a few entries!</Text>
        </View>
      ) : (
        <View style={analyticsStyles.chartWrapper}>
          {chartW > 0 && (
            <LineChart
              data={{ labels, datasets: [{ data }] }}
              width={chartW}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={analyticsStyles.chart}
              yLabelsOffset={10}   // keep Y labels inside the tile
              segments={4}         // fewer grid lines = less crowding
            />
          )}
        </View>
      )}
    </View>
  );
}


function thinLabels(allLabels) {
  if (allLabels.length <= 8) return allLabels;
  const step = Math.ceil(allLabels.length / 8); 
  return allLabels.map((l, i) => (i % step === 0 || i === allLabels.length - 1 ? l : ''));
}
