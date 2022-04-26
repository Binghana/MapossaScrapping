import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { imgAlert , logoMessenger} from "../../res/Images"
export default class AlertMoreThan2TwoNumber extends React.Component {

    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgAlert} />

                    <Text style={styles.title} >Alerte !</Text>
                    <Text style={styles.content} >Nous avons trouvé plus de 02 numero de telephone pour le même opérateur sur votre teléphone. </Text>
                        <Text style={styles.content} >Contactez nous pour nous spécifier le numero que vous souhaitez utiliser dans Mapossa </Text>
                    <Pressable style={styles.button} >
                        <Image style = {styles.logoMessenger} source = {logoMessenger}/>
                        <Text style={styles.buttonText}>Envoyer un message</Text>
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    logoMessenger : {
        height: 25,
        width: 25,
        marginRight : 20
    },
    appLogo: {
        marginTop: 80,

        width: 200 ,
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
    button: {
        alignItems: "center",
        justifyContent: "center",
        height: 45,
        borderRadius: 8,
        marginTop : 20,
        backgroundColor: "#E9E9E9",
        flexDirection : "row"
    },
    buttonText: {
        fontSize: 15,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#000000',
    }
});
