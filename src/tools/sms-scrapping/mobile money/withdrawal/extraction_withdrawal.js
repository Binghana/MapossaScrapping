import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords, senderPhoneNumberKeywords }  from "./keywords_withdrawal"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword  } from "../../functions";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un retrait de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

 export function scrapWithdrawalMOMO( sms , preProcessedTransaction ) {

    preProcessedTransaction.initialType = "Retrait";
    preProcessedTransaction.flux = "Sortant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.senderPhoneNumber = getNumberFromKeyword( senderPhoneNumberKeywords, sms.body )

    preProcessedTransaction.userPhoneNumber = preProcessedTransaction.senderPhoneNumber;
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );

    return preProcessedTransaction;
}