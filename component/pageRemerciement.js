import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, Pressable, Button } from 'react-native';

const imageGoodShiled = require("../res/yesCoeur.png");
export default class PageRemerciement extends React.Component {

    render() {
        return (
            <ScrollView style={styles.scrollView}>
                <View style={styles.circleRetour}> {"<"} </View>
                <View style={styles.mainView}>
                    <Image source={imageGoodShiled} style={styles.image} />
                    <Text style={styles.text2}>Merci d’avoir participé</Text>
                    
                    <Text style={styles.text}>J’espere que vous avez apprecié l’expérience de la catégorisation automatique de vos informations de paiements.</Text>
                    <Text style={styles.text}>Nous developpons une version plus complete de cette application avec de nouvelles fonctionnalités.</Text>
                    <Text style={styles.text}>
                        Vous pouvez nous souteniret faire partie de nos utilisateurs privilégiés à vie, en souscrivant à une de nos offres de precommande.de l’application Mapossa SmartWallet</Text>
                    <View style = {styles.buttonPrecommende}>
                        <Button color={"#FFCC00"}  title="Precommander"></Button>
                    </View>
                    
                    
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    circleRetour : {
        height : 30,
        width : 30,
        borderRadius : 30/2,
        borderRadius :1,
        borderColor :"black"
    },
    buttonPrecommende : {
        "color":"#FFCC00",
        borderRadius : 100,
        "marginTop":"10%"
    },
    scrollView: {
        backgroundColor: "white",
        padding: "8%"
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75 / 2,
        alignSelf: "center",
        marginTop: "4%",
    },
    mainView: {

        flexDirection: "column"
    },
    line: {
        marginTop: "10%",
        marginHorizontal: "5%",
        height: 2,
        backgroundColor: "#F1F1F1"
    },
    text1: {
        color: "#535353",
        fontFamily: "Roboto",
        fontSize: 16,
        textAlign: "center",
        marginTop: "5%",


    },
    text2: {
        color: "black",
        fontWeight: "bold",
        fontFamily: "Poppins",
        textAlign: "center",
        marginTop: "5%",
        fontSize: 24,
        marginHorizontal: "10%"
    },
    text: {
        textAlign: "center",
        color: "#535353",
        marginTop: "10%",
        fontSize :16
    },
    text4: {
        color: "black",
        textAlign: "center",
        fontStyle: "italic",
        marginBottom: "25%"
    },
    text5: {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        marginTop: "10%"
        //marginBottom: "25%"
    }
})