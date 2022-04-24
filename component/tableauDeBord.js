import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import TypeTransactionItem from './typeTransactionItem';
import { scrap } from '../SMS/smsHelper';
import PieChart from 'react-native-pie-chart';

import { requestPermissions } from '../SMS/AskPermissions';
import SmsAndroid from 'react-native-get-sms-android-v2';

import om from '../sms-scrapping/OrangeMoney/om';
import momo from '../sms-scrapping/MOMO/momo';
import filter from '../SMS/filter';
import { sequalize } from '../helper.js';
import { flux, typeInitial } from '../sms-scrapping/utilities';

//import getTestSMSList from './testData/testData';



const widthAndHeight = 180;
//const series = [5000, 0, 0, 0, 980];
//const sliceOrder = ["TransfertEntrant","Transfert Sortant","Dépot","Retrait","Paiement","Frais"]
const sliceColor = ['#64DD17', '#FF5252', '#BADA55', '#FFB700', '#9D57F8', "#FF6384"];
const momoLogo = require('../res/mtn.png');
const omLogo = require("../res/Orange-money.jpg")
const jourEnMs = 24 * 3600 * 1000
const periodes = [
  {
    "label": "Aujourd'hui", "time": new Date().getTime()
  },
  {
    "label": "07 Derniers jours", "time": (new Date().getTime() - 7 * jourEnMs)
  },
  {
    "label": "30 Derniers jours", "time": (new Date().getTime() - 30 * jourEnMs)
  },
  {
    "label": "90 Derniers jours", "time": (new Date().getTime() - 90 * jourEnMs)
  },
  {
    "label": "180 Derniers jours", "time": (new Date().getTime() - 180 * jourEnMs)
  }
]


export default class TableauDeBord extends React.Component {
  componentDidMount(){
    this.getAllSMS();
  }
  state = {
    mobileMoney: {
      retrait: '???',
      transfertEntrant: '???',
      transfertSortant: '???',
      depot: '???',
      paiement: '???',
      frais: '???',
      total: '???',
      creditCommunication: '???',
      creditInternet: '???'
    },
    orangeMoney: {
      retrait: '???',
      transfertEntrant: '???',
      transfertSortant: '???',
      depot: '???',
      paiement: '???',
      frais: '???',
      total: '???',
      creditCommunication: '???',
      creditInternet: '???'
    },
    smsList: [],
    chartData: [0, 0, 0, 1, 0, 1],
    operateur: momo.address,
    selectedPeriodLabel: periodes[4].label,
    isVisibleSelectOperateur: false,
    isVisibleSelectPeriode: false

  };
  async getAllSMS() {
    console.log(filter)
    try {
      await requestPermissions();
      await SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          throw fail;
        },
        (count, smsList) => {
          console.log('Count: ', count);
          let matchedSMS = JSON.parse(smsList);
          this.setState(
            {
              smsList: matchedSMS,
            },
            () => {
            this.scrap(this.state.smsList);
            },
          );
        },
      );
    } catch (error) {
      console.log('Failed with this error: ' + error);
    }
  }
  async scrap(smsList) {
    let transactions = await scrap( /*getTestSMSList ()*/smsList);

    console.log("analysons : " + transactions.length)
    this.analyse(transactions);
    setTimeout(() => {
      this.showRemerciements();
    }, 5250);
  }
  showModalSelectOperateur() {
    this.setState({
      isVisibleSelectOperateur: true
    })
  }
  hideModalSelectOperateur() {

    this.setState({
      isVisibleSelectOperateur: false
    })
    console.log("hide sucess fully")
  }

  analyse(transactions = []) {
    //console.log(transactions)
    if (transactions.length > 0) {
      const momot = {
        retrait: 0,
        transfertEntrant: 0,
        transfertSortant: 0,
        depot: 0,
        paiement: 0,
        frais: 0,
        total: 0,
        creditCommunication :0,
        creditInternet:0
      };
      const omt = {
        retrait: 0,
        transfertEntrant: 0,
        transfertSortant: 0,
        depot: 0,
        paiement: 0,
        frais: 0,
        total: 0,
        creditCommunication: 0,
        creditInternet: 0
      };
      transactions.forEach((transaction) => {
     
        switch (transaction.operateur) {
          case momo.address:
            switch (transaction.typeInitial) {
              case 'Retrait':
                momot.retrait += parseInt(transaction.montant);
                break;
              case 'Transfert':
                if (transaction.flux == flux.entrant) {
                  momot.transfertEntrant += parseInt(transaction.montant);
                } else if (transaction.flux == flux.sortant) {
                  momot.transfertSortant += parseInt(transaction.montant);
                }
                break;
              case 'Depot':
                momot.depot += parseInt(transaction.montant);
                break;
              case 'Paiement':
                momot.paiement += parseInt(transaction.montant);
                if (transaction.typeSecondaire){
                  if (transaction.typeSecondaire == typeInitial.typeSecondaire.creditCommunication) {
                    momot.creditCommunication += parseInt(transaction.montant);
                  } else if (transaction.typeSecondaire == typeInitial.typeSecondaire.internet) {
                    momot.creditInternet += parseInt(transaction.montant);
                  }
                }
                
                break;
            }
            momot.total += parseInt(transaction.montant);
            if (transaction.frais) {
              momot.frais += parseInt(transaction.frais);
              momot.total += parseInt(transaction.frais);
            }
            break;

          case om.address:
            switch (transaction.typeInitial) {
              case 'Retrait':
                omt.retrait += parseInt( transaction.montant );
                break;
              case 'Transfert':
                if (transaction.flux == flux.entrant) {
                  omt.transfertEntrant += parseInt(transaction.montant);
                } else if (transaction.flux == flux.sortant) {
                  omt.transfertSortant += parseInt(transaction.montant);
                }
                break;
              case 'Depot':
                omt.depot += parseInt (transaction.montant );
                break;
              case 'Paiement':
                omt.paiement += parseInt (transaction.montant );
                if (transaction.typeSecondaire) {
                  if (transaction.typeSecondaire == typeInitial.typeSecondaire.creditCommunication) {
                    omt.creditCommunication += parseInt(transaction.montant);
                  } else if (transaction.typeSecondaire == typeInitial.typeSecondaire.internet) {
                    omt.creditInternet += parseInt(transaction.montant);
                  }
                }

                break;
            }
            // console.log("calcullons le total")
            // console.log(transaction)
            // console.log( parseInt(transaction.montant,10));
            // console.log(omt.total)
            
            omt.total +=+ parseInt(transaction.montant,10);
            //.log(omt.total)
            
            if (transaction.frais) {
              omt.frais += parseInt(transaction.frais);
              omt.total += parseInt(transaction.frais);
            }
            break;

        }

        // else if (transaction.operateur === address.om) {
        

      });
      
      console.warn(omt)
      return this.showResult({ "momo": momot, "om": omt });
    }
  }
  showResult(result) {
    this.setState(
      {
        mobileMoney: {
          retrait: result.momo.retrait ? result.momo.retrait : '???',
          transfertEntrant: result.momo.transfertEntrant ? result.momo.transfertEntrant : '???',
          transfertSortant: result.momo.transfertSortant ? result.momo.transfertSortant : '???',
          depot: result.momo.depot ? result.momo.depot : '???',
          paiement: result.momo.paiement ? result.momo.paiement : '???',
          frais: result.momo.frais ? result.momo.frais : '???',
          total: result.momo.total ? result.momo.total : '???',
          creditCommunication: result.momo.creditCommunication ? result.momo.creditCommunication : '???',
          creditInternet: result.momo.creditInternet ? result.momo.creditInternet : '???'
        },
        orangeMoney : {
          retrait: result.om.retrait ? result.om.retrait : '???',
          transfertEntrant: result.om.transfertEntrant ? result.om.transfertEntrant : '???',
          transfertSortant: result.om.transfertSortant ? result.om.transfertSortant : '???',
          depot: result.om.depot ? result.om.depot : '???',
          paiement: result.om.paiement ? result.om.paiement : '???',
          frais: result.om.frais ? result.om.frais : '???',
          total: result.om.total ? result.om.total : '???',
          creditCommunication: result.om.creditCommunication ? result.om.creditCommunication : '???',
          creditInternet: result.om.creditInternet ? result.om.creditInternet : '???'
        }

      },
      () => {
        console.log("ended showed")
        this.updateChart()
      }
    );
  }
  updateChart() {
    let toShow = (this.state.operateur == om.address)? this.state.orangeMoney : this.state.mobileMoney
    console.log(toShow)
    if( toShow.transfertEntrant == "???" && toShow.transfertSortant =="???" && toShow.depot == "???" && toShow.retrait =="???" && toShow.paiement == "???" && toShow.frais == "???") {
      return this.setState({

        chartData: [
          0,
          0,
          0,
          1,
          0,
          0,
        ]
      })
    }
    this.setState({

      chartData: [
        sequalize(toShow.transfertEntrant),
        sequalize(toShow.transfertSortant),
        sequalize(toShow.depot),
        sequalize(toShow.retrait),
        sequalize(toShow.paiement),
        sequalize(toShow.frais),
      ]
    })
  }
  selectOperateur(operateur) {
    this.setState({
      operateur: operateur
    }, () => {
      filter.address = "(.*)" + this.state.operateur + "(.*)"
      console.log(filter)
      this.getAllSMS()
      this.hideModalSelectOperateur()
    })

  }
  showModalSelectPeriod() {
    console.log(periodes)
    this.setState({
      isVisibleSelectPeriode: true
    })
  }
  selectPeriode(periode) {
    filter.minDate = periode.time
    console.log(filter)
    this.getAllSMS()
    this.setState({
      selectedPeriodLabel: periode.label
    }, () => {
      this.hideModalSelectPeriode()
    })
  }
  hideModalSelectPeriode() {
    this.setState({
      isVisibleSelectPeriode: false
    })
  }
  dateSanitzer(date) {
    let d = date || new Date();
    //let d =new Date();
    return "" + ((d.getDate() < 10) ? "0" + d.getDate() : d.getDate()) + "/" + ((d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : d.getMonth()) + "/" + d.getFullYear();
  }
  goSeeTermOfUse() {
    this.props.navigation.navigate('TermsOfUse');
  }
  showRemerciements() {
    this.props.navigation.navigate('PageRemerciement');
  }

  setMontant(ti) {
    switch (ti) {
      case typeInitial.depot:
        return (this.state.operateur == om.address) ? this.state.orangeMoney.depot : (this.state.operateur == momo.address) ? this.state.mobileMoney.depot : "???"
      case typeInitial.retrait:

        return (this.state.operateur == om.address) ? this.state.orangeMoney.retrait : (this.state.operateur == momo.address) ? this.state.mobileMoney.retrait : "???"
      case typeInitial.transfertEntrant:
        return (this.state.operateur == om.address) ? this.state.orangeMoney.transfertEntrant : (this.state.operateur == momo.address) ? this.state.mobileMoney.transfertEntrant : "???"

      case typeInitial.transfertSortant:
        return (this.state.operateur == om.address) ? this.state.orangeMoney.transfertSortant : (this.state.operateur == momo.address) ? this.state.mobileMoney.transfertSortant : "???"

      case typeInitial.paiement:
        return (this.state.operateur == om.address) ? this.state.orangeMoney.paiement : (this.state.operateur == momo.address) ? this.state.mobileMoney.paiement : "???"
      case typeInitial.frais:
        return (this.state.operateur == om.address) ? this.state.orangeMoney.frais : (this.state.operateur == momo.address) ? this.state.mobileMoney.frais : "???"

      case typeInitial.typeSecondaire.creditCommunication :
        return (this.state.operateur == om.address) ? this.state.orangeMoney.creditCommunication : (this.state.operateur == momo.address) ? this.state.mobileMoney.creditCommunication : "???"

      case typeInitial.typeSecondaire.internet :
        return (this.state.operateur == om.address) ? this.state.orangeMoney.creditInternet : (this.state.operateur == momo.address) ? this.state.mobileMoney.creditInternet : "???"

      case typeInitial.typeSecondaire.creditTelephonique :
        return (this.state.operateur == om.address) ? (sequalize( this.state.orangeMoney.creditInternet) + sequalize (this.state.orangeMoney.creditCommunication )): (this.state.operateur == momo.address) ? (sequalize(this.state.mobileMoney.creditCommunication) + sequalize(this.state.mobileMoney.creditInternet) ) : "???"
      default :
        return "???";
    }

  }

  render() {
    // console.log(this.props.route.params.data);

    return (
      <ScrollView style={styles.scrollView}>
        <View style={styles.main_view}>
          <TouchableOpacity style={styles.upper} onPress={() => { this.showModalSelectOperateur() }}>
            {(this.state.operateur === momo.address) && <View style={styles.secondView} ><Image source={momoLogo} style={styles.logo} />
              <Text style={styles.text}> {momo.label} </Text>
              <Text style={styles.montant}> {this.state.mobileMoney.total} </Text>
              <Text style={{ fontSize: 11, marginLeft: '2%', color: "black" }}>F CFA</Text>

            </View>
            }
            {(this.state.operateur === om.address) && <View style={styles.secondView} ><Image source={omLogo} style={styles.logo} />
              <Text style={styles.text}> {om.label} </Text>
              <Text style={styles.montant}> {this.state.orangeMoney.total} </Text>
              <Text style={{ fontSize: 11, marginLeft: '2%', color: "black" }}>F CFA</Text>
            </View>
            }
            <TouchableOpacity
              style={styles.button}
              onPress={() => { this.showModalSelectOperateur() }}
            >
              <Text style={{ flex: 1, marginRight: "50%", ...styles.textSelectable }}>v</Text>
            </TouchableOpacity>
          </TouchableOpacity>


          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.isVisibleSelectOperateur}
            onRequestClose={() => {
              //Alert.alert("Modal has been closed.");
              this.hideModalSelectOperateur();
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Pressable style={styles.buttonClose} onPress={() => { this.hideModalSelectOperateur() }}>
                  <Text style={{ color: "black", alignSelf: "center" }}>X</Text>
                </Pressable>
                <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectOperateur(momo.address) }}>
                  <Image source={momoLogo} style={styles.logo} />
                  <Text style={styles.text}>{momo.label}</Text>
                  <Text style={styles.montant}> {this.state.mobileMoney.total} </Text>
                  <Text style={{ fontSize: 11, color: "black" }}>F CFA</Text>
                </Pressable>
                <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectOperateur(om.address) }} >
                  <Image source={omLogo} style={styles.logo} />
                  <Text style={styles.text}>{om.label}</Text>
                  <Text style={styles.montant}> {this.state.orangeMoney.total} </Text>
                  <Text style={{ fontSize: 11, color: "black" }}>F CFA</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          {/** ici on placera le sélectionneur de période */}
          <View style={styles.viewPeriode}>
            <View style={styles.periode}>
              <Text style={{ alignSelf: "center", ...styles.text }}> Période : </Text>
              <TouchableOpacity style={styles.styPeriode} onPress={() => { this.showModalSelectPeriod() }} >
                <Text style={styles.textSelectable}> {this.state.selectedPeriodLabel} </Text>
              </TouchableOpacity>
            </View>
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isVisibleSelectPeriode}
              onRequestClose={() => {
                //Alert.alert("Modal has been closed.");
                this.hideModalSelectPeriode();
              }}
            >
              <View style={styles.centeredView2}>
                <View style={styles.modalView2}>
                  <Pressable style={styles.buttonClose} onPress={() => { this.hideModalSelectPeriode() }}>
                    <Text style={{ color: "black", alignSelf: "center" }}>X</Text>
                  </Pressable>
                  <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectPeriode(periodes[0]) }}>

                    <Text style={styles.labelDate}>{periodes[0].label} :</Text>
                    <Text style={styles.textDate}> {this.dateSanitzer(new Date())} </Text>
                  </Pressable>
                  <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectPeriode(periodes[1]) }} >
                    <Text style={styles.labelDate}>{periodes[1].label} :</Text>

                    <Text style={styles.textDate}> du {this.dateSanitzer(new Date(periodes[1].time))} au {this.dateSanitzer(new Date())} </Text>
                  </Pressable>
                  <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectPeriode(periodes[2]) }}>
                    <Text style={styles.labelDate}>{periodes[2].label} :</Text>
                    <Text style={styles.textDate}> du {this.dateSanitzer(new Date(periodes[2].time))} au {this.dateSanitzer(new Date())} </Text>
                  </Pressable>
                  <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectPeriode(periodes[3]) }} >
                    <Text style={styles.labelDate}>{periodes[3].label} :</Text>
                    <Text style={styles.textDate}> du {this.dateSanitzer(new Date(periodes[3].time))} au {this.dateSanitzer(new Date())} </Text>
                  </Pressable>
                  <Pressable style={styles.buttonSelectOperateur} onPress={() => { this.selectPeriode(periodes[4]) }}>
                    <Text style={styles.labelDate}>{periodes[4].label} :</Text>
                    <Text style={styles.textDate}> du {this.dateSanitzer(new Date(periodes[4].time))} au {this.dateSanitzer(new Date())} </Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

          </View>
          <View style={styles.section2}>
            <View style={styles.container}>
              <Text style={{ marginTop: "5%", marginHorizontal: "5%", ...styles.text }}>
                Analyse de l'utilisation de votre argent
              </Text>
              <View style={styles.chartPlace}>
                <PieChart
                  widthAndHeight={widthAndHeight}
                  series={this.state.chartData}
                  sliceColor={sliceColor}
                  doughnut={true}
                  coverRadius={0.45}
                  coverFill={'#FFF'}
                />
              </View>
              {/* <Text style={styles.text}> {conclusion} </Text> */}
            </View>
          </View>
          <View style={styles.detailPlace}>

            <View style={styles.others}>
              <TypeTransactionItem
                label="Transfert Entrant"
                couleur="#64DD17"
                montant={this.setMontant(typeInitial.transfertEntrant)}
              />
              <TypeTransactionItem
                label="Dépôt"
                couleur="#BADA55"
                montant={this.setMontant(typeInitial.depot)}
              />
              <TypeTransactionItem
                label="Paiement"
                couleur="#9D57F8"
                montant={this.setMontant(typeInitial.paiement)}
              />
            </View>
            <View style={styles.others}>
              <TypeTransactionItem
                label="Transfert Sortant"
                couleur="#FF5252"
                montant={this.setMontant(typeInitial.transfertSortant)}
              />

              <TypeTransactionItem
                label="Retrait"
                couleur="#FFB700"
                montant={this.setMontant(typeInitial.retrait)}
              />
              <TypeTransactionItem
                label="Frais"
                couleur="#FF6384"
                montant={this.setMontant(typeInitial.frais)}
              />
            </View>

          </View>
          <View style={styles.line}></View>
          <View style={{ flexDirection: "row", flex: 1, alignContent: "stretch", marginLeft: "5%" }}>
            <View style={styles.bar}></View>
            <View style={{ flexDirection: "column", marginLeft: "5%" }}>
              <View style={{ flex: 1, flexDirection: "row", marginBottom: "5%" }}>
                <Text style={{ color: "#535353" }}>Crédit de commnication :</Text>
                <Text style={{ fontWeight: "500", color: "black", alignSelf: "flex-end" }}> {this.setMontant(typeInitial.typeSecondaire.creditTelephonique)} FCFA</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", padding: "1%" }}>
                <TypeTransactionItem
                  label="Crédit tel."
                  couleur="#75E4D0"
                  montant={this.setMontant(typeInitial.typeSecondaire.creditCommunication)}
                />
                <View style={{ marginLeft: "14%" }}></View>
                <TypeTransactionItem
                  label="Internet"
                  couleur="#75E4D0"
                  montant={this.setMontant(typeInitial.typeSecondaire.internet)}
                />
              </View>

            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.bouttonDetail} onPress={() => { this.goSeeTermOfUse() }}>
              <Text style={{ fontWeight: "700", color: "black" }}> Comprendre comment fonctionne le scrapping {">"}  </Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  main_view: {
    paddingTop: "5%",
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    textAlign: 'center',
  },
  secondView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upper: {
    backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'center',
    //borderWidth:1,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    padding: "2%",
    marginHorizontal: "2%",
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5
  },
  section2: {
    flex: 3,
    //backgroundColor: 'yellow',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  chartPlace: {
    flex: 3,
    //backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailPlace: {
    flex: 4,
    marginLeft: '5%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',

  },
  rowDetail: {
    flexDirection: 'row',
  },
  container: {
    width: 250,
    height: 320,
    borderColor: 'rgba(163, 163, 163, 0.3)',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  chart: {
    //backgroundColor: 'white',
    width: '80%',
    height: '80%',
    //borderRadius: 10,
  },
  others: {
    flex: 0.5,
    marginTop: "10%",
    //margin: "2.4%",
    flexDirection: 'column',
    padding: "2%"

  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    marginRight: '4%',
  },
  montant: {
    color: 'black',
    paddingLeft: '7%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    width: 200,
    height: 200
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    justifyContent: "center",
    marginLeft: "2%",
    padding: 2

  },
  viewPeriode: {
    justifyContent: "center",
    flex: 1,
    marginTop: "4%"
  },
  periode: {
    flexDirection: "row", alignSelf: "flex-end",
    paddingEnd: "8%",
    paddingBottom: "9%",

  },
  textSelectable: {
    color: "#A5A5A5"
  },
  partCreditCommunication: {

  },
  scrollView: {
    // margin:5,
    // borderWidth:1,
    padding: 7,
    backgroundColor: "white"
  },
  bar: {
    //flex:0.1,
    //height: 5,
    marginLeft: "5%",
    width: 5,
    backgroundColor: "#75E4D0"
  },
  line: {
    margin: "5%",
    flex: 0.1,
    height: 2,
    backgroundColor: "#F1F1F1"
  },
  bouttonDetail: { backgroundColor: "#FAFAFA", borderRadius: 15, padding: "2%", marginBottom: 60, marginLeft: "3%", marginRight: "3%", marginTop: 30 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    marginTop: 15
  },
  modalView: {
    //flex:1,
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    //padding:,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonM: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    alignSelf: "flex-end",
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "#CECECE"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonSelectOperateur: {
    flexDirection: "row",
    margin: "7%"
  },
  centeredView2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView2: {
    //flex:1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    margin: "15%",
    //padding:,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textDate: {
    color: 'black',
    fontSize: 12
    //textAlign: 'center',
  },
  labelDate: {
    color: 'black',
    fontSize: 13,
    fontWeight: 'bold',
    marginRight: 15
  },
  styPeriode: {
    backgroundColor: "#FAFAFA",
    borderRadius: 20,
    padding: "3%",
    //  shadowColor: "#000",
    //   shadowOffset: {
    //     width: 0,
    //     height: 2
    //   },
    //   shadowOpacity: 0.25,
    //   shadowRadius: 4,
    //   elevation: 5
  }
});



