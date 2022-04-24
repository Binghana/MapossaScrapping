import AsyncStorage from '@react-native-async-storage/async-storage';

 const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log(e)
  }
};

 const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
    console.log(e)
  }
};

const storage = {
    set : storeData,
    get : getData
}
export default storage;