import RNFS from "react-native-fs";
import { PreProcessedTransaction } from "../sms-scrapping/preProcessedTransactions";

export const basePath = RNFS.ExternalDirectoryPath;

// }
export async function createFolder(path) {

    return RNFS.mkdir(path)
}

export function downloadFile(fromUrl, toFile) {
    const options = {
        fromUrl: fromUrl,
        toFile: toFile
        //     fromUrl: string;          // URL to download file from
        //     toFile: string;           // Local filesystem path to save the file to
        //     headers?: Headers;        // An object of headers to be passed to the server
        //     background?: boolean;     // Continue the download in the background after the app terminates (iOS only)
        //     discretionary?: boolean;  // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)
        //     cacheable?: boolean;      // Whether the download can be stored in the shared NSURLCache (iOS only, defaults to true)
        //     progressInterval?: number;
        //     progressDivider?: number;
        //     begin?: (res: DownloadBeginCallbackResult) => void; // Note: it is required when progress prop provided
        //     progress?: (res: DownloadProgressCallbackResult) => void;
        //     resumable?: () => void;    // only supported on iOS yet
        //     connectionTimeout?: number // only supported on Android yet
        // readTimeout?: number       // supported on Android and iOS
        // backgroundTimeout?: number // Maximum time (in milliseconds) to download an entire resource (iOS only, useful for timing out background downloads)

    }
    return RNFS.downloadFile(options)
}

export function readFile(path) {

    return RNFS.readFile(path)
}
/**
 * 
 * @param {PreProcessedTransaction[]} preProcessedTransactions 
 * @returns 
 */
export async function savePreProcessedtransaction(preProcessedTransactions) {
    //console.warn(preProcessedTransactions)
    const delimiter = "@"
    const path = basePath + '/transactionsPretraites.txt';

    const array = Object.keys(preProcessedTransactions[0])
            .map(function (key) {
                return key;
            });
    console.log(array)
    const stringifyKey = array.join(delimiter);
    await RNFS.writeFile(path, stringifyKey+'\n' , 'utf8')
        
        .catch((err) => {
            console.error("une erreur est survennue lors de l'écriture dans le fichier")
            console.error(err.message);
        });
    let i =0;
    for (const transaction of preProcessedTransactions) {
        const array = Object.keys(transaction)
            .map(function (key) {
                if (key == "baseSMS"){
                    return transaction[key].body.replace(/\r|\n|\t|\v/g, "");
                }
                return transaction[key];
            });
        const stringifyTransaction = array.join(delimiter)+'\n';

        await RNFS.appendFile(path, stringifyTransaction, 'utf8')
        
        .catch((err) => {
            console.error("une erreur est survennue lors de l'écriture dans le fichier")
            console.error(err.message);
        });

        //console.log('Transaction WRITTEN!');
        //console.log(i++)
    

    }
    console.info("Fin de l'écriture dans le fichier text  à " + basePath + '/transactionsPretraites.txt')
    return ;
}