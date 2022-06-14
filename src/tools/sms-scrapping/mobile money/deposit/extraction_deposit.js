import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords }  from "./keywords_deposit"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword  , getUserName } from "../../functions";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un dépot de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

export function scrapDepositMoMo( sms , preProcessedTransaction ) {

    preProcessedTransaction.initialType = "Depot";
    preProcessedTransaction.flux = "Entrant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );
    preProcessedTransaction.senderName = getUserName ( senderUserNameKeywords , sms.body );
    preProcessedTransaction.senderPhoneNumber = getNumberFromKeyword ( senderPhoneNumberKeywords , sms.body )

    return preProcessedTransaction;
}