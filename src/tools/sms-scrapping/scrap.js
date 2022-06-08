import { operators } from "./operators";
import { SMS } from "./sms";
import { PreProcessedTransaction } from "./preProcessedTransactions"
import { matchModel } from "./models";
/**
 * 
 * @param {SMS[]} smsArray 
 */
export default function scrap(smsArray) {

    if (smsArray.length < 1) {

        console.log("L'utilisateur n'as pas de sms")
        return null;
    }

    console.log("on a " + smsArray.length.toString() + " sms , esseyons de scraper");

    /**
     * @type {PreProcessedTransaction[]}
     */
    const preProcessedTransactions = [];
    /**
     * @type {PreProcessedTransaction[]}
     */
    const unknownPreProcessedTransactions = [];

    for (const sms of smsArray) {

        // identification
        for (const operator of operators) {

            if (sms.address == operator.address) {

                //console.log(sms)
                let preProcessedTransaction = new PreProcessedTransaction(sms);
                //console.log("L'operateur est : " + operator.name)
                preProcessedTransaction.operator = operator.address;

                if (operator.serviceCenter.includes(sms.service_center)) {

                    for (const typeInitial in operator.typeInitial) {

                        if (Object.hasOwnProperty.call(operator.typeInitial, typeInitial)) {

                            // console.log("Voici le type initial hors de la boucled")
                            // console.log(typeInitial);

                            const typeInit = operator.typeInitial[typeInitial];
                            // console.log("voici le type Initila questionné");
                            // console.log(typeInit)

                            if (matchModel(typeInit.modelFR, sms.body) ||
                                (("modelEN" in typeInit) && matchModel(typeInit.modelEN, sms.body))) {
                                console.log("La transaction correspond au model : " + typeInitial)
                                console.log(typeInitial)
                                let t ;
                                    if(("modelEN" in typeInit) && matchModel(typeInit.modelEN, sms.body)) {
                                        try {
                                            t =  operator.scrap[typeInitial](sms, preProcessedTransaction)
                                        } catch (error) {
                                            console.log(error);
                                            console.log("Une erreur l'utilisation de la fonction de découpage avec le sms MOMO anglais")
                                        }
                                    }else {
                                        t = operator.scrap[typeInitial](sms, preProcessedTransaction)
                                    }
                                
                               

                                preProcessedTransactions.push(preProcessedTransaction)
                                //const t = operator.scrap[typeInit](sms)
                                // console.log("On a extrait les données de la transactions : ")
                                // console.log(t)

                            } else {
                                console.log("On a un souci de classification avec ce sms : ");
                                console.log(sms)

                                preProcessedTransaction.classification_error = true;
                                
                                console.log(preProcessedTransaction)
                                unknownPreProcessedTransactions.push(preProcessedTransaction);
                            }
                        }
                    }


                } else {
                    console.log("On a un soucis de vérification")
                    console.log("Voici le service de l'operateur " + operator.serviceCenter[0]);
                    console.log("Voici le service center du sms : " + sms.service_center);
                    preProcessedTransaction.hasError = true;
                    preProcessedTransaction.verification_error = true;
                    unknownPreProcessedTransactions.push(preProcessedTransaction);

                }
            }
        }

    }
    return {
        "preProcessedTransaction": preProcessedTransactions,
        "unknownPreProcessedTransactions": unknownPreProcessedTransactions
    };
}