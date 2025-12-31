import { hoursMinutesTimeFormat } from "@/utils/timeFormatter";
import { StatsRange } from "@/utils/wakatime";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "../../components";
import { styles } from "../../styles/darkTheme";
import * as wakatimeService from "../../utils/wakatimeService";

const RANGE_OPTIONS: { label: string; value: StatsRange }[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
  { label: "Last 6 Months", value: "last_6_months" },
  { label: "Last Year", value: "last_year" },
  { label: "All Time", value: "all_time" },
];

export default function ProjectsScreen() {
  const [range, setRange] = React.useState<StatsRange>("last_year");
  const [projects, setProjects] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await wakatimeService.getWakatimeStats(range);

      const sortedProjects = (data.projects || []).sort(
        (a: any, b: any) => b.total_seconds - a.total_seconds,
      );

      setProjects(sortedProjects);
    } catch {
      // Error handled in wakatime.ts
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

        {/* Project List */}
        <View>
          {loading && projects.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : projects.length === 0 ? (
            <Text style={styles.text}>
              No projects found for this time range.
            </Text>
          ) : (
            projects.map((project: any) => (
              <View key={project.name} style={styles.projectCard}>
                <Text style={styles.cardTitle}>{project.name}</Text>
                <Text style={styles.text}>
                  Time Spent: {hoursMinutesTimeFormat(project.total_seconds)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
