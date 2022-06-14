import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords, receiverPhoneNumberKeywords }  from "./keywords_transfertIn"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword ,  getUserName } from "../../functions";
import { isGoodNumtelOrangeCameroon } from "../../../verification/RegExp";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un transfert entrant d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */

 export function scrapTransfertInOM( sms , preProcessedTransaction ) {
    preProcessedTransaction.initialType = "Transfert"
    preProcessedTransaction.flux = "Entrant"
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );
    preProcessedTransaction.senderPhoneNumber = getNumberFromKeyword(senderPhoneNumberKeywords, sms.body);
    preProcessedTransaction.receiverPhoneNumber = getNumberFromKeyword(receiverPhoneNumberKeywords, sms.body)
    //preProcessedTransaction.senderName = getUserName ( senderUserNameKeywords , sms.body );
    //preProcessedTransaction.senderPhoneNumber = (isGoodNumtelOrangeCameroon.test(preProcessedTransaction.senderPhoneNumber)) ? preProcessedTransaction.senderPhoneNumber : null;
    //preProcessedTransaction.receiverName = getUserName ( receiverPhoneNumberKeywords , sms.body );
    //preProcessedTransaction.receiverPhoneNumber = (isGoodNumtelOrangeCameroon.test(preProcessedTransaction.receiverPhoneNumber)) ? preProcessedTransaction.receiverPhoneNumber : null;
    
    preProcessedTransaction.userPhoneNumber = preProcessedTransaction.receiverPhoneNumber;
    return preProcessedTransaction;
}