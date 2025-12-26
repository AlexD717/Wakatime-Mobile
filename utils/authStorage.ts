import * as SecureStore from "expo-secure-store";
import { showAlert } from "../utils/alert";

const KEY_NAME = "wakatime_api_key";

export const saveApiKey = async (apiKey: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(KEY_NAME, apiKey);
  } catch (error) {
    showAlert(`Error saving API key`, String(error));
  }
};

export const getApiKey = async (): Promise<string | null> => {
  try {
    const apiKey = await SecureStore.getItemAsync(KEY_NAME);
    return apiKey;
  } catch (error) {
    showAlert(`Error retrieving API key`, String(error));
    return null;
  }
};

export const deleteApiKey = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(KEY_NAME);
  } catch (error) {
    showAlert(`Error deleting API key`, String(error));
  }
};
