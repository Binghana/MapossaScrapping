import { amountKeywords, balanceKeywords, feeKeywords, receiverPhoneNumberKeywords, receiverUserNameKeywords, senderPhoneNumberKeywords, senderUserNameKeywords, transactionIDKeywords } from "./keywords_transfertOut"

import { PreProcessedTransaction } from "../../preProcessedTransactions";
import extract from "../../extraction";
/**
 * Transforme un sms identifé comme étant un transfert sortant de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitée
 */



export function scrapTransfertOutMOMO(sms, preProcessedTransaction) {

    return extract(
        preProcessedTransaction,
        "Transfert",
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
    );
}