import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords}  from "../keywords";
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword } from "../functions";
import { PreProcessedTransaction } from "../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un retrait d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

 export function scrapWithdrawalOM( sms , preProcessedTransaction ) {
    preProcessedTransaction.initialType = "Retrait";
    preProcessedTransaction.flux = "Sortant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );


    preProcessedTransaction.amount_error = ( preProcessedTransaction.amount == -1);
    preProcessedTransaction.fees_error = (preProcessedTransaction.fees == -1);
    preProcessedTransaction.balance_error = (preProcessedTransaction.balance == -1);
    preProcessedTransaction.checkError();
    return preProcessedTransaction;
}