
import {initTransaction, decoupeSMS, typeInitial, flux} from '../utilities';


const model = [
  'Transfert de ',
  ' vers ',
  ' reussi. Details: ID transaction: ',
  ', Montant Transaction: ',
  'FCFA, Frais: ',
  ' FCFA, Commission: ',
  ' FCFA, Montant Net: ',
  ' FCFA, Nouveau Solde: ',
  ' FCFA.',
];

function decoupeSMSTransfertEntrantMOMO(sms){
    const transaction = initTransaction(typeInitial.transfert, flux.entrant, "OrangeMoney");
    return decoupeSMS(sms, transaction, setAttributeToTransaction, 'OrangeMoney',model);
}
function setAttributeToTransaction(transaction, goodGoodData) {

  transaction.soldeRestant = parseFloat (goodGoodData[0] );
  //.reference = goodGoodData[1];
  transaction._idTransaction = goodGoodData[3];
  transaction.montant = parseFloat(goodGoodData[2]) ;
  transaction.numero = goodGoodData[6]
  //.frais= goodGoodData[3];
  //transaction.heure = goodGoodData[4];
  //transaction.date = goodGoodData[5];
 
  let i = 4;
  for (i; i < goodGoodData.length; i++) {
    console.log(i);
    const data = goodGoodData[i];
    console.log(data)
    console.log(parseInt(data));
    if (isNaN(parseInt(data))) {
      transaction.receiver["name" + (i - 6)] = data;
    } else {
      break;
    }
  }

  
  return transaction;
}

const transfertEntrantOM = {
  model : model,
  scrap : decoupeSMSTransfertEntrantMOMO
}

export default transfertEntrantOM;