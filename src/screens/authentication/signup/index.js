/**
 ** Name: Sign Up screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useContext, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TopNavigation, Layout, useTheme, Text, Input, Icon, Button, CheckBox } from '@ui-kitten/components';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
/* COMPONENTS */

/* COMMON */
import Routes from '~/navigator/Routes';
import {ThemeContext} from '~/configs/theme-context';
import { cStyles } from '~/utils/style';
/* REDUX */


/** All init */
const INPUT_NAME = {
  USER_NAME: 'userName',
  EMAIL: 'email',
  PHONE: '',
  PASSWORD: 'password',
};
const safeAreaScreen = ['left', 'right', 'top'];

const RenderTopLeft = trans => {
  return (
    <React.Fragment>
      <View style={cStyles.ml28}>
        <Text category={'h2'}>{trans('sign_up:title')}</Text>
        <Text style={cStyles.mt6} category={'c1'}>{trans('sign_up:caption')}</Text>
      </View>
    </React.Fragment>
  )
};

function Form(props) {
  const {t} = useTranslation();
  const themeContext = useContext(ThemeContext);

  /** Use state */
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [value, setValue] = useState({
    userName: '',
    email: '',
    phone: '',
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
        label={t('sign_up:input_label_username')}
        placeholder={t('sign_up:input_holder_username')}
        returnKeyType={'next'}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.USER_NAME, newValue)}
      />

      <Input
        style={cStyles.mt24}
        nativeID={INPUT_NAME.EMAIL}
        value={value.email}
        label={t('sign_up:input_label_email')}
        placeholder={t('sign_up:input_holder_email')}
        keyboardType={'email-address'}
        returnKeyType={'next'}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.EMAIL, newValue)}
      />

      <Input
        style={cStyles.mt24}
        nativeID={INPUT_NAME.PHONE}
        value={value.phone}
        label={t('sign_up:input_label_phone')}
        placeholder={t('sign_up:input_holder_phone')}
        keyboardType={'phone-pad'}
        returnKeyType={'next'}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.PHONE, newValue)}
      />

      <Input
        style={cStyles.mt24}
        nativeID={INPUT_NAME.PASSWORD}
        value={value.password}
        label={t('sign_up:input_label_password')}
        placeholder={t('sign_up:input_holder_password')}
        accessoryRight={onRenderIcon}
        secureTextEntry={secureTextEntry}
        returnKeyType={'done'}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.PASSWORD, newValue)}
      />
    </>
  )
};

const useCheckboxState = (initialCheck = false) => {
  /** Use state */
  const [checked, setChecked] = useState(initialCheck);

  return { checked, onChange: setChecked };
};


function SignUp(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use State */
  const policyCheckbox = useCheckboxState();

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleLogIn = () => {
    console.log('[LOG] ===  ===> Go to Log in');
    navigation.navigate(Routes.AUTHENTICATION.LOGIN_IN.name);
  };

  const handleValidation = () => {
    console.log('[LOG] ===  ===> Check validation');
    onSubmitSignUp();
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitSignUp = () => {
    console.log('[LOG] ===  ===> Submit signup');
  };

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  return (
    <SafeAreaView
      style={[cStyles.flex1, {backgroundColor: theme['background-basic-color-1']}]}
      edges={safeAreaScreen}>
      <KeyboardAwareScrollView contentContainerStyle={cStyles.flex1}>
        <Layout style={cStyles.flex1}>
          {/** Header */}
          <TopNavigation accessoryLeft={RenderTopLeft(t)} />

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

            {/** Check policy */}
            <CheckBox
              style={cStyles.mt24}
              status='info'
              {...policyCheckbox}>
              {t('sign_up:policy')}
            </CheckBox>

            {/** Button */}
            <Button
              style={cStyles.mt24}
              appearance='filled'
              disabled={!policyCheckbox.checked}
              onPress={handleValidation}
            >
              {t('sign_up:title')}
            </Button>

            {/** Log in ? */}
            <View style={[cStyles.itemsCenter, cStyles.mt24]}>
              <Text category={'p1'}>{t('sign_up:have_account')}
                <TouchableWithoutFeedback onPress={handleLogIn}>
                  <Text style={{color: theme['color-primary-500']}} category={'p1'}> {t('sign_up:log_in')}</Text>
                </TouchableWithoutFeedback>
              </Text>
            </View>
          </Layout>
        </Layout>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
