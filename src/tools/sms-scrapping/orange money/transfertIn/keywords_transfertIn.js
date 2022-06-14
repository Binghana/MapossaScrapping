/**
 * @type {string[]}
 */
 export const amountKeywords = [
    'Montant',
   //  'Montant de transaction',
   //  'Montant Transaction',
   //  'Montant de la transaction',
    'withdrawn',
    'retrait',
    'recu',
    'received',
    'transferred',
    'Transfert',
    'transaction',
    //'Une transaction de',
    'payment',
    'paiement'
];

/**
 * @type {string[]}
 */
 export const feeKeywords = [
    'frais',
    'fee paid',
    'fee was',
    'FRAIS',
    'Frais'
];

/**
 * @type {string[]}
 */
 export const balanceKeywords = [
    'Your new balance:',
    'Votre nouveau solde est de:',
    'Nouveau solde',
    'Nouveau solde est',
    'Votre nouveau solde',
    'Nouveau solde:',
    'Nouveau Solde:',
    'Nouveau Solde :',
    'Solde:',
];

/**
 * @type {string[]}
 */
 export const receiverPhoneNumberKeywords = [
    'vers'
];

/**
 * @type {string[]}
 */
 export const senderPhoneNumberKeywords = [
   'de'
];
/**
 * @type {string[]}
 */
 export const transactionIDKeywords = [
    'Financial Transaction Id:',
    'Transaction Id',
    'Transaction ID:',
    'No de transaction',
    'ID transaction :',
    'ID transaction:'
];

/**
 * @type {object[]}
 */
 export const receiverUserNameKeywords = [

    { start: "XAF", end: "to" },
    { start: "avec succes a", end: "(" },
    { start: "vers", end: "reussi" }

];

/**
 * @type {string[]}
 */
 export const senderUserNameKeywords = [

    { start: "XAF from", end: "(" },
    { start: "FCFA de", end: "(" },
    { start: "par", end: "to" },
    { start: "de", end: "vers" }
];