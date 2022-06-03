import { operators } from "./operators";
import { SMS } from "./sms";
import {PreProcessedTransaction} from "./preProcessedTransactions"
import { matchModel } from "./models";
/**
 * 
 * @param {SMS[]} smsArray 
 */
 export default function scrap ( smsArray ) {

    if (smsArray.length < 1) {

        console.log("L'utilisateur n'as pas de sms")
        return null;
    }

    console.log("on a " + smsArray.length.toString() + " sms , esseyons de scraper");
    
    /**
     * @type {PreProcessedTransaction[]}
     */
    const preProcessedTransactions = [];

    for (const sms of smsArray) {
        
        // identification
        for (const operator of operators) {
            
            if ( sms.address == operator.address ) {

                let preProcessedTransaction = new PreProcessedTransaction(sms);

                if ( operator.serviceCenter.includes(sms.service_center) ) {

                    for (const typeInitial in operator.typeInitial) {
                        if (Object.hasOwnProperty.call(operator, typeInitial)) {
                            const typeInit = operator[typeInitial];
                           
                            if ( matchModel( typeInit.modelFR ,sms.body) || 
                            ( ("modelEN" in typeInit) && matchModel(typeInitial.modelEN , sms.body) ) )
                            {
                                console.log("La transaction correspond au model : " + typeInitial)
                                const t = operator.scrap[typeInit](sms)
                                console.log("On a extrait les données de la transactions : ")
                                console.log(t)
                                break;   
                            }
                        }
                    }
                    

                }else {
                   console.log("On a un soucis de classification")
                    preProcessedTransaction.verification_error = true;

                }
            }
        }

    }
}