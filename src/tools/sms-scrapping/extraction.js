import { getDateFromSMS, getHourFromSMS, getNumberFromKeyword, getUserName } from "./functions";
import { PreProcessedTransaction } from "./preProcessedTransactions";
import { SMS } from "./sms";

/**
 * 
 * @param {PreProcessedTransaction} pproT 
 * @param {string} initialType 
 * @param {string} finalType 
 * @param {string} flux 
 * @param {string[]} amountKeywords 
 * @param {string[]} feeKeywords 
 * @param {string[]} balanceKeywords 
 * @param {any[]} senderUserNameKeywords 
 * @param {string[]} senderPhoneNumberKeywords 
 * @param {any[]} receiverUserNameKeywords 
 * @param {string[]} receiverPhoneNumberKeywords,
 * @param {SMS} sms
 */




export default function extract ( 
    pproT,
    initialType,
    finalType,
    flux,
    amountKeywords,
    feeKeywords,
    balanceKeywords,
    senderUserNameKeywords,
    senderPhoneNumberKeywords,
    receiverUserNameKeywords,
    receiverPhoneNumberKeywords,
    transactionIDKeywords,
    sms
)



{
    pproT.finalType = finalType;
    pproT.initialType = initialType;
    pproT.flux = flux;
    pproT.amount = getNumberFromKeyword(amountKeywords , sms.body);


    pproT.fees = getNumberFromKeyword(feeKeywords , sms.body );
    pproT.date= getDateFromSMS(sms);
    pproT.hour = getHourFromSMS(sms)
   
    pproT.balance = getNumberFromKeyword( balanceKeywords , sms.body  );
    pproT.transactionID = getNumberFromKeyword ( transactionIDKeywords , sms.body );

    pproT.senderName = getUserName ( senderUserNameKeywords , sms.body );
    pproT.senderPhoneNumber = getNumberFromKeyword(senderPhoneNumberKeywords, sms.body)
    //pproT.senderPhoneNumber = (isGoodNumTelCameroon.test(pproT.senderPhoneNumber)) ? pproT.senderPhoneNumber : null;

    pproT.receiverName = getUserName ( receiverUserNameKeywords , sms.body );
    pproT.receiverPhoneNumber = getNumberFromKeyword(receiverPhoneNumberKeywords, sms.body)
    //pproT.receiverPhoneNumber = (isGoodNumTelCameroon.test(pproT.receiverPhoneNumber)) ? pproT.receiverPhoneNumber : null;
    // if (pproT.amount == -1) pproT.problem = true;
    // if (pproT.balance == -1) pproT.problem = true;
    // if (pproT.fees == -1) pproT.problem = true;
    
    pproT.problem = (pproT.amount == -1 || pproT.balance == -1 || pproT.fees == -1 );
    const phoneNumberWorry = (pproT.receiverPhoneNumber == -1 || pproT.senderPhoneNumber == -1);
    const nameWorry = ( !pproT.receiverName || !pproT.senderName);
    
    pproT.worry = ( phoneNumberWorry || nameWorry );
}