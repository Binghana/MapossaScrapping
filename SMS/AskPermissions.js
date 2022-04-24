import { PermissionsAndroid } from "react-native";

export async function requestPermissions() {
    let granted = {};
    try {
      console.log("requesting SMS permissions");
      granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          PermissionsAndroid.PERMISSIONS.SEND_SMS
        ],
        {
          title: "Example App SMS Features",
          message: "Example SMS App needs access to demonstrate SMS features",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      console.log(granted);
    //   console.log(PermissionsAndroid.RESULTS.GRANTED)
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log("You can use SMS features");
    //   } else {
    //     console.log("SMS permission denied");
    //   }
    } catch (err) {
      console.warn(err);
    }
  }