/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import NavigationRoutes from './navigation/NavigationRoutes';
import color from './constants/color';
import CustomToast from './components/Template/CustomToast';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import { store } from './store/store';

const {height} = Dimensions.get('window');

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%';

  return (
    <Provider store={store}>
      <ToastProvider
        placement="bottom"
        duration={4000}
        animationType="zoom-in"
        animationDuration={250}
        successColor="green"
        dangerColor="red"
        warningColor="orange"
        normalColor="gray"
        textStyle={{fontSize: 20}}
        offset={0} // offset for both top and bottom toasts
        offsetTop={0}
        offsetBottom={height * 0.09}
        swipeEnabled={true}
        renderToast={toastOptions => {
          const {status, heading, describe = ''} = toastOptions.data;
          return (
            <CustomToast
              status={status}
              heading={heading}
              describe={describe}
            />
          );
        }}>
        <NavigationContainer>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={color.GREY}
            showHideTransition
            translucent
          />
          <NavigationRoutes />
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
}

export default App;
