import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";

export default class RequestUpdateAPP extends React.Component {
 
    gotToPage(pageName, data = {}) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName, data);
    }

    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    {/* <Image style={styles.appLogo} source={imgWorkingAPI} /> */}

                    <Text style={styles.title} >Veuillez mettre à jour l'application</Text>
                    {/* <Text style={styles.content} >Sans l’accès à vos SMS, nous ne vous serons d’aucune utilité.
                        A bientot</Text>

                    <Pressable style={styles.button} >
                        <Text style={styles.buttonText}>J'ai Comrpis</Text>
                    </Pressable> */}

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

    main: {
        backgroundColor: "white"
    },
    boxCentral: {
        marginHorizontal: '8%',
        alignSelt: 'center',

    },

    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginTop: 100
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
