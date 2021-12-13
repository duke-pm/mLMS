/**
 ** Name: Settings screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {Menu, MenuItem, Icon, Text, useTheme, Layout} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import { ThemeContext } from '~/configs/theme-context';
import { cStyles } from '~/utils/style';
/* REDUX */
import * as Actions from '~/redux/actions';


/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderForwardIcon = (props, value) => {
  const theme = useTheme();
  const {t} = useTranslation();
  return (
    <View style={[cStyles.row, cStyles.itemsCenter]}>
      {value && (
        <CText style={{color: theme['color-basic-500']}} >{t(value)}</CText>
      )}
      <Icon {...props} name='arrow-ios-forward' />
    </View>
  )
};

const RenderLeftIcon = (props, nameIcon) => (
  <Icon {...props} name={nameIcon} />
);

/********************
 ** MAIN COMPONENT **
 ********************/
function Settings(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** Use redux */
  const commonState = useSelector(({common}) => common);
  
  /** Use state */
  const [menu, setMenu] = useState([
    {
      id: 'notification',
      label: 'settings:notification',
      icon: 'bell-outline',
      renderNext: true,
      nextRoute: Routes.LANGUAGES.name,
      value: null,
    },
    {
      id: 'appearance',
      label: 'settings:appearance',
      icon: 'color-palette-outline',
      renderNext: true,
      nextRoute: Routes.APPEARANCE.name,
      value: null,
    },
    {
      id: 'language_font',
      label: 'settings:language_font',
      icon: 'globe-outline',
      renderNext: true,
      nextRoute: Routes.LANGUAGES.name,
      value: null,
    },
    {
      id: 'rating',
      label: 'settings:rating',
      icon: 'star-outline',
      renderNext: null,
      nextRoute: null,
      value: null,
    },
    {
      id: 'term_and_condition',
      label: 'settings:term_and_condition',
      icon: 'shield-outline',
      renderNext: true,
      nextRoute: Routes.TERM.name,
      value: null,
    },
    {
      id: 'about_information',
      label: 'settings:about_information',
      icon: 'info-outline',
      renderNext: true,
      nextRoute: Routes.INFORMATION.name,
      value: null,
    },
  ]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoMenuItem = nextRoute => {
    if (nextRoute) navigation.navigate(nextRoute);
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Check theme common */
    if (commonState && commonState.get('theme')) {
      let tmpMenu = [...menu];
      tmpMenu[1].value = 'settings:' + themeContext.themeApp;
      setMenu(tmpMenu);
    }

    /** Check language common */
    if (commonState && commonState.get('language')) {
      let tmpMenu = [...menu];
      tmpMenu[2].value = 'settings:' + commonState.get('language');
      setMenu(tmpMenu);
    }
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={'settings:title'} back />}>
      <Layout >
        <Menu style={{backgroundColor: theme['background-basic-color-1']}}>
          {menu.map((item, index) => {
            return (
              <MenuItem
                key={item.id + '_' + index}
                title={t(item.label)}
                accessoryLeft={propsIc => RenderLeftIcon(propsIc, item.icon)}
                accessoryRight={propsIc => RenderForwardIcon(propsIc, item.value)}
                onPress={() => handleGoMenuItem(item.nextRoute)}
              />
            )
          })}
        </Menu>
      </Layout>
    </CContainer>
  );
}

export default Settings;
