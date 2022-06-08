
import axios from "axios";


import { getIdUser } from "../../../tools/appManagement";
import { operators } from "../../../tools/sms-scrapping/operators";
import { baseUrl } from "./Const";

const momo = operators[1];
const om = operators[0];

async function getUrl() {

  return baseUrl + "/user/" + getIdUser() + "/compteFinanciers/";

}


function getIdOperateur(operateur) {
  if (operateur == operators[1].address) return "xf5vxwQ6S8oyMRfaMGCb";
  if (operateur == operators[0].address) return "5lHSOrFxm1pzcFFSNU6k";
  if (operateur == "Cash1") return "hgiLhnEHn323sVr9m6hq";
  return "";
}
function getLogoOperateur(operateur) {
  if (operateur == momo.address) return "https://firebasestorage.googleapis.com/v0/b/mapossadatatech.appspot.com/o/MoMo.png?alt=media&token=47a22640-9f22-4fa3-b33b-115eba9624a6";
  if (operateur == om.address) return "https://firebasestorage.googleapis.com/v0/b/mapossadatatech.appspot.com/o/OM.png?alt=media&token=80ab2d59-7250-4bb6-a19d-c7ac972d1f29"
  if (operateur == "Cash1") return "https://firebasestorage.googleapis.com/v0/b/mapossadatatech.appspot.com/o/Billets.png?alt=media&token=aa47789d-c656-4551-9684-bb53e7c0fd73";
}
export async function sendCreateCompteFinancier(operateur, numero , typeCompte) {

  console.log(operateur)
  console.log(numero)
  console.log(typeCompte)
  var data = JSON.stringify({
    "nom": numero,
    "numero": numero,
    "solde": 0,
    "idOperateur": getIdOperateur(operateur),
    "sommeSortie": 0,
    "sommeEntree": 0,
    "typeCompte" : typeCompte, 
    "logoOperateur": getLogoOperateur(operateur),
    "nomOperateur" : operateur,
    "isAuto" : true
  });
  console.log(data)

  var config = {
    method: 'post',
    url: await getUrl(),
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}
export async function getUserAllCompteFinanciers() {

  var config = {
    method: 'get',
    url: await getUrl(),
    headers: {}
  };

  return axios(config);
}
/**
 * 
 * @param {Array<any>} comptes 
 * @param {*} typeCompte 
 * @returns 
 */
export async function sendBulkCreateCompteFinancier( comptes, typeCompte) {
  let comptess = [];
  for (const compte of comptes) {
    let c = {
      "nom": compte.numero,
      "numero": compte.numero,
      "solde": 0,
      "idOperateur": getIdOperateur(compte.operateur),
      "sommeSortie": 0,
      "sommeEntree": 0,
      "typeCompte" : typeCompte, 
      "logoOperateur": getLogoOperateur(compte.operateur),
      "nomOperateur" : compte.operateur,
      "isAuto" : true
    }
    comptess.push(c)
  }
  var data = JSON.stringify({
    "comptes" : comptess
  });

  var config = {
    method: 'post',
    url: await getUrl(),
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  };

  return axios(config)

}
