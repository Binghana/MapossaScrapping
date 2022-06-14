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


import { getUserCredentials, storage, storageKey } from "../../tools/utilities";
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

            console.log("Nous sommes arrivés sur la page de succès d'installation du plugin")

            console.log("Récuperons les sms de l'utilisateur")
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
                    try {
                        const tabSMS = JSON.parse(smsList)
                        console.log("on a récupéré " + count)
                        this.updateStateMessage("on a récupéré " + count + " sms utilisable")
                        const results = scrap(tabSMS, this.updateStateMessage("Une erreur est survennue pendant le scrap "));
                        this.updateStateMessage("Nous avons trouvé " + results.unknownPreProcessedTransactions.length + " sms inconnues \nNous avons trouvé " + results.preProcessedTransaction.length + " sms connues ")
                        await this.saveUnkown(results.unknownPreProcessedTransactions);
                        this.updateStateMessage("Nous avons terminé de sauvegardé les inconnues")
                        console.log(results)
                        if (results.preProcessedTransaction.length < 1) throw new ScrappingError(ScrappingError.ERROR_NO_FINANCIAL_SMS);
                        this.updateStateMessage("Nous traitements et rangements des flux par OME")
                        const OMEInfo = await this.getOMEfinancialInformations(results.preProcessedTransaction);


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
    updateStateMessage(message) {
        this.setState({ messageState: message })
    }
    showError(message = "Une erreur est suvennue, veuillez nous contacter") {

        this.setState({ isThereError: true, errorMessage: message })
    }
    /**
     * 
     * @param {PreProcessedTransaction[]} data 
     */
    async saveUnkown(data) {
        console.log("Nombre de transactions inconnues : " + data.length)
        if (data.length > 0) {
            console.log("Envoyons la requete de création des transactions inconnues")
            const res = await bulkCreateUnknowTransactions(data);
            console.log(res.data)
        }

    }
    /**
     * 
     * @param {PreProcessedTransaction[]} data 
     * @returns 
     */
    async getOMEfinancialInformations(data) {
        //try {
        console.log("Trions les transactions ")

        const transactionsOM = data.filter(t => (t.operator == operators[0].address));
        const transactionsMOMO = data.filter(t => (t.operator == operators[1].address));
        const numbresOrange = getNumbrefromTransactions(transactionsOM);
        console.log("Voici les numeros Orange ")
        console.log(numbresOrange)
        const numbersMTN = getNumbrefromTransactions(transactionsMOMO);
        console.log("Voici les numeros  MTN ")
        console.log(numbersMTN)
        try {
            this.updateStateMessage("Création des comptes automatiques...")
            await sendCreateCompteFinancier("Cash1", "", "Espece")
            this.updateStateMessage("Comptes Espèces crées, Création des comptes Mobiles...")
            await this.setUpAccount(operators[0].address, transactionsOM, numbresOrange);
    
            await this.setUpAccount(operators[1].address, transactionsMOMO, numbersMTN);
    
            console.log("On a terminé l'initialisation")
        } catch (error) {
            //onsole.log()
            //this.updateStateMessage("Il semblerait qu'il yait déjà un coptes ...")
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
            orangeNumber: (compteOrange) ? compteOrange.numero : "-",
            orangeSommeEntree: (compteOrange) ? compteOrange.sommeEntree : 0,
            orangeSommeSortie: (compteOrange) ? compteOrange.sommeSortie : 0,
            mtnNumber: (compteMTN) ? compteMTN.numero : "-",
            mtnSommeEntree: (compteMTN) ? compteMTN.sommeEntree : 0,
            mtnSommeSortie: (compteMTN) ? compteMTN.sommeSortie : 0,
        }
        return OMEInfo;

    }
    /**
     * 
     * @param {*} operator 
     * @param {PreProcessedTransaction[]} data 
     */
    async setUpAccount(operator, data, numbers) {
        try {
            if (data.length > 0) {
                console.log("On a des transacions " + operator)
                console.log(data);


                if (numbers.length < 2) {

                    console.log("On au moins Un numéro " + operator)
                    this.updateStateMessage("Création du compte automatique " + operator + " ...")

                    console.log(numbers)
                    let res = await sendCreateCompteFinancier(operator, (numbers.length == 1) ? numbers[0] : "", "Mobile");
                    this.updateStateMessage("Création du compte automatique " + operator + " crées avec succès \nEnregistrement des transactions auto ")
                    const idCompte = res.data.data.idCompte;
                    console.log(res.data.data);
                    console.log(idCompte);

                    let finalTransactions = (numbers.length == 1) ? data.map((el) => ({ ...el, accountId: idCompte })) : data

                    const result = await bulkCreateTransactions(finalTransactions);
                    this.updateStateMessage("Création des transactions auto réussis ...")
                    console.log(result.data)
                } else {
                    console.log("On a " + numbers.length.toString() + " numéro " + operator);

                    let comptes = [];
                    for (const number of numbers) {
                        let c = {
                            numero: number,
                            operateur: operator
                        }
                        comptes.push(c)
                    }
                    console.log("Envoi de la requete de création des comptes " + operator)
                    this.updateStateMessage("Création des comptes " + operator + " ...")
                    await sendBulkCreateCompteFinancier(comptes, "Mobile")

                    try {
                        /**
                         * @type {any[]}
                         */
                        const accounts = await getAllAccoount();
                        
                        for (const account of accounts) {
                            createAccountOnAdalo(account);
                        }

                    } catch (error) {
                        console.log("Erreur lors de la création des comptes Adalo")
                    }   

                    this.updateStateMessage("Fin de la Création des comptes " + operator + " ! ")
                }
            }
        } catch (error) {
            console.log("une erreur s'est produite lors de la création des comptes")
            console.log(error)
        }

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
