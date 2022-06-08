import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";
import { imgSorry } from "../../tools/ressources/Images"
export default class AutorisationDenied extends React.Component {
    constructor(props){
        super(props)
    }
    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    requestPemi(){
        this.goToPage("RequestPermission")
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Image style={styles.appLogo} source={imgSorry} />

                    <Text style={styles.title} >Attention</Text>
                    <Text style={styles.content} >Sans l’accès à vos SMS, nous ne vous serons d’aucune utilité.
                        A bientot</Text>

                    <Pressable style={styles.button} onPress = {()=>{
                        this.requestPemi()
                    }} >
                        <Text style={styles.buttonText}>J'ai Comrpis</Text>
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    appLogo: {
        marginTop: 150,

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
        backgroundColor: "#FFCC00"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#000000',
    }
});
