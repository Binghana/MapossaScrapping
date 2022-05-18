import React from 'react';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
require("./environment/config.js");
import PageInscription from './vues/pages/PageInscription';

import RequestPermissionReadSMS from './vues/pages/RequestPermissionReadSMS';
import AutorisationDenied from './vues/pages/AutorisationDenied';
import NoFinancialSMS from './vues/pages/NoFinancialSMS';
import AlertMoreThan2Number from './vues/pages/AlertMoreThan2Number';
import PreviewOfResult from './vues/pages/PreviewOfResult';
import PluginInstalledSuccessfully from './vues/pages/PluginInstalledSuccessfully';
import ShouldVerifyEmail from './vues/pages/ShouldVerifyEmail';
import RequestUpdateAPP from './vues/pages/RequestUpdateAPP';
import SpalshScreen from './vues/pages/SpalshScreen';
import Connection from './vues/pages/Connection';
import ResetPasswordEmailSend from './vues/pages/ResetPasswordEmailSend';
import ResetPassword from './vues/pages/ResetPassword';

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
        <Stack.Screen name="AutorisationDenied" component={AutorisationDenied} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name='PluginInstalledSuccessfully' component={PluginInstalledSuccessfully} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="NoFinancialSMS" component={NoFinancialSMS} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name='PreviewOfResult' component={PreviewOfResult} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="AlertMoreThan2Number" component={AlertMoreThan2Number} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="RequestUpdateAPP" component={RequestUpdateAPP} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="ResetPasswordEmailSend" component={ResetPasswordEmailSend} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerLeft: (props) => null }} />
        <Stack.Screen name='ShouldVerifyEmail' component={ShouldVerifyEmail} options={{ headerLeft: (props) => null }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
