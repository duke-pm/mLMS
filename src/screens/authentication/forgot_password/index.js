/**
 ** Name: Forgot password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Button, useTheme} from '@ui-kitten/components';
import {View, LayoutAnimation, UIManager} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {colors, cStyles} from '~/utils/style';
import {IS_ANDROID, moderateScale} from '~/utils/helper';
import { ThemeContext } from '~/configs/theme-context';
import { LIGHT } from '~/configs/constants';
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

function ForgotPassword(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
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
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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
  useEffect(() => {
  }, []);

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
        borderBottom={false}
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
          level={'3'}>
          <View style={[cStyles.itemsCenter, cStyles.mt60]}>
            <IoniIcon name={'checkmark-circle-outline'} size={moderateScale(150)} color={colors.PRIMARY}  />
          </View>

          {/** Sub-title & Caption */}
          <View style={cStyles.mt16}>
            <CText style={cStyles.textCenter} category='s1'>{t('forgot_password:success_sub_title')}</CText>
            <CText style={[cStyles.mt16, cStyles.textCenter]} category='p1'>{t('forgot_password:success_caption')}</CText>  
          </View>

          <Button
            style={cStyles.mt24}
            appearance={'filled'}
            onPress={handleGoBack}>
            {t('common:go_back')}
          </Button>
        </Layout>
      )}
    </CContainer>
  )
}

export default ForgotPassword;
