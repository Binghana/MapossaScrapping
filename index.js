/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
require("./environment/config;js");

AppRegistry.registerComponent(appName, () => App);
