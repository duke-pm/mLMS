/**
 ** Name: Forgot password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {forwardRef, useContext, useRef, useState, useEffect, useImperativeHandle} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useTheme, TopNavigation, Layout, Input, Text, Spinner, Button, Modal, Card, Icon} from '@ui-kitten/components';
import {StyleSheet, TouchableWithoutFeedback, View, LayoutAnimation, UIManager} from 'react-native';
/* COMPONENTS */

/* COMMON */
import Routes from '~/navigator/Routes';
import {ThemeContext} from '~/configs/theme-context';
import { colors, cStyles } from '~/utils/style';
import { IS_ANDROID, validation } from '~/utils/helper';
/* REDUX */

if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/** All init */
const INPUT_NAME = {
  EMAIL: 'email',
};
const safeAreaScreen = ['left', 'right', 'top'];

const RenderTopLeft = trans => {
  return (
    <React.Fragment>
      <View style={cStyles.ml28}>
        <Text category={'h2'}>{trans('forgot_password:title')}</Text>
      </View>
    </React.Fragment>
  )
};

const RenderLoadingIndicator = (props) => (
  <View style={[props.style, cStyles.center]}>
    <Spinner size='small' status='control' />
  </View>
);

const Form = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const themeContext = useContext(ThemeContext);

  /** Use state */
  const [value, setValue] = useState({
    email: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleChangeValue = (iInput, nValue) => {
    setValue({...value, [iInput]: nValue});
  };

  useImperativeHandle(
    ref,
    () => ({
      onCallbackValue() {
        return value;
      }
    }),
  )

  /************
   ** RENDER **
   ************/
  return (
    <>
      <Input
        nativeID={INPUT_NAME.EMAIL}
        value={value.email}
        label={t('forgot_password:input_label_email')}
        placeholder={t('forgot_password:input_holder_email')}
        caption={props.error.status ? props.error.helper : undefined}
        disabled={props.disabled}
        status={props.error.status ? 'danger' : 'basic'}
        keyboardType={'email-address'}
        returnKeyType={'send'}
        keyboardAppearance={themeContext.theme}
        onChangeText={newValue => handleChangeValue(INPUT_NAME.EMAIL, newValue)}
      />
    </>
  )
});

function ForgotPassword(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;
  
  /** use ref */
  const formRef = useRef();

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [errorValidation, setErrorValidation] = useState({
    status: false,
    helper: '',
  });
  const [showAlert, setShowAlert] = useState({
    status: false,
    success: false,
    content: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoBackLogIn = () => {
    navigation.goBack();
  };

  const handleDissmisAlert = () => {
    if (showAlert.success) {
      handleGoBackLogIn();
    } else {
      setShowAlert({
        status: false,
        success: false,
        content: '',
      });
    }
  };

  const handleValidation = () => {
    setErrorValidation({status: false, helper: ''});
    let tmpValueInput = formRef.current.onCallbackValue();
    if (tmpValueInput) {
      let tmpCheckValidation = validation(tmpValueInput.email, 'email');
      if (tmpCheckValidation) {
        setLoading(true);
        onSubmitSend();
      } else {
        setErrorValidation({status: true, helper: t('error:format_email')});
      }
    }
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitSend = () => {
    console.log('[LOG] ===  ===> Submit send');
    setTimeout(() => {
      setLoading(false);
      let rdAlert = Math.random();
      if (rdAlert > 0.5) {
        setShowAlert({
          status: true,
          success: true,
          content: t('forgot_password:success_send'),
        });
      } else {
        setShowAlert({
          status: true,
          success: false,
          content: t('forgot_password:error_send'),
        });
      }
    }, 2000);
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

            {/** Content prepare send */}
            <Layout
              style={[
                cStyles.flex1,
                cStyles.mt16,
                cStyles.roundedTopLeft5,
                cStyles.roundedTopRight5,
                cStyles.p32
              ]}
              level={'3'}>
              {/** Form input */}
              <Form ref={formRef} disabled={loading} level='3' error={errorValidation} />

              {/** Button */}
              <Button
                style={cStyles.mt24}
                appearance='filled'
                accessoryLeft={loading && RenderLoadingIndicator}
                onPress={handleValidation}>
                {t('forgot_password:send')}
              </Button>

              {/** Log in ? */}
              <View style={[cStyles.itemsCenter, cStyles.mt24]}>
                <TouchableWithoutFeedback disabled={loading} onPress={handleGoBackLogIn}>
                  <Text style={{color: theme['color-primary-500']}} category={'p1'}>{t('forgot_password:go_back')}</Text>
                </TouchableWithoutFeedback>
              </View>
            </Layout>

            {/** Alert send success */}
            <Modal
              visible={showAlert.status}
              backdropStyle={styles.con_backdrop}
              onBackdropPress={undefined}>
              <Card disabled style={cStyles.mx24}>
                <Text category={'s1'}>{t(showAlert.success ? 'common:success' : 'common:error')}</Text>

                <Text style={cStyles.mt10} category={'p1'}>{showAlert.content}</Text>

                <Button style={cStyles.mt16} onPress={handleDissmisAlert}>
                  {t('forgot_password:go_back')}
                </Button>
              </Card>
            </Modal>

          </Layout>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  con_backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
});

export default ForgotPassword;
