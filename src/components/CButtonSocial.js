/**
 ** Name: Custom Button Social
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CButtonSocial.js
 **/
import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Icon} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {colors, cStyles} from '~/utils/style';
import {LIGHT} from '~/configs/constants';
import {moderateScale} from '~/utils/helper';

/** All init */
export const SOCIAL_NAME = {
  APPLE: 'apple',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};
const SIZE = {
  SMALL: 'small',
  LARGE: 'large',
};

const RenderIconSocial = (props, name, color) => {
  return (
    <IoniIcon name={name} size={moderateScale(20)} color={color} />
  )
};

const RenderIconApple = (color) => {
  return (
    <IoniIcon name={'logo-apple'} size={moderateScale(20)} color={color} />
  )
};

const RenderIconFacebook = (props, name, color) => {
  return (
    <Icon
      {...props}
      name={'facebook'}
    />
  )
};

const RenderIconGoogle = (props, name, color) => {
  return (
    <Icon
      {...props}
      name={'google'}
    />
  )
};

function CButtonSocial(props) {
  const {t} = useTranslation();
  const themeContext = useContext(ThemeContext);
  const {
    style = {},
    type = SOCIAL_NAME.APPLE,
    size = 'small',
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
  if (size === SIZE.SMALL) {
    return (
      <Button 
        style={[cStyles.rounded5, styles.btn_small, {backgroundColor: tmpIcon.color}, style]}
        appearance='ghost'
        accessoryLeft={propsIcon => RenderIconSocial(propsIcon, tmpIcon.name, tmpIcon.icon)}
        onPress={handleLoginWithSocial}
      />
    );
  }
  if (size === SIZE.LARGE) {
    let strTitleButton = t('log_in:login_with') + ' Apple';
    if (type === SOCIAL_NAME.FACEBOOK) {
      strTitleButton = t('log_in:login_with') + ' Facebook';
      return (
        <Button 
          style={[
            cStyles.mt10,
            styles.btn_large,
            {backgroundColor: tmpIcon.color, borderColor: tmpIcon.color},
            style
          ]}
          accessoryLeft={RenderIconFacebook}
          onPress={handleLoginWithSocial}>
          {strTitleButton}
        </Button>
      );
    }
    if (type === SOCIAL_NAME.GOOGLE) {
      strTitleButton = t('log_in:login_with') + ' Google';
      return (
        <Button 
          style={[
            cStyles.mt10,
            styles.btn_large,
            {backgroundColor: tmpIcon.color, borderColor: tmpIcon.color},
            style
          ]}
          accessoryLeft={RenderIconGoogle}
          onPress={handleLoginWithSocial}>
          {strTitleButton}
        </Button>
      );
    }
    return (
      <Button 
        style={[
          cStyles.mt10,
          styles.btn_large,
          {backgroundColor: tmpIcon.color, borderColor: tmpIcon.color},
          style
        ]}
        accessoryLeft={RenderIconApple(tmpIcon.icon)}
        onPress={handleLoginWithSocial}>
        {strTitleButton}
      </Button>
    );
  }
  return;
}

const styles = StyleSheet.create({
  btn_small: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  btn_large: {
    height: moderateScale(50),
  },
});

CButtonSocial.propTypes = {
  style: PropTypes.object,
  type: PropTypes.oneOf(['apple', 'facebook', 'google']).isRequired,
  size: PropTypes.oneOf(['small', 'large']),
};

export default CButtonSocial;
