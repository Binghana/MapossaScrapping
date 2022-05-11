import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { ERROR_EMAIL_NOT_VERIFIED } from "../../contollers/ErrorMessages";
import { isPermissionGranted } from "../../contollers/Functions/SMS";
import { auth } from "../../environment/config";


import { logoEmail } from "../../res/Images"
export default class ShouldVerifyEmail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "example@gmail.com",
            isThereError : false,
            errorMessage : "Une erreur est survennue",
        }
    }

    isUserEmailVerified(){
        return auth.currentUser.emailVerified;
    }
    componentDidMount() {
        
        if (this.props.route.params) {
            if (this.props.route.params.email) {
                this.setState({ email: this.props.route.params.email }, ()=>{
                    setTimeout(()=>{
                        this.doingNewAction();
                    }, 10000)
                })
            }
        }

    }
    
    async verifyIfUserHasVErifiedEmail(){
        if(this.isUserEmailVerified()){
            if (!await isPermissionGranted()) return this.goToPage("RequestPermission");
            return this.goToPage("PluginInstalledSuccessfully");
        }else {
            this.setState({isThereError : true , errorMessage : ERROR_EMAIL_NOT_VERIFIED })
        }
    }
    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    doingNewAction(){
        this.setState({isThereError : false })
    }
    render() {
        return (
            <ScrollView style={styles.main}>
                <Image source={logoEmail} style={styles.image} />
                <View style={styles.boxCentral}>

                    <Text style={styles.title} >Confirmez votre adresse email</Text>
                    <Text style={styles.email} > {this.state.email} </Text>
                    <Text style={styles.content} >Nous vous avons envoyé un email de confirmation. Consultez votre boite de reception et cliquez sur le lien pour confirmer votre adresse email. Ensuite cliquez sur le bouton ci-dessous pour continuer</Text>

                    <Pressable style={styles.button} onPress={() => { this.verifyIfUserHasVErifiedEmail() }} >
                        <Text style={styles.buttonText}>J'ai déjà vérifié mon email</Text>
                    </Pressable>
                    { this.state.isThereError && <Text style = {styles.textError} > {this.state.errorMessage}</Text>}

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    textError : {
        marginTop : 10,
        padding: 10,
        color : "red",
        alignSelf : "center"
    },
    title : {
        marginTop : 30,
        color  : "#434343",
        fontSize : 22,
        alignSelf : "center",
        fontWeight : "600"
    },
    image: {
        marginTop : 120,
        height : 60,
        width : 60,
        alignSelf : "center"
    },
    email: {
        marginTop: 10,
        color : "black",
        fontSize : 18,
        fontWeight : "bold",
        alignSelf : "center"
    },
    appLogo: {
        marginTop: 40,
        marginBottom: 90,
        width: 100 * 1.1,
        height: 75 * 1.1,
        alignSelf: "center"
    },
    main: {
        backgroundColor: "white"
    },
    boxCentral: {
        marginHorizontal: '8%',
        alignSelt: 'center',

    },
    content: {
        marginTop: 25,
        padding: 10,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "300",
        color: "black"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: "#E9E9E9"
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        fontWeight : "bold"
    }
});
