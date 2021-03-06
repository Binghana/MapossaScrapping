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
import { sendCreateUserRequest } from "../../contollers/APIRequest/User";
import { getIdUser } from "../../contollers/Functions/appManagement";
import { requestPermissions } from "../../contollers/Functions/SMS";
import { isGoodEmail } from "../../contollers/RegExp.js"
import { openUrl, removeSpaceOfString } from "../../contollers/utilities";
import storage from "../../storage";
import { ERROR_CGU_NOT_ACCEPTED, ERROR_EMAIL_ALREADY_USE, ERROR_INVALID_EMAIL, ERROR_INVALID_PASSWORD, ERROR_NO_NETWORK, ERROR_UNKNOW_ERROR } from "../../contollers/ErrorMessages";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../environment/config";

const logiMapo = require("../../res/logo_mapossa_scrap.png");
const loading = require("../../res/loader.gif");


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
      console.log("Envoyons la requ??te de cr??ation de compte utilisateur")
      const response = await sendCreateUserRequest(this.state.email, this.state.password)
      console.log("Voil?? la r??ponse de la requ??te envoy??")
      console.log(response.data)
      if (response.data.data.id) {
        console.log("sauvegardons l'id firebase de l'utilisateur")
        storage.set("idUser", response.data.data.id);
        logEvent(analytics, "sign_up");
      }
      this.goToPageActivation(response.data);

    } catch (error) {
      console.warn("Une erreur est survennue")
      if (error.message && error.message == "Network Error") {
        this.setState({ isThereError: true, error: { body: JSON.stringify(error), title: "Une erreur est survennue" } }, () => { console.log(this.state) })
      } else {
        this.setState({ isThereError: true, error: { body: JSON.stringify(error.response), title: "Une erreur est survennue" } }, () => { console.log(this.state) })
      }
    }
    this.endAsyncOperation();

  }
  startAsyncOperation() {
    console.log("Une operation asynchrone commence, montrons le loading")
    this.setState({ isLoading: true, isButtonDisabled: true })
  }
  endAsyncOperation(disable = false) {
    console.log("Fin de l'op??ration asynchrone de l'op??ration")
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

        console.log("metton ?? jour le bouton")
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
        if (err.data.message == "Une ??rreur s'est produite") {
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
        if (err.data.message == "Un utilisateur avec et email existe d??j??") {
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
          <Text style={styles.pageTitle}>Cr??er son compte</Text>
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
            placeholder="Ins??rez votre adresse email..."
            placeholderTextColor="#000"
          />
        </View>
        <View style={styles.espace3}></View>
        <View>
          <Text style={styles.label}>Password</Text>
          <View style={styles.espace2}></View>
          <TextInput
            placeholder="Ins??rez votre mot de passe..."
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
                <Text style={styles.link}>la politique de confidentialit??</Text>
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
            <Text style={styles.buttonText}>CR??ER SON COMPTE</Text>

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
