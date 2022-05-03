
import { auth } from '../../environment/config';
import momo from '../../sms-scrapping/MOMO/momo';
import om from '../../sms-scrapping/OrangeMoney/om';
//import storage from '../../storage';
import { sendCreateCompteFinancier } from '../APIRequest/CompteFinanciers';
import ScrappingError from '../ScrappingError';
import { scrap } from './scrap';
import { getAllTransactionsOfOperator, getFrequentNumberOfOperator, getOperatorNumbers } from './scrapingOperation';
//import { getAllSMS } from './SMS';


// export async function getIdUser () {
//     return await storage.get("idUser");
// }

// export async function setIdUser ( idUser ) {
//     return await storage.set("idUser", idUser);
// }

export async function createUsersCompteFinanciers(data) {

    try {
        console.log("On a récupérer les sms de l'utilisateur")
        // console.log ( tabSMS.length);
        console.log("Scrappons les sms")
        
        
        if ( ! data.isThereData) throw new ScrappingError(ScrappingError.ERROR_NO_FINANCIAL_SMS);
        console.log("on a des données")
        console.log (data.transactions)
        console.log("Récuperons le numéros mtn");

        const numeroMTN = getOperatorNumbers( data.transactions.momo.transfertSortant );
        console.log("Récupérons le numéro ornage")
        console.log(data.transactions.om.transfertSortant)
        const numeroOrange = getOperatorNumbers( data.transactions.om.transfertSortant);
        console.log(numeroMTN); console.log(numeroOrange);
        if (numeroMTN.length >1 || numeroOrange.length > 1) throw new ScrappingError(ScrappingError.ERROR_MORE_THAN_2_NUMBERS);


        try {
            if (numeroMTN.length>0) {
                console.log("Envoyons la requête de création du compte financier MTN ");
                await sendCreateCompteFinancier(momo.address, numeroMTN[0].numero);
            }
            if (numeroOrange.length>0) {
                console.log("Envoyons la requête de création du compte financier Orange ");
                await sendCreateCompteFinancier ( om.address , numeroOrange[0].numero);
            }
        } catch (error) {
            console.log(error)
            throw error
        }    
        console.log("on a créer les comptes financiers avec succès")
    } catch (error) {
        console.log("on a throw l'erreur au niveau de appManagement")
        console.log(error)
        throw error;
    }


}

export function createAutoTransaction(data) {
    
    
}
export function getIdUser() {
    return auth.currentUser.uid;
}