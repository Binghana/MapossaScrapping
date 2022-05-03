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
    constructor(props) {
        super(props)

        this.state = {
            orange: {
                numero: "699000111",
                sommeEntree: 34600,
                sommeSortie: 29270,
            },
            mtn: {
                numero: "678525241",
                sommeEntree: 25780,
                sommeSortie: 54000
            }
        }
    }
    componentDidMount() {
        console.log("voici ce que l'on a recu sur la page preview of result")
        console.log(this.props.route.params)

        if (!this.props.route.params) return;

        const data = this.props.route.params;
        console.log(data);
        this.setState({
            orange: {
                numero: data.orangeNumber,
                sommeEntree: data.orangeSommeEntree,
                sommeSortie: data.orangeSommeSortie
            },
            mtn: {
                numero: data.mtnNumber,
                sommeEntree: data.mtnSommeEntree,
                sommeSortie: data.mtnSommeSortie
            }
        })

    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Text style={styles.title} >Bref résumé de vos flux financiers</Text>
                    {/* ici on a la partir d'orange */}
                    <View style={styles.boxPreviewTr}>

                        <View style={styles.boxOME}>
                            <Image style={styles.logo} source={logoOrange} />
                            <View style={styles.boxMTN}>

                                <Text style={styles.textNumero}> {this.state.orange.numero} </Text>
                                <View style={styles.boxFlux}>
                                    <View>
                                        <Text style={styles.textTypeFinal}>Entrant</Text>
                                        <View style={styles.flux}>
                                            <Image style={styles.logoMin} source={imgArrowDown} />
                                            <Text style={styles.textMontant}> {this.state.orange.sommeEntree} FCFA</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textTypeFinal}>Sortant</Text>
                                        <View style={styles.flux}>
                                            <Image style={styles.logoMin} source={imgArrowUp} />
                                            <Text style={styles.textMontant}> {this.state.orange.sommeSortie} FCFA</Text>
                                        </View>
                                    </View>
                                    
                                </View>
                            </View>
                        </View>

                    </View>

                    {/* ici on a la partir d'orange */}
                    <View style={styles.boxPreviewTr}>

                        <View style={styles.boxOME}>
                            <Image style={styles.logo} source={logoMTN} />
                            <View style={styles.boxMTN}>

                                <Text style={styles.textNumero}> {this.state.mtn.numero} </Text>
                                <View style={styles.boxFlux}>
                                    <View>
                                        <Text style={styles.textTypeFinal}>Entrant</Text>
                                        <View style={styles.flux}>
                                            <Image style={styles.logoMin} source={imgArrowDown} />
                                            <Text style={styles.textMontant}> {this.state.mtn.sommeEntree} FCFA</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textTypeFinal}>Sortant</Text>
                                        <View style={styles.flux}>
                                            <Image style={styles.logoMin} source={imgArrowUp} />
                                            <Text style={styles.textMontant}> {this.state.mtn.sommeSortie} FCFA</Text>
                                        </View>
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
    flux: {
        // borderWidth : 1,
        // borderColor : "blue",
        flexDirection: "row",
        maxWidth: 100,

    },
    boxFlux: {
        width: 220,
        // borderWidth : 1,
        // borderColor : "red",
        flexDirection: "row"
    },
    boxOME: {
        flexDirection: "row",

    },
    boxMTN: {
        flexDirection: "column",

    },
    textMontant: {
        color: "black",
        fontSize: 13,
        marginStart: 7,
        marginEnd: 1
    },
    textTypeFinal: {
        color: "grey",
        marginStart: 5
    },
    textNumero: {
        color: "black"
    },
    boxPreviewTr: {
        //borderWidth: 1,
        marginVertical: 15
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
        width: 13,
        //marginHorizontal: 2,
        //marginHorizontal :7

    },
    logo: {
        marginTop: 5,
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
        marginTop: 100,
        marginBottom: 50
    },
    content: {
        padding: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "300",
        color: "#343434",
        marginTop: 50
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        marginHorizontal: "5%",
        borderRadius: 8,
        backgroundColor: "#FFCC00",
        marginTop: 25
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});
