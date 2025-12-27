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
export type StatsRange = "last_7_days" | "last_30_days" | "last_6_months";

export const fetchUserData = async (apiKey: string, range: StatsRange) => {
  try {
    const response = await fetch(`${BASE_URL}/users/current/stats/${range}`, {
      headers: getAuthenticationHeader(apiKey),
    });

    if (!response.ok) {
      showAlert("Error fetching user data", response.statusText);
      throw new Error(`Error fetching user data: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    showAlert("fetchUserData error", String(error));
    throw error;
  }
};
