/**
 ** Name: Root main of App
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Root.js
 **/
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
/** COMMON */
import Routes from './Routes';
import {cStyles} from '~/utils/style';

/** INIT NAVIGATOR OF APP */
enableScreens(true);
const StackMain = createNativeStackNavigator();
const StackAuth = createNativeStackNavigator();

export function AuthMain(props) {
  return (
    <StackAuth.Navigator
      initialRouteName={Routes.AUTHENTICATION.LOGIN_IN.name}
      screenOptions={{
        headerShown: false,
      }}>
      <StackAuth.Screen
        name={Routes.AUTHENTICATION.LOGIN_IN.name}
        component={Routes.AUTHENTICATION.LOGIN_IN.path}
      />
      <StackAuth.Screen
        name={Routes.AUTHENTICATION.SIGN_UP.name}
        component={Routes.AUTHENTICATION.SIGN_UP.path}
      />
      <StackAuth.Screen
        name={Routes.AUTHENTICATION.FORGOT_PASSWORD.name}
        component={Routes.AUTHENTICATION.FORGOT_PASSWORD.path}
      />
      <StackAuth.Screen
        name={Routes.AUTHENTICATION.RESET_PASSWORD.name}
        component={Routes.AUTHENTICATION.RESET_PASSWORD.path}
      />
    </StackAuth.Navigator>
  );
}

export function RootMain(props) {
  return (
    <StackMain.Navigator
      initialRouteName={Routes.INTRO.name}
      screenOptions={{
        headerShown: false,
      }}>
      <StackMain.Screen
        name={Routes.INTRO.name}
        component={Routes.INTRO.path}
      />
      <StackMain.Screen
        name={Routes.AUTHENTICATION.name}
        component={AuthMain}
      />
    </StackMain.Navigator>
  );
}

export default RootMain;
