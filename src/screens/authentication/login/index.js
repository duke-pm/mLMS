/**
 ** Name: Login screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  useTheme, Layout, TopNavigation, Toggle, Text,
  Divider
} from '@ui-kitten/components';
import {
  StatusBar, StyleSheet, UIManager, View, TouchableWithoutFeedback
} from 'react-native';
import {showMessage} from "react-native-flash-message";
/* COMPONENTS */
import CButtonSocial, {SOCIAL_NAME} from '~/components/CButtonSocial';
import CForm from '~/components/CForm';
/* COMMON */
import Routes from '~/navigator/Routes';
import {DARK, LIGHT} from '~/configs/constants';
import {ThemeContext} from '~/configs/theme-context';
import {IS_ANDROID} from '~/utils/helper';
import {cStyles} from '~/utils/style';
/* REDUX */


if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/** All init */
const INPUT_NAME = {
  USER_NAME: 'userName',
  PASSWORD: 'password'
};
const safeAreaScreen = ['left', 'right', 'top'];

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

  /** use ref */
  const formRef = useRef();

  /** Use State */
  const [loading, setLoading] = useState({
    main: false,
    submit: false,
  });
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });
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

  /**********
   ** FUNC **
   **********/
  const onSubmitLogin = () => {
    console.log('[LOG] ===  ===> Submit login');
    showMessage({
      icon: 'danger',
      message: 'Wrong Username or password',
      description: 'Please check your informations again.',
      type: 'danger',
    });
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    if (themeContext.themeApp === LIGHT) {
      StatusBar.setBarStyle('dark-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor(theme['background-basic-color-1'], true);
    }
    if (themeContext.themeApp === DARK) {
      StatusBar.setBarStyle('light-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor(theme['background-basic-color-1'], true);
    }
  }, [themeContext.themeApp]);

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
              cStyles.py16,
              cStyles.px32,
            ]}
            level='3'>
            {/** Form input */}
            <CForm
              ref={formRef}
              level='3'
              inputs={[
                {
                  id: INPUT_NAME.USER_NAME,
                  disabled: loading.main || loading.submit,
                  label: 'log_in:input_label_username',
                  holder: 'log_in:input_holder_username',
                  value: values.userName,
                  required: true,
                  password: false,
                  email: false,
                  phone: false,
                  number: false,
                  next: true,
                  return: 'next',
                },
                {
                  id: INPUT_NAME.PASSWORD,
                  disabled: loading.main || loading.submit,
                  label: 'log_in:input_label_password',
                  holder: 'log_in:input_holder_password',
                  value: values.password,
                  required: true,
                  password: true,
                  email: false,
                  phone: false,
                  number: false,
                  next: false,
                  return: 'done',
                  validate: {type: 'min_length', helper: '6'},
                },
              ]}
              customAddingForm={
                <View style={[cStyles.itemsEnd, cStyles.mt16]}>
                  <TouchableWithoutFeedback onPress={handleGoForgotPassword}>
                    <Text
                      style={[cStyles.textUnderline, {color: theme['color-primary-500']}]}
                      category={'p1'}>
                      {t('log_in:is_forgot_password')}
                    </Text>
                  </TouchableWithoutFeedback>
                </View>
              }
              labelButton={'log_in:title'}
              onSubmit={onSubmitLogin}
            />

            {/** Sign up ? */}
            <View style={[cStyles.row, cStyles.itemsEnd, cStyles.justifyCenter, cStyles.mt24]}>
              <Text category='p1'>{t('log_in:dont_have_account')}</Text>
              <TouchableWithoutFeedback onPress={handleSignUp}>
                <Text 
                  style={[cStyles.textUnderline, cStyles.ml6, {color: theme['color-primary-500']}]}
                  category={'p1'}>
                  {t('log_in:sign_up')}
                </Text>
              </TouchableWithoutFeedback>
            </View>

            {/** Login with other socials */}
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.mt24]}>
              <Divider style={[cStyles.flex1, {backgroundColor: theme['color-basic-500']}]} />
                <Text style={cStyles.mx10} category={'c1'}>{t('log_in:login_with_socials')}</Text>
              <Divider style={[cStyles.flex1, {backgroundColor: theme['color-basic-500']}]} />
            </View>

            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.mt24]}>
              <CButtonSocial type={SOCIAL_NAME.APPLE} />
              <CButtonSocial type={SOCIAL_NAME.FACEBOOK} />
              <CButtonSocial type={SOCIAL_NAME.GOOGLE} />
            </View>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
});

export default Login;
