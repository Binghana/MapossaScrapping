//Lorsque tu crées les comptes financiers:
import axios from 'axios';
import { getIdUser } from '../../../tools/appManagement';



export async function createAccountOnAdalo(account) {


    var data = JSON.stringify({
        "idAccount": account.id,
        "idFirebase" : getIdUser(),
        "logo": account.logoOperateur,
        "operateur": account.nomOperateur,
        "numero": account.numero,
        "toDelete": false
    });
    var config = {
        method: 'post',
        url: 'https://api.adalo.com/v0/apps/bc399ca2-5676-4c50-8077-b98f3f8c9c6f/collections/t_8fx9jich7w4ilz3qlw2blbomm',
        headers: {
            'Authorization': 'Bearer d0ba757rxo4l7unzobkgo5bsu',
            'Content-Type': 'application/json'
        },
        data: data
    };
    return (await axios(config)).data
      
}