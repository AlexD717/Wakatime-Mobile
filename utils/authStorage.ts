import * as SecureStore from "expo-secure-store";

const KEY_NAME = "wakatime_api_key";

export const saveApiKey = async (apiKey: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(KEY_NAME, apiKey);
  } catch (error) {
    console.error("Error saving API key:", error);
  }
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    const apiKey = await SecureStore.getItemAsync(KEY_NAME);
    return apiKey;
  } catch (error) {
    console.error("Error retrieving API key:", error);
    return null;
  }
};

export const deleteApiKey = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(KEY_NAME);
  } catch (error) {
    console.error("Error deleting API key:", error);
  }
};
