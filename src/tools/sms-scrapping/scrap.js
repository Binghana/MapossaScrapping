import { operators } from "./operators";
import { SMS } from "./sms";
import { PreProcessedTransaction } from "./preProcessedTransactions"
import { matchModel } from "./models";
import { isGoodNumTelCameroon } from "../verification/RegExp";
import { getNumberFromKeyword } from "./functions";
import { senderPhoneNumberKeywords }  from "./mobile money/deposit/keywords_deposit";
//import { senderPhoneNumberKeywords } from "./mobile money/transfertIn/extraction_transfertIn";
import { sendCreateCompteFinancier } from "../../services/API/mapossaDataTech/CompteFinanciers";

/** 
 * @param {SMS[]} smsArray 
 */
export default async function scrap(smsArray) {

    /**
     * @type {PreProcessedTransaction[]}
     */
    let preProcessedTransactions = [];

    try {

        for (const operator of operators) {

            // on récupère les sms dont l'adress

            const smsOperator = smsArray.filter(sms => sms.address == operator.address);
            
            if (smsOperator.length < 1) {
                continue;
            }
            // creation du compte financier de l'opérateur de l'utilisateur
            try {

                const res = await sendCreateCompteFinancier(operator.address, "", "Mobile");
                //console.log(res.data)
                if (res.data.data && res.data.data.idCompte) {
                    operator.id == res.data.data.idCompte;
                }
            } catch (error) {
                //console.log("Une érreur est survennue lors de la création du compte financier automatique, veuillez patienter...");

                // réesseyons
                // let nombreTentative = 1;
                // const retryCreateCompte = async (retryId) => {
                //     try {
                //         if (nombreTentative > 3) {
                //             clearInterval(retryId);
                //             //console.log("Une erreur majeure est survennue, retenter dans 10 min");
                //             return new Error("Impossible de créer le compte financier " + operator.address + " de l'utilisateur")

                //         }
                //         nombreTentative++;
                //         await sendCreateCompteFinancier(operator.address, "", "Mobile");
                //         //console.log(res.data)
                //         if (res.data.data && res.data.data.idCompte) {
                //             operator.id == res.data.data.idCompte;
                //             return clearInterval(retryId);
                //         }
                //     } catch (error) {
                //         retryCreateCompte(retryId)
                //     }
                // }
                // const retryId = setInterval(() => {
                //     retryCreateCompte(retryId)
                // }, 10000);
            }

            // Transformation
            /**
             * @type {PreProcessedTransaction[]}
             */
            const preProcessedTransactionOperator = [];
            // 1. parcours
            let i = 0;
            for (const sms of smsOperator) {


                const preProTran = new PreProcessedTransaction(sms, operator.address, sms.service_center);

                // vérification

                if (!operator.serviceCenter.includes(sms.service_center)) {
                    preProTran.risk = true;
                    preProcessedTransactionOperator.push(preProTran);
                    continue;
                }

                preProTran.risk = false;

                // classification
                let matchOneModel = false;




                for (const typeInitial in operator.typeInitial) {
                    if (Object.hasOwnProperty.call(operator.typeInitial, typeInitial)) {
                        const models = operator.typeInitial[typeInitial];


                        if (operator.address == operators[1].address) {

                            if (typeInitial == "depot" && (isMOMODeposit(models.modelFR, sms.body) || isMOMODeposit(models.modelEN, sms.body))) {
                                operator.scrap.depot(sms, preProTran)
                                preProTran.problem = false;
                                preProcessedTransactionOperator.push(preProTran);
                                matchOneModel = true;
                                break;
                            }

                            if (typeInitial == "transfertEntrant" && (isMOMOTransfertIn(models.modelFR, sms.body) || isMOMOTransfertIn(models.modelEN, sms.body))) {

                                operator.scrap.transfertEntrant(sms, preProTran)
                                preProTran.problem = false;
                                preProcessedTransactionOperator.push(preProTran);
                                matchOneModel = true;
                                break;

                            }

                        }




                        if (matchModel(models.modelFR, sms.body) ||
                            (("modelEN") in models) && matchModel(models.modelEN, sms.body)) {
                            preProTran.error = false;

                            try {
                                operator.scrap[typeInitial](sms, preProTran);
                                preProTran.problem = false;
                                preProcessedTransactionOperator.push(preProTran);

                            } catch (error) {

                                console.log("Une erreur d'extraction est survennue dans " + operator.address + " sur le type initial : " + typeInitial)

                            } finally {
                                matchOneModel = true;
                                break;
                            }
                        }




                    }
                }


                // si le sms ne match aucun model
                if (!matchOneModel) {
                    
                    preProTran.error = true;
                    preProcessedTransactionOperator.push(preProTran);
                    continue;
                }


            }

            preProcessedTransactions = preProcessedTransactions.concat(preProcessedTransactionOperator);

        }

    } catch (error) {
        //console.log()
    }
    return preProcessedTransactions;
}
/**
 * 
 * @param {SMS} sms 
 * @returns {boolean}
 */
export function identification(sms, operator) {

    // if ()
}
/**
 * 
 * @param {SMS} sms 
 * @param {string} operator 
 * @returns {boolean}
 */
export function verification(sms, operator) {

}

function isMOMODeposit(model, sms) {

    return matchModel(model, sms) && isGoodNumTelCameroon.test(getNumberFromKeyword(senderPhoneNumberKeywords, sms))



}
function isMOMOTransfertIn(model, sms) {

    return matchModel(model, sms) && (!isGoodNumTelCameroon.test(getNumberFromKeyword(senderPhoneNumberKeywords, sms)))


}