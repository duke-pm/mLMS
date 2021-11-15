/**
 ** Name: Login screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {createRef, useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  useTheme, Layout, TopNavigation, Toggle, Text,
  Input, Button, Icon, Divider
} from '@ui-kitten/components';
import {
  StatusBar, StyleSheet, UIManager, View, TouchableWithoutFeedback
} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */

/* COMMON */
import Routes from '~/navigator/Routes';
import {DARK, LIGHT} from '~/configs/constants';
import {ThemeContext} from '~/configs/theme-context';
import {IS_ANDROID, moderateScale} from '~/utils/helper';
import {colors, cStyles} from '~/utils/style';
/* REDUX */


/** All init */
if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const INPUT_NAME = {
  USER_NAME: 'userName',
  PASSWORD: 'password'
};
const SOCIAL_NAME = {
  APPLE: 'apple',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};
const safeAreaScreen = ['left', 'right', 'top'];
/** All ref */
let userNameRef = createRef();
let passwordRef = createRef();

const RenderTopLeft = trans => {
  return (
    <React.Fragment>
      <View style={cStyles.ml28}>
        <Text category={'h2'}>{trans('log_in:title')}</Text>
      </View>
    </React.Fragment>
  )
};

const RenderTopRight = darkmodeToggle => {
  return (
    <React.Fragment>
      <Toggle {...darkmodeToggle}>
        {evaProps => <Text {...evaProps}>{'Dark'}</Text>}
      </Toggle>
    </React.Fragment>
  )
};

const RenderIconSocial = (name, iconColor) => {
  return (
    <IoniIcon
      name={name}
      size={moderateScale(20)}
      color={iconColor}
    />
  )
};

function Form(props) {
  const {t} = useTranslation();
  const themeContext = useContext(ThemeContext);

  /** Use state */
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [value, setValue] = useState({
    userName: '',
    password: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleChangeValue = (iInput, nValue) => {
    setValue({...value, [iInput]: nValue});
  };
  
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onRenderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  /************
   ** RENDER **
   ************/
  return (
    <>
      <Input
        nativeID={INPUT_NAME.USER_NAME}
        value={value.userName}
        label={t('log_in:input_label_username')}
        placeholder={t('log_in:input_holder_username')}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.USER_NAME, newValue)}
      />

      <Input
        style={cStyles.mt24}
        nativeID={INPUT_NAME.PASSWORD}
        value={value.password}
        label={t('log_in:input_label_password')}
        placeholder={t('log_in:input_holder_password')}
        accessoryRight={onRenderIcon}
        secureTextEntry={secureTextEntry}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.PASSWORD, newValue)}
      />
    </>
  )
};

const useToggleState = (initialState = false) => {
  const themeContext = useContext(ThemeContext);
  const [checked, setChecked] = useState(initialState);

  const onCheckedChange = (isChecked) => {
    themeContext.onToggleTheme();
    setChecked(isChecked);
  };

  return { checked, onChange: onCheckedChange };
};

function Login(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;
  const bgLoginApple = themeContext.theme === LIGHT 
    ? colors.BG_APPLE_LOGIN_LIGHT
    : colors.BG_APPLE_LOGIN_DARK;
  const icoLoginApple = themeContext.theme === LIGHT
    ? colors.ICO_APPLE_LOGIN_LIGHT
    : colors.ICO_APPLE_LOGIN_DARK;

  /** Use State */
  const darkmodeToggle = useToggleState();

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoForgotPassword = () => {
    console.log('[LOG] ===  ===> Go to forgot password');
    navigation.navigate(Routes.AUTHENTICATION.FORGOT_PASSWORD.name);
  };

  const handleSignUp = () => {
    console.log('[LOG] ===  ===> Go to Sign up');
    navigation.navigate(Routes.AUTHENTICATION.SIGN_UP.name);
  };

  const handleLoginWithSocial = socialName => {
    console.log('[LOG] ===  ===> Login with', socialName);
  };

  const handleValidation = () => {
    console.log('[LOG] ===  ===> Check validation');
    onSubmitLogin();
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitLogin = () => {
    console.log('[LOG] ===  ===> Submit login');
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    if (themeContext.theme === LIGHT) {
      StatusBar.setBarStyle('dark-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor(theme['background-basic-color-1'], true);
    }
    if (themeContext.theme === DARK) {
      StatusBar.setBarStyle('light-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor(theme['background-basic-color-1'], true);
    }
  }, [themeContext.theme]);

  /************
   ** RENDER **
   ************/
  return (
    <SafeAreaView
      style={[cStyles.flex1, {backgroundColor: theme['background-basic-color-1']}]}
      edges={safeAreaScreen}>
      <KeyboardAwareScrollView contentContainerStyle={cStyles.flex1}>
        <Layout style={cStyles.flex1} level='1'>
          {/** Header */}
          <TopNavigation
            accessoryLeft={RenderTopLeft(t)}
            accessoryRight={RenderTopRight(darkmodeToggle)}
          />

          {/** Content */}
          <Layout
            style={[
              cStyles.flex1,
              cStyles.mt16,
              cStyles.roundedTopLeft5,
              cStyles.roundedTopRight5,
              cStyles.p32]}
            level='3'>
            {/** Form input */}
            <Form level='3' />

            {/** Is forgot password ? */}
            <View style={[cStyles.itemsEnd, cStyles.mt16]}>
              <TouchableWithoutFeedback onPress={handleGoForgotPassword}>
                <Text style={{color: theme['color-primary-500']}} category={'p1'}>{t('log_in:is_forgot_password')}</Text>
              </TouchableWithoutFeedback>
            </View>

            {/** Button */}
            <Button style={cStyles.mt24} appearance='filled' onPress={handleValidation}>
              Login
            </Button>

            {/** Sign up ? */}
            <View style={[cStyles.itemsCenter, cStyles.mt24]}>
              <Text category={'p1'}>{t('log_in:dont_have_account')}
                <TouchableWithoutFeedback onPress={handleSignUp}>
                  <Text style={{color: theme['color-primary-500']}} category={'p1'}> {t('log_in:sign_up')}</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>

            {/** Login with other socials */}
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.mt24]}>
              <Divider style={[cStyles.flex1, {backgroundColor: theme['color-basic-500']}]} />
                <Text style={cStyles.mx10} category={'c1'}>{t('log_in:login_with_socials')}</Text>
              <Divider style={[cStyles.flex1, {backgroundColor: theme['color-basic-500']}]} />
            </View>

            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.mt24]}>
              <Button 
                style={[cStyles.rounded5, styles.btn_social_main, {backgroundColor: bgLoginApple}]}
                appearance='ghost'
                accessoryLeft={RenderIconSocial('logo-apple', icoLoginApple)}
                onPress={() => handleLoginWithSocial(SOCIAL_NAME.APPLE)}
              />

              <Button
                style={[cStyles.rounded5, styles.btn_social_main, {backgroundColor: colors.FACEBOOK}]}
                appearance='ghost'
                accessoryLeft={RenderIconSocial('logo-facebook', colors.WHITE)}
                onPress={() => handleLoginWithSocial(SOCIAL_NAME.FACEBOOK)}
              />

              <Button
                style={[cStyles.rounded5, styles.btn_social_main, {backgroundColor: colors.GOOGLE}]}
                appearance='ghost'
                accessoryLeft={RenderIconSocial('logo-google', colors.WHITE)}
                onPress={() => handleLoginWithSocial(SOCIAL_NAME.GOOGLE)}
              />
            </View>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn_social_main: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
});

export default Login;
