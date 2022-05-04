
import axios from "axios";
import { getIdUser } from "../Functions/appManagement";
import { baseUrl } from "./Const";


function getUrl() {

    return baseUrl + "/user/" + getIdUser() + "/transactions/";
  
  }

export async function bulkCreateTransactions( transactions = []) {

    var data = JSON.stringify({
        "transactions": transactions
      });
      
      var config = {
        method: 'post',
        url: getUrl(),
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)   
}

