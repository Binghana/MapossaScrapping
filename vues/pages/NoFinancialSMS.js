import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    TextInput
} from "react-native";
import { imgSorry, logoOrange, logoMTN  } from "../../res/Images"
export default class NoFinancialSMS extends React.Component {

    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgSorry} />

                    <Text style={styles.title} >Pas de SMS d’OME trouvé sur votre téléphone</Text>
                    <Text style={styles.content} >Vous n’avez pas de SMS de notification des operateurs de monnaie electronique à transformer en transaction</Text>
                    <Text style={styles.content} >Veuillez entrer vos numeros ici pour commencer</Text>
                    <View style={styles.boxInputNum}>

                        <View style={styles.containernumber}>
                            <Image style={styles.logo} source={logoOrange} />
                            <TextInput style={styles.input} />
                        </View>

                        <View style={styles.containernumber}>
                            <Image style={styles.logo} source={logoMTN} />
                            <TextInput style={styles.input} />
                        </View>

                    </View>
                    <Pressable style={styles.button} >
                        
                        
                        <Text style={styles.buttonText}>Suivant</Text>
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

    boxInputNum: {
        marginBottom: 30
    },
    containernumber: {
        flexDirection: "row",
        marginVertical: 6
    },
    input: {
        backgroundColor: "#EDEDED",
        marginHorizontal: "5%",
        paddingHorizontal: "5%",
        color: "black",
        borderRadius: 8,
        height: 40,
        width: 210
    },
    logo: {
        height: 42,
        width: 42,
        borderRadius: 42 / 2,
        marginHorizontal: 15

    },
    appLogo: {
        marginTop: 30,

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
        padding: 20,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "400",
        color: "black"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#ffffff',
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
        backgroundColor: "#FFCC00",
        flexDirection : "row"
    },
});
