import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords , receiverUserNameKeywords , receiverPhoneNumberKeywords}  from "./keywords_transfertOut"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword , getUserName } from "../../functions";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
import { isGoodNumTelCameroon } from "../../../verification/RegExp";
/**
 * Transforme un sms identifé comme étant un transfert sortant de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */



 export function scrapTransfertOutMOMO( sms , preProcessedTransaction ) {

    preProcessedTransaction.initialType = "Transfert";
    preProcessedTransaction.flux = "Sortant";
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );

    preProcessedTransaction.receiverName = getUserName ( receiverUserNameKeywords , sms.body );
    preProcessedTransaction.receiverPhoneNumber = getNumberFromKeyword ( receiverPhoneNumberKeywords , sms.body );

    preProcessedTransaction.userPhoneNumber = (isGoodNumTelCameroon.test(preProcessedTransaction.senderPhoneNumber)) ? preProcessedTransaction.senderPhoneNumber : null;
    return preProcessedTransaction;
}