import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords, receiverPhoneNumberKeywords, receiverUserNameKeywords }  from "./keywords_transfertIn"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword  , getUserName } from "../../functions";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
import { SMS } from "../sms";
import { isGoodNumTelCameroon } from "../../../verification/RegExp";


/**
 * 
 * Transforme un sms identifé comme étant un transfert entrant de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {SMS} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */

 export function scrapTransfertInMOMO( sms , preProcessedTransaction ) {

    preProcessedTransaction.initialType = "Transfert"
    preProcessedTransaction.flux = "Entrant"
    preProcessedTransaction.amount = getNumberFromKeyword(amountKeywords , sms.body);
    preProcessedTransaction.fees = getNumberFromKeyword(feeKeywords , sms.body );
    preProcessedTransaction.date= getDateFromSMS(sms);
    preProcessedTransaction.hour = getHourFromSMS(sms)
   
    preProcessedTransaction.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    preProcessedTransaction.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );
    preProcessedTransaction.senderName = getUserName ( senderUserNameKeywords , sms.body );
    preProcessedTransaction.senderPhoneNumber = getNumberFromKeyword ( senderPhoneNumberKeywords , sms.body )

    preProcessedTransaction.receiverName = getUserName ( receiverUserNameKeywords , sms.body );

    preProcessedTransaction.receiverPhoneNumber = getNumberFromKeyword ( receiverPhoneNumberKeywords , sms.body );

    preProcessedTransaction.userPhoneNumber = (isGoodNumTelCameroon.test(preProcessedTransaction.receiverPhoneNumber)) ? preProcessedTransaction.receiverPhoneNumber : null;

    return preProcessedTransaction;
}