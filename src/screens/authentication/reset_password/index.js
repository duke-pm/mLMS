/**
 ** Name: Reset password screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Text, Button} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CForm from '~/components/CForm';
/* COMMON */
import {colors, cStyles} from '~/utils/style';
import { ThemeContext } from '~/configs/theme-context';
import { LIGHT } from '~/configs/constants';
/* REDUX */


/** All init */
const INPUT_NAME = {
  PASSWORD: 'password',
};

function ResetPassword(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
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
  const handleGoBack = () => {
    navigation.goBack();
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
    <CContainer
      safeArea={['top']}
      backgroundColor={themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}>
      {/** Header */}
      <CTopNavigation
        style={{backgroundColor: themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}}
        back
        leftTitle={'reset_password:title'} />

      {/** Content prepare send */}
      {!showAlert.success && (
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
          {/** Caption */}
          <View style={cStyles.mt16}>
            <Text style={cStyles.textCenter} category='p1'>{t('reset_password:caption')}</Text>  
          </View>

          {/** Form input */}
          <CForm
            ref={formRef}
            loading={loading}
            level='2'
            inputs={[
              {
                id: INPUT_NAME.PASSWORD,
                type: 'text',
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
            <Text style={cStyles.textCenter} category='s1'>{t('reset_password:success_sub_title')}</Text>
            <Text style={[cStyles.mt16, cStyles.textCenter]} category='p1'>{t('reset_password:success_caption')}</Text>  
          </View>

          <Button
            style={cStyles.mt24}
            appearance='outline'
            onPress={handleGoBack}>
            {t('common:go_back')}
          </Button>
        </Layout>
      )}
    </CContainer>
  );
}

export default ResetPassword;
