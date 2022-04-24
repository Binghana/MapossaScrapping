import {
    initTransaction,
    decoupeSMS,
    typeInitial,
    flux
} from '../../utilities';

//const startString = "Paiement de FORFAIT INTERNET en succes  par ";

const model = [
    "Paiement de FORFAIT INTERNET en succes  par ",
    ".ID transaction: ",
    ", Montant: ",
    " FCFA.Nouveau solde: ",
    " FCFA."
]


function decoupeSMSPaiementCreditInternet(sms) {

    const transaction = initTransaction(typeInitial.paiement, flux.sortant, "OrangeMoney");
    transaction.typeSecondaire = typeInitial.typeSecondaire.internet;

    return decoupeSMS(sms, transaction, setAttributeToTransaction, "OrangeMoney", model)

}

function setAttributeToTransaction(transaction, goodGoodData) {
    console.log(goodGoodData);
    transaction._idTransaction = goodGoodData[2];
    //transaction.commission = goodGoodData[2];
    transaction.soldeRestant = goodGoodData[0];
    //transaction.frais = goodGoodData[3]
    transaction.montant = goodGoodData[1];

    return transaction;
}

const paiemenCreditInternetOM = {
    model: model,
    scrap: decoupeSMSPaiementCreditInternet
}

export default paiemenCreditInternetOM;