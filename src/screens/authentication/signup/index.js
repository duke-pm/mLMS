/**
 ** Name: Sign Up screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, useTheme, Text, CheckBox} from '@ui-kitten/components';
import {TouchableWithoutFeedback, View} from 'react-native';
import {showMessage} from "react-native-flash-message";
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
/* COMMON */
import {cStyles} from '~/utils/style';
/* REDUX */


/** All init */
const INPUT_NAME = {
  USER_NAME: 'userName',
  EMAIL: 'email',
  PHONE: 'phone',
  PASSWORD: 'password',
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

  /** use ref */
  const formRef = useRef();

  /** Use State */
  const [loading, setLoading] = useState(false);
  const policyCheckbox = useCheckboxState();
  const [values, setValues] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoBackLogIn = () => {
    navigation.goBack();
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitSignUp = () => {
    console.log('[LOG] ===  ===> Submit signup');
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

  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer safeArea={['top']}>
      {/** Header */}
      <CTopNavigation
        back
        leftTitle={'sign_up:title'}
        leftSubtitle={'sign_up:subtitle'}
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
          loading={loading}
          level='3'
          inputs={[
            {
              id: INPUT_NAME.USER_NAME,
              disabled: loading,
              label: 'sign_up:input_label_username',
              holder: 'sign_up:input_holder_username',
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
              id: INPUT_NAME.EMAIL,
              disabled: loading,
              label: 'sign_up:input_label_email',
              holder: 'sign_up:input_holder_email',
              value: values.email,
              required: true,
              password: false,
              email: true,
              phone: false,
              number: false,
              next: true,
              return: 'next',
              validate: {type: 'email', helper: ''},
            },
            {
              id: INPUT_NAME.PHONE,
              disabled: loading,
              label: 'sign_up:input_label_phone',
              holder: 'sign_up:input_holder_phone',
              value: values.phone,
              required: true,
              password: false,
              email: false,
              phone: true,
              number: false,
              next: true,
              return: 'next',
              validate: {type: 'min_length', helper: '10'},
            },
            {
              id: INPUT_NAME.PASSWORD,
              disabled: loading,
              label: 'sign_up:input_label_password',
              holder: 'sign_up:input_holder_password',
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
            <CheckBox
              style={cStyles.mt24}
              status='basic'
              {...policyCheckbox}>
              {t('sign_up:policy')}
            </CheckBox>
          }
          labelButton={'sign_up:title'}
          disabledButton={!policyCheckbox.checked}
          onSubmit={onSubmitSignUp}
        />

        {/** Log in ? */}
        <View style={[cStyles.row, cStyles.itemsEnd, cStyles.justifyCenter, cStyles.mt24]}>
          <Text category='p1'>{t('sign_up:have_account')}</Text>
          <TouchableWithoutFeedback onPress={handleGoBackLogIn}>
            <Text 
              style={[cStyles.textUnderline, cStyles.ml6, {color: theme['color-primary-500']}]}
              category={'p1'}>
              {t('sign_up:log_in')}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Layout>
    </CContainer>
  )
}

export default SignUp;
