import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { verifyVersion } from "../tools/appManagement";

import { isPermissionGranted } from "../tools/SMS/AskPermissions";
import { splashScreenLogo } from "../tools/ressources/Images";
import auth from "@react-native-firebase/auth"

import messaging from '@react-native-firebase/messaging';

export default class SpalshScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isThereError: false,
            errorMessage: "Une erreur est survennue",
            initializing: true,
            user: null
        }
    }
    async componentDidMount() {
        await this.initApp()
    }
    async initApp() {
        try {
           
            await verifyVersion()
            console.log("Version compatible")
        } catch (error) {
            if (error.message = "Network Error") {
                this.setState({ isThereError: true, error: JSON.stringify(error) })
            } else
                if (error instanceof AppError) {
                    if (error.message == AppError.ERROR_APP_VERSION_DISMATCH) this.gotToPage("RequestUpdateAPP");
                }
        }
        await this.verifyUser()
    }
    async verifyUser() {
        messaging().getToken().then((token)=> {
            console.log("Voici le token pour les notifications")
            console.log(token)
        })
        // messaging().onMessage((message)=>{
        //     console.log("On a recu un message")
        //     console.log(message)
        // })
        
        auth().onAuthStateChanged(async (user) => {
            console.log("auth state changed")
            console.log(user)


            if (user) {
                console.log("On reconnait qu'il ya un utilisateur")
                console.log(user)
                let permissionsGranted = await isPermissionGranted()
                //if (!user.emailVerified) return this.goToPage("ShouldVerifyEmail");
                if (!permissionsGranted) return this.goToPage("AutorisationDenied");

                return this.goToPage("PluginInstalledSuccessfully")

            } else {
                console.log("There is no user Cred")
                return this.goToPage("Inscription")

            }
        })
        


        //const user = auth.currentUser


    }

    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={splashScreenLogo} />

                    <Text style={styles.title} >Scrapping App</Text>


                    {/* <Pressable style={styles.button} onPress = {this.goToPage("RequestPermission")} >
                        <Text style={styles.buttonText}>J'ai Comrpis</Text>
                    </Pressable> */}

                </View>
                <Text style={(this.state.isThereError) ? styles.textError : styles.textInvisible}> {this.state.errorMessage} </Text>
                <Text style={styles.lowMapossa} >Mapossa</Text>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    textError: {

        padding: 10,
        color: "red",
        alignSelf: "center"
    },
    textInvisible: {
        padding: 10,
        color: "white",
        alignSelf: "center"
    },
    appLogo: {
        marginTop: 140,
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    main: {
        flex: 1,
        flexWrap: "nowrap",
        backgroundColor: "white",

    },
    boxCentral: {
        marginHorizontal: '8%',
        alignSelt: 'center',

    },
    title: {
        textAlign: "center",
        fontSize: 26,
        fontWeight: "400",
        color: "#41474F"
    },
    lowMapossa: {
        color: "#757575",
        fontSize: 14,
        alignSelf: "center",

        marginTop: "65%",


    }

});
