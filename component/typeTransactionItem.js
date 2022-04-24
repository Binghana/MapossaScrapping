import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default class TypeTransactionItem extends React.Component {

    render() {
        const {montant, label, couleur} = this.props;
        console.log(montant)
        return (
          <View style={styles.main}>
            <View style={{flex:1 , flexDirection : "row"}}>
              <View style={{backgroundColor: couleur, ...styles.smallCircle}} />
              <Text style= {styles.text}>{label}</Text>
            </View>
            <Text style={styles.montant}> {montant} F CFA</Text>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  main: {
      //flex: 1,
      flexDirection:"column",
      //alignSelf:"stretch"
      //borderWidth:1, 
      marginBottom:"10%"
  },
  text: {
      color : "rgba(46, 46, 46, 0.7)",
      fontSize: 16
      
  },
  montant: {
    color : "black",
    paddingLeft : "7%",
    fontSize: 16,
    fontWeight: "bold"
  },
  smallCircle: {
    borderRadius: 15 / 2,
    width: 15,
    height: 15,
    margin: 5,
    alignSelf:"flex-start"
  },
});