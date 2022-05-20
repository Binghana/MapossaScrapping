import retraitMOMO from "./retrait";
import transfertSortantMOMO from "./transfertSortant";
import transfertEntrantMOMO from "./transfertEntrant";
import depotMOMO from "./depot";
import paiemenCreditCommunicationMOMO from "./paiement/creditCommunication";
import paiemenCreditInternetMOMO from "./paiement/creditInternet";



const momo = {
    retrait : retraitMOMO,
    transfert : {
        sortant : transfertSortantMOMO,
        entrant : transfertEntrantMOMO
    },
    paiement : {
        creditInternet : paiemenCreditInternetMOMO,
        creditCommunication : paiemenCreditCommunicationMOMO,
        proffesionnel : null
    }
    ,
    depot : depotMOMO,
    address : "MobileMoney",
    label: "Mobile Money"
}

export default momo;