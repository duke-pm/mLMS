/**
 ** Name: Home screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CSearchBar from '~/components/CSearchBar';
import CForm from '~/components/CForm';
import { cStyles } from '~/utils/style';
/* COMMON */

/* REDUX */

const INPUT_NAME = {
  SELECT_1: 'select_1',
  TOOGLE: 'toggle',
  RADIO: 'radio',
};

function Home(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  const [values, setValues] = useState({
    select1: 0,
    toggle: false,
    radio: 0,
  });

  /*****************
   ** HANDLE FUNC **
   *****************/

  /**********
   ** FUNC **
   **********/

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
      safeArea={['top', 'bottom']}
      padder
      headerComponent={
        <CTopNavigation 
          title={t('home:title')}
        />
      }>
      <CSearchBar />
      <CForm
        containerStyle={cStyles.mt16}
        level={'1'}
        inputs={[
          {
            id: INPUT_NAME.SELECT_1,
            type: 'select',
            label: 'Select box 1',
            holder: 'Select one of below',
            value: values.select1,
            values: ['Option 1', 'Option 2', 'Option 3'],
            required: false,
            password: false,
            email: false,
            phone: false,
            number: false,
            next: false,
            return: 'done',
          },
          {
            id: INPUT_NAME.TOOGLE,
            style: cStyles.mt24,
            type: 'toggle',
            position: 'left',
            label: 'Toggle',
            value: values.toggle,
            required: false,
            password: false,
            email: false,
            phone: false,
            number: false,
            next: false,
            return: 'done',
          },
          {
            id: INPUT_NAME.RADIO,
            style: cStyles.mt24,
            type: 'radio',
            label: 'Radio button',
            value: values.radio,
            values: ['Option 1', 'Option 2', 'Option 3'],
            required: false,
            password: false,
            email: false,
            phone: false,
            number: false,
            next: false,
            return: 'done',
          }
        ]}
      />
    </CContainer>
  );
}

export default Home;
