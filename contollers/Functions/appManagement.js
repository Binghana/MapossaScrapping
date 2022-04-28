
import momo from '../../sms-scrapping/MOMO/momo';
import om from '../../sms-scrapping/OrangeMoney/om';
//import storage from '../../storage';
import { sendCreateCompteFinancier } from '../APIRequest/CompteFinanciers';
import { scrap } from './scrap';
import { getAllTransactionsOfOperator, getFrequentNumberOfOperator } from './scrapingOperation';
//import { getAllSMS } from './SMS';


// export async function getIdUser () {
//     return await storage.get("idUser");
// }

// export async function setIdUser ( idUser ) {
//     return await storage.set("idUser", idUser);
// }

export async function createUsersCompteFinanciers(tabSMS) {

    try {
        console.log("On a récupérer les sms de l'utilisateur")
        // console.log ( tabSMS.length);
        // console.log("Scrappons les sms")
        const tabTransaction = await scrap(tabSMS);
        // console.log("on a pu scrapper les sms ");
        // console.log( tabTransaction);

        // const transactionsOrange = getAllTransactionsOfOperator(tabTransaction , om.address);
        // console.log( "Ok voici les transactions orange")
        // console.log(transactionsOrange);
        // const transactionsMTN = getAllTransactionsOfOperator(tabTransaction , momo.address)
        // console.log( "Ok voici les transactions MTN")
        // console.log(transactionsMTN);
        // console.log("Regardons les numéros les plus utilisés");
        // const mostFrequentOrangeNumber = getFrequentNumberOfOperator(transactionsOrange);
        // console.log("Le numéro orange le plus utilisés est : ")
        // console.log(mostFrequentOrangeNumber);


        // const mostFrequentMTNNumber = getFrequentNumberOfOperator(transactionsMTN);
        // console.log("Le numéro MTN le plus utilisés est : ");
        // console.log(mostFrequentMTNNumber);

        // try {
        //     if (mostFrequentMTNNumber) {
        //         console.log("Envoyons la requête de création du compte financier MTN ");
        //         await sendCreateCompteFinancier(momo.address, mostFrequentMTNNumber);
        //     }
        //     if (mostFrequentOrangeNumber) {
        //         console.log("Envoyons la requête de création du compte financier Orange ");
        //         await sendCreateCompteFinancier ( om.address , mostFrequentOrangeNumber);
        //     }
        // } catch (error) {
        //     console.log(error)
        //     throw error
        // }    
        console.log("on a créer les comptes financiers avec succès")
    } catch (error) {
        console.log("on a theow l'erreur au niveau de appmanagement")
        throw error;
    }


}