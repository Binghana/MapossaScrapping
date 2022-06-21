import {amountKeywords ,balanceKeywords,feeKeywords,receiverPhoneNumberKeywords,receiverUserNameKeywords,senderPhoneNumberKeywords,senderUserNameKeywords,transactionIDKeywords}  from "./keywords_withdrawal";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
import extract from "../../extraction";
/**
 * Transforme un sms identifé comme étant un retrait d'Orange Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

 export function scrapWithdrawalOM( sms , preProcessedTransaction ) {

    return extract(
        preProcessedTransaction,
        "Retrait",
        null,
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
    ) ;
}