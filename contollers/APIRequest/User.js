import { baseUrl } from "./Const";
import axios from "axios";

// import axios from "axios";

const url = baseUrl + "/user/";



export async function sendCreateUserRequest(email, password) {

  var data = JSON.stringify({
    email: email,
    password : password,
    isSmartWallet: true,
  
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