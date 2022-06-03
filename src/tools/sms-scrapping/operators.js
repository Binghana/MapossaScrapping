import { scrapInternetCreditMOMO } from "./mobile money/internetCredit";
import { scrapTransfertInMOMO } from "./mobile money/transferIn";
import { scrapTransfertOutMOMO } from "./mobile money/transferOut";
import { scrapWithdrawalMOMO } from "./mobile money/withdrawal";
import { modelMOMODeposit, modelMOMOPaiementCreditCommunication, modelMOMOPaiementCreditInternet, modelMOMORetrait, modelMOMOTransfertEntrant, modelMOMOTransfertSortant, modelOMDepot, modelOMPaiementCreditCommunication, modelOMPaiementCreditInternet, modelOMRetrait, modelOMTransfertEntrant, modelOMTransfertSortant } from "./models";
import { scrapCommunicationCreditOM } from "./orange money/communicationCredit";
import { scrapInternetCreditOM } from "./orange money/internetCredit";
import { scrapTransfertInOM } from "./orange money/transferIn";
import { scrapTransfertOutOM } from "./orange money/transferOut";
import { scrapWithdrawalOM } from "./orange money/withdrawal";

export const operators = [

    {
        name : "Orange Money",
        address: "OrangeMoney",
        serviceCenter: ["+23769990009"],
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

        }
    },

    {
        name : "Mobile Money",
        address: "MobileMoney",
        serviceCenter: ["+23767770077"],
        typeInitial : {
            retrait:{
                modelFR : modelMOMORetrait ,
            },
            transfertEntrant : {
                modelFR : modelMOMOTransfertEntrant,
            },
            transfertSortant : {
                modelFR : modelMOMOTransfertSortant,
            },
            depot : {
                modelFR : modelMOMODeposit,
            },
            paiementCreditInternet : {
                modelFR : modelMOMOPaiementCreditInternet,
            },
            paiementCreditCommunication : {
                modelFR : modelMOMOPaiementCreditCommunication,
            }
        },
        scrap : {
            retrait : scrapWithdrawalMOMO ,
            transfertEntrant : scrapTransfertInMOMO,
            transfertSortant : scrapTransfertOutMOMO,
            depot : scrapWithdrawalMOMO,
            paiementCreditInternet : scrapInternetCreditMOMO,
            paiementCreditCommunication : scrapInternetCreditMOMO,

        }
    }
]
