import React from 'react';
import Acceuil from './component/Acceuil';
import TableauDeBord from './component/tableauDeBord';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import TermsOfUse from './component/termsOfUse';
import PageRemerciement from './component/pageRemerciement';
import PageInscription from './vues/pages/PageInscription';
import ActivationScreen from './vues/pages/ActivationScreen';
import RequestPermissionReadSMS from './vues/pages/RequestPermissionReadSMS';
import AutorisationDenied from './vues/pages/AutorisationDenied';
import NoFinancialSMS from './vues/pages/NoFinancialSMS';
import AlertMoreThan2Number from './vues/pages/AlertMoreThan2Number';
import PreviewOfResult from './vues/pages/PreviewOfResult';
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
        {/* <Stack.Screen name='RequestPermission' component={RequestPermissionReadSMS} /> */}
        {/* <Stack.Screen name="AutorisationDenied"  component={AutorisationDenied} /> */}
        {/* <Stack.Screen name= "NoFinancialSMS" component = {NoFinancialSMS} />  */}
        {/* <Stack.Screen name='PreviewOfResult' component={PreviewOfResult} /> */}
        {/* <Stack.Screen name ="AlertMoreThan2Number" component={AlertMoreThan2Number} /> */}
        {/* <Stack.Screen name="Activation" component={ActivationScreen} /> */}
        {/* <Stack.Screen name="Acceuil"  component={Acceuil} /> */}
        {/* <Stack.Screen name="TableauDeBord" component={TableauDeBord} /> */}
        {/* <Stack.Screen name="TermsOfUse" component= {TermsOfUse}/> */}
        {/* <Stack.Screen name="PageRemerciement" component={PageRemerciement} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
