import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";

import { StatsRange } from "@/utils/wakatime";
import { PieChart } from "react-native-chart-kit";
import { Button, Text } from "../../components";
import { styles } from "../../styles/darkTheme";
import * as wakatimeService from "../../utils/wakatimeService";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function HomeScreen() {
  const [range, setRange] = React.useState<StatsRange>("last_7_days");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const wakatimeData = await wakatimeService.getWakatimeStats(range);
      setStats(wakatimeData);
    } catch {
      // Error handled in wakatime.ts
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const languagePieChart = stats?.languages
    ?.slice(0, 5)
    .map((lang: any, index: number) => ({
      name: lang.name,
      population: lang.total_seconds,
      color: colors[index],
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="title">Home Screen</Text>

      <Button title="Refresh Data" onPress={loadData} />

      {/* Language Pie Chart Graph */}
      {languagePieChart && languagePieChart.length > 0 && (
        <View style={styles.card}>
          <Text variant="cardTitle">
            Language Stats ({range.replace(/_/g, " ")})
          </Text>
          <PieChart
            data={languagePieChart}
            width={SCREEN_WIDTH - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        </View>
      )}
    </View>
  );
}
