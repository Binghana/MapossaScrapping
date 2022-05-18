import momo from '../../sms-scrapping/MOMO/momo';
import om from '../../sms-scrapping/OrangeMoney/om';
// import storage from '../../storage';
import smsDataBase from '../APIRequest/SMS';
import ScrappingError from '../ScrappingError';

/**
 * découpe les différents sms de l'utilisateur et les transforme en transaction selon le cas
 * @param {Array} tabSMS un tableau contenant tous les sms de l'utilisateur
 */
export async function scrap(tabSMS = [])  {
  
  try {
    const transactions = {
      momo : {
        retrait : [],
        transfertEntrant : [],
        transfertSortant : [],
        depot : [],
        creditCommunication : [],
        creditInternet : []
      },
      om :  {
        retrait : [],
        transfertEntrant : [],
        transfertSortant : [],
        depot : [],
        creditCommunication : [],
        creditInternet : []
      }
    }
    const unknowSMS = []
    tabSMS.forEach(sms => {
      if (sms.service_center) {
        switch (sms.address) {
          case momo.address:
            if (matchModel(momo.retrait.model, sms.body)) {
              transactions.momo.retrait.push(momo.retrait.scrap(sms.body));
              //console.log(transactions)
            } else if (matchModel(momo.transfert.sortant.model, sms.body)) {
              // c'est un smsm de transfert entrant de mobile money

              transactions.momo.transfertSortant.push(momo.transfert.sortant.scrap(sms.body));
            } else 
              if (matchModel(momo.transfert.entrant.model, sms.body)) {
                // c'est un sms de transfert sortant de mobile money
                //console.log("fif 4")
                transactions.momo.transfertEntrant.push(momo.transfert.entrant.scrap(sms.body));
              } else if (matchModel(momo.depot.model, sms.body)) {
              // depot mobile money
              transactions.momo.depot.push(momo.depot.scrap(sms.body));
            }else if(matchModel(momo.paiement.creditCommunication.model, sms.body))  {
              // achat de crédit de communication avec mobile money
              transactions.momo.creditCommunication.push(momo.paiement.creditCommunication.scrap(sms.body))
            }else if (matchModel (momo.paiement.creditInternet.model, sms.body)){
              // achat de crédit internet avec mobile money
              transactions.momo.creditInternet.push(momo.paiement.creditInternet.scrap(sms.body))
            }else {
              unknowSMS.push(sms);
              //console.log("Ce sms ne correspond à aucun modèle présent")
            }
            break;

          case om.address:

            if (matchModel(om.retrait.model, sms.body)) {
              // c'est un sms de retait de mobile money
              //console.log("Voila un transfert retrait om")
              transactions.om.retrait.push(om.retrait.scrap(sms.body));
            } else if (matchModel(om.transfert.sortant.model, sms.body)) {
              // c'est un smsm de transfert entrant de mobile 
              //console.log("Voila un transfert sortant om")

              transactions.om.transfertSortant.push(om.transfert.sortant.scrap(sms.body));
            } else if (matchModel(om.transfert.entrant.model, sms.body)) {
                // c'est un sms de transfert sortant de mobile money
             // console.log("Voila un transfert entrant om")
              // console.log(sms.body)
                transactions.om.transfertEntrant.push(om.transfert.entrant.scrap(sms.body));

            } else if (matchModel(om.paiement.creditCommunication.model, sms.body)) {
              // depot mobile money
              transactions.om.creditCommunication.push(om.paiement.creditCommunication.scrap(sms.body))
            } else if (matchModel(om.paiement.creditInternet.model, sms.body)) {
              // depot mobile money
              transactions.om.creditCommunication.push(om.paiement.creditInternet.scrap(sms.body))
            } else if (matchModel(om.depot.model, sms.body)) {
              // depot mobile money
              transactions.om.creditInternet.push(om.depot.scrap(sms.body))
            }else {
              unknowSMS.push(sms);
            }
            break;
        }
         
      }
    });
    const isThereData = ( transactions.momo.depot.length > 0 || transactions.momo.retrait.length >0  || transactions.momo.transfertEntrant.length > 0  || transactions.momo.transfertSortant.length > 0) ||
    ( transactions.om.depot.length > 0 || transactions.om.retrait.length >0  || transactions.om.transfertEntrant.length > 0  || transactions.om.transfertSortant.length > 0)
    return {
      unknowSMS : unknowSMS,
      transactions : transactions,
      isThereData : isThereData
    }
    // console.log("Voici le tableau de sms passé à la fonction de scrap")
    // console.log(tabSMS.length)
    //   //const transactions = [];
    //   if (tabSMS.length > 0) {
    //     //saveData(tabSMS);
    //     const transactions = [];
    //     const unknowSMS = [];
    //     tabSMS.forEach(sms => {
    //       console.log(sms)
          // switch (sms.address) {
          //   case momo.address:
          //     if (matchModel(momo.retrait.model, sms.body)) {
          //       transactions.push(momo.retrait.scrap(sms.body));
          //       //console.log(transactions)
          //     } else if (matchModel(momo.transfert.sortant.model, sms.body)) {
          //       // c'est un smsm de transfert entrant de mobile money

          //       transactions.push(momo.transfert.sortant.scrap(sms.body));
          //     } else 
          //       if (matchModel(momo.transfert.entrant.model, sms.body)) {
          //         // c'est un sms de transfert sortant de mobile money
          //         //console.log("fif 4")
          //         transactions.push(momo.transfert.entrant.scrap(sms.body));
          //       } else if (matchModel(momo.depot.model, sms.body)) {
          //       // depot mobile money
          //       transactions.push(momo.depot.scrap(sms.body));
          //     }else if(matchModel(momo.paiement.creditCommunication.model, sms.body))  {
          //       // achat de crédit de communication avec mobile money
          //       transactions.push(momo.paiement.creditCommunication.scrap(sms.body))
          //     }else if (matchModel (momo.paiement.creditInternet.model, sms.body)){
          //       // achat de crédit internet avec mobile money
          //       transactions.push(momo.paiement.creditInternet.scrap(sms.body))
          //     }else {
          //       unknowSMS.push(sms);
          //       //console.log("Ce sms ne correspond à aucun modèle présent")
          //     }

          //     break;

          //   case om.address:

          //     if (matchModel(om.retrait.model, sms.body)) {
          //       // c'est un sms de retait de mobile money
          //       //console.log("Voila un transfert retrait om")
          //       transactions.push(om.retrait.scrap(sms.body));
          //     } else if (matchModel(om.transfert.sortant.model, sms.body)) {
          //       // c'est un smsm de transfert entrant de mobile 
          //       //console.log("Voila un transfert sortant om")

          //       transactions.push(om.transfert.sortant.scrap(sms.body));
          //     } else if (matchModel(om.transfert.entrant.model, sms.body)) {
          //         // c'est un sms de transfert sortant de mobile money
          //      // console.log("Voila un transfert entrant om")
          //       // console.log(sms.body)
          //         transactions.push(om.transfert.entrant.scrap(sms.body));

          //     } else if (matchModel(om.paiement.creditCommunication.model, sms.body)) {
          //       // depot mobile money
          //       transactions.push(om.paiement.creditCommunication.scrap(sms.body))
          //     } else if (matchModel(om.paiement.creditInternet.model, sms.body)) {
          //       // depot mobile money
          //       transactions.push(om.paiement.creditInternet.scrap(sms.body))
          //     } else if (matchModel(om.depot.model, sms.body)) {
          //       // depot mobile money
          //       transactions.push(om.depot.scrap(sms.body))
          //     }else {
          //       unknowSMS.push(sms);
          //     }
          //     break;
          // }
    //     });
    //     console.log("bien : retounsons les transactions")
    //     console.log(transactions)
    //     //if( unknowSMS.length > 0) saveUnknowSMS(unknowSMS);
    //     return transactions;
    //   } else {
    //     console.info(
    //       "On ne trouve pas de message d'orange money ou de mobile money",
    //     );
    //     return [];
    //   }
  } catch (error) {
    console.log("on a throw error au niveau de scrap")
    console.log(error)
    throw error
  }


}
export function matchModel(model, sms) {
  let match = true;
  if (model.length > 0) {
    model.map(pth => {
      match &= sms.includes(pth)
    });
  }
  return match;
}
// export function removeVoidOf(cleanSplitedData = ['']) {
//   let goodData = [];
//   cleanSplitedData.forEach(data => {
//     if (data.startsWith('(')) data = removeParentheseOfNumber(data);
//     if (data) goodData.push(data);
//   });
//   return goodData;
// }
// export function removeParentheseOfNumber(numbreWithParantheses) {
//   let numtelWithoutParenthese;
//   numtelWithoutParenthese = numbreWithParantheses.replace('(', '');
//   numtelWithoutParenthese = numtelWithoutParenthese.replace(')', '');
//   return numtelWithoutParenthese;
// }

// async function isDataAlreadyRead() {
//   const key = 'transactions';
//   const data = await storage.get(key);
//   if (data) {
//     return true;
//   } else {
//     await storage.set(key, 'true');
//     return false;
//   }
// }

// async function saveData(tabSMS) {
//   if (!(await isDataAlreadyRead())) await smsDataBase.save(tabSMS);
// }
// async function saveUnknowSMS(tabSMS){
//   return smsDataBase.saveUnknow(tabSMS);
// }
// export const address = {
//   momo: 'MobileMoney',
//   om: 'OrangeMoney',
// };
// export const service_center = {
//   momo: ['+237671780094'],
//   om: ['+237694000040'],
// };
// export const filter = {
//   addresses: [address.momo, address.om],
//   bodyStart: null,
//   model: momo.transfert.model,
//   useModel: false,
//   match: function (sms) {
//     let match = true;
//     let matchA = false;
//     let matchBS = true;

//     if (this.addresses.length > 0) {
//       this.addresses.forEach(address => {
//         if (!matchA) matchA = sms.address == address;
//       });
//     }
//     if (this.bodyStart) matchBS = sms.body.startsWith(this.bodyStart);
//     if (this.useModel) {
//       match = matchModel(this.model, sms);
//     }
//     return match && matchA && matchBS;
//   },
// };