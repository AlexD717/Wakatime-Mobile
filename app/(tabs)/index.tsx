import * as wakatimeService from "../../utils/wakatimeService";

import { hoursMinutesTimeFormat } from "@/utils/timeFormatter";
import { StatsRange } from "@/utils/wakatime";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "../../components";
import {
  FALLBACK_COLORS,
  LANGUAGE_COLORS,
} from "../../constants/languageColors";
import { styles } from "../../styles/darkTheme";

const SCREEN_WIDTH = Dimensions.get("window").width;

const RANGE_OPTIONS: { label: string; value: StatsRange }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Last Year", value: "last_year" },
  { label: "All Time", value: "all_time" },
];

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

  // Calculate total time
  const totalSeconds =
    stats?.languages?.reduce((acc: number, lang: any) => {
      return acc + lang.total_seconds;
    }, 0) ?? 0;

  // Prepare data for language pie chart
  const languagePieChart =
    stats?.languages?.slice(0, 10).map((lang: any, index: number) => {
      let color = LANGUAGE_COLORS[lang.name as keyof typeof LANGUAGE_COLORS];
      if (!color) {
        color = FALLBACK_COLORS[index % FALLBACK_COLORS.length];
      }

      const percentage =
        totalSeconds > 0
          ? ((lang.total_seconds / totalSeconds) * 100).toFixed(0)
          : "0";

      return {
        name: lang.name,
        population: lang.total_seconds,
        color: color,
        legendFontColor: "#c6c6c6ff",
        legendFontSize: 12,
        percentage: `${percentage}%`,
      };
    }) || [];

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={(styles.container, styles.scrollView)}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {/* Range Selection Picker */}
        <View style={styles.rowContainer}>
          <Text variant="title" style={{ marginRight: 12 }}>
            Select Range:
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.popupContainer}
            placeholderStyle={styles.text}
            selectedTextStyle={styles.text}
            itemTextStyle={styles.text}
            activeColor="#042f8bff"
            data={RANGE_OPTIONS}
            labelField="label"
            valueField="value"
            value={range}
            onChange={item => {
              setRange(item.value);
            }}
          />
        </View>

        {/* Button to Refresh Data */}
        {/*(<Button title="Refresh Data" onPress={loadData} />)*/}

        {/* Total Time Spent */}
        <View style={styles.card}>
          <Text variant="cardTitle">Total Time Spent</Text>
          <Text variant="body">{hoursMinutesTimeFormat(totalSeconds)}</Text>
        </View>

        {/* Language Pie Chart Graph */}
        <View style={styles.card}>
          {languagePieChart && languagePieChart.length > 0 && (
            <View style={styles.card}>
              <Text variant="cardTitle">
                Top 10 Languages ({range.replace(/_/g, " ")})
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
                hasLegend={false}
                center={[SCREEN_WIDTH / 8, 0]}
              />
            </View>
          )}

          {/* Language List with Time Spent */}
          <View style={{ marginTop: 20 }}>
            {languagePieChart.map((item: any, index: number) => (
              <View
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: item.color,
                      marginRight: 8,
                    }}
                  />
                  <Text style={styles.text}>
                    {item.name} ({item.percentage})
                  </Text>
                </View>

                <Text style={{ ...styles.text }}>
                  {hoursMinutesTimeFormat(item.population)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
