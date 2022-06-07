
import  { montantWithDecimal , alphaIdNumber , alpa } from "./regexp"

/**
 * Cette fonction trouve un nombre qui suit le mot clés puis retourne sa valeur
 * Si il ya plusieurs mot clés ça essaye de trouver la position de
 * chaque mot clé si elle ne trouve pas sa psition, elle passe au mot
 * clé suivant; si la position d'aucun mot clé est trouvé, elle 
 * retourne -1
 * @param {string[]} keywords représente les mot clés
 * @param {string} sms le sms dans lequel chercher les mots clés
 * @returns { number } la valeur du nombre trouvé
 */

export function getNumberFromKeyword(keywords, sms) {

    for (const keyword of keywords) {
        if (sms.includes(keyword)) {
            let position = sms.indexOf(keyword);
            //// console.log("Voici la position du mot clé " + keyword + " : " + position.toString())
            let splitedSms = sms.substring(position);
            //// console.log("Voici la partie qui suit le mot clé : ");
            //// console.log(splitedSms);


            let allNumbers = splitedSms.match(montantWithDecimal);
            let finalNumber = parseFloat(allNumbers[0], 10);
            return finalNumber
        }
    }
    return -1;
}

/**
 * 
 * @param { object } sms object epresentationg the sms
 * @return { object }
 */
export function getDateFromSMS(sms) {

    if ("date_sent" in sms) {

        return new Date(sms.date_sent).toLocaleString();
    }
    return null;
}
/**
 * 
 * @param { object } sms object epresentationg the sms
 * @return { object }
 */
 export function getHourFromSMS(sms) {
    if ("date_sent" in sms) {

        return new Date(sms.date_sent).getHours();
    }
    return null;
}
/**
 * 
 * @param {string[]} keywords an array of keywords to find the receiver username
 * @param {string} sms the string represantating the body of the sms
 */
export function getUserName(keywords, sms) {
    for (const keyword of keywords) {
        if (!("start" in keyword && "end" in keyword)) {
            // console.log("Le mot clé donné n'a pas de début ou de fin");

        } else {
            
            if (sms.includes(keyword.start) && sms.includes(keyword.end)) {

                let positionStart = sms.indexOf(keyword.start) + keyword.start.length;
                // console.log("Voici la position du mot clé de début " + keyword.start + " : " + positionStart.toString())
                let positionEnd = sms.indexOf(keyword.end);
               
                // console.log("Voici la position du mot clé de fin " + keyword.end + " : " + positionEnd.toString())
                let splitedSms = sms.substring( positionStart,positionEnd);
                // console.log("Voici la partie entre les 2 mots clefs ");
                // console.log(splitedSms);


                let allMatches = splitedSms.match(alpa);
                // console.log("On a des match")
                // console.log(allMatches)
                let whatWeWant = ""
                for (const name of allMatches) {
                    whatWeWant += ` ${name}`
                }
                return whatWeWant;
            }
        }
    }
    return null;
}
/**
 * Cette fonction trouve un nombre qui suit le mot clés puis retourne sa valeur
 * Si il ya plusieurs mot clés ça essaye de trouver la position de
 * chaque mot clé si elle ne trouve pas sa psition, elle passe au mot
 * clé suivant; si la position d'aucun mot clé est trouvé, elle 
 * retourne -1
 * @param {string[]} keywords représente les mot clés
 * @param {string} sms le sms dans lequel chercher les mots clés
 * @returns { number } la valeur du nombre trouvé
 */


 export function getOrangeTransactionID(keywords, sms) {

    for (const keyword of keywords) {
        if (sms.includes(keyword)) {
            let position = sms.indexOf(keyword);
            // console.log("Voici la position du mot clé " + keyword + " : " + position.toString())
            let splitedSms = sms.substring(position);
            // console.log("Voici la partie qui suit le mot clé : ");
            // console.log(splitedSms);


            let allMatches = splitedSms.match(alphaIdNumber);
            // console.log("On a des match")
            // console.log(allMatches)
            let whatWeWant = allMatches[0]
            return whatWeWant;
        }
    }
    return -1;
}