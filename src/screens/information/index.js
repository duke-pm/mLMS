/**
 ** Name: Information screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, useTheme, Text } from '@ui-kitten/components';
import {View, Image} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
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
          <Text category={'c1'}>{t('information:copyright')} &#169; {moment().year()} {Configs.developBy}</Text>
        </View>
      </Layout>

      <Layout style={[cStyles.flex1, cStyles.roundedTopLeft5, cStyles.roundedTopRight5]} level={'1'}>
        <View style={cStyles.m16}>
          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <Text category={'s2'}>{t('information:name_app')}</Text>
            <Text category={'p1'}>{Configs.nameOfApp}</Text>
          </View>

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <Text category={'s2'}>{t('information:version_app')}</Text>
            <Text category={'p1'}>{Configs.versionOfApp}</Text>
          </View>

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py12]}>
            <Text category={'s2'}>{t('information:develop_by')}</Text>
            <Text category={'p1'}>{Configs.developBy}</Text>
          </View>

          <View style={cStyles.py12}>
            <Text category={'s2'}>{t('information:info_important')}</Text>
            <Text style={cStyles.mt10} category={'p1'}>  &#10041;  {t('information:info_important_1')}</Text>
            <Text style={cStyles.mt10} category={'p1'}>  &#10041;  {t('information:info_important_2')}</Text>
            <Text style={cStyles.mt10} category={'p1'}>  &#10041;  {t('information:info_important_3')}</Text>
            <Text style={cStyles.mt10} category={'p1'}>  &#10041;  {t('information:info_important_4')}</Text>
            <Text style={cStyles.mt10} category={'p1'}>  &#10041;  {t('information:info_important_5')}</Text>
          </View>
        </View>
      </Layout>
    </CContainer>
  );
}

export default Information;
