import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';

export default class PageInscription extends React.Component {

    render() {
        return (
            <ScrollView>
                <View> <Text>Mapossa SmartWallet</Text> </View>
                <View> <Text>S'inscrire</Text> </View>
                <View>
                    <Text>Email</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Button>Créer compte</Button>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

})