import { scrapInternetCreditMOMO } from "./mobile money/internetCredit/extraction_internetCredit";
import { scrapTransfertInMOMO } from "./mobile money/transfertIn/extraction_transfertIn";
import { scrapTransfertOutMOMO } from "./mobile money/transfertOut/extraction_transferOut";
import { scrapWithdrawalMOMO } from "./mobile money/withdrawal/extraction_withdrawal";
import { modelMOMODeposit, modelMOMODepositEn, modelMOMOPaiementCreditCommunication, modelMOMOPaiementCreditCommunicationEn, modelMOMOPaiementCreditInternet, modelMOMOPaiementCreditInternetEn, modelMOMORetrait, modelMOMORetraitEn, modelMOMOTransfertEntrant, modelMOMOTransfertEntrantEn, modelMOMOTransfertSortant, modelMOMOTransfertSortantEn, modelOMDepot, modelOMPaiementCreditCommunication, modelOMPaiementCreditInternet, modelOMRetrait, modelOMTransfertEntrant, modelOMTransfertSortant } from "./models";
import { scrapCommunicationCreditOM } from "./orange money/communicationCredit/extraction_communicationCredit";
import { scrapInternetCreditOM } from "./orange money/internetCredit/extraction_internetCredit";
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
            paiementCreditInternet : {
                modelFR : modelOMPaiementCreditInternet
            },
            paiementCreditCommunication : {
                modelFR : modelOMPaiementCreditCommunication
            }
        },
        scrap : {
            retrait : scrapWithdrawalOM,
            transfertEntrant : scrapTransfertInOM,
            transfertSortant : scrapTransfertOutOM,
            depot : scrapWithdrawalOM,
            paiementCreditInternet : scrapInternetCreditOM,
            paiementCreditCommunication : scrapCommunicationCreditOM,

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
            paiementCreditInternet : {
                modelFR : modelMOMOPaiementCreditInternet,
                modelEN : modelMOMOPaiementCreditInternetEn
            },
            paiementCreditCommunication : {
                modelFR : modelMOMOPaiementCreditCommunication,
                modelEN : modelMOMOPaiementCreditCommunicationEn
            }
        },
        scrap : {
            retrait : scrapWithdrawalMOMO ,
            transfertEntrant : scrapTransfertInMOMO,
            transfertSortant : scrapTransfertOutMOMO,
            depot : scrapWithdrawalMOMO,
            paiementCreditInternet : scrapInternetCreditMOMO,
            paiementCreditCommunication : scrapInternetCreditMOMO,

        },
        id : undefined
    }
]
