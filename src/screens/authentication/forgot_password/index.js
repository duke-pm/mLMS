/**
 ** Name: Forgot password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Button, useTheme} from '@ui-kitten/components';
import {View} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
import CText from '~/components/CText';
/* COMMON */
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
/* REDUX */

const MyIconAnim = Animatable.createAnimatableComponent(IoniIcon);

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
    success: false,
    error: false,
    content: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoBack = () => {
    navigation.goBack();
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitSend = () => {
    setLoading(true);
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
        showMessage({
          message: t('common:error'),
          description: t('forgot_password:error_send'),
          type: 'danger',
          icon: 'danger',
        });
      }
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
      backgroundColor={theme['background-basic-color-3']}>
      {/** Header */}
      <CTopNavigation
        style={{backgroundColor: theme['background-basic-color-3']}}
        back
        leftTitle={'forgot_password:title'} />

      {/** Content prepare send */}
      {showAlert.content === '' && (
        <Layout
          style={[
            cStyles.flex1,
            cStyles.mt16,
            cStyles.roundedTopLeft5,
            cStyles.roundedTopRight5,
            cStyles.py16,
            cStyles.px32,
          ]}
          level={'1'}>
          {/** Caption */}
          <View style={cStyles.mt16}>
            <CText style={cStyles.textCenter} category='p1'>{t('forgot_password:caption')}</CText>
          </View>

          <CForm
            ref={formRef}
            loading={loading}
            level='2'
            inputs={[
              {
                id: INPUT_NAME.EMAIL,
                type: 'text',
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
                validate: {type: 'format_email', helper: ''},
              },
            ]}
            leftButton={loading}
            labelButton={'forgot_password:send'}
            disabledButton={loading}
            onSubmit={onSubmitSend}
          />
        </Layout>
      )}

      {/** Content when success */}
      {showAlert.success && (
        <Layout
          style={[
            cStyles.flex1,
            cStyles.mt16,
            cStyles.roundedTopLeft5,
            cStyles.roundedTopRight5,
            cStyles.py16,
            cStyles.px32,
          ]}
          level={'1'}>
          <View style={cStyles.itemsCenter}>
            <MyIconAnim
              name={'checkmark-circle-outline'}
              size={moderateScale(150)}
              color={theme['color-success-500']}
              animation='pulse'
              easing='ease-out'
            />
          </View>

          {/** Sub-title & Caption */}
          <View style={cStyles.mt16}>
            <CText style={cStyles.textCenter} category='s1'>{t('forgot_password:success_sub_title')}</CText>
            <CText style={[cStyles.mt16, cStyles.textCenter]} category='p1'>{t('forgot_password:success_caption')}</CText>  
          </View>

          <Button
            style={cStyles.mt24}
            appearance={'filled'}
            disabled={loading}
            onPress={handleGoBack}>
            {t('common:go_back')}
          </Button>
        </Layout>
      )}
    </CContainer>
  )
}

export default ForgotPassword;
