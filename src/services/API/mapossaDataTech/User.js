import { baseUrl } from "./Const";
import axios from "axios";
import { getIdUser } from "../../../tools/appManagement";

// import axios from "axios";

// export async function createAdaloUser(email, password , uid , tokenId ) {

//   var data = JSON.stringify({
//     "Email": email,
//     "Password": password,
//     "uid": uid,
//     // "tokenId" : tokenId,
//   });
  
//   var config = {
//     method: 'post',
//     url: 'https://api.adalo.com/v0/apps/bc399ca2-5676-4c50-8077-b98f3f8c9c6f/collections/t_3d82b4b02d8e4a8b823745fbb09a9bdb',
//     headers: { 
//       'Content-Type': 'application/json', 
//       'Authorization': 'Bearer d0ba757rxo4l7unzobkgo5bsu'
//     },
//     data : data
//   };
  
//   return axios(config)
//   // .then(function (response) {
//   //   console.log(JSON.stringify(response.data));
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });
// } 

const url = baseUrl + "/user/";



export async function sendCreateUserRequest(uid , notificationToken) {

  var data = JSON.stringify({
      uid : uid,
      notificationToken : notificationToken
  });
  var config = {
    method: "post",
    url: url,
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };
  console.log("Envoyons la requete de création de compte")
   return axios(config);
    
} 


export async function getUserAdaloId () {
  var config = {
    method: 'get',
    url: 'https://us-central1-mapossadatatech.cloudfunctions.net/user/' + getIdUser(),
    headers: { 
      'Authorization': 'Bearer d0ba757rxo4l7unzobkgo5bsu'
    }
  };
  
  const res = await axios(config)
  
  return response.data.data.idAdalo;
}

