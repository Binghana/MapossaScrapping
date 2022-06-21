import {amountKeywords ,balanceKeywords,feeKeywords,receiverPhoneNumberKeywords,receiverUserNameKeywords,senderPhoneNumberKeywords,senderUserNameKeywords,transactionIDKeywords}  from "./keywords_payment";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
import extract from "../../extraction";
/**
 * Transforme un sms identifé comme étant un Achat de crédit internet d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */

 export function scrapPaymentOM( sms , preProcessedTransaction ) {
    
    return extract(
        preProcessedTransaction,
        "Paiement",
        "Depense",
        "Sortant",
        amountKeywords,
        feeKeywords,
        balanceKeywords,
        senderUserNameKeywords,
        senderPhoneNumberKeywords,
        receiverUserNameKeywords,
        receiverPhoneNumberKeywords,
        transactionIDKeywords,
        sms
    );
}