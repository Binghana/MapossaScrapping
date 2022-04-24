import {
  initTransaction,
  typeInitial,
  flux,
  decoupeSMS,
} from '../utilities';

const model = [
  "Retrait d'argent reussi par le ",
  ' avec le Code : ',
  '. Informations detaillees : Montant: ',
  ' FCFA, Frais: ',
  ' FCFA, No de transaction ',
  ', montant net debite ',
  ' FCFA, Nouveau solde: ',
  " FCFA."
];

function decoupeSMSRetraitMOMO(sms) {
  const transaction = initTransaction(typeInitial.retrait   ,flux.sortant, "OrangeMoney");
    
  return decoupeSMS(sms,transaction,setAttributeToTransaction,"OrangeMoney",model)
}

function setAttributeToTransaction(transaction, goodGoodData) {
  transaction.soldeRestant = goodGoodData[0];
  //transaction.soldeRestant = goodGoodData[1];
  transaction._idTransaction = goodGoodData[2];
  transaction.frais = goodGoodData[3];
  transaction.montant = goodGoodData[4];
  transaction.numRetrait = goodGoodData[5];
  transaction.numero = transaction.numRetrait;
  return transaction;
}

const retraitOM = {
  model : model,
  scrap : decoupeSMSRetraitMOMO
}

export default retraitOM; 