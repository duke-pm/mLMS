/**
 ** Name: Index main
 ** Author: JerryLe
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import 'react-native-gesture-handler';
import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Ignore log notification by message:
LogBox.ignoreLogs([
  'Warning:',
  'Non-serializable values were found in the navigation state',
]);
AppRegistry.registerComponent(appName, () => App);
