/**
 ** Name: Forgot password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme, Layout, Text, Button, Modal, Card} from '@ui-kitten/components';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
/* COMMON */
import Routes from '~/navigator/Routes';
import {colors, cStyles} from '~/utils/style';
/* REDUX */


/** All init */
const INPUT_NAME = {
  EMAIL: 'email',
};

function ForgotPassword(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;
  
  /** use ref */
  const formRef = useRef();

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    email: '',
  });
  const [showAlert, setShowAlert] = useState({
    status: false,
    success: false,
    content: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoResetPassword = () => {
    navigation.navigate(Routes.AUTHENTICATION.RESET_PASSWORD.name);
  };

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
  useEffect(() => {

  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer safeArea={['top']}>
      {/** Header */}
      <CTopNavigation back leftTitle={'forgot_password:title'} />

      {/** Content prepare send */}
      <Layout
        style={[
          cStyles.flex1,
          cStyles.mt16,
          cStyles.roundedTopLeft5,
          cStyles.roundedTopRight5,
          cStyles.py16,
          cStyles.px32,
        ]}
        level={'3'}>
        {/** Caption */}
        <View style={cStyles.mt16}>
          <Text style={cStyles.textCenter} category='p1'>{t('forgot_password:caption')}</Text>  
        </View>

        <CForm
          ref={formRef}
          loading={loading}
          level='3'
          inputs={[
            {
              id: INPUT_NAME.EMAIL,
              disabled: loading,
              label: 'forgot_password:input_label_email',
              holder: 'forgot_password:input_holder_email',
              value: values.email,
              required: true,
              password: false,
              email: true,
              phone: false,
              number: false,
              next: false,
              return: 'send',
              validate: {type: 'email', helper: ''},
            },
          ]}
          leftButton={loading}
          labelButton={'forgot_password:send'}
          onSubmit={onSubmitSend}
        />

        <Button
          style={cStyles.mt24}
          appearance='filled'
          onPress={handleGoResetPassword}>
          {'Go Reset Password Screen'}
        </Button>

        {/** Log in ? */}
        <View style={[cStyles.itemsCenter, cStyles.mt24]}>
          <TouchableWithoutFeedback disabled={loading} onPress={handleGoBackLogIn}>
            <Text
              style={[cStyles.textUnderline, {color: theme['color-primary-500']}]}
              category={'p1'}>
              {t('forgot_password:go_back')}
            </Text>
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
    </CContainer>
  )
}

const styles = StyleSheet.create({
  con_backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
});

export default ForgotPassword;
