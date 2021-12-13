/**
 ** Name: Information screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, useTheme } from '@ui-kitten/components';
import {View, Image} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import Configs from '~/configs';
import Assets from '~/utils/asset/Assets';
import {ThemeContext} from '~/configs/theme-context';
import {LIGHT} from '~/configs/constants';
import {cStyles} from '~/utils/style';
import {moderateScale, sH} from '~/utils/helper';
/* REDUX */


function Information(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** Use state */
  

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
      safeArea={['top']}
      backgroundColor={themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}
      headerComponent={
        <CTopNavigation
          style={{backgroundColor: themeContext.themeApp === LIGHT ? '#F7F9FC' : theme['color-basic-900']}}
          back />
      }>
      <Layout style={[cStyles.center, {height: sH('20%')}]} level={'2'}>
        <Image
          style={{height: moderateScale(120), width: moderateScale(120)}}
          source={Assets.imgLogoHorizontal}
          resizeMode={'contain'}
        />
        <View style={[cStyles.flex1, cStyles.itemsEnd, cStyles.justifyEnd, cStyles.fullWidth, cStyles.px16, cStyles.pb10]}>
          <CText category={'c1'}>{t('information:copyright')} &#169; {moment().year()} {Configs.developBy}</CText>
        </View>
      </Layout>

      <Layout style={[cStyles.flex1, cStyles.roundedTopLeft5, cStyles.roundedTopRight5]} >
        <View style={cStyles.m16}>
          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <CText category={'s2'}>{t('information:name_app')}</CText>
            <CText >{Configs.nameOfApp}</CText>
          </View>

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <CText category={'s2'}>{t('information:version_app')}</CText>
            <CText >{Configs.versionOfApp}</CText>
          </View>

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <CText category={'s2'}>{t('information:develop_by')}</CText>
            <CText >{Configs.developBy}</CText>
          </View>

          <View style={cStyles.py12}>
            <CText category={'s2'}>{t('information:info_important')}</CText>
            <CText style={cStyles.mt10} >  &#10041;  {t('information:info_important_1')}</CText>
            <CText style={cStyles.mt10} >  &#10041;  {t('information:info_important_2')}</CText>
            <CText style={cStyles.mt10} >  &#10041;  {t('information:info_important_3')}</CText>
            <CText style={cStyles.mt10} >  &#10041;  {t('information:info_important_4')}</CText>
            <CText style={cStyles.mt10} >  &#10041;  {t('information:info_important_5')}</CText>
          </View>
        </View>
      </Layout>
    </CContainer>
  );
}

export default Information;
