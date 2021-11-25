/**
 ** Name: Login screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme, Layout, Text, Divider} from '@ui-kitten/components';
import {View, TouchableWithoutFeedback} from 'react-native';
import {showMessage} from "react-native-flash-message";
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
import CButtonSocial, {SOCIAL_NAME} from '~/components/CButtonSocial';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
import { resetRoute } from '~/utils/helper';
import { ThemeContext } from '~/configs/theme-context';
import { LIGHT } from '~/configs/constants';
/* REDUX */


/** All init */
const INPUT_NAME = {
  USER_NAME: 'userName',
  PASSWORD: 'password'
};

function Login(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** use ref */
  const formRef = useRef();

  /** Use State */
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    userName: '',
    password: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoForgotPassword = () => {
    console.log('[LOG] ===  ===> Go to forgot password');
    navigation.navigate(Routes.FORGOT_PASSWORD.name);
  };

  const handleSignUp = () => {
    console.log('[LOG] ===  ===> Go to Sign up');
    navigation.navigate(Routes.SIGN_UP.name);
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitLogin = () => {
    console.log('[LOG] ===  ===> Submit login');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      resetRoute(navigation, Routes.TAB.name);
    }, 2000);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {}, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      backgroundColor={themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}>
      {/** Header */}
      <CTopNavigation
        style={{backgroundColor: themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}}
        darkmode
        leftTitle={'log_in:title'} />

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
        level='1'>
        {/** Form input */}
        <CForm
          ref={formRef}
          loading={loading}
          level='2'
          inputs={[
            {
              id: INPUT_NAME.USER_NAME,
              type: 'text',
              disabled: loading,
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
              type: 'text',
              disabled: loading,
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
          disabledButton={loading}
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
    </CContainer>
  )
}

export default Login;
