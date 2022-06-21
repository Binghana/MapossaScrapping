/**
 * 
 * @param {string[]} model 
 * @param {string} smsBody 
 * @param {string} lang 
 * @param {string[][]} otherModels
 * @returns 
 */
export function matchModel(model, smsBody, otherModels = []) {

    let match = true;

    if (model.length > 0) {
        model.map(pth => {
            match &= smsBody.includes(pth)
        });
    } else {
        match = false;
    }
    // si il ya un d'autres models et que ç ane match ps    

    if (!match && otherModels.length > 0) {

        for (const otherModel of otherModels) {
            //const isCurrentModel = otherModel.includes("en succes");
            //if (isCurrentModel) console.warn(match);
            const result = testOtherModel(otherModel, smsBody);

            //if (isCurrentModel) console.error(match);
           
            if (result) {
                return result;
            }
        }

    }
    return match;
}
/**
 * 
 * @param {string[]} model 
 * @param {string} smsBody 
 * @param {string} lang 
 * @param {string[][]} otherModels
 * @returns 
 */
export function testOtherModel(model, smsBody) {
    let match = true;
    //const isCurrentModel = model.includes("en succes");
    // if (isCurrentModel) {
    //     console.log("IIIII -- Message -- IIIIIII")
    //     console.warn(smsBody)
    //     console.warn("on Teste ce modèle ;")
    //     console.log(model)
  
    // }
    if (model.length > 0) {
        model.map(pth => {
            match &= smsBody.includes(pth)
            // if (isCurrentModel) {
            //     console.log(pth);
            //     console.log(smsBody.includes(pth))
                
            // }   
            
        });

    } else {
        match = false;
    }
    
    return match
}
export const modelMOMORetraitEn = [
    "Withdrawn",
    "XAF",
    "Your new balance",
    "Financial Transaction Id:"
]
export const modelMOMODepositEn = [
    "You have received",
    "XAF",
    "Your new balance",
    "Financial Transaction Id"
]
export const modelMOMOTransfertEntrantEn = [
    "You have received",

]
export const modelMOMOTransfertSortantEn = [
    "You have transferred",

]
export const modelMOMOPaiementCreditCommunicationEn = [
    "MTNC AIRTIME",
    "Financial Transaction Id:",
    "Your new balance:",
    "payment of",
    "Fee was"
]
export const modelMOMOPaiementCreditInternetEn = [
    "MTNC BUNDLES_FORFAITS",
    "Fee was",
    "A transaction of",
    "Your new balance:",
    "Financial Transaction Id:"
]
export const modelMOMOPaiementCreditCommunication = [
    "Votre paiement de ",
    " FCFA pour MTNC AIRTIME a ete effectue le ",
    ". Votre nouveau solde: ",
    " FCFA. Frais: ",
    " FCFA, Message: ",
    ". Transaction Id: "
]

export const modelMOMOPaiementCreditInternet = [
    "Votre paiement de ",
    " FCFA pour MTNC Bundles a ete effectue le ",
    ". Votre nouveau solde: ",
    " FCFA. Frais: ",
    " FCFA, Message: ",
    ". Transaction Id: "
]
export const mdoelMOMOPaymentEN = [

]
export const modelMOMOPaymentTierces = [
    "transaction",
    "successfully completed",
    "Message from debit receiver",
    "balance",
    "Financial Transaction Id",
    "Transaction Id",
    "XAF"
]


export const modelMOMOPayment = [
    "Votre paiement",
    "ete effectue",
    "Transaction",
    "solde"
]
export const modelMOMOPaymentAchatCreditCommmunication_2 = [
    "Votre paiement de ",
    " FCFA pour MTNC AIRTIME a ete effectue le ",
    ". Votre nouveau solde: ",
    " FCFA. Frais: ",
    " FCFA, Message: ",
    ". Transaction Id: "
]
export const modelMOMOPaymentAchatCreditCommmunication_1 = [
    "Achat",
    "succes",
    "Transaction",
    "solde"
]
export const modelMOMOPaymentAchatCreditCommmunicationQuelqunAutre = [
    "Vous avez achete",
    "credit de communication",
    "Credit achete",
    "Balance",
    "TransactionID"
]
export const modelMOMOPaymentForfaitCreditCommunication = [
    "transaction",
    "effectuee avec succes",
    "solde",
    "External Transaction ID"
]
export const otherModelMOMOPayment = [
    modelMOMOPaymentAchatCreditCommmunication_1,
    modelMOMOPaymentAchatCreditCommmunicationQuelqunAutre,
    modelMOMOPaymentTierces,
    modelMOMOPaymentForfaitCreditCommunication
]

export const modelMOMODeposit = [
    'Vous avez recu ',
    ' FCFA de ',
    " sur votre compte Mobile Money ",
    ". Message de l'expediteur:",
    '. Votre nouveau solde est de: ',
    ' FCFA. Transaction Id:',
];
export const modelMOMORetrait = [
    'Vous, ',
    ' avez effectue avec succes le retrait de ',
    ' FCFA de votre compte mobile money, chez ',
    ' le ',
    '. Transaction Id: ',
    '. Votre nouveau solde est ',
    '. Frais ',
];

export const modelMOMOTransfertEntrant = [
    'Vous avez recu ',
    ' FCFA de ',
    ' le ',
    '. Transaction Id: ',
    '.Reference: ',
    '. Nouveau solde:',
    ' FCFA',
];

export const modelMOMOTransfertSortant = [
    'Transfert de ',
    ' FCFA effectue avec succes a ',
    ' le ',
    '. FRAIS ',
    ' FCFA. Transaction Id: ',
    ' ; Reference: ',
    '. Nouveau solde est: ',
    ' FCFA',
];

export const modelOMDepot = [
    'Depot effectue par ',
    '. Informations detaillees: Montant de transaction : ',
    ' FCFA, ID transaction : ',
    ', Frais : ',
    'FCFA, Commission : ',
    ' FCFA, Montant Net du Credit : ',
    ' FCFA, Nouveau Solde : ',
    ' FCFA.',
];

export const modelOMRetrait = [
    "Retrait d'argent",
    'Code',
    'Informations detaillees',
    'Frais',
    'FCFA',
    'montant',
    'Nouveau solde: ',
    "FCFA"
];
export const modelOMTransfertEntrant = [
    'Transfert de ',
    'vers',
    'Details',
    'Montant Transaction: ',
    'Frais: ',
    'Commission: ',
];
export const modelOMTransfertSortant = [
    "Transfert de ",
    " vers ",
    " reussi. ID transaction: ",
    ", Montant Transaction: ",
    " FCFA, Frais: ",
    ", Commission: ",
    "FCFA, Montant Net: ",
    " FCFA, Nouveau Solde: ",
    " FCFA"
];

export const modelOMPaiementCreditCommunication = [
    "Rechargement reussi. Montant de la transaction : ",
    " FCFA, ID transaction : ",
    ", Frais : ",
    " FCFA, Commission : ",
    "   FCFA, Nouveau Solde : ",
    "FCFA Other msisdn ",
    "."
]
export const modelOMPaymentToCompany = [
    "Paiement",
    "reussi par",
    "transaction",
    "Montant",
    "Solde"
]
export const modelOMPaymentCreditInternet2 = [
    "Paiement",
    "en succes",
    "transaction",
    "Montant",
    "solde"
]
export const otherModelOMPayment = [
    //modelOMPaymentToCompany,
    modelOMPaiementCreditCommunication,
    modelOMPaymentCreditInternet2
    //modelOMPaiementCreditInternet
]
// export const modelOMPaiementCreditInternet = [
//     "Paiement de FORFAIT INTERNET en succes  par ",
//     ".ID transaction: ",
//     ", Montant: ",
//     " FCFA.Nouveau solde: ",
//     " FCFA."
// ]
export const modelOMPayment = [
    "Paiement",
    "reussi par",
    "transaction",
    "Montant",
    "Solde"
]
/**
 * Model qui nous permet de dire un sms est imperativement une
 * Transaction
 */
export const modelImperative = [
    "Montant",
    "XAF",
    "CFA",
    "Transaction",
    "transaction",
    "balance",
    "solde",
]

/**
 * 
 * @param {string} smsBody 
 */
export function matchImerativeModel(smsBody) {

    if (modelImperative.length > 0) {

        for (const keyword of modelImperative) {

            if (smsBody.includes(keyword)) {
                return true;
            }
        }
    }
    return false;
}