import momo from "./MOMO/momo";

export function removeParentheseOfNumber(numbreWithParantheses) {
  let numtelWithoutParenthese;
  numtelWithoutParenthese = numbreWithParantheses.replace("(", "");
  numtelWithoutParenthese = numtelWithoutParenthese.replace(")", "");
  return numtelWithoutParenthese;
}

export function removeVoidOf(cleanSplitedData = ['']) {
  let goodData = [];
  cleanSplitedData.forEach(data => {
    if (data.startsWith('(')) data = removeParentheseOfNumber(data);
    if (data) goodData.push(data);
  });
  return goodData;
}

export function replaceModelWithpace(sms, model) {
  let mergedData = sms;
  model.forEach(element => {
    if (sms.includes(element)) mergedData = mergedData.replace(element, ' ');
  });
  return mergedData;
}
export function replacePointByPub(mergedData, operateur) {

  if (operateur == momo.address) {
    mergedData = mergedData.replace('.', ' pub');
    
  }
  
  return mergedData;
}
export function spliedDataInArray(mergedDataWithPub) {
  let t = mergedDataWithPub.split(' ');
  removePub(t);

  return t;
}

export function replaceSpaceWithVoid(splitedData) {
  return splitedData.map(data => (data.length <= 1 ? '' : data));
}
export function removePub(cleanSplitedData) {
  let startPub = cleanSplitedData.indexOf('pub');
  cleanSplitedData.splice(startPub, cleanSplitedData.length - startPub);
}

export function initTransaction(typeInitial = "Retrait", flux = "", operateur = momo.address) {
  return {
    typeInitial: typeInitial,
    typeFinal: 'Revenu',
    operateur: operateur,
    frais: 0,
    soldeRestant: 0,
    _idTransaction: 0,
    heure: '',
    date: '',
    numero: "",
    retraitHandler: {},
    receiver: {},
    montant: 0,
    numTelRetrait: '',
    nomPersonne: '',
    prenomPersonne: '',
    autreNomPErsonne: '',
    emmeteur: {},
    commission: undefined,
    numEmetteur: undefined,
    numRecepteur: undefined,
    flux: flux,
    typeSecondaire: undefined
  };
}
export function decoupeSMS(
  sms,
  transaction,
  setAttributeToTransaction,
  operateur = 'MobileMoney',
  model
) {
  // const transaction = initTransaction();
  // transaction.typeInitial = "Transfert";
  // transaction.flux = "Sortant";
  if (typeof sms == 'string') {
    return cleanTransaction(
      setAttributeToTransaction(
        transaction,
        removeVoidOf(
          replaceSpaceWithVoid(
            spliedDataInArray(
              replacePointByPub(replaceModelWithpace(sms, model), operateur),
            ),
          ),
        ).reverse(),
      ),
    );
  } else {
    console.error('Le sms entré doit etre une chaine de caractère');
    return false;
  }
}

function cleanTransaction(transaction) {

  for (const attrinut in transaction) {
    if (Object.hasOwnProperty.call(transaction, attrinut)) {
      const element = transaction[attrinut];

      if (element == '') {

        delete transaction[attrinut];
      }
    }
  }
  return transaction;
} 
export const typeInitial = {
  retrait: "Retrait",
  transfert: "Transfert",
  depot: "Depot",
  paiement: "Paiement",
  transfertEntrant: "TransfertEntrant",
  transfertSortant: "TransfertSortant",
  frais: "Frais",
  typeSecondaire: {
    creditCommunication: "CreditCommunication",
    internet: "Internet",
    creditTelephonique: "CreditTelephonique"
  }
}
export const flux = {
  entrant: "Entrant",
  sortant: "Sortant"
}