import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
} from "react-native";
import { imgWorkingAPI } from "../../tools/ressources/Images"
import SmsAndroid from "react-native-get-sms-android-v2";

import { filter, isPermissionGranted } from "../../tools/SMS/AskPermissions";
import ScrappingError from "../../tools/error/ScrappingError";
import scrap from "../../tools/sms-scrapping/scrap.js"
import { getUserAllCompteFinanciers, sendBulkCreateCompteFinancier, sendCreateCompteFinancier } from "../../services/API/mapossaDataTech/CompteFinanciers";


import { getUserCredentials, storage, storageKey } from "../../tools/utilities";
import ClientError from "../../tools/error/ClientError";
import auth from "@react-native-firebase/auth"
import { operators } from "../../tools/sms-scrapping/operators";
import { getNumbrefromTransactions } from "../../tools/scrapingOperation";
import { PreProcessedTransaction } from "../../tools/sms-scrapping/preProcessedTransactions";
import { bulkCreateTransactions, bulkCreateUnknowTransactions } from "../../services/API/mapossaDataTech/Transactions";


export default class PluginInstalledSuccessfully extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isThereError: false,
            errorMessage: "Une erreur est suvennue, veuillez nous contacter"
        }
    }
    async componentDidMount() {
        try {

            console.log("Nous sommes arrivés sur la page de succès d'installation du plugin")
            if (await isPermissionGranted()) {
                console.log("Récuperons les sms de l'utilisateur")
                return SmsAndroid.list(
                    JSON.stringify(filter),
                    fail => {
                        throw fail;
                    },
                    async (count, smsList) => {
                        try {
                            const tabSMS = JSON.parse(smsList)
                            console.log("on a récupéré" + count)

                            const results = scrap(tabSMS);
                            
                            // console.log("On a terminé de traiter les transactions")
                            // console.log(data)
                            // await createUsersCompteFinanciers(data);

                            // await createAutoTransaction(data);
                            // await storage.set(storageKey.lastScrappingDate, new Date().getTime().toString())
                            
                            const OMEInfo = await this.getOMEfinancialInformations( results.preProcessedTransaction );
                            await this.saveUnkown(results.unknownPreProcessedTransactions);

                            

                            this.gotToPage("PreviewOfResult", OMEInfo);

                        } catch (error) {
                            console.log("on a throw l'erreur au niveau de plugin install succ ")
                            console.log(error);
                            if (error.message == "Network Error") console.log("erreur pas de connection")
                            if (error instanceof ScrappingError) {
                                if (error.code == ScrappingError.ERROR_MORE_THAN_2_NUMBERS) return this.gotToPage("AlertMoreThan2Number");
                                if (error.code == ScrappingError.ERROR_NO_FINANCIAL_SMS) {
                                    console.log("L'utilisateur n'as pas de sms fianciers")
                                    const res = await getUserAllCompteFinanciers();
                                    console.log("on a récupérer les ocmptes de l'utilisateur")
                                    if (res.data.data) {
                                        /**
                                         * @type {Array}
                                         */

                                        const comptes = res.data.data;
                                        if (comptes.length > 0) {
                                            console.log("l'utilisateur a des comptes")
                                            const OMEInfo = await this.getOMEfinancialInformations(comptes);
                                            this.gotToPage("PreviewOfResult", OMEInfo);
                                        } else {
                                            this.gotToPage("NoFinancialSMS");
                                        }
                                    } else {
                                        this.gotToPage("NoFinancialSMS");
                                    }

                                }
                            }
                        }
                    },
                );
            } else {
                this.gotToPage("AutorisationDenied")
            }
        } catch (error) {
            console.log("Une erreur est survennue avec les permissions")
            console.log(error)
            let user;
            if (auth().currentUser) user = auth().currentUser; else user = await getUserCredentials();
            let unkowError = new ClientError(user, error, " ", " on componenet did mount", "Maybe looking at permissions", "PluginInstalledSuccessfully")
            await unkowError.save()
            this.showError();
        }

    }
    showError(message = "Une erreur est suvennue, veuillez nous contacter") {

        this.setState({ isThereError: true, errorMessage: message })
    }
    /**
     * 
     * @param {PreProcessedTransaction[]} data 
     */
    async saveUnkown( data ){
        await bulkCreateUnknowTransactions(data);
    }
    /**
     * 
     * @param {PreProcessedTransaction[]} data 
     * @returns 
     */
    async getOMEfinancialInformations(data) {
        
        // if (!data) {
        //     const res = await getUserAllCompteFinanciers();
        //     if (res.data.data) {
        //         /**
        //          * @type {Array}
        //          */
        //         const comptes = res.data.data;
        //         const compteOrange = comptes.find(c => c.nomOperateur == operators[0].address);
        //         const compteMTN = comptes.find(c => c.nomOperateur == operators[1].address);
        //         console.log(compteOrange);
        //         console.log(compteMTN)
        //         console.log("on a bien récupéreé les informations des OME");

        //         const OMEInfo = {
        //             orangeNumber: (compteOrange) ? compteOrange.numero : "-",
        //             orangeSommeEntree: (compteOrange) ? compteOrange.sommeEntree : 0,
        //             orangeSommeSortie: (compteOrange) ? compteOrange.sommeSortie : 0,
        //             mtnNumber: (compteMTN) ? compteMTN.numero : "-",
        //             mtnSommeEntree: (compteMTN) ? compteMTN.sommeEntree : 0,
        //             mtnSommeSortie: (compteMTN) ? compteMTN.sommeSortie : 0,
        //         }
        //         return OMEInfo;
        //     }
        // }else {
        // const comptes = data;
        // const compteOrange = comptes.find(c => c.operator == operators[0].address);
        // const compteMTN = comptes.find(c => c.operator == operators[1].address);
        // console.log(compteOrange);
        // console.log(compteMTN)
        // console.log("on a bien récupéreé les informations des OME");
        console.log("Trions les transactions ")

       
        const transactionsOM = data.filter (  t => (t.operator == operators[0].address));

        const transactionsMOMO = data.filter (  t => ( t.operator == operators[1].address));

        // let response = await sendCreateCompteFinancier("", "", "Espece");
        // console.log(response.data)
        // console.log("On a correctement créer le compte Espèce ")
        const numbersMTN = getNumbrefromTransactions(transactionsMOMO);
        console.log(numbersMTN)
        if ( numbersMTN.length == 1 ) {
            console.log("On a Un numéro MTN ")
            let res = await sendCreateCompteFinancier(operators[1].address,  numbersMTN[0].numero );

            
            const idCompte = res.data.data.idCompte;
            console.log(res.data.data);
            console.log(idCompte);

            const finalTransactionsMOMO = transactionsMOMO.map( (el) => ({accountId : idCompte,...el}));

            const result = await bulkCreateTransactions(finalTransactionsMOMO);
            console.log(result.data)
        }else if ( numbersMTN.length >1) {
            console.log("On a "+ numbersMTN.length.toString() +" numéro MTN");

            let comptes = [];
            for (const number of numbersMTN) {
                let c = {
                    numero : number,
                    operateur : operators[1].address
                }
                comptes.push(c)
            }
            console.log("Envoi de la requete de création des comptes MTN")
            await sendBulkCreateCompteFinancier( comptes, "Mobile")

        }
        if (numbersMTN.length != 1) {
            console.log ("on a pas un seul compte")
            const result = await bulkCreateTransactions(transactionsMOMO);
            console.log(result.data)
        }
        if (numbresOrange.length != 1) {
            console.log ("on a pas un seul compte")
            const result = await bulkCreateTransactions(transactionsOM);
            console.log(result.data)
        }
        const numbresOrange = getNumbrefromTransactions(transactionsOM);
        console.log(numbresOrange)
        
        if ( numbresOrange.length == 1 ) {
            console.log("On a Un numéro Orange ")
            const res = await sendCreateCompteFinancier(operators[0].address,  numbresOrange[0].numero )
            const idCompte = res.data.data.idCompte;
            console.log(res.data.data);
            console.log(idCompte);

            const finalTransactionsOM = transactionsOM.map( (el) => ({accountId : idCompte,...el}));
            
            const result = await bulkCreateTransactions(finalTransactionsOM);
            console.log(result.data)
        }else if ( numbresOrange.length >1) {
            console.log("On a "+ numbresOrange.length.toString() +" numéro MTN");

            let comptes = [];
            for (const number of numbresOrange) {
                let c = {
                    numero : number,
                    operateur : operators[0].address
                }
                comptes.push(c)
            }
            console.log("Envoi de la requete de création des comptes Orange")
            await sendBulkCreateCompteFinancier( comptes, "Mobile")

        }


        console.log("On a terminé l'initialisation")
        let compteOrange = undefined;
        let compteMTN = undefined;

        if (transactionsOM.length > 0 ) {
            let totalEntree = 0;
            let toalSortie = 0;
            transactionsOM.map((t)=>{
                if(t.flux == "Entrant") totalEntree += t.amount;
                if (t.flux == "Sortant") toalSortie += t.amount;
            })
            compteOrange =  {
                numero : numbresOrange[0],
                sommeEntree : totalEntree,
                sommeSortie : toalSortie
            }
        }
        if (transactionsMOMO.length > 0 ) {
            let totalEntree = 0;
            let toalSortie = 0;
            transactionsMOMO.map((t)=>{
                if(t.flux == "Entrant") totalEntree += t.amount;
                if (t.flux == "Sortant") toalSortie += t.amount;
            })
            compteMTN =  {
                numero : numbersMTN[0],
                sommeEntree : totalEntree,
                sommeSortie : toalSortie
            }
        }

        const OMEInfo = {
            orangeNumber: (compteOrange) ? compteOrange.numero : "-",
            orangeSommeEntree: (compteOrange) ? compteOrange.sommeEntree : 0,
            orangeSommeSortie: (compteOrange) ? compteOrange.sommeSortie : 0,
            mtnNumber: (compteMTN) ? compteMTN.numero : "-",
            mtnSommeEntree: (compteMTN) ? compteMTN.sommeEntree : 0,
            mtnSommeSortie: (compteMTN) ? compteMTN.sommeSortie : 0,
        }
        return OMEInfo;
        // }
    }



    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName, data);
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgWorkingAPI} />

                    {!this.state.isThereError && <Text style={styles.title} >Plugin installé avec succès</Text>}
                    {this.state.isThereError && <Text style={styles.textError} > {this.state.errorMessage} </Text>}
                    {/* <Text style={styles.content} >Sans l’accès à vos SMS, nous ne vous serons d’aucune utilité.
                        A bientot</Text>

                    <Pressable style={styles.button} >
                        <Text style={styles.buttonText}>J'ai Comrpis</Text>
                    </Pressable> */}

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    appLogo: {
        marginTop: 150,

        width: 200,
        height: 200,
        alignSelf: "center"
    },
    boxLogo: {
        flexDirection: "row",
        alignSelf: "center"
    },
    main: {
        backgroundColor: "white"
    },
    boxCentral: {
        marginHorizontal: '8%',
        alignSelt: 'center',

    },
    image: {
        alignSelf: "center",
        height: 145,
        width: 145,
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
        marginTop: 100
    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 100
    },
    content: {
        padding: 30,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        color: "black"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        borderRadius: 8,
        backgroundColor: "#E9E9E9"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#000000',
    }
});
