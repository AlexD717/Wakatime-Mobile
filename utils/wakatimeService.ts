import { showAlert } from "./alert";
import { getApiKey } from "./authStorage";
import { fetchUserData, StatsRange } from "./wakatime";

export const getWakatimeStats = async (range: StatsRange) => {
  const apiKey = await getApiKey();

  if (!apiKey) {
    showAlert("API key not found", "Please set your Wakatime API key.");
    throw new Error("API key not found");
  }

  return fetchUserData(apiKey, range);
};
