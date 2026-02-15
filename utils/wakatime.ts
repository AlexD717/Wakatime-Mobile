import { Buffer } from "buffer";
import { showAlert } from "./alert";

const BASE_URL = "https://wakatime.com/api/v1";

// Encode API key for Basic Authentication
const getAuthenticationHeader = (apiKey: string): { Authorization: string } => {
  const token = Buffer.from(`${apiKey}:`).toString("base64");
  return {
    Authorization: `Basic ${token}`,
  };
};

// Fetch user data for standard ranges
export type StatsRange =
  | "today"
  | "last_7_days"
  | "last_30_days"
  | "last_6_months"
  | "last_year"
  | "all_time";

const toISODate = (date: Date): string => {
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().split("T")[0];
};

export const fetchUserData = async (apiKey: string, range: StatsRange) => {
  try {
    // For short ranges use the summaries endpoint. It updates quicker
    if (range === "today" || range === "last_7_days") {
      const startDate = new Date();
      const endDate = new Date();

      switch (range) {
        case "today":
          break;
        case "last_7_days":
          startDate.setDate(endDate.getDate() - 6);
          break;
      }

      const startStr = toISODate(startDate);
      const endStr = toISODate(endDate);

      const response = await fetch(
        `${BASE_URL}/users/current/summaries?start=${startStr}&end=${endStr}`,
        {
          headers: getAuthenticationHeader(apiKey),
        },
      );

      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }

      const json = await response.json();
      return transformSummariesToStats(json.data);
    }

    // For long ranger use the stats endpoint - it is available for all users
    let isCompiling: boolean = true;
    let attempts: number = 0;
    const maxAttempts = 5;
    const secondsBetweenAttempts = 1000;

    while (isCompiling && attempts < maxAttempts) {
      const response = await fetch(`${BASE_URL}/users/current/stats/${range}`, {
        headers: getAuthenticationHeader(apiKey),
      });

      if (!response.ok) {
        throw new Error(`Error fetching user data: ${response.statusText}`);
      }

      const json = await response.json();
      if (response.status === 202) {
        attempts++;
        await new Promise(resolve =>
          setTimeout(resolve, secondsBetweenAttempts),
        );
      } else {
        isCompiling = false;
        return json.data;
      }
    }

    showAlert(
      "Fetch Data Timeout",
      "Wakatime is taking to long to compile, please try again later",
    );
  } catch (error) {
    showAlert("fetchUserData error", String(error));
    throw error;
  }
};

const transformSummariesToStats = (summaries: any[]) => {
  const languageMap = new Map<string, number>();
  const projectsMap = new Map<string, number>();

  summaries.forEach(day => {
    day.languages?.forEach((lang: any) => {
      const current = languageMap.get(lang.name) || 0;
      languageMap.set(lang.name, current + lang.total_seconds);
    });

    day.projects?.forEach((proj: any) => {
      const current = projectsMap.get(proj.name) || 0;
      projectsMap.set(proj.name, current + proj.total_seconds);
    });
  });

  const languages = Array.from(languageMap.entries())
    .map(([name, total_seconds]) => ({ name, total_seconds }))
    .sort((a, b) => b.total_seconds - a.total_seconds);

  const projects = Array.from(projectsMap.entries())
    .map(([name, total_seconds]) => ({ name, total_seconds }))
    .sort((a, b) => b.total_seconds - a.total_seconds);

  return { languages, projects };
};
