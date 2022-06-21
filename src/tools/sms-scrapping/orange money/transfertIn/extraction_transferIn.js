import {amountKeywords ,balanceKeywords,feeKeywords,receiverPhoneNumberKeywords,receiverUserNameKeywords,senderPhoneNumberKeywords,senderUserNameKeywords,transactionIDKeywords}  from "./keywords_transfertIn";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
import extract from "../../extraction";
/**
 * Transforme un sms identifé comme étant un transfert entrant d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */

 export function scrapTransfertInOM( sms , preProcessedTransaction ) {

    return extract(
        preProcessedTransaction,
        "Transfert",
        null,
        "Entrant",
        amountKeywords,
        feeKeywords,
        balanceKeywords,
        senderUserNameKeywords,
        senderPhoneNumberKeywords,
        receiverUserNameKeywords,
        receiverPhoneNumberKeywords,
        transactionIDKeywords,
        sms
    ) ;
}