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

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions = {{
          headerShown : false
        }}
      >
        {/* <Stack.Screen name= "Inscription" component = {PageInscription} /> */}
        <Stack.Screen name='RequestPermission' component={RequestPermissionReadSMS} />
        <Stack.Screen name= "Inscription" component = {PageInscription} /> 
        <Stack.Screen name="Activation" component={ActivationScreen} />
        <Stack.Screen name="Acceuil"  component={Acceuil} />
        <Stack.Screen name="TableauDeBord" component={TableauDeBord} />
        <Stack.Screen name="TermsOfUse" component= {TermsOfUse}/>
        <Stack.Screen name="PageRemerciement" component={PageRemerciement} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
