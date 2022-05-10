import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
} from "react-native";



export default class ShouldVerifyEmail extends React.Component {
    

    goToPage(pageName) {
        console.log("Allons sur la page " + pageName)
        this.props.navigation.navigate(pageName);
    }
    render() {
        return (
            <ScrollView style={styles.main}>

                <View style={styles.boxCentral}>

                    <Text style={styles.title} >Vérification d'email</Text>

                    <Text style={styles.content} >Veuillez vérifier votre adrese email</Text>

                    <Pressable style={styles.button} onPress={() => { this.goToPage("RequestPermission") }} >
                        <Text style={styles.buttonText}>Ok</Text>
                    </Pressable>

                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    appLogo: {
        marginTop: 40,
        marginBottom: 90,
        width: 100 * 1.1,
        height: 75 * 1.1,
        alignSelf: "center"
    },
    main: {
        backgroundColor: "white"
    },
    boxCentral: {
        marginHorizontal: '8%',
        alignSelt: 'center',

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
        marginTop: 50,
        borderRadius: 8,
        backgroundColor: "#FFCC00"
    },
    buttonText: {
        fontSize: 16,
        //fontHeight: 12,
        fontWeight: 'bold',
        color: '#ffffff',
    }
});
