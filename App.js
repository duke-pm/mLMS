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
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
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
    bgApp: colors.BG_APP_DARK,
    bgInputFocus: colors.BG_INPUT_FOCUS_DARK,
    text: colors.TXT_DARK,
    icon: colors.ICON_DARK,
  },
};
const MyDefaultTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
  cColors: {
    ...DefaultTheme.colors,
    bgApp: colors.BG_APP_LIGHT,
    bgInputFocus: colors.BG_INPUT_FOCUS_LIGHT,
    text: colors.TXT_LIGHT,
    icon: colors.ICON_LIGHT,
  },
};

const App = () => {

  /** Use states */
  const [state, setState] = useState({
    checked: false,
    connected: true,
  });
  const [theme, setTheme] = useState('light');

  /*****************
   ** HANDLE FUNC **
   *****************/
   const handleNetInfo = obj => {
    obj.isConnected ? onReverseAnimate() : onAnimate();
  };

  const onToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
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
      <ThemeContext.Provider value={{ theme, onToggleTheme }}>
        <ApplicationProvider
          {...eva}
          theme={eva[theme]}
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
