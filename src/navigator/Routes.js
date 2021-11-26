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
import AccountScreen from '~/screens/account';
import FavouriteScreen from '~/screens/favourite';
import SettingsScreen from '~/screens/settings';
import AppearanceScreen from '~/screens/appearance';
import InformationScreen from '~/screens/information';
import LanguagesScreen from '~/screens/languages';
import TermConditionScreen from '~/screens/term_and_condition';
import ProfileScreen from '~/screens/profile';
import HelpScreen from '~/screens/help';
import ClassesScreen from '~/screens/classes';
import ClassDetailsScreen from '~/screens/classes/details';
import StudentsScreen from '~/screens/classes/students';

const Routes = {
  INTRO: {
    name: 'Intro',
    path: IntroScreen,
  },
  LOGIN_IN: {
    name: 'Login',
    path: LoginScreen,
  },
  SIGN_UP: {
    name: 'SignUp',
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
  PROFILE: {
    name: 'Profile',
    path: ProfileScreen,
  },
  FAVOURITE: {
    name: 'Favourite',
    path: FavouriteScreen,
  },
  SETTINGS: {
    name: 'Settings',
    path: SettingsScreen,
  },
  APPEARANCE: {
    name: 'Appearance',
    path: AppearanceScreen,
  },
  INFORMATION: {
    name: 'Information',
    path: InformationScreen,
  },
  LANGUAGES: {
    name: 'Languages',
    path: LanguagesScreen,
  },
  TERM: {
    name: 'TermCondition',
    path: TermConditionScreen,
  },
  HELP: {
    name: 'Help',
    path: HelpScreen,
  },
  CLASS_DETAILS: {
    name: 'ClassDetails',
    path: ClassDetailsScreen,
  },
  STUDENTS: {
    name: 'Students',
    path: StudentsScreen,
  },
  TAB: {
    name: 'TabMain',
    HOME: {
      name: 'Home',
      path: HomeScreen,
    },
    ACCOUNT: {
      name: 'Account',
      path: AccountScreen,
    },
    CLASSES: {
      name: 'Classes',
      path: ClassesScreen,
    },
  },
  
};

export default Routes;
