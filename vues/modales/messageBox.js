import React from "react";
import {  Modal, StyleSheet, Text, Pressable, View } from "react-native";

export default class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible : this.props.visible
        }
    }
    setModalVisible( isVisible ){
        this.setState({modalVisible : isVisible})
    }
    render () {
        return (
            <View style={styles.centeredView}>
                {console.log("Voilà ce que la modale reçoit")}
                {console.log ( this.props)}
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                //this.props.onRequestClose()
              }}
            >
              <View style={styles.centeredView}>
                
                <View style={styles.modalView}>
                  <Text style = {styles.modalTitre}> {this.props.title} </Text>
                  <Text style= {styles.modalText}> {this.props.body}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.props.onRequestClose()}
                  >
                    <Text style={styles.textStyle}>OK</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            {/* <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => this.setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
          </View>
        )
    }
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      stifyContent: "center",
      aligjunItems: "center",
      marginTop: "60%",
      
    },
    modalView: {
        flexDirection : "column",
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height : 200,
      width : 300
    },
    button: {
      borderRadius: 20,
      padding: 5,
      height: 40,
      width:80,
      flex : 1
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#FFCC00",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginTop: 15,
      textAlign: "center",
      flex : 4
    },
    modalTitre : {
        fontSize : 20,
        flex : 1,
        fontWeight: "bold",
    }
  });
  