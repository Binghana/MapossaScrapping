import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from "react-native";



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

export const storage = {
    set : storeData,
    get : getData
}


export function removeSpaceOfString ( str ) {
    return str.replace(/\s/g, '');
}
export async function openUrl( url ) {
    if (Linking.canOpenURL(url)) return await Linking.openURL(url) ; else throw new Error ("Can't open url " + url );
}

