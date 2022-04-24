
export function getAllTransactionsOfOperator ( tabTransaction = [] , operatorAddress) {
    
    return tabTransaction.filter( transac => transac.operateur == operatorAddress );

}

export function getFrequentNumberOfOperator ( tabTransactionOfOperator = []) {
    const numbers = [];
    
    tabTransactionOfOperator.forEach((transaction ) => {
        let index = -1;
        if( numbers.length > 0) index = numbers.findIndex(el => el.numero == transaction.numero);
        if ( transaction.numero) console.log(transaction.numero); console.log(numbers);
        if ( transaction.numbers == undefined) console.info(transaction);
        if (index < 0 ) {
            if ("numero" in transaction) numbers.push({ numero : transaction.numero , occurence : 1});
        }else {
            numbers[index].occurence += 1;
        }  
    })
    const occurences = numbers.map ( el => el.occurence);
    let bestOccur = Math.max(...occurences);
    

    if(numbers.length<1) return undefined;
    if (bestOccur == undefined) bestOccur = numbers[0].occurence;
    return numbers.find(el => el.occurence == bestOccur).numero ;
    
}