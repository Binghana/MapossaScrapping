import { amountKeywords, balanceKeywords, feeKeywords, receiverPhoneNumberKeywords, receiverUserNameKeywords, senderPhoneNumberKeywords, senderUserNameKeywords, transactionIDKeywords } from "./keywords_withdrawal"
import extract from "../../extraction";
import { PreProcessedTransaction } from "../../preProcessedTransactions";
/**
 * Transforme un sms identifé comme étant un retrait de Mobile Money
 * En une transaction prétraitée de Mapossa
 * @param {object} sms un object représentnt le sms que l'on souhaite transformer en transaction
 * @param {PreProcessedTransaction} preProcessedTransaction un object qui représente la transaction
 * de prétraitement en cours
 * @returns {object} une transaction prétraitées
 */

export function scrapWithdrawalMOMO(sms, preProcessedTransaction) {

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
    );
}