
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
function getLogoOperateur ( operateur) {
  if (operateur == momo.address) return "https://firebasestorage.googleapis.com/v0/b/mapossadatatech.appspot.com/o/MoMo.png?alt=media&token=47a22640-9f22-4fa3-b33b-115eba9624a6";
  if ( operateur == om.address) return "https://firebasestorage.googleapis.com/v0/b/mapossadatatech.appspot.com/o/OM.png?alt=media&token=80ab2d59-7250-4bb6-a19d-c7ac972d1f29"
}
export async function sendCreateCompteFinancier ( operateur , numero ) {

    var data = JSON.stringify({
        "nom": numero,
        "numero": numero,
        "solde": 0,
        "idOperateur": getIdOperateur(operateur),
        "sommeSortie": 0,
        "sommeEntree": 0,
        "logo" : getLogoOperateur(operateur)
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
export async function getUserAllCompteFinanciers() {
  
}
