import {
  initTransaction,
  removeVoidOf,
  replaceModelWithpace,
  replacePointByPub,
  spliedDataInArray,
  replaceSpaceWithVoid,
  typeInitial,
  flux,
  decoupeSMS
} from '../utilities';

const model = [
  'Transfert de ',
  ' FCFA effectue avec succes a ',
  ' le ',
  '. FRAIS ',
  ' FCFA. Transaction Id: ',
  ' ; Reference: ',
  '. Nouveau solde est: ',
  ' FCFA',
];

function decoupeSMSTransfertMOMO(sms) {
  const transaction = initTransaction();
  transaction.typeInitial = typeInitial.transfert;
  transaction.flux = flux.sortant;

  return decoupeSMS(sms,transaction,setAttributeToTransaction,"MobileMoney",model)
}

function setAttributeToTransaction(transaction, goodGoodData) {
  transaction.soldeRestant =  parseFloat(goodGoodData[0]);
  transaction.reference = goodGoodData[1];
  transaction._idTransaction = goodGoodData[2];
  transaction.frais = parseFloat (goodGoodData[3] );
  transaction.heure = goodGoodData[4];
  transaction.date = goodGoodData[5];
  transaction.numero = goodGoodData[6];
  let i = 7;
  for (i; i < goodGoodData.length; i++) {
    console.log(i);
    const data = goodGoodData[i];
    console.log(data);
    console.log(parseInt(data));
    if (isNaN(parseInt(data))) {
      transaction.receiver['name' + (i - 6)] = data;
    } else {
      break;
    }
  }

  transaction.montant = goodGoodData[i++];
  return transaction;
}

const transfertSortantMOMO = {
  model: model,
  scrap: decoupeSMSTransfertMOMO,
};
export default transfertSortantMOMO;
