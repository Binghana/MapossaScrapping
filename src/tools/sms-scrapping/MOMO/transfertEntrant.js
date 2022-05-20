import {
  initTransaction,
  removeVoidOf,
  replaceModelWithpace,
  replacePointByPub,
  spliedDataInArray,
  replaceSpaceWithVoid,
  typeInitial,
  flux,
} from '../utilities';

const model = [
  'Vous avez recu ',
  ' FCFA de ',
  ' le ',
  '. Transaction Id: ',
  '.Reference: ',
  '. Nouveau solde:',
  ' FCFA',
];

function decoupeSMSTransfertEntrantMOMO(sms) {
  const transaction = initTransaction();
  transaction.typeInitial = typeInitial.transfert;
  transaction.flux = flux.entrant;
  if (typeof sms == 'string') {
    return setAttributeToTransaction(
      transaction,
      removeVoidOf(
        replaceSpaceWithVoid(
          spliedDataInArray(
            replacePointByPub(replaceModelWithpace(sms, model)),
          ),
        ),
      ).reverse(),
    );
  } else {
    console.error('Le sms entré doit etre une chaine de caractère');
    return false;
  }
}

function setAttributeToTransaction(transaction, goodGoodData) {
  transaction.soldeRestant = parseFloat (goodGoodData[0] );
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

const transfertEntrantMOMO = {
    model : model,
    scrap : decoupeSMSTransfertEntrantMOMO
}

export default transfertEntrantMOMO;