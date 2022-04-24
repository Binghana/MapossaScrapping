import axios from "axios";
import momo from "../../sms-scrapping/MOMO/momo";
import om from "../../sms-scrapping/OrangeMoney/om";
import { getIdUser } from "../Functions/appManagement";
import { baseUrl } from "./Const";


async function getUrl() {

 return baseUrl + "/user/" + await getIdUser() +"/compteFinanciers/" ;

}


function getIdOperateur ( operateur ) {
    if (operateur == momo.address) return "xf5vxwQ6S8oyMRfaMGCb";
    if (operateur == om.address) return "5lHSOrFxm1pzcFFSNU6k";
}

export async function sendCreateCompteFinancier ( operateur , numero ) {

    var data = JSON.stringify({
        "nom": numero,
        "solde": 0,
        "idOperateur": getIdOperateur(operateur),
        "sommeSortie": 0,
        "sommeEntree": 0
      });
      
      var config = {
        method: 'post',
        url: await getUrl(),
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
    return axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
      
}

