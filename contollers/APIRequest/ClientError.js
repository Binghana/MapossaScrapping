// export type IClientError = {

import { mapossaScrappingData } from '../appData';
import { baseUrl } from './Const';

//     user : {
//         uid : string,

//     },
//     error : {
//         message : string,
//         sender : string,
//         context : string,
//         cause : string | string[],
//         page : string
//     },
//     app : {
//         name : string,
//         version : string,

//     }


// }
export default class ClientError {

    constructor(user, brutError , message , sender , cause , page) {
        this.user = user;
        this.error = {
            message : message,
            sender : sender,
            context : context,
            cause : cause,
            page: page,
            brutError : brutError
        };
        this.app = {
            "name": "MapossaScrapping",
            "version": mapossaScrappingData.version
        }
    }
    async save() {
        console.log("Sauvegardons l'erreur rencontré sur le serveur")
        return await saveError(this);
    }
    
}

var axios = require('axios');

export async function saveError( clientError) {

    var data = JSON.stringify({
        clientError
    });

    var config = {
        method: 'post',
        url:  baseUrl+ '/clientErrors',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    return await axios(config);
    

} 
