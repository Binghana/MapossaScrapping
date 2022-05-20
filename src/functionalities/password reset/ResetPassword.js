import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    TextInput,
} from "react-native";


import { isGoodEmail } from "../../tools/verification/RegExp"
import { removeSpaceOfString } from "../../tools/utilities";

import { ERROR_EMAIL_NOT_REGISTERED, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_NO_NETWORK, ERROR_UNKNOW_ERROR, ERROR_USER_DISABLED, ERROR_WEAK_PASSWORD } from "../../tools/error/ErrorMessages";

import auth from "@react-native-firebase/auth"

const logiMapo = require("../../ressources/images/logo_mapossa_scrap.png");
const loading = require("../../ressources/images/loader.gif");


import { sdkAuthError } from "../../tools/error/SDK-auth-error";




export default class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isButtonDisabled: true,
            email: "",
            isEmailGood: false,
            password: "",
            isPassWordGood: false,
            isTermsOfuseAndPrivacyPolicyAccepted: true,
            isLoading: false,
            isThereError: false,
            error: {

            }
        };

    }

    verifyEmail() {
        this.setState({ isEmailGood: isGoodEmail.test(this.state.email) }, () => {
            if (!this.state.isEmailGood) this.setState({
                isThereError: true, error: JSON.stringify({ message: ERROR_INVALID_EMAIL })

            })
            this.enableButton();
        })
    }


    enableButton() {
        let res = this.state.isEmailGood
        this.setState({ isButtonDisabled: !res });
    }

    async sendResetPasswordEmail() {
        try {
            this.startAsyncOperation()
            console.log("Envoyons l'email de rénitialisation de mot de paase")

            await auth().sendPasswordResetEmail(this.state.email);
            this.endAsyncOperation()
            this.gotToPage("ResetPasswordEmailSend")
            
        } catch (error) {

            console.log("Une erreur est survennue lors de l'envoi de l'email de vérification")
            this.setState({ isThereError: true, error: JSON.stringify({ code: error.code, ...error }) })
            this.endAsyncOperation()

        }

    }
    startAsyncOperation() {
        console.log("Une operation asynchrone commence, montrons le loading")
        this.setState({ isLoading: true, isButtonDisabled: true })
    }
    endAsyncOperation(disable = false) {
        console.log("Fin de l'opération asynchrone")
        this.setState({ isLoading: false, isButtonDisabled: disable })
    }

    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName, data);
    }
    showErrorInfo() {
        const err = JSON.parse(this.state.error)
        console.log("Le statut de l'erreur est")
        console.log(err.status)
        console.log(err)
        if ("code" in err) {

            const errorcode = err.code;
            if (errorcode == sdkAuthError.INVALID_EMAIL) return ERROR_INVALID_EMAIL;
            if (errorcode == sdkAuthError.NETWORK_REQUEST_FAILED) return ERROR_NO_NETWORK;
            if (errorcode == sdkAuthError.INVALID_PASSWORD) return ERROR_INVALID_PASSWORD;
            if (errorcode == sdkAuthError.USER_DELETED) return ERROR_EMAIL_NOT_REGISTERED;
            if (errorcode == sdkAuthError.USER_DISABLED) return ERROR_USER_DISABLED;
            return err.code;

        }
        if (err.message && err.message == "Network Error") return ERROR_NO_NETWORK;

        if (err.status == 500) {
            if ("data" in err) {
                if (err.data.message == "Une érreur s'est produite") {
                    if (err.data.errorData) {
                        return JSON.stringify(err.data.errorData);
                    }
                }
            }
            else {
                return ERROR_UNKNOW_ERROR;
            }
        }
        if (err.message == ERROR_INVALID_EMAIL) return ERROR_INVALID_EMAIL;
        if (err.message == ERROR_WEAK_PASSWORD) return ERROR_WEAK_PASSWORD;

        return ERROR_UNKNOW_ERROR;
    }
    hideErrorInfo() {
        this.setState({ isThereError: false });
    }
    doingNewAction() {
        if (this.state.isThereError) this.hideErrorInfo();
    }
    render() {
        return (
            <ScrollView style={styles.main}>


                <View style={styles.espace1}></View>
                <View>
                    <Text style={styles.pageTitle}> Mot de passe oublié ? </Text>
                </View>
               
                    <Text style={styles.highLabel}>Veuillez saisi l'adresse email utilisé pour créer votre compte utilisateur</Text>
                

                <View style = {styles.containerMain} >
                    <Text style={styles.label}>Adresse email</Text>
                    <View style={styles.espace2}></View>
                    <TextInput
                        onChangeText={(email) => {
                            this.doingNewAction()
                            this.setState({ email: removeSpaceOfString(email) },)
                        }}
                        onEndEditing={() => {
                            this.verifyEmail()
                        }}
                        style={styles.input}
                        placeholder="Insérez votre adresse email..."
                        placeholderTextColor="#000"
                    />
                </View>
                <View style={styles.buttonContainer}>

                    <Pressable
                        id="button"
                        disable={this.state.isButtonDisabled}
                        style={
                            this.state.isButtonDisabled
                                ? styles.buttonDisable
                                : styles.buttonEnable
                        }
                        onPress={() => {
                            this.sendResetPasswordEmail()

                        }}
                    >
                        <Text style={styles.buttonText}>Envoyer un lien de récupération</Text>

                        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
                        {this.state.isLoading && <Image source={loading} style={styles.loading}></Image>}
                    </Pressable>
                    {this.state.isThereError && <Text style={styles.textError}> {this.showErrorInfo()}</Text>}
                </View>
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    containerMain : {
        marginTop : 50
    }, 
    highLabel: {
        marginTop : 50,
        fontSize : 18,
        fontWeight : "600",
        color : "black",
        marginHorizontal : 35,
        textAlign : "center"
    },
    textLow: {
        marginTop: 10,
        color: "black",
        alignSelf: "center",

    },
    textError: {
        color: "red",
        alignSelf: "center",
        marginTop: 10,
        textAlign: "justify",
        paddingHorizontal: 20

    },
    link: {
        color: "blue",
        textDecorationLine: 'underline'
    },
    buttonContainer: {
        marginTop : 40
    },
    container: {
        flexDirection: "row",
        marginLeft: "10%"
    },
    containerCGU: {

    },
    checkboxContainer: {
        flex: 0.2,


    },
    checkbox: {

    },

    loading: {
        position: 'absolute',
        height: 40,
        width: 40,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {

        margin: 8,
    },
    main: {
        backgroundColor: "white"
    }
    ,
    pageTitle: {
        color: "black",
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold"
    },
    espace1: {
        height: 50,
        marginTop: 60
    },
    espace2: {
        height: 20
    },
    espace3: {
        height: 30
    },
    espace4: {
        height: 40
    },
    image: {
        alignSelf: "center",
        padding: 5,
        height: 100,
        width: 150,
        borderColor: "red"
    },
    label: {
        marginLeft: "5%",
        color: "black"
    },
    input: {
        backgroundColor: "#EDEDED",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        color: "black",
        borderRadius: 8,
        height: 40
    },
    buttonEnable: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width : 286,
        alignSelf : "center",
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#FFCC00"
    },
    buttonText: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white"
    },
    buttonDisable: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width : 286,
        alignSelf : "center",
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#EDEDED"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 48,
        width : 286,
        alignSelf : "center",
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#FFCC00"
    },
    show: { borderColor: "red", borderWidth: 1 }
});
