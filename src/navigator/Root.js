/**
 ** Name: Root main of App
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Root.js
 **/
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/** COMMON */
import Routes from './Routes';
import { useTheme } from '@ui-kitten/components';

/** INIT NAVIGATOR OF APP */
enableScreens(true);
const StackMain = createNativeStackNavigator();
const TabMain = createBottomTabNavigator();

export function BottomTabMain(props) {
  const theme = useTheme();
  return (
    <TabMain.Navigator
      initialRouteName={Routes.TAB.HOME.name}
      backBehavior={'history'}
      screenOptions={({route}) => ({
        tabBarStyle: {
          borderTopColor: theme['background-basic-color-3'],
          backgroundColor: theme['background-basic-color-3']
        },
        tabBarActiveTintColor: theme['color-primary-500'],
        headerShown: false,
        lazy: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = focused ? 'home' : 'home-outline';
          switch (route.name) {
            case Routes.TAB.ACCOUNT.name:
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <IoniIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <TabMain.Screen
        name={Routes.TAB.HOME.name}
        component={Routes.TAB.HOME.path}
      />
      <TabMain.Screen
        name={Routes.TAB.ACCOUNT.name}
        component={Routes.TAB.ACCOUNT.path}
      />
    </TabMain.Navigator>
  )
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
        name={Routes.LOGIN_IN.name}
        component={Routes.LOGIN_IN.path}
      />
      <StackMain.Screen
        name={Routes.SIGN_UP.name}
        component={Routes.SIGN_UP.path}
      />
      <StackMain.Screen
        name={Routes.FORGOT_PASSWORD.name}
        component={Routes.FORGOT_PASSWORD.path}
      />
      <StackMain.Screen
        name={Routes.RESET_PASSWORD.name}
        component={Routes.RESET_PASSWORD.path}
      />
      <StackMain.Screen
        name={Routes.TAB.name}
        component={BottomTabMain}
      />
      <StackMain.Screen
        name={Routes.FAVOURITE.name}
        component={Routes.FAVOURITE.path}
      />
      <StackMain.Screen
        name={Routes.SETTINGS.name}
        component={Routes.SETTINGS.path}
      />
      <StackMain.Screen
        name={Routes.APPEARANCE.name}
        component={Routes.APPEARANCE.path}
      />
    </StackMain.Navigator>
  );
}

export default RootMain;
