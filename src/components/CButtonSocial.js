/**
 ** Name: Custom Button Social
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CButtonSocial.js
 **/
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Button} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import { moderateScale } from '~/utils/helper';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {colors, cStyles} from '~/utils/style';
import {LIGHT} from '~/configs/constants';

/** All init */
export const SOCIAL_NAME = {
  APPLE: 'apple',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};

const RenderIconSocial = (name, color) => {
  return (
    <IoniIcon
      name={name}
      size={moderateScale(20)}
      color={color}
    />
  )
};

function CButtonSocial(props) {
  const themeContext = useContext(ThemeContext);
  const {
    style = {},
    type = SOCIAL_NAME.APPLE,
  } = props;


  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleLoginWithSocial = () => {
    switch (type) {
      case SOCIAL_NAME.FACEBOOK:
        onLoginWithFacebook();
        break;
      case SOCIAL_NAME.GOOGLE:
        onLoginWithGoogle();
        break;
      default:
        onLoginWithApple();
        break;
    }
  };

  /**********
   ** FUNC **
   **********/
  const onLoginWithApple = () => {
    console.log('[LOG] ===  ===> Login apple');
  };

  const onLoginWithFacebook = () => {
    console.log('[LOG] ===  ===> Login facebook');
  };

  const onLoginWithGoogle = () => {
    console.log('[LOG] ===  ===> Login google');
  };

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  let tmpIcon = null;
  if (type === SOCIAL_NAME.APPLE) {
    let bgLoginApple = themeContext.themeApp === LIGHT 
    ? colors.BG_APPLE_LOGIN_LIGHT
    : colors.BG_APPLE_LOGIN_DARK;
    let icoLoginApple = themeContext.themeApp === LIGHT
    ? colors.ICO_APPLE_LOGIN_LIGHT
    : colors.ICO_APPLE_LOGIN_DARK;

    tmpIcon = {
      name: 'logo-' + type,
      color: bgLoginApple,
      icon: icoLoginApple,
    };
  } else {
    tmpIcon = {
      name: 'logo-' + type,
      color: type === SOCIAL_NAME.FACEBOOK ? colors.FACEBOOK : colors.GOOGLE,
      icon: colors.WHITE,
    };
  }

  if (!tmpIcon) return null;
  return (
    <Button 
      style={[cStyles.rounded5, styles.btn_main, {backgroundColor: tmpIcon.color}, style]}
      appearance='ghost'
      accessoryLeft={RenderIconSocial(tmpIcon.name, tmpIcon.icon)}
      onPress={handleLoginWithSocial}
    />
  );
}

const styles = StyleSheet.create({
  btn_main: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
});

CButtonSocial.propTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(['apple', 'facebook', 'google']).isRequired,
};

export default CButtonSocial;
