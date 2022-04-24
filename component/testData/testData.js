import smsDepotOM from "./OM/smsDepot"
import smsRetraitOM from "./OM/smsRetrait"


import smsDepotMOMO from "./MOMO/smsDepot"
import smsRetraitMOMO from "./MOMO/smsRetrait"
import smsTransfertEntrantMOMO from "./MOMO/smsTransfertEntrant"
import smsTransfertSortantMOMO from "./MOMO/smsTransportSortant"
import smsPaiementCreditInternet from "./MOMO/smsPaiementCreditInternet"
import smsPaiementCreditCommunication from "./MOMO/smsPaiementCreditCommunication"

import transactionDecoupee from "./transactionsDecoupees"
import smsPaiementCreditInternetOM from "./OM/smsPaiementCreditInternet"
import smsPaiementCreditCommunicationOM from "./OM/smsPaiementCreditCommunication"
import smsTransfertEntrantOM from "./OM/smsTransportEntrant"
import smsTransfertSortantOM from "./OM/smsTransfertSortant"


const testData = {
    sms : {
        om : {
            depot : smsDepotOM,
            retrait : smsRetraitOM,
            transfertEntrant : smsTransfertEntrantOM,
            transfertSortant : smsTransfertSortantOM,
            paiementCreditInternet : smsPaiementCreditInternetOM,
            paiementCreditCommunication : smsPaiementCreditCommunicationOM
        },
        momo : {
            depot : smsDepotMOMO,
            retrait : smsRetraitMOMO,
            transfertEntrant : smsTransfertEntrantMOMO,
            transfertSortant: smsTransfertSortantMOMO,
            paiementCreditInternet: smsPaiementCreditInternet,
            paiementCreditCommunication : smsPaiementCreditCommunication
        }
    },
    transactionDecoupee : transactionDecoupee,
    
}

function getTestSMSList () {
    let smsList = []
    smsList = smsList.concat(testData.sms.om.depot);
    smsList = smsList.concat(testData.sms.om.retrait);
    smsList = smsList.concat(testData.sms.om.transfertSortant);
    smsList = smsList.concat(testData.sms.om.transfertEntrant)
    smsList = smsList.concat(testData.sms.momo.depot); // --
    smsList = smsList.concat(testData.sms.momo.retrait);
    smsList = smsList.concat(testData.sms.momo.transfertEntrant);
    smsList = smsList.concat(testData.sms.momo.transfertSortant);
    smsList = smsList.concat(testData.sms.momo.paiementCreditCommunication);
    smsList = smsList.concat(testData.sms.momo.paiementCreditInternet);
    smsList = smsList.concat(testData.sms.om.paiementCreditCommunication);
    smsList = smsList.concat(testData.sms.om.paiementCreditInternet);

    return smsList;
}

export default getTestSMSList;