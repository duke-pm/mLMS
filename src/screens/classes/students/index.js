/**
 ** Name: Students screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMPONENTS */

/* COMMON */

/* REDUX */


function Students(props) {
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
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation title={'students:title'} back />
      }>
      
    </CContainer>
  );
}

export default Students;
