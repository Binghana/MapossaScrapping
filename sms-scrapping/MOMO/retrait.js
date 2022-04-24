import {
  initTransaction,
  decoupeSMS,
} from '../utilities';

const model = [
  'Vous, ',
  ' avez effectue avec succes le retrait de ',
  ' FCFA de votre compte mobile money, chez ',
  ' le ',
  '. Transaction Id: ',
  '. Votre nouveau solde est ',
  '. Frais ',
];

function decoupeSMSRetraitMOMO(sms) {
  const transaction = initTransaction();

  return decoupeSMS(sms,transaction,setAttributeToTransaction,"MobileMoney",model)
}

function setAttributeToTransaction(transaction, goodGoodData) {
  transaction.frais = goodGoodData[0];
  transaction.soldeRestant = goodGoodData[1];
  transaction._idTransaction = goodGoodData[2];
  transaction.heure = goodGoodData[3];
  transaction.date = goodGoodData[4];
  let i = 5;
  for (i; i < goodGoodData.length; i++) {
    console.log(i);
    const data = goodGoodData[i];
    console.log(parseInt(data));
    if (isNaN(parseInt(data))) {
      transaction.retraitHandler['name' + (i - 4)] = data;
    } else {
      break;
    }
  }

  transaction.montant = goodGoodData[i++];
  transaction.numTelRetrait = goodGoodData[i++];
  transaction.numero = transaction.numTelRetrait;
  transaction.nomPersonne = goodGoodData[i++];
  transaction.prenomPersonne = goodGoodData[i++];
  if (transaction.length >= i++) {
    transaction.autreNomPErsonne = goodData[i];
  }
  console.log("voici la transaction")
  console.log(transaction)
  return transaction;
}

const retraitMOMO = {
  model: model,
  scrap: decoupeSMSRetraitMOMO,
};
export default retraitMOMO;
