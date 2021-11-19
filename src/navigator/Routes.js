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
import SignUpScreen from '~/screens/authentication/signup';
import ForgotPasswordScreen from '~/screens/authentication/forgot_password';
import ResetPasswordScreen from '~/screens/authentication/reset_password';
/** MAIN */
import HomeScreen from '~/screens/home';

const Routes = {
  INTRO: {
    name: 'IntroScreen',
    path: IntroScreen,
  },
  AUTHENTICATION: {
    name: 'AuthMain',
    LOGIN_IN: {
      name: 'LoginScreen',
      path: LoginScreen,
    },
    SIGN_UP: {
      name: 'SignUpScreen',
      path: SignUpScreen,
    },
    FORGOT_PASSWORD: {
      name: 'ForgotPassword',
      path: ForgotPasswordScreen
    },
    RESET_PASSWORD: {
      name: 'ResetPassword',
      path: ResetPasswordScreen
    },
  },
  HOME: {
    name: 'HOME',
    path: HomeScreen,
  },
};

export default Routes;
