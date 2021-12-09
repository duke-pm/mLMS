/**
 ** Name: Custom Avatar
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CAvatar.js
 **/
import PropTypes from 'prop-types';
import React from 'react';
import {useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/** COMPONENTS */
import CText from './CText';
/* COMMON */
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';

/** All init */
const SIZE = {
  THIN: 'thin',
  TINY: 'tiny',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  LARGEST: 'largest',
};
const APPEARANCE = {
  ROUNDED: 'rounded',
  SQUARED: 'squared',
};

function CAvatar(props) {
  const theme = useTheme();
  const {
    containerStyle = {},
    imageStyle = {}, 
    size = 'medium',
    appearance = 'rounded',
    source = {},
    resizeMode = 'contain',
    showIsOnline = false,
    badge = 0,
  } = props;

  /************
   ** RENDER **
   ************/
  let styleWithSize = {};
  let borRadWithAppearance = {};
  switch (size) {
    case SIZE.THIN:
      styleWithSize = styles.img_thin;
      borRadWithAppearance = cStyles.rounded3;
      break;
    case SIZE.TINY:
      styleWithSize = styles.img_tiny;
      borRadWithAppearance = cStyles.rounded4;
      break;
    case SIZE.SMALL:
      styleWithSize = styles.img_small;
      borRadWithAppearance = cStyles.rounded6;
      break;
    case SIZE.LARGE:
      styleWithSize = styles.img_large;
      borRadWithAppearance = cStyles.rounded10;
      break;
    case SIZE.LARGEST:
      styleWithSize = styles.img_largest;
      borRadWithAppearance = cStyles.rounded12;
      break;
    default:
      styleWithSize = styles.img_medium;
      borRadWithAppearance = cStyles.rounded8;
      break;
  }
  if (appearance === APPEARANCE.SQUARED) {
    borRadWithAppearance = cStyles.rounded1;
  }
  
  return (
    <View style={containerStyle}>
      <View
        style={[
          cStyles.center,
          cStyles.p1,
          borRadWithAppearance,
          {backgroundColor: theme['border-basic-color-5']}
        ]}>
        <FastImage
          style={[styleWithSize, borRadWithAppearance, imageStyle]}
          source={{
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
            ...source,
          }}
          resizeMode={resizeMode}
        />
      </View>
      {showIsOnline && (
        <View
          style={[
            cStyles.abs,
            cStyles.right0,
            cStyles.rounded2,
            cStyles.p1,
            styles.con_status_online
          ]}>
          <View
            style={[
              cStyles.flexCenter,
              cStyles.rounded2,
              styles.status_online
            ]}>
            {badge > 0 && (
              <CText category={'c1'}>{badge}</CText>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  img_thin: {height: moderateScale(15), width: moderateScale(15)},
  img_tiny: {height: moderateScale(20), width: moderateScale(20)},
  img_small: {height: moderateScale(30), width: moderateScale(30)},
  img_medium: {height: moderateScale(40), width: moderateScale(40)},
  img_large: {height: moderateScale(50), width: moderateScale(50)},
  img_largest: {height: moderateScale(60), width: moderateScale(60)},
  con_status_online: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
  },
  status_online: {
    height: 9,
    width: 9,
    backgroundColor: 'mediumseagreen',
  },
});

CAvatar.propTypes = {
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object, 
  size: PropTypes.oneOf(['thin', 'tiny', 'small', 'medium', 'large', 'largest']),
  appearance: PropTypes.oneOf(['rounded', 'squared']),
  source: PropTypes.object,
  resizeMode: PropTypes.oneOf(['contain', 'cover']),
  showIsOnline: PropTypes.bool,
  badge: PropTypes.number,
};

export default CAvatar;
