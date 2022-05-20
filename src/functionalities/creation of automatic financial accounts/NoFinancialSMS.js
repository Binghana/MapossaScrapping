import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    TextInput
} from "react-native";
import { sendCreateCompteFinancier } from "../../services/API/mapossaDataTech/CompteFinanciers";
import { isGoodNumtelMTNCameroon, isGoodNumtelOrangeCameroon } from "../../tools/verification/RegExp";
import { imgSorry, logoOrange, logoMTN } from "../../tools/ressources/Images"
import momo from "../../tools/sms-scrapping/MOMO/momo";
import om from "../../tools/sms-scrapping/OrangeMoney/om";

const loading = require("../../ressources/images/loader.gif");
export default class NoFinancialSMS extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isOneNumberGot: false,
            orangeNumber: "",
            mtnNumber: "",
            isLoading: false,
            buttonDisabled: true,
            isThereError: false,
            isNumTelOragneCorrect: false,
            isNumTelMTNCorrect: false
        }
    }
    setUpNumber(operator) {
        console.log("Regardons le numéro entré")
        if (this.verifyNumber(operator)) {

            if (!this.state.isOneNumberGot) {
                this.setState({ isOneNumberGot: true });
                this.enableButton();
            } else if ( (! this.state.isNumTelMTNCorrect) && !(this.state.isNumTelOragneCorrect)) {
                this.setState({ isOneNumberGot: false });
                this.disableButton();
            }
        }
    }
    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName, data);
    }
    enableButton() {
        this.setState({ buttonDisabled: false })
    }
    disableButton() {
        this.setState({ buttonDisabled: true })
    }
    startAsyncOperation() {
        this.disableButton();
    }
    endAsyncOperation() {
        this.setUpNumber();
    }
    verifyNumber(operator) {
        if (!operator) return (this.verifyNumber(om.address) || this.verifyNumber(momo.address) );
        if (operator == om.address) {
            const isGood = isGoodNumtelOrangeCameroon.test(this.state.orangeNumber);
            this.setState({ isNumTelOragneCorrect: isGood })
            return isGood;
        }
        if (operator == momo.address) {
            const isGood = isGoodNumtelMTNCameroon.test(this.state.mtnNumber);
            this.setState({ isNumTelMTNCorrect: isGood })
            return isGood;
        }

    }
    async createCompteFinanciers() {
        this.startAsyncOperation()
        try {
            if (this.state.isNumTelOragneCorrect) await sendCreateCompteFinancier(om.address, this.state.orangeNumber);
            if (this.state.isNumTelMTNCorrect) await sendCreateCompteFinancier(momo.address, this.state.mtnNumber);
            const OMEInfo = {
                orangeNumber: (this.state.isNumTelOragneCorrect)? this.state.orangeNumber : "-",
                orangeSommeEntree:  0,
                orangeSommeSortie:  0,
                mtnNumber:  (this.state.isNumTelMTNCorrect)? this.state.mtnNumber : "-",
                mtnSommeEntree: 0,
                mtnSommeSortie: 0,
            }
            this.gotToPage("PreviewOfResult",OMEInfo)
        } catch (error) {
            if (error.message == "Network Error") console.log("Erreur pas de connection");
        }

        finally {
            this.endAsyncOperation()
        }

    }

    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgSorry} />

                    <Text style={styles.title} >Pas de SMS d’OME trouvé sur votre téléphone</Text>
                    <Text style={styles.content} >Vous n’avez pas de SMS de notification des operateurs de monnaie electronique à transformer en transaction</Text>
                    <Text style={styles.content} >Veuillez entrer vos numeros ici pour commencer</Text>
                    <View style={styles.boxInputNum}>

                        <View style={styles.containernumber}>
                            <Image style={styles.logo} source={logoOrange} />
                            <TextInput style={styles.input}
                                onChangeText={(text) => {
                                    this.setState({ orangeNumber: text })
                                }}
                                onEndEditing={() => {
                                    this.setUpNumber(om.address)
                                }}
                            />
                        </View>

                        <View style={styles.containernumber}>
                            <Image style={styles.logo} source={logoMTN} />
                            <TextInput style={styles.input}
                                onChangeText={(text) => {
                                    this.setState({ mtnNumber: text })
                                }}
                                onEndEditing={() => {
                                    this.setUpNumber(momo.address)
                                }}

                            />
                        </View>

                    </View>
                    <Pressable style={(this.state.buttonDisabled) ? styles.buttonDisable : styles.button} disabled={this.state.buttonDisabled} onPress = {()=>{this.createCompteFinanciers()}} >
                        <Text style={styles.buttonText}>Suivant</Text>
                        {this.state.isLoading && <Image source={loading} style={styles.loading}></Image>}
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

    boxInputNum: {
        marginBottom: 30
    },
    containernumber: {
        flexDirection: "row",
        marginVertical: 6
    },
    input: {
        backgroundColor: "#EDEDED",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        color: "black",
        borderRadius: 8,
        height: 40,
        width: 210
    },
    logo: {
        height: 42,
        width: 42,
        borderRadius: 42 / 2,
        marginHorizontal: 15

    },
    appLogo: {
        marginTop: 30,

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
        color: "black"
    },
    content: {
        padding: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        color: "black"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    buttonDisable: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#EDEDED"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#FFCC00",
        flexDirection: "row"
    },
    loading: {
        position: 'absolute',
        height: 40,
        width: 40,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
      }
});
