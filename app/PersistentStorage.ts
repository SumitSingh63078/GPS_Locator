import AsyncStorage from '@react-native-async-storage/async-storage';

const PersistentStorage = {
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log(`Data stored successfully for key: ${key}`);
    } catch (error) {
      console.error(`Failed to save data for key: ${key}`, error);
    }
  },

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error(`Failed to fetch data for key: ${key}`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Data removed successfully for key: ${key}`);
    } catch (error) {
      console.error(`Failed to remove data for key: ${key}`, error);
    }
  }
};

export default PersistentStorage;
