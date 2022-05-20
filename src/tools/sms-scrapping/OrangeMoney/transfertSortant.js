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
  "FCFA, Montant Net: ",
  " FCFA, Nouveau Solde: ",
  " FCFA"
];


function decoupeSMSTransfertSortantOM(sms) {
  const transaction = initTransaction(typeInitial.transfert, flux.sortant, "OrangeMoney");

  return decoupeSMS(sms, transaction, setAttributeToTransaction, 'OrangeMoney',model);
}

function setAttributeToTransaction(transaction, goodGoodData) {
  console.info("Je découpe le sms de transfert sortant om")
  console.info(goodGoodData);
  transaction.soldeRestant = parseFloat (goodGoodData[0]);
  let i = 5;
  if ( isNaN(goodGoodData[6] )) i--;
  transaction.frais = parseFloat( goodGoodData[i++] );
  //transaction.commission = goodGoodData[1];

  transaction.montant = parseFloat (goodGoodData[i++] );
  transaction._idTransaction = goodGoodData[i++];

  
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