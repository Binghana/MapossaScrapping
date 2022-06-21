
import { scrapPaymentMOMO } from "./mobile money/payment/extraction_payment.js";
import { scrapTransfertInMOMO } from "./mobile money/transfertIn/extraction_transfertIn";
import { scrapTransfertOutMOMO } from "./mobile money/transfertOut/extraction_transferOut";
import { scrapWithdrawalMOMO } from "./mobile money/withdrawal/extraction_withdrawal";
import { modelMOMODeposit, modelMOMODepositEn , modelMOMOPayment, modelMOMORetrait, modelMOMORetraitEn, modelMOMOTransfertEntrant, modelMOMOTransfertEntrantEn, modelMOMOTransfertSortant, modelMOMOTransfertSortantEn, modelOMDepot, modelOMPaiementCreditCommunication, modelOMPaiementCreditInternet, modelOMPayment, modelOMRetrait, modelOMTransfertEntrant, modelOMTransfertSortant, otherModelMOMOPayment, otherModelOMPayment } from "./models";
import { scrapPaymentOM } from "./orange money/payment/extraction_payment";

import { scrapTransfertInOM } from "./orange money/transfertIn/extraction_transferIn";
import { scrapTransfertOutOM } from "./orange money/transfertOut/extraction_transferOut";
import { scrapWithdrawalOM } from "./orange money/withdrawal/extraction_withdrawal";

export const operators = [

    {
        name : "Orange Money",
        address: "OrangeMoney",
        serviceCenter: ["+23769990009","+237694000040","+237694000018"],
        typeInitial : {
            retrait:{
                modelFR : modelOMRetrait,
            },
            transfertEntrant : {
                modelFR : modelOMTransfertEntrant
            },
            transfertSortant : {
                modelFR : modelOMTransfertSortant
            },
            depot : {
                modelFR : modelOMDepot
            },
            payment : {
                modelFR : modelOMPayment,
                otherModels : otherModelOMPayment
            },
            // paiementCreditCommunication : {
            //     modelFR : modelOMPaiementCreditCommunication
            // }
        },
        scrap : {
            retrait : scrapWithdrawalOM,
            transfertEntrant : scrapTransfertInOM,
            transfertSortant : scrapTransfertOutOM,
            depot : scrapWithdrawalOM,
            payment : scrapPaymentOM
            // paiementCreditInternet : scrapInternetCreditOM,
            // paiementCreditCommunication : scrapCommunicationCreditOM,

        },
        id : undefined
    },

    {
        name : "Mobile Money",
        address: "MobileMoney",
        serviceCenter: ["+23767770077","+237671780094","+237679000001"],
        typeInitial : {
            retrait:{
                modelFR : modelMOMORetrait ,
                modelEN : modelMOMORetraitEn
            },
            transfertEntrant : {
                modelFR : modelMOMOTransfertEntrant,
                modelEN : modelMOMOTransfertEntrantEn
            },
            transfertSortant : {
                modelFR : modelMOMOTransfertSortant,
                modelEN : modelMOMOTransfertSortantEn
            },
            depot : {
                modelFR : modelMOMODeposit,
                modelEN : modelMOMODepositEn
            },
            payment : {
                modelFR : modelMOMOPayment,
                otherModels : otherModelMOMOPayment
            },
            // paiementCreditInternet : {
            //     modelFR : modelMOMOPaiementCreditInternet,
            //     modelEN : modelMOMOPaiementCreditInternetEn
            // },
            // paiementCreditCommunication : {
            //     modelFR : modelMOMOPaiementCreditCommunication,
            //     modelEN : modelMOMOPaiementCreditCommunicationEn
            // }
        },
        scrap : {
            retrait : scrapWithdrawalMOMO ,
            transfertEntrant : scrapTransfertInMOMO,
            transfertSortant : scrapTransfertOutMOMO,
            depot : scrapWithdrawalMOMO,
            payment : scrapPaymentMOMO
            // paiementCreditInternet : scrapInternetCreditMOMO,
            // paiementCreditCommunication : scrapInternetCreditMOMO,

        },
        id : undefined
    }
]
