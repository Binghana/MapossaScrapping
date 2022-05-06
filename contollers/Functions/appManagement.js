
import { auth } from '../../environment/config';
import momo from '../../sms-scrapping/MOMO/momo';
import om from '../../sms-scrapping/OrangeMoney/om';
import { getCurrentAppData } from '../APIRequest/appData';
//import storage from '../../storage';
import { getUserAllCompteFinanciers, sendCreateCompteFinancier } from '../APIRequest/CompteFinanciers';
import { bulkCreateTransactions } from '../APIRequest/Transactions';
import { AppError, mapossaScrappingData } from '../appData';
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


        if (!data.isThereData) throw new ScrappingError(ScrappingError.ERROR_NO_FINANCIAL_SMS);
        console.log("on a des données")
        console.log(data.transactions)
        console.log("Récuperons le numéros mtn");

        const numeroMTN = getOperatorNumbers(data.transactions.momo.transfertSortant);
        console.log("Récupérons le numéro ornage")
        console.log(data.transactions.om.transfertSortant)
        const numeroOrange = getOperatorNumbers(data.transactions.om.transfertSortant);
        console.log(numeroMTN); console.log(numeroOrange);
        if (numeroMTN.length > 1 || numeroOrange.length > 1) throw new ScrappingError(ScrappingError.ERROR_MORE_THAN_2_NUMBERS);


        try {
            if (numeroMTN.length > 0) {
                console.log("Envoyons la requête de création du compte financier MTN ");
                await sendCreateCompteFinancier(momo.address, numeroMTN[0].numero);
            }
            if (numeroOrange.length > 0) {
                console.log("Envoyons la requête de création du compte financier Orange ");
                await sendCreateCompteFinancier(om.address, numeroOrange[0].numero);
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

export async function createAutoTransaction(data) {


    const res = await getUserAllCompteFinanciers();
    if (res.data.data) {
        /**
         * @type {Array}
         */
        const comptes = res.data.data;
        console.log("Voici le nombre de compte récupéré de l'api")
        console.log(comptes.length);
        let transactionsF = []
        comptes.forEach((compte) => {
            if (compte.nomOperateur == om.address) {

                let transactionsOM = data.transactions.om.transfertEntrant.concat(data.transactions.om.transfertSortant);
                transactionsOM = transactionsOM.concat(data.transactions.om.retrait);
                transactionsOM = transactionsOM.concat(data.transactions.om.depot);
                // transactionsOM = transactionsOM.concat (data.transactions.om.creditInternet)
                // transactionsOM = transactionsOM.concat (data.transactions.om.creditCommunication)
                transactionsOM.forEach((t) => {
                    t.idCompte = compte.id;
                })
                transactionsF = transactionsF.concat(transactionsOM)



            } else
                if (compte.nomOperateur == momo.address) {
                    let transactionsMOMO = data.transactions.momo.transfertEntrant.concat(data.transactions.momo.transfertSortant);
                    transactionsMOMO = transactionsMOMO.concat(data.transactions.momo.retrait);
                    transactionsMOMO = transactionsMOMO.concat(data.transactions.momo.depot);
                    // transactionsOM = transactionsOM.concat (data.transactions.momo.creditInternet)
                    // transactionsOM = transactionsOM.concat (data.transactions.momo.creditCommunication)
                    transactionsMOMO.forEach((t) => {
                        t.idCompte = compte.id;
                    })
                    transactionsF = transactionsF.concat(transactionsMOMO);

                }

        })
        console.log("voici le nombre total de transactions à créer")
        console.log(transactionsF.length)
        return bulkCreateTransactions(transactionsF);
    }
}


export function getIdUser() {
    return auth.currentUser.uid;
}

export async function verifyVersion() {

    const res = await getCurrentAppData();
    const currentAppData = res.data.data;

    if (! (currentAppData.currentVersion == mapossaScrappingData.currentVersion)) throw new AppError(AppError.ERROR_APP_VERSION_DISMATCH);

}