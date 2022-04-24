import {
    initTransaction,
    decoupeSMS,
    typeInitial,
    flux
} from '../../utilities';

const startString = "Votre paiement de ";

const model = [
    "Votre paiement de ",
    " FCFA pour MTNC Bundles a ete effectue le ",
    ". Votre nouveau solde: ",
    " FCFA. Frais: ",
    " FCFA, Message: ",
    ". Transaction Id: "
]


function decoupeSMSPaiementCreditInternet(sms) {

    const transaction = initTransaction(typeInitial.paiement, flux.sortant);
    transaction.typeSecondaire = typeInitial.typeSecondaire.internet;

    return decoupeSMS(sms, transaction, setAttributeToTransaction, "MobileMoney", model)

}

function setAttributeToTransaction(transaction, goodGoodData) {
    transaction._idTransaction = goodGoodData[0];
    transaction.commission = goodGoodData[1];
    transaction.soldeRestant = goodGoodData[2];
    transaction.heure = goodGoodData[3];
    transaction.date = goodGoodData[4];
    transaction.montant = goodGoodData[5];

    return transaction;
}

const paiemenCreditInternetMOMO = {
    model: model,
    scrap: decoupeSMSPaiementCreditInternet
}

export default paiemenCreditInternetMOMO;