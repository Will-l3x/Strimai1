/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Main from './app/main'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
