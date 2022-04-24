import React from 'react';
import {requestPermissions} from '../SMS/AskPermissions';
import SmsAndroid from 'react-native-get-sms-android-v2';
import SmsListener from 'react-native-android-sms-listener';
import filter from '../SMS/filter';
import {
  Animated,
  StyleSheet,
  Text,
  Easing,
  TouchableOpacity,
  Image,
  View,
  Pressable,
} from 'react-native';
import {scrap} from '../SMS/smsHelper';
const image = require('../res/LogoMPDT.png');
const imageMapossa = require('../res/mapossa_logo_blanc.png');

export default class Acceuil extends React.Component {
  state = {
    rotationAnim: new Animated.Value(0),
    smsList: [],
    isListenningNewSMS: true,
    subscription: SmsListener.addListener(this.handleNewSMS),
  };
  componentDidMount() {
    this.spined();
    this.getAllSMS();
  }
  handleNewSMS(message) {
    console.log(message);
  }
  startListeningSMS() {
    this.setState({
      isListenningNewSMS: true,
      subscription: SmsListener.addListener(this.handleNewSMS),
    });
  }
  cancelListenning() {
    this.setState({
      isListenningNewSMS : false
    })
    this.state.subscription.remove();
  }
  goToAnalys(data) {
    this.props.navigation.navigate('TableauDeBord', {data: data});
  }
  spined = () => {
    Animated.loop(
      Animated.timing(this.state.rotationAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };
  spin = this.state.rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  async getAllSMS() {
    try {
      await requestPermissions();
      await SmsAndroid.list(
        JSON.stringify(filter),
        fail => {
          throw fail;
        },
        (count, smsList) => {
          console.log('Count: ', count);
          let matchedSMS = JSON.parse(smsList);
          this.setState(
            {
              smsList: matchedSMS,
            },
            () => {
              this.scrap(this.state.smsList);
            },
          );
        },
      );
    } catch (error) {
      console.log('Failed with this error: ' + error);
    }
  }
  async scrap(smsList) {
    let transactions = await scrap(smsList);
    this.goToAnalys(transactions);
  }
  render() {
    return (
      <Pressable
        onPress={() => {
          this.getAllSMS();
        }}
        android_ripple={{foreground: false}}
        style={styles.main_view}>
        <Image style={styles.imageMapossa} source={imageMapossa} />
        <Animated.Image
          style={{transform: [{rotate: this.spin}], ...styles.image}}
          source={image}
        />
        <Text style={styles.app_name}>Scrapping de sms</Text>
        <Text style={styles.waitingText}>Veuillez patienter un instant</Text>
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  main_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFCC00',
    borderRadius: 1,
  },
  app_name: {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 21,
    marginTop: '20%',
    color: 'white',
  },
  waitingText: {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
  },
  circle: {
    flex: 1,
    borderRadius: 200 / 2,
  },
  image: {
    width: 200,
    height: 200,
    justifyContent: 'center',
  },
  imageMapossa: {
    marginBottom: 100,
    width: 200,
    height: 100,
    justifyContent: 'center',
  },
});
