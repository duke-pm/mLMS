/**
 ** Name: All routes of app
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Routes.js
 **/
/** INTRO */
import IntroScreen from '~/screens/intro';
/** AUTH */
import LoginScreen from '~/screens/authentication/login';

const Routes = {
  INTRO: {
    name: 'IntroScreen',
    path: IntroScreen,
  },
  AUTHENTICATION: {
    LOGIN_IN: {
      name: 'LoginScreen',
      path: LoginScreen,
    },
  },
};

export default Routes;
