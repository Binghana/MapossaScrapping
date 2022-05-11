import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
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

    isEmailVerified(){
        return auth.currentUser.emailVerified;
    }
    componentDidMount() {

        if (this.props.navigation.params) {
            if (this.props.navigation.params.email) {
                this.setState({ email: this.props.navigation.params.email })
            }
        }

    }
    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    render() {
        return (
            <ScrollView style={styles.main}>
                <Image source={logoEmail} style={styles.image} />
                <View style={styles.boxCentral}>

                    <Text style={styles.title} >Confirmez votre adresse email</Text>
                    <Text style={styles.email} > {this.state.email} </Text>
                    <Text style={styles.content} >Nous vous avons envoyé un email de confirmation. Consultez votre boite de reception et cliquez sur le lien pour confirmer votre adresse email.</Text>

                    <Pressable style={styles.button} onPress={() => { this.goToPage("RequestPermission") }} >
                        <Text style={styles.buttonText}>J'ai déjà vérifier mon email</Text>
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
        fontSize : 18,
        alignSelf : "center",
        fontWeight : "500"
    },
    image: {
        marginTop : 120,
        height : 60,
        width : 60,
        alignSelf : "center"
    },
    email: {
        marginTop: 20,
        color : "black",
        fontSize : 24,
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
        fontSize: 18,
        fontWeight: "400",
        color: "black"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 30,
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: "#cdcdcd"
    },
    buttonText: {
        fontSize: 11,
        //fontHeight: 12,
       
        color: '#ffffff',
    }
});
