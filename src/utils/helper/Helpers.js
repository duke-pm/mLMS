/* eslint-disable no-useless-escape */
/**
 ** Name: Helpers
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Helpers.js
 **/
/** LIBRARY */
import {PixelRatio, Platform, Dimensions, Alert} from 'react-native';
// import {PERMISSIONS, request} from 'react-native-permissions';
// import ImagePicker from 'react-native-image-crop-picker';
// import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import FileViewer from 'react-native-file-viewer';
// import RNFS from 'react-native-fs';
import moment from 'moment';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 592;

export const scale = size => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const verticalScale = size =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const IS_ANDROID = Platform.OS === 'android';
export const IS_IOS = Platform.OS === 'ios';
const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/* PARSE HEIGHT WITH SREEN SIZE */
export function sH(heightPercent) {
  // Convert string input to decimal number
  let elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / 100);
}
/* PARSE WIDTH WITH SREEN SIZE */
export function sW(widthPercent) {
  // Convert string input to decimal number
  let elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / 100);
}

export function borderRadius(number) {
  if (IS_ANDROID) {
    return number;
  }
  return number / 2;
}

export function validatEemail(data) {
  if (regex.test(data)) {
    return true;
  }
  return false;
}

export function validate(value, type) {
  let checked = false;
  if (type === 'email') {
    if (regex.test(value)) {
      checked = true;
    }
  }
  return checked;
};

// export function alert(t, message, onPressOK) {
//   return Alert.alert(
//     t('common:app_name'),
//     t(message),
//     [
//       {text: t('common:close'), style: 'cancel', onPress: () => null},
//       {text: t('common:ok'), onPress: onPressOK},
//     ],
//     {cancelable: true},
//   );
// }

export function resetRoute(navigation, routeName, params) {
  return navigation.reset({
    index: 0,
    routes: [{name: routeName, params}],
  });
}

// export async function askPermissionsCalendar() {
//   let permission = IS_ANDROID
//     ? PERMISSIONS.ANDROID.WRITE_CALENDAR
//     : PERMISSIONS.IOS.CALENDARS;
//   let result = await request(permission);
//   if (result !== 'granted') {
//     alert(
//       'You need allow permission for Calendar to remind task manager in Settings!',
//     );
//     return false;
//   } else {
//     return true;
//   }
// }

// export async function askPermissionsCamera() {
//   let permission = IS_ANDROID
//     ? PERMISSIONS.ANDROID.CAMERA
//     : PERMISSIONS.IOS.CAMERA;
//   let result = await request(permission);
//   if (result !== 'granted') {
//     alert(
//       'You need allow permission for Camera to upload avatar or album in Settings!',
//     );
//     return false;
//   } else {
//     let perGallery = IS_ANDROID
//       ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
//       : PERMISSIONS.IOS.PHOTO_LIBRARY;
//     result = await request(perGallery);
//     if (result !== 'granted') {
//       alert(
//         'You need allow permission for Gallery to upload avatar or album in Settings!',
//       );
//       return false;
//     } else {
//       return true;
//     }
//   }
// }

// export async function choosePhotoFromCamera(props) {
//   let params = {
//     mediaTypes: 'photo',
//     includeBase64: true,
//     forceJpg: true,
//     cropping: true,
//     height: 1024,
//     width: 768,
//   };
//   if (props) {
//     params = {...params, ...props};
//   }
//   let result = await ImagePicker.openCamera(params);
//   return result;
// }

// export async function choosePhotoFromGallery(props) {
//   let params = {
//     mediaTypes: 'photo',
//     includeBase64: true,
//     forceJpg: true,
//     cropping: true,
//     height: 1024,
//     width: 768,
//   };
//   if (props) {
//     params = {...params, ...props};
//   }
//   let result = await ImagePicker.openPicker(params);
//   return result;
// }

/** LOCAL INFORMATION */
export async function saveLocalInfo({key, value}) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    return false;
  }
}

export async function getLocalInfo(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    return false;
  }
}

export async function removeLocalInfo(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    return false;
  }
}

export async function clearLocalInfo() {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    return false;
  }
}

// /** SECRET INFORMATION */
// export async function saveSecretInfo({key, value}) {
//   try {
//     await EncryptedStorage.setItem(key, JSON.stringify(value));
//   } catch (error) {
//     return false;
//   }
// }

// export async function getSecretInfo(key) {
//   try {
//     const data = await EncryptedStorage.getItem(key);
//     if (data !== undefined) {
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     return false;
//   }
// }

// export async function removeSecretInfo(key) {
//   try {
//     await EncryptedStorage.removeItem(key);
//   } catch (error) {
//     return false;
//   }
// }

// export async function clearSecretInfo(key) {
//   try {
//     await EncryptedStorage.clear();
//   } catch (error) {
//     return false;
//   }
// }

// export function checkEmpty(
//   value,
//   replaceValue,
//   isNumber = false,
//   formatDate = null,
// ) {
//   if (value === 0 || value === '' || !value) {
//     if (replaceValue) {
//       if (isNumber) {
//         return Number(replaceValue).format();
//       }
//       return replaceValue;
//     }
//     return '-';
//   } else {
//     if (isNumber) {
//       return Number(value).format();
//     } else if (formatDate) {
//       return moment(value).format(formatDate);
//     }
//     return value;
//   }
// }

// export async function checkExistsFile(name = null) {
//   const localFile = `${RNFS.DocumentDirectoryPath}/${name}`;
//   const isExistsFile = await RNFS.exists(localFile);
//   return isExistsFile;
// }

// export async function previewFile(url = '', name = null) {
//   const localFile = `${RNFS.DocumentDirectoryPath}/${name}`;
//   const isExistsFile = await RNFS.exists(localFile);
//   if (isExistsFile) {
//     FileViewer.open(localFile);
//     return false;
//   } else {
//     const options = {
//       background: true, // Continue the download in the background after the app terminates (iOS only)**
//       discretionary: true, // Allow the OS to control the timing and speed of the download to improve perceived performance  (iOS only)**
//       fromUrl: url,
//       toFile: localFile,
//       begin: res => {
//         console.log('[LOG] === Begin download ===> ', res);
//       },
//       progress: res => {},
//     };
//     await RNFS.downloadFile(options).promise;
//     FileViewer.open(localFile);
//     return false;
//   }
// }

// export const isTimeBetween = (startTime, endTime, serverTime) => {
//   let start = moment(startTime, 'HH:mm');
//   let end = moment(endTime, 'HH:mm');
//   let server = moment(serverTime, 'HH:mm');
//   if (end < start) {
//     return (
//       (server >= start && server <= moment('23:59:59', 'h:mm:ss')) ||
//       (server >= moment('0:00:00', 'h:mm:ss') && server < end)
//     );
//   }
//   return server >= start && server < end;
// };
