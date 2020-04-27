import { AsyncStorage } from "react-native";

class StorageService {
  saveItem(key, value) {
    return AsyncStorage.setItem(key, value);
  }
  getItem(key) {
    return AsyncStorage.getItem(key);
  }
  deleteItem(key) {
    return AsyncStorage.removeItem(key);
  }
  saveItems(items) {
    return AsyncStorage.multiSet(items);
  }
  getItems(keys) {
    return AsyncStorage.multiGet(keys);
  }
}

export default StorageService;
