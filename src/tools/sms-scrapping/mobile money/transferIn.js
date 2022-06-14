import {amountKeywords ,feeKeywords,transactionIDKeywords , balanceKeywords , senderUserNameKeywords , senderPhoneNumberKeywords, receiverPhoneNumberKeywords, receiverUserNameKeywords }  from "../keywords"
import { getDateFromSMS ,getHourFromSMS ,  getNumberFromKeyword  , getUserName } from "../functions";
import { PreProcessedTransaction } from "../preProcessedTransactions";
import { SMS } from "../sms";
import { isGoodNumTelCameroon } from "../../verification/RegExp";


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
    console.log("Début de la fonction d'extraction momo in")
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
    console.log("Moitié de la fonction d'extraction momo in")
    console.log("hi")
    preProcessedTransaction.receiverName = getUserName ( receiverUserNameKeywords , sms.body );
    console.log("Endless de la fonction d'extraction momo in")
    preProcessedTransaction.receiverPhoneNumber = getNumberFromKeyword ( receiverPhoneNumberKeywords , sms.body );
    console.log("SubQuart de la fonction d'extraction momo in")
    preProcessedTransaction.userPhoneNumber = (isGoodNumTelCameroon.test(preProcessedTransaction.receiverPhoneNumber)) ? preProcessedTransaction.receiverPhoneNumber : null;
    console.log("Quart de la fonction d'extraction momo in")
    preProcessedTransaction.amount_error = ( preProcessedTransaction.amount == -1);
    preProcessedTransaction.fees_error = (preProcessedTransaction.fees == -1);
    preProcessedTransaction.balance_error = (preProcessedTransaction.balance == -1);

    preProcessedTransaction.checkError();
    console.log("Fin fin de la fonction d'extraction momo in")
    return preProcessedTransaction;
}