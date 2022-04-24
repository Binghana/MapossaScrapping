import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';

export default class PageActionInscriptionOuConnection extends React.Component {

    render() {
        return (
            <ScrollView>
                <View> <Text>Grace à mapossa smartwallet tu t'en sort</Text> </View>
                <View>Grande Image</View>
                <View>paragraphe</View>
                <View>
                    <Button>Créer compte</Button>
                    <Button>Se coonnecter</Button>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

})