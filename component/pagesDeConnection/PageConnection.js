import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Button, TextInput } from 'react-native';

export default class PageConnection extends React.Component {

    render() {
        return (
            <ScrollView>
                <View> <Text>Mapossa SmartWallet</Text> </View>
                <View> <Text>Se connecter</Text> </View>
                <View>
                    <Text>Email</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Text>Password</Text>
                    <TextInput></TextInput>
                </View>
                <View>
                    <Button>Se connecter</Button>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

})