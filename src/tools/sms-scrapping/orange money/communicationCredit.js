import {amountKeywords ,feeKeywords,transactionIDKeywords }  from "../keywords"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword  } from "../functions";
import { PreProcessedTransaction } from "../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un Acaht de crédit de communication d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */

 export function scrapCommunicationCreditOM( sms , preProcessedTransaction ) {
    
    preProcessedTransaction.finalType = "Depense";
    preProcessedTransaction.initialType = "Paiement";
    preProcessedTransaction.flux = "Sortant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms);
   
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );

    preProcessedTransaction.amount_error = ( preProcessedTransaction.amount == -1);
    preProcessedTransaction.fees_error = (preProcessedTransaction.fees == -1);

    preProcessedTransaction.checkError();

    return preProcessedTransaction;
}