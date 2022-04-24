import { Linking } from "react-native";

export function removeSpaceOfString ( str ) {
    return str.replace(/\s/g, '');
}
export async function openUrl( url ) {
    if (Linking.canOpenURL(url)) return await Linking.openURL(url) ; else throw new Error ("Can't open url " + url );
}