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
import { getAllAccoount, getUserAllCompteFinanciers, sendBulkCreateCompteFinancier, sendCreateCompteFinancier } from "../../services/API/mapossaDataTech/CompteFinanciers";


import { getUserCredentials, storage, storageKey, toAmountFormat, toNumberFormat } from "../../tools/utilities";
import ClientError from "../../tools/error/ClientError";
import auth from "@react-native-firebase/auth"
import { operators } from "../../tools/sms-scrapping/operators";
import { getNumbrefromTransactions } from "../../tools/scrapingOperation";
import { PreProcessedTransaction } from "../../tools/sms-scrapping/preProcessedTransactions";
import { bulkCreateTransactions, bulkCreateUnknowTransactions } from "../../services/API/mapossaDataTech/Transactions";
import { ERROR_NO_NETWORK } from "../../tools/error/ErrorMessages";
import { createAccountOnAdalo } from "../../services/API/adalo/comptefinancier";

const loading = require("../../ressources/images/loader.gif");
export default class PluginInstalledSuccessfully extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isThereError: false,
            errorMessage: "Une erreur est suvennue, veuillez nous contacter",
            messageState: "Processus de transformation de vos SMS en cours..."
        }
    }
    async componentDidMount() {
        try {

            this.updateStateMessage("Vérification des permissions")
            const permiGanted = await isPermissionGranted()

            if (!permiGanted) {
                return this.gotToPage("RequestPermission")
            }

            return SmsAndroid.list(
                JSON.stringify(filter),
                fail => {
                    throw fail;
                },
                async (count, smsList) => {

                    this.updateStateMessage("On a récupéré " + count + " Début du traitement des sms...")
                    if (count < 1) {
                        return this.gotToPage("NoFinancialSMS");
                    }

                    try {

                        const tabSMS = JSON.parse(smsList)

                        const results = await scrap(tabSMS);

                        //this.updateStateMessage("Nous avons trouvé Nous avons trouvé " + results.length + " sms connues ")
                        //await this.saveUnkown(results.unknownPreProcessedTransactions);
                        //this.updateStateMessage("Nous avons terminé de sauvegardé les inconnues")
                        // console.log(results)
                        // console.log("voici le résultat plus haut")
                        if (!this.verifyPreProcessedTransactions(results)) return this.gotToPage("NoFinancialSMS");
                        this.updateStateMessage("Nous traitements et rangements des flux par OME")
                        const OMEInfo = await this.getOMEfinancialInformations(results);

                        this.gotToPage("PreviewOfResult", OMEInfo);

                    } catch (error) {
                        console.log("on a throw l'erreur au niveau de plugin install succ ")
                        console.log(error)
                        console.log(JSON.stringify(error));
                        if (error.message == "Network Error") {
                            console.log("Erreur pas de connection");
                            this.setState({ isThereError: true, errorMessage: ERROR_NO_NETWORK })
                        }
                        if (error.status && error.status == 401) {
                            console.log(error.data)
                        }
                        if (error instanceof ScrappingError) {
                            if (error.code == ScrappingError.ERROR_MORE_THAN_2_NUMBERS) return this.gotToPage("AlertMoreThan2Number");
                            if (error.code == ScrappingError.ERROR_NO_FINANCIAL_SMS) {
                                // console.log("L'utilisateur n'as pas de sms fianciers")
                                // const res = await getUserAllCompteFinanciers();
                                // console.log("on a récupérer les ocmptes de l'utilisateur")
                                // if (res.data.data) {
                                //     /**
                                //      * @type {Array}
                                //      */

                                //     const comptes = res.data.data;
                                //     if (comptes.length > 0) {
                                //         console.log("l'utilisateur a des comptes")
                                //         const OMEInfo = await this.getOMEfinancialInformations(comptes);
                                //         this.gotToPage("PreviewOfResult", OMEInfo);
                                //     } else {
                                //         this.gotToPage("NoFinancialSMS");
                                //     }
                                // } else {
                                //     this.gotToPage("NoFinancialSMS");
                                // }

                            }
                        }
                    }
                },
            );

        } catch (error) {

            this.updateStateMessage("Une erreur est survennue avec lors de la récupération des sms")
        }

    }
    /**
     * 
     * @param {PreProcessedTransaction[]} results 
     */
    verifyPreProcessedTransactions(results) {
        const good = results.filter(t => ((t.operator == operators[0].address || t.operator == operators[1].address) && !t.error && !t.problem && !t.risk));
        //console.log(good)
        return (good.length > 0);
    }
    updateStateMessage(message) {
        this.setState({ messageState: message })
    }
    showError(message = "Une erreur est suvennue, veuillez nous contacter") {

        this.setState({ isThereError: true, errorMessage: message })
    }

    /**
     * 
     * @param {PreProcessedTransaction[]} data 
     * @returns 
     */
    async getOMEfinancialInformations(data) {

        const transactionsOM = data.filter(t => (t.operator == operators[0].address));
        const transactionsMOMO = data.filter(t => (t.operator == operators[1].address));

        // console.warn( "Voici les transactions momo " + transactionsMOMO.length);
        // console.log(transactionsMOMO)

        const tWithPhone = transactionsMOMO.filter(t => ( t.initialType == "Retrait"))
        console.warn("Voici les sms OM avec numero");
        let tv = tWithPhone.map(el => ({ "montant": el.amount,  'numTelSender' : el.senderPhoneNumber , "numTelReceiver" : el.receiverPhoneNumber,  "typeInitial": el.initialType, "flux": el.flux, "sms": el.baseSMS.body }))
        tv.forEach(el => {
            console.log(" ")
            console.log(el)
        })
        const numbresOrange = getNumbrefromTransactions(transactionsOM);
        console.log("Voici les numeros Orange ")
        console.log(numbresOrange)
        const numbersMTN = getNumbrefromTransactions(transactionsMOMO);
        console.log("Voici les numeros  MTN ")
        console.log(numbersMTN)

        try {
            await sendCreateCompteFinancier("Cash1", "", "Espece")
        } catch (error) {
            this.updateStateMessage("Une érreur est survennue lors de la création du compte espèce, veuillez patienter...");

            // réesseyons
            // let nombreTentative = 1;
            // const retryCreateCompte = async (retryId) => {
            //     try {
            //         if (nombreTentative > 3) {
            //             clearInterval(retryId);
            //             return this.updateStateMessage("Une erreur majeure est survennue, retenter dans 10 min");

            //         }
            //         nombreTentative++;
            //         await sendCreateCompteFinancier("Cash1", "", "Espece");
            //         return clearInterval(retryId);

            //     } catch (error) {
            //         retryCreateCompte(retryId)
            //     }
            // }
            // const retryId = setInterval(() => {
            //     retryCreateCompte(retryId)
            // }, 10000);
        }


        let compteOrange = undefined;
        let compteMTN = undefined;

        if (transactionsOM.length > 0) {
            let totalEntree = 0;
            let toalSortie = 0;
            transactionsOM.map((t) => {
                if (t.flux == "Entrant") totalEntree += t.amount;
                if (t.flux == "Sortant") toalSortie += t.amount;
            })
            compteOrange = {
                numero: (numbresOrange.length > 0) ? numbresOrange[0] : '-',
                sommeEntree: totalEntree,
                sommeSortie: toalSortie
            }
        }
        if (transactionsMOMO.length > 0) {
            let totalEntree = 0;
            let toalSortie = 0;
            transactionsMOMO.map((t) => {
                if (t.flux == "Entrant") totalEntree += t.amount;
                if (t.flux == "Sortant") toalSortie += t.amount;
            })
            compteMTN = {
                numero: (numbersMTN.length > 0) ? numbersMTN[0] : '-',
                sommeEntree: totalEntree,
                sommeSortie: toalSortie
            }
        }

        const OMEInfo = {
            orangeNumber: (compteOrange) ? toNumberFormat (compteOrange.numero) : "-",
            orangeSommeEntree: (compteOrange) ? toAmountFormat(compteOrange.sommeEntree) : 0,
            orangeSommeSortie: (compteOrange) ? toAmountFormat(compteOrange.sommeSortie) : 0,
            mtnNumber: (compteMTN) ? toNumberFormat(compteMTN.numero) : "-",
            mtnSommeEntree: (compteMTN) ? toAmountFormat(compteMTN.sommeEntree) : 0,
            mtnSommeSortie: (compteMTN) ? toAmountFormat(compteMTN.sommeSortie) : 0,
        }
        return OMEInfo;

    }

    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.updateStateMessage("Allons sur la page " + pageName + " ...")
        this.props.navigation.navigate(pageName, data);
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgWorkingAPI} />

                    <Text style={styles.title} >{this.state.messageState}</Text>
                    <Image source={loading} style={styles.loading}></Image>
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
        color: "black",
        marginTop: 50
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
    },
    textError: {
        color: "red",
        alignSelf: "center",
        marginTop: 15,
        fontSize: 16,
        textAlign: "justify",
        paddingHorizontal: 10

    },
    loading: {
        marginTop: 20,
        height: 40,
        width: 40,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
});
