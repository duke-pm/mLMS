/**
 ** Name: Profile screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import { Layout } from '@ui-kitten/components';
import React, {useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {View} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import CAlert from '~/components/CAlert';
import CContainer from '~/components/CContainer';
import CForm from '~/components/CForm';
import CTopNavigation from '~/components/CTopNavigation';
import { cStyles } from '~/utils/style';
/* COMPONENTS */

/* COMMON */

/* REDUX */


/** All init */
const INPUT_NAME = {
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  PHONE: 'phone',
  GENDER: 'gender',
  DOB: 'dob',
  ADDRESS: 'address',
};

function Profile(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  /** Use ref */
  const formRef = useRef();

  /** Use state */
  const [loading, setLoading] = useState(false);
  const [alertSave, setAlertSave] = useState(false);
  const [values, setValues] = useState({
    firstName: 'Wayne',
    lastName: 'Rooney',
    gender: 0,
    phone: '0762949436',
    dob: new Date(),
    address: '801 E 92ND LOS ANGELES CA 90002-1634 USA',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleAlertSave = () => {
    setAlertSave(!alertSave);
  };

  const handleSave= () => {
    setAlertSave(!alertSave);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let rdSave = Math.random();
      if (rdSave > 0.5) {
        showMessage({
          message: t('profile:success_sub_title'),
          description: t('profile:success_caption'),
          type: 'success',
          icon: 'success',
        });
      } else {
        showMessage({
          message: t('profile:error_sub_title'),
          description: t('profile:error_caption'),
          type: 'danger',
          icon: 'danger',
        });
      }
    }, 2000);
  };

  /**********
   ** FUNC **
   **********/
  const onSubmitEdit = () => {
    setAlertSave(!alertSave);
    console.log('[LOG] === onSubmitEdit ===> ');
  };

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      padder
      headerComponent={<CTopNavigation title={'profile:title'} back />}>
      <Layout style={[cStyles.rounded1, cStyles.p16]} level={'1'}>
        <CForm
          ref={formRef}
          loading={loading}
          level='2'
          inputs={[
            {
              id: INPUT_NAME.FIRST_NAME,
              style: [cStyles.mt0],
              type: 'text',
              label: 'profile:input_label_first_name',
              holder: 'profile:input_holder_first_name',
              value: values.firstName,
              required: true,
              password: false,
              email: false,
              phone: false,
              number: false,
              next: true,
              return: 'next',
            },
            {
              id: INPUT_NAME.LAST_NAME,
              type: 'text',
              label: 'profile:input_label_last_name',
              holder: 'profile:input_holder_last_name',
              value: values.lastName,
              required: true,
              password: false,
              email: false,
              phone: false,
              number: false,
              next: true,
              return: 'next',
            },
            {
              id: INPUT_NAME.PHONE,
              type: 'text',
              label: 'profile:input_label_phone',
              holder: 'profile:input_holder_phone',
              value: values.phone,
              required: true,
              password: false,
              email: false,
              phone: true,
              number: false,
              next: true,
              return: 'next',
            },
            {
              id: INPUT_NAME.GENDER,
              type: 'radio',
              label: 'profile:input_label_gender',
              holder: 'profile:input_holder_gender',
              value: values.gender,
              values: [t('profile:male'), t('profile:female')],
              horizontal: true,
              required: false,
              password: false,
              email: false,
              phone: false,
              number: false,
              next: true,
              return: 'next',
            },
            {
              id: INPUT_NAME.DOB,
              type: 'datePicker',
              label: 'profile:input_label_dob',
              holder: 'profile:input_holder_dob',
              value: values.dob,
              required: false,
              password: false,
              email: false,
              phone: false,
              number: false,
              next: true,
              return: 'next',
            },
            {
              id: INPUT_NAME.ADDRESS,
              type: 'text',
              label: 'profile:input_label_address',
              holder: 'profile:input_holder_address',
              value: values.address,
              required: false,
              password: false,
              email: false,
              phone: false,
              number: false,
              next: false,
              multiline: true,
              return: 'done',
            },
          ]}
          disabledButton={loading}
          labelButton={'profile:save'}
          onSubmit={onSubmitEdit}
        />
      </Layout>

      <CAlert
        contentStyle={cStyles.m0}
        show={alertSave}
        cancel={true}
        label={'common:alert'}
        message={'profile:alert_msg_save'}
        textOk={'profile:save'}
        statusOk={'primary'}
        onBackdrop={toggleAlertSave}
        onCancel={toggleAlertSave}
        onOk={handleSave}
      />
    </CContainer>
  );
}

export default Profile;
