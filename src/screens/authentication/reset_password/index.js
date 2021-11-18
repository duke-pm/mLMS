/**
 ** Name: Reset password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  useTheme, Layout, Text, Button, Modal, Card,
} from '@ui-kitten/components';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
/* COMMON */
import {colors, cStyles} from '~/utils/style';
/* REDUX */


/** All init */
const INPUT_NAME = {
  PASSWORD: 'password',
};

function ResetPassword(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** use ref */
  const formRef = useRef();

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    password: '',
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
    handleGoBackLogIn();
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitSave = () => {
    console.log('[LOG] ===  ===> Submit save');
    setTimeout(() => {
      setLoading(false);
      let rdAlert = Math.random();
      if (rdAlert > 0.5) {
        setShowAlert({
          status: true,
          success: true,
          content: t('reset_password:success_send'),
        });
      } else {
        setShowAlert({
          status: true,
          success: false,
          content: t('reset_password:error_send'),
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
      <CTopNavigation back leftTitle={'reset_password:title'} />

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
        {/** Caption */}
        <View style={cStyles.mt16}>
          <Text style={cStyles.textCenter} category='p1'>{t('reset_password:caption')}</Text>  
        </View>

        {/** Form input */}
        <CForm
          ref={formRef}
          loading={loading}
          level='3'
          inputs={[
            {
              id: INPUT_NAME.PASSWORD,
              disabled: loading,
              label: 'reset_password:input_label_password',
              holder: 'reset_password:input_holder_password',
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
          leftButton={loading}
          labelButton={'reset_password:save'}
          onSubmit={onSubmitSave}
        />

        {/** Log in ? */}
        <View style={[cStyles.itemsCenter, cStyles.mt24]}>
          <TouchableWithoutFeedback disabled={loading} onPress={handleGoBackLogIn}>
            <Text
              style={[cStyles.textUnderline, {color: theme['color-primary-500']}]}
              category={'p1'}>
              {t('reset_password:go_back')}
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
            {t('reset_password:go_back')}
          </Button>
        </Card>
      </Modal>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  con_backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
});

export default ResetPassword;
