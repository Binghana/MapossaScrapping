import {
  initTransaction,
  decoupeSMS,
  typeInitial,
  flux
} from '../utilities';

const model = [
  "Transfert de ",
  " vers ",
  " reussi. ID transaction: ",
  ", Montant Transaction: ",
  " FCFA, Frais: ",
  ", Commission: ",
  ", Commission: 0 FCFA, Montant Net: ",
  " FCFA, Nouveau Solde: ",
  " FCFA"
];


function decoupeSMSTransfertSortantOM(sms) {
  const transaction = initTransaction(typeInitial.transfert, flux.sortant, "OrangeMoney");

  return decoupeSMS(sms, transaction, setAttributeToTransaction, 'OrangeMoney',model);
}

function setAttributeToTransaction(transaction, goodGoodData) {
  //console.info("Jee découpe le smsm de transfert sortant om")
  // console.log("Voivi good good data")
  // console.info(goodGoodData);
  transaction.soldeRestant = goodGoodData[0];
  transaction.frais = goodGoodData[5];
  //transaction.commission = goodGoodData[1];
  transaction.montant = goodGoodData[6];
  transaction._idTransaction = goodGoodData[7];

  let i = 8;
  for (i; i < goodGoodData.length; i++) {
    //console.log(i);
    const data = goodGoodData[i];
    // console.log(data);
    // console.log(parseInt(data));
    if (isNaN(parseInt(data))) {
      transaction.receiver['name' + (i - 8)] = data;
    } else {
      break;
    }
  }
  transaction.numRecepteur = goodGoodData[i++];
  let j = i - 1;
  for (i; i < goodGoodData.length; i++) {
    //console.log(i);
    const data = goodGoodData[i];
    // console.log(data);
    // console.log(parseInt(data));
    if (isNaN(parseInt(data))) {
      transaction.emmeteur['name' + (i - j)] = data;
    } else {
      break;
    }
  }
  transaction.numEmetteur = goodGoodData[i++];
  transaction.numero = transaction.numEmetteur;
  console.log(transaction)
  return transaction;
}

const transfertSortantOM = {
  model : model,
  scrap : decoupeSMSTransfertSortantOM
}

export default transfertSortantOM;