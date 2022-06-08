import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
require("./config.js");
import PageInscription from './src/functionalities/user account creation/PageInscription';

import RequestPermissionReadSMS from './src/functionalities/authorization request/RequestPermissionReadSMS';
import AutorisationDenied from './src/functionalities/authorization request/AutorisationDenied';
import NoFinancialSMS from './src/functionalities/creation of automatic financial accounts/NoFinancialSMS';
import AlertMoreThan2Number from './src/functionalities/creation of automatic financial accounts/AlertMoreThan2Number';
import PreviewOfResult from './src/functionalities/creation of automatic financial accounts/PreviewOfResult';
import PluginInstalledSuccessfully from './src/functionalities/creation of automatic financial accounts/PluginInstalledSuccessfully';
// import ShouldVerifyEmail from './vues/pages/ShouldVerifyEmail';
import RequestUpdateAPP from './src/functionalities/RequestUpdateAPP';
import SpalshScreen from './src/functionalities/SpalshScreen';
import Connection from './src/functionalities/user login/Connection';
import ResetPasswordEmailSend from './src/functionalities/password reset/ResetPasswordEmailSend';
import ResetPassword from './src/functionalities/password reset/ResetPassword';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
                
        <Stack.Screen name="SpalshScreen" component={SpalshScreen} />
        <Stack.Screen name="Inscription" component={PageInscription} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="Connection" component={Connection} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name='RequestPermission' component={RequestPermissionReadSMS} options={{ headerLeft: (props) => null }} />

        <Stack.Screen name='PluginInstalledSuccessfully' component={PluginInstalledSuccessfully} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="NoFinancialSMS" component={NoFinancialSMS} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name='PreviewOfResult' component={PreviewOfResult} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="AlertMoreThan2Number" component={AlertMoreThan2Number} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="RequestUpdateAPP" component={RequestUpdateAPP} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="ResetPasswordEmailSend" component={ResetPasswordEmailSend} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="AutorisationDenied" component={AutorisationDenied} options={{ headerLeft: (props) => null }} />
        {/* <Stack.Screen name='ShouldVerifyEmail' component={ShouldVerifyEmail} options={{ headerLeft: (props) => null }} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
