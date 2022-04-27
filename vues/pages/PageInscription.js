import React from "react";
import CheckBox from "@react-native-community/checkbox";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  TextInput,
  //ActivityIndicator
} from "react-native";
import { urlConditionGeneralUtilisation, urlPolitiqueConfidentialite } from "../../contollers/APIRequest/Const";
import { createAdaloUser, sendCreateUserRequest } from "../../contollers/APIRequest/User";
import { getIdUser } from "../../contollers/Functions/appManagement";
import { isGoodEmail } from "../../contollers/RegExp.js"
import { openUrl, removeSpaceOfString } from "../../contollers/utilities";
import storage from "../../storage";
import { ERROR_CGU_NOT_ACCEPTED, ERROR_EMAIL_ALREADY_USE, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_NO_NETWORK, ERROR_UNKNOW_ERROR } from "../../contollers/ErrorMessages";
import { logEvent } from "firebase/analytics";
import { analytics, auth , db } from "../../environment/config";
import { collection, setDoc , doc } from "firebase/firestore"; 


const logiMapo = require("../../res/logo_mapossa_scrap.png");
const loading = require("../../res/loader.gif");

import { createUserWithEmailAndPassword } from "firebase/auth";


export default class PageInscription extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isButtonDisabled: true,
      email: "",
      isEmailGood: false,
      password: "",
      isPassWordGood: false,
      isTermsOfuseAndPrivacyPolicyAccepted: false,
      isLoading: false,
      isThereError: false,
      error: {
        body: "",
        title: "Une erreur es surennue"
      }
    };

  }
  async componentDidMount() {
    let idUser = await getIdUser();
    if (idUser) {
      this.goToPageActivation({ data: { id: idUser } })
    }
  }
  verifyEmail() {
    this.setState({ isEmailGood: isGoodEmail.test(this.state.email) }, () => {
      if (!this.state.isEmailGood) this.setState({
        isThereError: true, error: {
          body: JSON.stringify({ message: ERROR_INVALID_EMAIL })
        }
      })
      this.enableButton();
    })
  }
  verifyPassword() {
    this.setState({ isPassWordGood: this.state.password.length > 7 }, () => {
      if (!this.state.isPassWordGood) this.setState({
        isThereError: true, error: {
          body: JSON.stringify({ message: ERROR_INVALID_PASSWORD })
        }
      })
      this.enableButton()
    })
  }

  enableButton() {
    let res = this.state.isEmailGood && this.state.isPassWordGood && this.state.isTermsOfuseAndPrivacyPolicyAccepted
    console.log(res)

    this.setState({ isButtonDisabled: !res });
  }
  async createUser() {

    try {
      this.startAsyncOperation();
      const userCredential = await createUserWithEmailAndPassword(auth, this.state.email, this.state.password);

      console.log(userCredential);
      const user = userCredential.user;
      //const res = await createAdaloUser(this.state.email , this.state.password , userCredential.user.uid, userCredential.user.getIdToken() );
      await this.createUserOnFirestore(user.uid)



    } catch (error) {
      console.log(error)
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    }
    this.endAsyncOperation();

  }
  async createUserOnFirestore (uid,idAdalo = 0) {
    try {
      const docRef = await setDoc(doc(db,"users",uid), {
          idAdalo : idAdalo,

      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  startAsyncOperation() {
    console.log("Une operation asynchrone commence, montrons le loading")
    this.setState({ isLoading: true, isButtonDisabled: true })
  }
  endAsyncOperation(disable = false) {
    console.log("Fin de l'opération asynchrone de l'opération")
    this.setState({ isLoading: false, isButtonDisabled: disable })
  }
  acceptCGUAndPrivacyPolicy(accepted) {
    console.log("checkons les cgu")
    if (accepted) {
      this.setState({ isTermsOfuseAndPrivacyPolicyAccepted: true }, async () => {
        this.enableButton()
      })
    } else {
      this.setState({ isTermsOfuseAndPrivacyPolicyAccepted: false }, () => {

        this.setState({
          isThereError: true, error: {
            body: JSON.stringify({ message: ERROR_CGU_NOT_ACCEPTED })
          }
        })

        console.log("metton à jour le bouton")
        this.enableButton()
      })
    }
  }
  goToPageActivation(data) {
    console.log("Allons sur la page activtion")
    this.props.navigation.navigate('Activation', { data: data });
  }
  showErrorInfo() {
    const err = JSON.parse(this.state.error.body)
    console.log("Le statut de l'erreur est")
    console.log(err.status)
    console.log(err.data)
    console.log(err)
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
    if (err.status == 401) {
      if ("data" in err) {
        if (err.data.message == "Un utilisateur avec et email existe déjà") {
          return ERROR_EMAIL_ALREADY_USE;
        }
      }
    }

    if ("message" in err) {
      console.log(err.message)
      if (err.message == ERROR_INVALID_EMAIL) return ERROR_INVALID_EMAIL;
      if (err.message == ERROR_INVALID_PASSWORD) return ERROR_INVALID_PASSWORD;
      if (err.message == ERROR_CGU_NOT_ACCEPTED) return ERROR_CGU_NOT_ACCEPTED;
      if (err.message == "Network Error") return ERROR_NO_NETWORK;
    }
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
          <Image source={logiMapo} style={styles.image} />
        </View>
        <View style={styles.espace1}></View>
        <View>
          <Text style={styles.pageTitle}>Créer son compte</Text>
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
        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              disabled={false}
              value={this.state.isTermsOfuseAndPrivacyPolicyAccepted}
              onValueChange={(value) => {
                this.doingNewAction();
                this.acceptCGUAndPrivacyPolicy(value)
              }
              }
              style={styles.checkbox}
              tintColors={{ true: "#FFCC00", "false": "black" }}
            />
          </View>
          <View style={styles.containerCGU}>

            <View style={{ flexDirection: "row", marginLeft: 20 }}>
              <Text style={styles.label}>Accepter </Text>
              <Pressable onPress={() => openUrl(urlConditionGeneralUtilisation)}>
                <Text style={styles.link}>Les conditions d'utilisations</Text>
              </Pressable>
              <Text style={{ color: "black" }} > et </Text>
            </View>
            <View style={{ marginLeft: 30 }} >
              <Pressable onPress={() => openUrl(urlPolitiqueConfidentialite)} >
                <Text style={styles.link}>la politique de confidentialité</Text>
              </Pressable>
            </View>

          </View>
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
              this.createUser();

            }}
          >
            <Text style={styles.buttonText}>CRÉER SON COMPTE</Text>

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
    marginTop: 30
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
