import {
  initTransaction,
  typeInitial,
  flux,
  decoupeSMS,
} from '../utilities';

const model = [
  'Vous avez recu ',
  ' FCFA de ',
  " sur votre compte Mobile Money ",
  ". Message de l'expediteur:",
  '. Votre nouveau solde est de: ',
  ' FCFA. Transaction Id:',
];

function decoupeSMSDepotMOMO(sms) {
  const transaction = initTransaction();
  transaction.typeInitial = typeInitial.depot;
  transaction.flux = flux.entrant;
  return decoupeSMS(sms,transaction,setAttributeToTransaction,"MobileMoney",model)
}

function setAttributeToTransaction(transaction, goodGoodData) {
  console.log("good good Data de depot MOMO")
  console.log(goodGoodData)
  transaction.soldeRestant =parseFloat (goodGoodData[0] );
  transaction.reference = goodGoodData[1];
  transaction._idTransaction = goodGoodData[3];
  transaction.heure = goodGoodData[4];
  transaction.date = goodGoodData[5];

  let i = 6;
  for (i; i < goodGoodData.length; i++) {
    const data = goodGoodData[i];

    if (isNaN(parseInt(data))) {
      transaction.emmeteur['name' + (i - 6)] = data;
    } else {
      break;
    }
  }

  transaction.montant = goodGoodData[i++];
  return transaction;
}

const depotMOMO = {
  model: model,
  scrap: decoupeSMSDepotMOMO,
};

export default depotMOMO;
