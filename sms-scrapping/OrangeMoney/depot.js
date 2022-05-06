import {initTransaction, decoupeSMS} from '../utilities';

const model = [
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

function decoupeSMSDepotOM(sms) {
  const transaction = initTransaction("Depot","Entrant","OrangeMoney");
  return decoupeSMS(sms, transaction, setAttributeToTransaction, 'OrangeMoney',model);
}

function setAttributeToTransaction(transaction, goodGoodData) {
  console.log("God good data de dépôt om")
  console.log(goodGoodData);
  transaction.soldeRestant = parseFloat(goodGoodData[0]);
  //transaction.reference = goodGoodData[1];
  //transaction.commission = goodGoodData[2];
  //transaction.frais = goodGoodData[3];
  transaction._idTransaction = goodGoodData[2];
  transaction.montant = parseFloat (goodGoodData[3] );

  let i = 4;
  for (i; i < goodGoodData.length; i++) {
    const data = goodGoodData[i];

    if (isNaN(parseInt(data))) {
      transaction.receiver['name' + (i - 4)] = data;
    } else {
      break;
    }
  }

  transaction.numEmetteur = goodGoodData[i++];

  let j = i;
  for (j; j < goodGoodData.length; j++) {
    const data = goodGoodData[j];

    if (isNaN(parseInt(data))) {
      transaction.emmeteur['name' + (j - i)] = data;
    } else {
      break;
    }
  }

  transaction.numRecepteur = goodGoodData[j++];

  return transaction;
}

const depotOM = {
  model: model,
  scrap: decoupeSMSDepotOM,
};

export default depotOM;
