import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords }  from "../keywords"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword , getOrangeTransactionID , getUserName } from "../functions";
import { PreProcessedTransaction } from "../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un dépot d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

 export function scrapDepositOM( sms , preProcessedTransaction ) {

    preProcessedTransaction.initialType = "Depot";
    preProcessedTransaction.flux = "Entrant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getOrangeTransactionID ( transactionIDKeywords , sms.body );
    preProcessedTransaction.senderName = getUserName ( senderUserNameKeywords , sms.body );
    preProcessedTransaction.senderPhoneNumber = getNumberFromKeyword ( senderPhoneNumberKeywords , sms.body )

    preProcessedTransaction.amount_error = ( preProcessedTransaction.amount == -1);
    preProcessedTransaction.fees_error = (preProcessedTransaction.fees == -1);
    preProcessedTransaction.balance_error = (preProcessedTransaction.balance == -1);
    preProcessedTransaction.checkError();
    return preProcessedTransaction;
}