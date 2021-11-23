/**
 ** Name: Settings screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Menu, MenuItem, Icon, Text, useTheme, Layout} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import Configs from '~/configs';
import { DARK } from '~/configs/constants';
import { ThemeContext } from '~/configs/theme-context';
import { cStyles } from '~/utils/style';
import Routes from '~/navigator/Routes';
/* REDUX */


const RenderForwardIcon = (props, value) => {
  const theme = useTheme();
  return (
    <View style={[cStyles.row, cStyles.itemsCenter]}>
      {value && (
        <Text style={{color: theme['color-basic-500']}} category={'p1'}>{value}</Text>
      )}
      <Icon {...props} name='arrow-ios-forward' />
    </View>
  )
};

const RenderLeftIcon = (props, nameIcon) => (
  <Icon {...props} name={nameIcon} />
);

function Settings(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoMenuItem = () => {
    navigation.navigate(Routes.APPEARANCE.name);
  };
  

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  let tmpAppearance = 'settings:light_mode';
  if (themeContext.themeApp === DARK) {
    tmpAppearance = 'settings:dark_mode';
  }
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={'settings:title'} back />}>
      <Layout style={cStyles.flex1} level={'1'}>
        <Menu style={{backgroundColor: theme['background-basic-color-1']}}>
          <MenuItem
            title={t('settings:notification')}
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'bell-outline')}
            accessoryRight={propsIc => RenderForwardIcon(propsIc)} />
          <MenuItem
            title={t('settings:appearance')}
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'color-palette-outline')}
            accessoryRight={propsIc => RenderForwardIcon(propsIc, t(tmpAppearance))}
            onPress={handleGoMenuItem} />
          <MenuItem
            title={t('settings:language_font')}
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'globe-outline')}
            accessoryRight={propsIc => RenderForwardIcon(propsIc)} />
          <MenuItem
            title={t('settings:about_information') + Configs.nameOfApp}
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'info-outline')}
            accessoryRight={propsIc => RenderForwardIcon(propsIc)} />
        </Menu>
      </Layout>
    </CContainer>
  );
}

export default Settings;
