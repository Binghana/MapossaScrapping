import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';

const imageGoodShiled = require("../res/Protect.png");
export default class TermsOfUse extends React.Component {

    render() {
        return(
            <ScrollView style={styles.scrollView}>
                <View style = {styles.mainView}>
                    <Image source={imageGoodShiled} style={styles.image} />
                    <Text style={styles.text1}>Nous avons besoin que vous compreniez que nous construisons ensemble</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.text2}>Pourquoi nous avons besoin de vos SMS de confirmation de paiement</Text>
                    <Text style={styles.text}>La fonction première de Mapossa est d'automatiser la gestion de votre argent
                        de manière à ce que vous vous concentrez sur ce qui à de la valeur pour vous.</Text>
                    <Text style={styles.text}>
                        Nous transformons les SMS de confirmation de transaction en des paiements,
                        pour de meilleure informations qualitative sur l'utilisation de votre argent. </Text>
                    <Text style={styles.text}>De par notre politique de confidentialité, nous identifions uniquement les
                        messages des Opérateurs de Monnaie électronique (MoMo, OM, YUP, ...)</Text>
                    <Text style={styles.text}>Nous respectons votre vie privée et donc, nous n’accédons pas aux autres contenus de vos messages . (Consultez nos CGU)</Text>
                    <Text style={styles.text}>Ces messages sont ensuite traiter par notre algorithme pour créer sur votre
                        espace des informations financières qualitatives et quantitative (montant, compte
                        financier, solde, ...) </Text>
                    <Text style={styles.text}>Parce que nous respectons votre vie privée, nous n'accédons pas aux autres contenus
                        de vos messages personnels (consultez nos mention légal)</Text>
                    <Text style={styles.text}>La transformation de vos SMS de confirmation de paiement est une fonctionnalité
                        cruciale pour MAPOSSA pour déployer la valeur ajouté à l'automatisation de la gestion
                        financière</Text>
                    <Text style={styles.text}>Si vous ne donnez pas l'accès au SMS de votre téléphone androïde, c'est que vous ne souhaitez
                        pas expérimenter l'organisation automatisée de vos informations financières. Si tel est le cas
                        vous pouvez désinstaller notre application. </Text>
                    <Text style={styles.text5}>César ZInga,</Text>
                    <Text style={styles.text4}>Financièrement votre.</Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    scrollView:{
        backgroundColor: "white",
        padding:"8%"
    },
    image : {
        width:75,
        height:75,
        borderRadius:75/2,
        alignSelf:"center",
        marginTop: "4%",
    },
    mainView:{
        
        flexDirection: "column"
    },
    line: {
        marginTop:"10%",
        marginHorizontal:"5%",
        height: 2,
        backgroundColor: "#F1F1F1"
    },
    text1 : {
        color: "#535353",
        fontFamily:"Roboto",
        fontSize:16,
        textAlign:"center",
        marginTop:"5%",
        

    },
    text2 : {
        color: "black",
        fontWeight:"bold",
        fontFamily:"Poppins",
        textAlign: "center",
        marginTop:"5%",
        fontSize:18,
        marginHorizontal:"10%"
    },
    text : {
        textAlign: "center",
        color:"#535353",
        marginTop:"5%"
    },
    text4 :{
        color: "black",
        textAlign:"center",
        fontStyle: "italic",
        marginBottom:"25%"
    },
    text5 : {
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
        marginTop:"10%"
        //marginBottom: "25%"
    }
})