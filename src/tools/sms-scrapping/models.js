export function matchModel(model, sms) {
    let match = true;
    if (model.length > 0) {
      model.map(pth => {
        match &= sms.includes(pth)
      });
    }
    return match;
  }
  
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
    ' to ',
    '. Informations detaillees: Montant de transaction : ',
    ' FCFA, ID transaction : ',
    ', Frais : ',
    'FCFA, Commission : ',
    ' FCFA, Montant Net du Credit : ',
    ' FCFA, Nouveau Solde : ',
    ' FCFA.',
];

export const modelOMRetrait = [
    "Retrait d'argent reussi par le ",
    ' avec le Code : ',
    '. Informations detaillees : Montant: ',
    ' FCFA, Frais: ',
    ' FCFA, No de transaction ',
    ', montant net debite ',
    ' FCFA, Nouveau solde: ',
    " FCFA."
];
export const modelOMTransfertEntrant = [
    'Transfert de ',
    ' vers ',
    ' reussi. Details: ID transaction: ',
    ', Montant Transaction: ',
    'FCFA, Frais: ',
    ' FCFA, Commission: ',
    ' FCFA, Montant Net: ',
    ' FCFA, Nouveau Solde: ',
    ' FCFA.',
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

export const modelOMPaiementCreditCommunication  = [
    "Rechargement reussi. Montant de la transaction : ",
    " FCFA, ID transaction : ",
    ", Frais : ",
    " FCFA, Commission : ",
    "   FCFA, Nouveau Solde : ",
    "FCFA Other msisdn ",
    "."
]

export const modelOMPaiementCreditInternet = [
    "Paiement de FORFAIT INTERNET en succes  par ",
    ".ID transaction: ",
    ", Montant: ",
    " FCFA.Nouveau solde: ",
    " FCFA."
]

