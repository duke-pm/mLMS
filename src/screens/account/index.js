/**
 ** Name: Account screen
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
 /* COMMON */
 
 /* REDUX */
 
 
 function Account(props) {
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
 
   /************
    ** RENDER **
    ************/
   return (
     <CContainer safeArea={['top', 'bottom']}>
       <Layout>
 
       </Layout>
     </CContainer>
   );
 }
 
 export default Account;
 