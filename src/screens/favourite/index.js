/**
 ** Name: Favoutite screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMPONENTS */

/* COMMON */

/* REDUX */


function Favoutite(props) {
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

/************
  ** RENDER **
  ************/
  return (
    <CContainer
      safeArea={['top']}
      padder
      headerComponent={<CTopNavigation title={'favourite:title'} back />}>

    </CContainer>
  );
}

export default Favoutite;
