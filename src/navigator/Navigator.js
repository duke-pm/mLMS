/* eslint-disable react-hooks/exhaustive-deps */
/**
 ** Name: Navigator
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Navigator.js
 **/
import React, {useEffect} from 'react';
import {compose} from 'redux';
import {useSelector} from 'react-redux';
import {withTranslation} from 'react-i18next';
/* COMPONENTS */
import RootMain from './Root';
import NavigationService from './NavigationService';
/* COMMON */
import '~/utils/languages/config-i18n';
import Configs from '~/configs';

function Navigator(props) {
  /** Use redux */
  const commonState = useSelector(({common}) => common);

  /************
   ** FUNC **
   ************/

  /******************
   ** LIFE CYCLE **
   ******************/
  // useEffect(() => onStartApp(), []);

  useEffect(() => {
    if (commonState.get('language') !== props.i18n.language) {
      props.i18n.changeLanguage(commonState.get('language'));
    }
  }, [
    commonState.get('language'),
    props.i18n.language,
    props.i18n.changeLanguage,
  ]);

  /**************
   ** RENDER **
   **************/
  return (
    <RootMain
      ref={nav => {
        NavigationService.setTopLevelNavigator(nav);
      }}
      uriPrefix={Configs.prefixesDeepLink}
      screenProps={props}
      {...props}
    />
  );
}

export default compose(withTranslation())(Navigator);
