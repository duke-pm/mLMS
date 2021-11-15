/**
 ** Name: App main
 ** Author: JerryLe
 ** CreateAt: 2021
 ** Description: Description of App.js
 **/
import 'react-native-gesture-handler';
import '~/utils/languages/config-i18n';
import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ApplicationProvider, IconRegistry, Text, ModalService } from '@ui-kitten/components';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import {useColorScheme, StatusBar} from 'react-native';
/** COMPONENTS */
import Navigator from '~/navigator/Navigator';
/** COMMON */
import Configs from '~/configs';
import {ThemeContext} from '~/configs/theme-context';
import {colors} from '~/utils/style';
import {IS_ANDROID} from '~/utils/helper';
import jwtServiceConfig from '~/services/jwtServiceConfig';
import { default as theme } from './assets/themes/theme.json';
import { default as mapping } from './assets/themes/mapping.json';
/** REDUX */
import Store from './src/redux/store';

ModalService.setShouldUseTopInsets = true;

const linking = {
  prefixes: Configs.prefixesDeepLink,
  config: {screens: Configs.routePath},
};

const MyDarkTheme = {
  dark: true,
  colors: {
    ...DarkTheme.colors,
  },
  cColors: {
    ...DarkTheme.colors,
    bgAppleLogin: colors.BG_APPLE_LOGIN_DARK,

    icoAppleLogin: colors.ICO_APPLE_LOGIN_DARK,
  },
};
const MyDefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
  cColors: {
    ...DefaultTheme.colors,
    bgAppleLogin: colors.BG_APPLE_LOGIN_LIGHT,

    icoAppleLogin: colors.ICO_APPLE_LOGIN_LIGHT,
  },
};

const App = () => {

  /** Use states */
  const [state, setState] = useState({
    checked: false,
    connected: true,
  });
  const [themeApp, setThemeApp] = useState('light');

  /*****************
   ** HANDLE FUNC **
   *****************/
   const handleNetInfo = obj => {
    obj.isConnected ? onReverseAnimate() : onAnimate();
  };

  const onToggleTheme = () => {
    const nextTheme = themeApp === 'light' ? 'dark' : 'light';
    setThemeApp(nextTheme);
  };

  /**********
   ** FUNC **
   **********/
   const onAnimate = () => {
    setState({...state, connected: false});
  };

  const onReverseAnimate = () => {
    setState({...state, connected: true});
  };

  const setDefaultAxios = () => {
    axios.defaults.baseURL = jwtServiceConfig.baseURL;
    axios.defaults.timeout = 30000;
    axios.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    axios.defaults.responseType = 'json';
  };

  /****************
   ** LIFE CYCLE **
   ****************/
   useEffect(() => {
    setDefaultAxios();
    NetInfo.addEventListener(handleNetInfo);
    if (IS_ANDROID) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor(colors.TRANSPARENT, true);
    }
  }, []);

  const isDark = useColorScheme() === 'dark';
  useEffect(() => {
    if (isDark) {
      StatusBar.setBarStyle('light-content', true);
    } else {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [isDark]);

  /************
   ** RENDER **
   ************/
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeContext.Provider value={{ themeApp, onToggleTheme }}>
        <ApplicationProvider
          {...eva}
          theme={{...eva[themeApp]}}
          customMapping={mapping}>
          <NavigationContainer
            theme={isDark ? MyDarkTheme : MyDefaultTheme}
            linking={linking}
            fallback={<Text>Loading</Text>}>
            <Provider store={Store}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Navigator />
              </SafeAreaProvider>
            </Provider>
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
