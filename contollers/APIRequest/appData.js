
import axios from "axios";
import { baseUrl } from "./Const";


function getUrl() {

  return baseUrl + "/mapossaScrapping/";

}

export async function getCurrentAppData() {


    var config = {
      method: 'get',
      url: getUrl(),
      headers: {}
    };
  
    return axios(config);
  
  }