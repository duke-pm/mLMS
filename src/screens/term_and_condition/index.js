/**
 ** Name: Term and Condition screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import { WebView } from 'react-native-webview';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import { cStyles } from '~/utils/style';
/* REDUX */


function TermCondition(props) {
  const {navigation} = props;

  /** Use state */
  const [url, setUrl] = useState('https://google.com.vn/');

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={'top'}
      headerComponent={<CTopNavigation title={'term:title'} back />}>
      <WebView source={{ uri: url }} />
    </CContainer>
  );
}

export default TermCondition;
