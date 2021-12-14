/**
 ** Name: Home screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@ui-kitten/components';
import {StatusBar, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import { cStyles } from '~/utils/style';
import { IS_ANDROID } from '~/utils/helper';
/* REDUX */

function Home(props) {
  const {t} = useTranslation();
  const {navigation} = props;

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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor('white', true);
    });
    return unsubscribe;
  }, [navigation]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={t('home:title')} notification />}>
      
    </CContainer>
  );
}

export default Home;
