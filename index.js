/**
 * @format
 */
import { Text, TextInput  } from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { PaperProvider } from 'react-native-paper';

Text.defaultProps = {maxFontSizeMultiplier: 1};
TextInput.defaultProps = {maxFontSizeMultiplier: 1};

export default function Main() {
    return (
      <PaperProvider>
        <App />
      </PaperProvider>
    );
  }

AppRegistry.registerComponent(appName, () => Main);
