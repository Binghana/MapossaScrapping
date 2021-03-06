import { PermissionsAndroid } from "react-native";


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
  
  minDate: (new Date().getTime() -90*24*3600*1000), // timestamp (in milliseconds since UNIX epoch)
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
     console.log( granted)
     console.log( PermissionsAndroid.RESULTS.GRANTED)
      if (granted["android.permission.READ_SMS"] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use SMS features");
        return true;
      } else {
        console.log("SMS permission denied");
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

// export async function getAllSMS() {
//     try {
//         console.log( "commencons")
//       if (await requestPermissions() ){
//         console.log("on peut lire les sms")
//         let tabSMS = [] ;
//         return SmsAndroid.list(
//           JSON.stringify(filter),
//           fail => {
//             throw fail;
//           },
//           async (count, smsList) => {
//             console.log('Count: ', count);
//             tabSMS = JSON.parse(smsList);
//             console.log("on a fini de remplir")
          
//           },
//         );
//         // console.log(tabSMS)
//         //return tabSMS ;
//       }else {
//         throw new Error("Impossible de lire les sms de l'utilisateur car la permissions a ??t?? refus??");
//       }
      
//     } catch (error) {
//       throw error ;
//     }
//   }