import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { createUsersCompteFinanciers } from "../../contollers/Functions/appManagement";
import { filter, requestPermissions } from "../../contollers/Functions/SMS";
import  SmsAndroid  from "react-native-get-sms-android-v2";

const img1 = require('../../res/LogoScrap.png');

export default class ActivationScreen extends React.Component {
  
  async componentDidMount () {
    try {
      console.log( "Nous sommes arrivés sur la page de téléchargement")
      if (await requestPermissions() ){
        console.log("Récuperons les sms de l'utilisateur")
        return SmsAndroid.list(
          JSON.stringify(filter),
          fail => {
            throw fail;
          },
          async (count, smsList) => {
            const tabSMS = JSON.parse(smsList)
            console.log("on a récupéré" + tabSMS.count)
            
            createUsersCompteFinanciers(tabSMS)
          
          },
        );
      }else {
        throw new Error("Impossible de lire les sms de l'utilisateur car la permissions a été refusé");
      }
    } catch (error) {
      console.error(error);
    }
    
  }
  render() {
    return (
      <ScrollView style = {styles.main}>
        <View style = {styles.info}>
        <Text style={styles.content}> IdFirebase : {this.props.route.params.data.data.id }  </Text>
          <Text style={styles.content}> IdAdalo : {this.props.route.params.data.data.idAdalo} </Text>
          <Text style={styles.content}> Email : {this.props.route.params.data.data.email} </Text>
        </View>
        <View style={styles.boxCentral}>
          
          <Image style={styles.image} source ={img1}/>
          <View style={styles.espace1}/>
          <Text style={styles.title} >Plugin Installé avec succès</Text>
          <Image style={styles.espace2}/>
          <Text style={styles.content} >Vos transactions seront affichées dans l’application Mapossa SmartWallet</Text>
          <View style={styles.espace3}/>
          <Pressable style={styles.button} >
            <Text style={styles.buttonText}>Télecharger sur Google Play</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  info : {
    borderWidth:1,
    borderColor: "#E9E9E9",
    marginTop: 10,
    alignSelf: "center",
    height : 50,
    width : 200,
    borderRadius: 200/2,
    
  },
  main : {
    backgroundColor : "white"
  },
  boxCentral: {
    marginTop: 130,
    marginHorizontal: '8%',
    alignSelt: 'center',

  },
  image: {
    alignSelf: "center",
    height: 145,
    width: 145,
  },
  espace1: {
    height: 50,
  },
  espace2: {
    height: 10,
  },
  espace3: {
    height: 44,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  content: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    color: "black"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 48,
    borderRadius: 8,
    backgroundColor: "#E9E9E9"
  },
  buttonText: {
    fontSize: 16,
    //fontHeight: 12,
    fontWeight: 'bold',
    color: '#000000',
  }
});
