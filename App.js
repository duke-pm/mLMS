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
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native';
import {ApplicationProvider, IconRegistry, Text, ModalService} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {StatusBar} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import FlashMessage from 'react-native-flash-message';
import axios from 'axios';
import * as eva from '@eva-design/eva';
/** COMPONENTS */
import Navigator from '~/navigator/Navigator';
/** COMMON */
import Configs from '~/configs';
import {colors} from '~/utils/style';
import {ThemeContext} from '~/configs/theme-context';
import {getLocalInfo, IS_ANDROID} from '~/utils/helper';
import {AST_DARK_MODE, DARK} from '~/configs/constants';
import jwtServiceConfig from '~/services/jwtServiceConfig';
import {default as theme} from './assets/themes/theme.json';
import {default as mapping} from './assets/themes/mapping.json';
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
   useEffect(async () => {
    /** Set config network */
    setDefaultAxios();
    NetInfo.addEventListener(handleNetInfo);

    /** Check dark mode */
    let astDarkMode = await getLocalInfo(AST_DARK_MODE);
    if (astDarkMode) {
      if (astDarkMode === DARK) {
        onToggleTheme();
        /** Set status bar */
        if (IS_ANDROID) {
          StatusBar.setTranslucent(true);
          StatusBar.setBackgroundColor(colors.PRIMARY_DARK, true);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (themeApp === 'dark') {
      StatusBar.setBarStyle('light-content', true);
    } else {
      StatusBar.setBarStyle('dark-content', true);
    }
  }, [themeApp]);

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
            theme={themeApp === 'dark' ? MyDarkTheme : MyDefaultTheme}
            linking={linking}
            fallback={<Text>Loading</Text>}>
            <Provider store={Store}>
              <SafeAreaProvider initialMetrics={initialWindowMetrics}>
                <Navigator />
                <FlashMessage position="top" autoHide floating /> 
              </SafeAreaProvider>
            </Provider>
          </NavigationContainer>
        </ApplicationProvider>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
