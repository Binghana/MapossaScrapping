import {
    initTransaction,
    decoupeSMS,
    typeInitial,
    flux
} from '../../utilities';

const startString = "Votre paiement de ";

const model = [
    "Votre paiement de ",
    " FCFA pour MTNC AIRTIME a ete effectue le ",
    ". Votre nouveau solde: ",
    " FCFA. Frais: ",
    " FCFA, Message: ",
    ". Transaction Id: "
]

function decoupeSMSPaiementCreditCommunication( sms ) {

    const transaction = initTransaction( typeInitial.paiement, flux.sortant);
    transaction.typeSecondaire = typeInitial.typeSecondaire.creditCommunication
    return decoupeSMS(sms,transaction,setAttributeToTransaction,"MobileMoney",model);
    
}

function setAttributeToTransaction(transaction, goodGoodData) {


    let i =-1
    transaction._idTransaction = goodGoodData[i++];
    console.log(goodGoodData)
    if (goodGoodData.length == 6 ) {
        transaction.frais = goodGoodData[i++];
    } 
    transaction.soldeRestant = goodGoodData[i++];
    console.log(i++)
    transaction.heure = goodGoodData[i++];
    transaction.date = goodGoodData[i++];
    transaction.montant = goodGoodData[i++];

    return transaction;
}

const paiemenCreditCommunicationMOMO = {
    model : model,
    scrap : decoupeSMSPaiementCreditCommunication
}

export default paiemenCreditCommunicationMOMO;