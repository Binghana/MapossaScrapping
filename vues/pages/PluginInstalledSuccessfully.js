import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { imgWorkingAPI } from "../../res/Images"
import SmsAndroid from "react-native-get-sms-android-v2";
import { createUsersCompteFinanciers } from "../../contollers/Functions/appManagement";
import { requestPermissions, filter } from "../../contollers/Functions/SMS";
import ScrappingError from "../../contollers/ScrappingError";
import { scrap } from "../../contollers/Functions/scrap";
export default class PluginInstalledSuccessfully extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        try {

            console.log("Nous sommes arrivés sur la page de succès d'installation du plugin")
            if (await requestPermissions()) {
                console.log("Récuperons les sms de l'utilisateur")
                return SmsAndroid.list(
                    JSON.stringify(filter),
                    fail => {
                        throw fail;
                    },
                    async (count, smsList) => {
                        try {
                            const tabSMS = JSON.parse(smsList)
                            console.log("on a récupéré" + tabSMS.count)
                            const data = await scrap(tabSMS);
                            await createUsersCompteFinanciers(data);
                            
                            const OMEInfo = this.getOMEfinancialInformations(tabSMS);
                            this.gotToPage("PreviewOfResult", OMEInfo);
                        } catch (error) {
                            console.log("on a throw l'erruer au niveau de puliffin succ ")
                            console.log(error);
                            if (error instanceof ScrappingError) {
                                if (error.code == ScrappingError.ERROR_MORE_THAN_2_NUMBERS) return this.gotToPage("AlertMoreThan2Number");
                                if (error.code == ScrappingError.ERROR_NO_FINANCIAL_SMS ) return this.gotToPage("NoFinancialSMS");
                            }
                        }


                    },
                );
            } else {
                throw new Error("Impossible de lire les sms de l'utilisateur car la permissions a été refusé");
            }
        } catch (error) {

        }
    }
    getOMEfinancialInformations(tabSMS = []) {
        console.log("on a bien récupéreé les informations des OME");
        const OMEInfo = {
            orangeNumber: "699903307",
            orangeSommeEntree: 152000,
            orangeSommeSortie: 25000,
            mtnNumber: "678529685",
            mtnSommeEntree: 35800,
            mtnSommeSortie: 15500
        }
        return OMEInfo;
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

                    <Text style={styles.title} >Plugin installé avec succès</Text>
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
