/**
 ** Name: Appearance screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useContext} from 'react';
import { useTranslation } from 'react-i18next';
import {useTheme, Text, Divider, CheckBox, Toggle, Layout} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import { colors, cStyles } from '~/utils/style';
import { moderateScale, getLocalInfo, saveLocalInfo } from '~/utils/helper';
import { ThemeContext } from '~/configs/theme-context';
import { AST_DARK_MODE, DARK, LIGHT } from '~/configs/constants';
/* COMPONENTS */

/* COMMON */

/* REDUX */

const useToggleState = (initialState = false) => {
  const themeContext = useContext(ThemeContext);

   /** Use state */
  const [checked, setChecked] = useState(initialState);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const onCheckedChange = isChecked => {
    themeContext.onToggleTheme();
    setChecked(isChecked);
    /** Save to async storage */
    saveLocalInfo({key: AST_DARK_MODE, value: isChecked ? DARK : LIGHT});
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(async () => {
    let astDarkMode = await getLocalInfo(AST_DARK_MODE);
    if (astDarkMode && astDarkMode === DARK && !checked) {
      setChecked(true);
    }
  }, []);

  return { checked, onChange: onCheckedChange };
};

const useAutoToggleState = (initialState = false) => {
  const themeContext = useContext(ThemeContext);

   /** Use state */
  const [checked, setChecked] = useState(initialState);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const onCheckedChange = isChecked => {
    setChecked(isChecked);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
  }, []);

  return { checked, onChange: onCheckedChange };
};

const RenderHolderAppearance = ({
  label = 'appearance:light_mode',
  typeAppearance = LIGHT,
  curAppearance = LIGHT,
  onChange = () => null,
}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <View style={cStyles.itemsCenter}>
      <View
        style={[
          cStyles.rounded1,
          cStyles.borderAll,
          cStyles.p4,
          curAppearance === typeAppearance && styles.active
        ]}>
        <View
          style={[
            cStyles.rounded1,
            cStyles.itemsEnd,
            styles.con_group,
            typeAppearance === LIGHT ? styles.con_group_light : styles.con_group_dark
          ]}>
          <View
            style={[
              cStyles.roundedTopRight1,
              cStyles.roundedTopLeft1,
              cStyles.fullWidth,
              styles.con_group_header,
              typeAppearance === LIGHT ? styles.con_group_light : styles.con_group_dark,
              {borderBottomColor: theme['color-basic-500']}
            ]} />
          <View style={[cStyles.rounded1, cStyles.mx10, cStyles.mt10, styles.con_view_1]} />
          <View style={[cStyles.rounded1, cStyles.mx10, cStyles.mt6, styles.con_view_2]} />
          <View style={[cStyles.rounded10, cStyles.mx10, cStyles.mt6, styles.con_view_3,
            {backgroundColor: theme['color-basic-500']}]} />
        </View>
      </View>

      <CheckBox
        style={cStyles.mt20}
        checked={curAppearance === typeAppearance}
        onChange={nextChecked => onChange(typeAppearance)}>
        {t(label)}
      </CheckBox>
    </View>
  )
};


function Appearance(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** Use state */
  const darkmodeToggle = useToggleState();
  const darkmodeAutoToggle = useAutoToggleState();
  const [appearance, setAppearance] = useState(themeContext.themeApp);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleChangeAppearance = newTheme => {
    darkmodeToggle.onChange();
    setAppearance(newTheme);
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
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={'appearance:title'} back />}>
      <Layout>
        <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.p16, cStyles.pb32]}>
          <RenderHolderAppearance
            label={'appearance:light_mode'}
            typeAppearance={LIGHT}
            curAppearance={appearance}
            onChange={handleChangeAppearance} />
          <RenderHolderAppearance
            label={'appearance:dark_mode'}
            typeAppearance={DARK}
            curAppearance={appearance}
            onChange={handleChangeAppearance} />
        </View>

        <Divider />
        
        <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.my8, cStyles.mx12]}>
          <View>
            <Text category={'s2'}>{t('appearance:auto_change_appearance')}</Text>
            <Text category={'c1'}>{t('appearance:holder_auto_change_appearance')}</Text>
          </View>
          <Toggle checked={darkmodeAutoToggle.checked} onChange={darkmodeAutoToggle.onChange} />
        </View>

        <Divider />
      </Layout>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  active: {
    borderColor: colors.PRIMARY
  },
  con_group: {
    height: moderateScale(200),
    width: moderateScale(130)
  },
  con_group_light: {
    backgroundColor: 'white',
  },
  con_group_dark: {
    backgroundColor: colors.PRIMARY_DARK,
  },
  con_group_header: {
    height: moderateScale(40),
    borderBottomWidth: 1,
  },
  con_view_1: {
    height: moderateScale(40), 
    width: '50%',
    backgroundColor: colors.PRIMARY,
  },
  con_view_2: {
    height: moderateScale(40), 
    width: '70%',
    backgroundColor: colors.PRIMARY,
  },
  con_view_3: {
    height: moderateScale(40), 
    width: '30%',
  },
});

export default Appearance;
