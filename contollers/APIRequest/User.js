import { baseUrl } from "./Const";
import axios from "axios";

// import axios from "axios";

export async function createAdaloUser(email, password , uid , tokenId ) {

  var data = JSON.stringify({
    "Email": email,
    "Password": password,
    "uid": uid,
    // "tokenId" : tokenId,
  });
  
  var config = {
    method: 'post',
    url: 'https://api.adalo.com/v0/apps/bc399ca2-5676-4c50-8077-b98f3f8c9c6f/collections/t_3d82b4b02d8e4a8b823745fbb09a9bdb',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer d0ba757rxo4l7unzobkgo5bsu'
    },
    data : data
  };
  
  return axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
} 

