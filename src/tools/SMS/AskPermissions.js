import { PermissionsAndroid } from "react-native";

//export let nbJoursEnArrire = 360;

export const filter = {
  //box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all

  /**
   *  the next 3 filters can work together, they are AND-ed
   *  
   *  minDate, maxDate filters work like this:
   *    - If and only if you set a maxDate, it's like executing this SQL query:
   *    "SELECT * from messages WHERE (other filters) AND date <= maxDate"
   *    - Same for minDate but with "date >= minDate"
   */
  
  //minDate: (new Date().getTime() -nbJoursEnArrire*24*3600*1000), // timestamp (in milliseconds since UNIX epoch)
  maxDate: new Date().getTime(), // timestamp (in milliseconds since UNIX epoch)
  /*bodyRegex: '(.*)How are you(.*)', // content regex to match
  */

  /** the next 5 filters should NOT be used together, they are OR-ed so pick one **/
  /*read: 0, // 0 for unread SMS, 1 for SMS already read
  _id: 1234, // specify the msg id
  thread_id: 12, // specify the conversation thread_id
  
  body: 'How are you', // content to match*/
  /** the next 2 filters can be used for pagination **/
  /*indexFrom: 0, // start from index 0
  maxCount: 10, // count of SMS to return each time*/
  //address: '(.*)'+momo.address+'(.*)', // sender's phone number regex match
}

export async function requestPermissions() {
    let granted = {};
    try {
      console.log("requesting SMS permissions");
      granted = await PermissionsAndroid.request(
        
          PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: "Example App SMS Features",
          message: "Example SMS App needs access to demonstrate SMS features",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the SMS");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
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
  export async function isPermissionGranted (){
    return await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_SMS)
  }