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
    </StackMain.Navigator>
  );
}

export default RootMain;
