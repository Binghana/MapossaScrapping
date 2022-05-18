import om from "../../sms-scrapping/OrangeMoney/om";
import { isGoodNumTelCameroon } from "../RegExp";

export function getAllTransactionsOfOperator(tabTransaction = [], operatorAddress) {

    return tabTransaction.filter(transac => transac.operateur == operatorAddress);

}

export function getFrequentNumberOfOperator(tabTransactionOfOperator = []) {
    const numbers = [];

    tabTransactionOfOperator.forEach((transaction) => {
        let index = -1;
        if (numbers.length > 0) index = numbers.findIndex(el => el.numero == transaction.numero);
        if (transaction.numero) console.log(transaction.numero); console.log(numbers);
        if (transaction.numbers == undefined) console.info(transaction);
        if (index < 0) {
            if ("numero" in transaction) numbers.push({ numero: transaction.numero, occurence: 1 });
        } else {
            numbers[index].occurence += 1;
        }
    })
    const occurences = numbers.map(el => el.occurence);
    let bestOccur = Math.max(...occurences);


    if (numbers.length < 1) return undefined;
    if (bestOccur == undefined) bestOccur = numbers[0].occurence;
    return numbers.find(el => el.occurence == bestOccur).numero;

}

export function getOperatorNumbers(data, operateur) {
    let tabTransaction = [];
    if (operateur == om.address) {
        console.log("Voici les transactions orange à partir dèsquels que l'on doit tirer les numéros")
        console.log(tabTransaction);
        if (data.transactions.om.transfertSortant.length > 0) tabTransaction = data.transactions.om.transfertSortant;
        else if (data.transactions.om.transfertEntrant.length > 0) tabTransaction = data.transactions.om.transfertEntrant;
    } else {
        if (data.transactions.momo.transfertSortant.length > 0) {
            console.log("Voici les transactions MTN à partir dèsquels que l'on doit tirer les numéros")
            console.log(tabTransaction);
            tabTransaction = data.transactions.momo.transfertSortant
        }
    }

    return getNumbrefromTransactions(tabTransaction);


}
function getNumbrefromTransactions(tabTransaction = []) {

    if (tabTransaction.length > 0) {
        const numbers = []
        tabTransaction.forEach((transaction) => {
            let index = -1;
            if ("numero" in transaction && isGoodNumTelCameroon.test(transaction.numero)) {
                if (numbers.length > 0) index = numbers.findIndex(el => el.numero == transaction.numero);
                //if (transaction.numero) console.log(transaction.numero); console.log(numbers);
                //if (transaction.numbers == undefined) console.info(transaction);
                if (index < 0) {
                    numbers.push({ numero: transaction.numero, occurence: 1 });
                } else {
                    numbers[index].occurence += 1;
                }
            }

        })
        return numbers;
    } else return [];
}