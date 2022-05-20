import {
    initTransaction,
    decoupeSMS,
    typeInitial,
    flux
} from '../../utilities';

const startString = "Rechargement reussi. Montant de la transaction : ";

const model = [
    "Rechargement reussi. Montant de la transaction : ",
    " FCFA, ID transaction : ",
    ", Frais : ",
    " FCFA, Commission : ",
    "   FCFA, Nouveau Solde : ",
    "FCFA Other msisdn ",
    "."
]


function decoupeSMSPaiementCreditCommunication(sms) {

    const transaction = initTransaction(typeInitial.paiement, flux.sortant, "OrangeMoney");
    transaction.typeSecondaire = typeInitial.typeSecondaire.creditCommunication;

    return decoupeSMS(sms, transaction, setAttributeToTransaction, "OrangeMoney", model)

}

function setAttributeToTransaction(transaction, goodGoodData) {

    console.log(goodGoodData);
    transaction._idTransaction = goodGoodData[1] + "" + goodGoodData[2];
    //.commission = goodGoodData[2];
    transaction.soldeRestant = parseFloat (goodGoodData[0] );
    //transaction.frais = goodGoodData[3]
    transaction.montant = parseFloat (goodGoodData[3]);

    return transaction;
}

const paiemenCreditCommunicationOM = {
    model: model,
    scrap: decoupeSMSPaiementCreditCommunication
}

export default paiemenCreditCommunicationOM;