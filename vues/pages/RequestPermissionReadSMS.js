import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { requestPermissions } from "../../contollers/Functions/SMS";

import { logoOrange, logoMTN, logoMapossaScrapping } from "../../res/Images"



export default class RequestPermissionReadSMS extends React.Component {
    async requestPermissions() {
        const permissionsGranted = await requestPermissions();
        if (permissionsGranted) this.goToPage("PreviewOfResult");
        else this.goToPage("AutorisationDenied");
    }

    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={logoMapossaScrapping} />

                    <Text style={styles.title} >Demande d’autorisation préalable</Text>

                    <Text style={styles.content} >Mapossa a besoin de vos SMS de confirmation de paiement </Text>

                    <View style={styles.boxLogo}>
                        <Image style={styles.logo} source={logoOrange}></Image>
                        <Image style={styles.logo} source={logoMTN}></Image>
                    </View>

                    <Text style={styles.content} >pour retrouver vos transactions passées et vous permettre de les catégoriser</Text>

                    <Pressable style={styles.button} onPress={() => { this.requestPermissions() }} >
                        <Text style={styles.buttonText}>Autoriser</Text>
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    appLogo: {
        marginTop: 40,
        marginBottom: 90,
        width: 100 * 1.1,
        height: 75 * 1.1,
        alignSelf: "center"
    },
    boxLogo: {
        flexDirection: "row",
        alignSelf: "center"
    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginHorizontal: 15

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
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: "#FFCC00"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});
