

import depotOM from "./depot";
import retraitOM from "./retrait";

import paiemenCreditCommunicationOM from "./paiement/creditCommunication";
import paiemenCreditInternetOM from "./paiement/creditInternet";
import transfertEntrantOM from "./transfertEntrant";
import transfertSortantOM from "./transfertSortant";

const om = {
    transfert : {
        entrant : transfertEntrantOM,
        sortant : transfertSortantOM
    },
    paiement :  {
        creditInternet : paiemenCreditInternetOM,
        creditCommunication : paiemenCreditCommunicationOM
    },
    retrait : retraitOM,
    depot : depotOM,
    address : "OrangeMoney",
    label : "Orange Money"
}

export default om;