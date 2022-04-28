import React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import PageInscription from './vues/pages/PageInscription';

import RequestPermissionReadSMS from './vues/pages/RequestPermissionReadSMS';
import AutorisationDenied from './vues/pages/AutorisationDenied';
import NoFinancialSMS from './vues/pages/NoFinancialSMS';
import AlertMoreThan2Number from './vues/pages/AlertMoreThan2Number';
import PreviewOfResult from './vues/pages/PreviewOfResult';
import PluginInstalledSuccessfully from './vues/pages/PluginInstalledSuccessfully';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerShown : false
        }}
      >
        <Stack.Screen name= "Inscription" component = {PageInscription} />
        <Stack.Screen name='RequestPermission' component={RequestPermissionReadSMS} />
        <Stack.Screen name="AutorisationDenied"  component={AutorisationDenied} />
        <Stack.Screen name='PluginInstalledSuccessfully' component={ PluginInstalledSuccessfully } />
        <Stack.Screen name= "NoFinancialSMS" component = {NoFinancialSMS} /> 
        <Stack.Screen name='PreviewOfResult' component={PreviewOfResult} />
        <Stack.Screen name ="AlertMoreThan2Number" component={AlertMoreThan2Number} />
  

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
