import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native';

export default class PagePresentation extends React.Component {

    render() {
        return (
            <ScrollView>
                <View> <Text>Grace à mapossa smartwallet tu t'en sort</Text> </View>
                <View>
                    <View> <Text>Image</Text> </View>
                    <View>
                        <View> <Text>Titre en gras</Text> </View>
                        <View> <Text> paragraphe</Text> </View>
                    </View>
                </View>
                <View>
                    <Button>Continuer</Button>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    
})