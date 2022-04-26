import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { logoOrange, logoMTN, imgArrowDown, imgArrowUp } from "../../res/Images"
export default class PreviewOfResult extends React.Component {

    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Text style={styles.title} >Bref résumé de vos flux financiers</Text>
                    <View style={styles.boxPreviewTr}>

                        <View style = {styles.boxOME}>
                            <Image style={styles.logo} source={logoMTN} />
                            <View style = {styles.boxMTN}>
                                
                                <Text style = {styles.textNumero}>+237 699 000 111</Text>
                                <View>
                                    <View>
                                        <Text style = {styles.textTypeFinal}>Entrant</Text>
                                        <View>
                                            <Image style={styles.logo} source={imgArrowDown} />
                                            <Text style = {styles.textMontant}>34 600 FCFA</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style = {styles.textTypeFinal}>Sortant</Text>
                                        <View>
                                            <Image style={styles.logo} source={imgArrowUp} />
                                            <Text style = {styles.textMontant}>29 270 FCFA</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text>Sortant</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>

                    <Text style={styles.content} >Accedez à une analyse complète de votre argent dans l’application Mapossa SmartWallet</Text>
                    <Pressable style={styles.button} >
                        <Text style={styles.buttonText}>Ouvrir Mapossa SmartWallet</Text>
                    </Pressable>

                </View>

            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    boxOME : {
        flexDirection : "row",
    },
    boxMTN : {
        flexDirection : "row",
    },
    textMontant : {
        color : "black"
    },
    textTypeFinal : {
        color : "grey"
    },
    textNumero : {
        color : "black"
    },
    boxPreviewTr: {
        borderWidth: 1
    },
    appLogo: {
        marginTop: 80,

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
    logoMin: {
        height: 20,
        width: 20,
        borderRadius: 20 / 2,
        marginHorizontal: 15,
        borderWidth : 1

    },
    logo: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginHorizontal: 15

    },
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "500",
        color: "#515151",
        fontStyle: "normal",
        marginTop: 100
    },
    content: {
        padding: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        color: "black"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginHorizontal: "5%",
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
