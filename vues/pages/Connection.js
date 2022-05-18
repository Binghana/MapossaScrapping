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


import { isGoodEmail } from "../../contollers/RegExp.js"
import { removeSpaceOfString } from "../../contollers/utilities";

import { ERROR_EMAIL_NOT_REGISTERED, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_NO_NETWORK, ERROR_UNKNOW_ERROR, ERROR_USER_DISABLED, ERROR_WEAK_PASSWORD } from "../../contollers/ErrorMessages";

import auth from "@react-native-firebase/auth"

const logiMapo = require("../../res/logo_mapossa_scrap.png");
const loading = require("../../res/loader.gif");


import { sdkAuthError } from "../../contollers/SDK-auth-error";
import { isPermissionGranted } from "../../contollers/Functions/SMS";



export default class Connection extends React.Component {

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

    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName, data);
    }
    verifyEmail() {
        this.setState({ isEmailGood: isGoodEmail.test(this.state.email) }, () => {
            if (!this.state.isEmailGood) this.setState({
                isThereError: true, error: JSON.stringify({ message: ERROR_INVALID_EMAIL })

            })
            this.enableButton();
        })
    }

    verifyPassword() {
        this.setState({ isPassWordGood: this.state.password.length > 7 }, () => {
            if (!this.state.isPassWordGood) this.setState({
                isThereError: true, error: JSON.stringify({ message: ERROR_WEAK_PASSWORD })

            })
            this.enableButton()
        })
    }

    enableButton() {
        let res = this.state.isEmailGood && this.state.isPassWordGood
        this.setState({ isButtonDisabled: !res });
    }

    async loginUser() {

        try {
            this.startAsyncOperation();

            const userCredential = await auth().signInWithEmailAndPassword(this.state.email, this.state.password);


            console.log("User has logged in successfully")
            console.log(userCredential);
            const user = userCredential.user;
            // await setUserCredentials(user);
            // console.log("user saved successfully on login")

            this.endAsyncOperation()
            //if (!user.emailVerified) return this.gotToPage("ShouldVerifyEmail", { email: this.state.email });
            if (!(await isPermissionGranted())) return this.gotToPage("RequestPermission")
            return this.gotToPage("PluginInstalledSuccessfully");

        } catch (error) {

            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            this.setState({ isThereError: true, error: JSON.stringify(error) })
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

    goToPageActivation() {
        console.log("Allons sur la page de demande d'autorisation")
        this.props.navigation.navigate('RequestPermission');
    }
    goToPageAccessDenied() {
        console.log("Allons sur la page d'autorisation refulsé")
        this.props.navigation.navigate('AutorisationDenied');
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
                <View >
                    <Pressable onLongPress={() => { this.goToPageActivation() }}  >
                        <Image source={logiMapo} style={styles.image} />

                    </Pressable>

                </View>
                <View style={styles.espace1}></View>
                <View>
                    <Text style={styles.pageTitle}>Se connecter</Text>
                </View>
                <View style={styles.espace1}></View>
                <View>
                    <Text style={styles.label}>Email</Text>
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
                <View style={styles.espace3}></View>
                <View>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.espace2}></View>
                    <TextInput
                        placeholder="Insérez votre mot de passe..."
                        placeholderTextColor="#000"
                        onEndEditing={() => { this.verifyPassword() }}
                        secureTextEntry={true}
                        onChangeText={(pw) => {
                            this.doingNewAction()
                            this.setState({ password: pw },)
                        }}
                        style={styles.input}
                    />
                </View>
                <View style={styles.espace4}></View>
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
                            this.loginUser();

                        }}
                    >
                        <Text style={styles.buttonText}>SE CONNECTER</Text>

                        {/* <ActivityIndicator size="large" color="#00ff00" /> */}
                        {this.state.isLoading && <Image source={loading} style={styles.loading}></Image>}
                    </Pressable>
                    <Pressable onPress={() => {
                        console.log("Allons réinitialiser le mot de passe")
                        this.gotToPage("ResetPassword");
                    }}>
                        <Text style={styles.textMedium}> Mot de passe oublié ? </Text>
                    </Pressable>
                    <Pressable onPress={() => {
                        console.log("Allons créer un compte")
                        this.gotToPage("Inscription");
                    }}>
                        <Text style={styles.textLow}> Vous n’avez pas de compte ? </Text>
                    </Pressable>

                    {this.state.isThereError && <Text style={styles.textError}> {this.showErrorInfo()}</Text>}
                </View>
            </ScrollView>
        );
    }

}
const styles = StyleSheet.create({
    textMedium : {
        marginTop: 25,
        color: "black",
        alignSelf: "center",
        fontSize : 16,
        fontWeight : "800"
    },
    textLow: {
        marginTop: 20,
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
        fontSize: 25,
        fontWeight: "bold"
    },
    espace1: {
        height: 50
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
        height: 40,
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
        backgroundColor: "#FFCC00"
    },
    show: { borderColor: "red", borderWidth: 1 }
});
