/**
 ** Name: Configs for app
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of configs.js
 **/
import Config from 'react-native-config';

const Configs = {
  // for name of app in account page
  nameOfApp: Config.APP_NAME,
  // for Host APIs
  hostAPI: Config.API_URL,
  prefixAPI: Config.API_PREFIX,
  // for deep liking
  prefixesDeepLink: [
    Config.ANDROID_DEEP_LINK, // for Android
    Config.IOS_DEEP_LINK, // for iOS
  ],
  routePath: {
  },
  // for name of app in account page
  nameOfApp: Config.APP_NAME,
  // for rating app
  appStoreID: Config.IOS_APPSTORE_ID,
  googlePlayPackage: Config.ANDROID_APP_ID,
}

export default Configs;
