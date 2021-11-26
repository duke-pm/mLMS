/**
 ** Name: Custom top navigation
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CTopNavigation.js
 **/
import PropTypes from 'prop-types';
import React, {useContext, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {
  TopNavigation, TopNavigationAction, Icon, Text, Toggle,
  useTheme,
} from '@ui-kitten/components';
import {TouchableOpacity, View, LayoutAnimation, UIManager} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/** COMPONENTS */
import CSearchBar from './CSearchBar';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {cStyles} from '~/utils/style';
import {getLocalInfo, IS_ANDROID, moderateScale, saveLocalInfo} from '~/utils/helper';
import {AST_DARK_MODE, DARK, LIGHT} from '~/configs/constants';

if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/*********************
 ** OTHER COMPONENT **
 *********************/
const BackIcon = (theme, iconStyle) => (
  <IoniIcon
    name='arrow-back'
    color={iconStyle.color || theme['text-basic-color']}
    size={moderateScale(20)} />
);

const RenderTopLeft = (theme, iconStyle, t, title, subtitle, onPress) => {
  return (
    <View style={[cStyles.row, cStyles.itemsCenter, !onPress && cStyles.ml24]}>
      {onPress && (
        <TopNavigationAction icon={BackIcon(theme, iconStyle)} onPress={onPress} />
      )}
      <View>
        <Text category='h4'>{t(title)}</Text>
        {subtitle && (
          <Text category='c1'>{t(subtitle)}</Text>
        )}
      </View>
    </View>
  )
};

const RenderTopRight = (type, theme, iconStyle, t, toggle) => {
  if (type === 'darkmode') {
    return (
      <Toggle {...toggle}>
        {evaProps => <Text {...evaProps}>{t('common:dark_mode')}</Text>}
      </Toggle>
    )
  }
  if (type === 'search') {
    return (
      <TouchableOpacity style={[cStyles.px10, cStyles.py6]} onPress={toggle}>
        <IoniIcon
          name={'search-outline'}
          size={iconStyle.size || moderateScale(20)}
          color={iconStyle.color || theme['text-basic-color']} />
      </TouchableOpacity>
    )
  }
  return null;
};

/********************
 ** MAIN COMPONENT **
 ********************/
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

function CTopNavigation(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();
  const {
    containerStyle = {},
    style = {},
    titleStyle = {},
    subtitleStyle = {},
    iconStyle = {},
    translution = false,
    search = false,
    back = false,
    darkmode = false,
    title = '',
    subtitle = '',
    leftTitle = null,
    leftSubtitle = null,
    alignment = 'center',
    customLeftComponent = null,
    customRightComponent = null,
  } = props;

  /** Use state */
  const darkmodeToggle = useToggleState();
  const [showSearch, setShowSearch] = useState(false);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoBack = () => {
    navigation.goBack();
  };

  const toggleShowSearch = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setShowSearch(!showSearch);
  };

  /************
   ** RENDER **
   ************/
  let leftComponent = undefined, rightComponent = undefined;
  leftComponent = RenderTopLeft(theme, iconStyle, t, leftTitle, leftSubtitle, back && handleGoBack);
  if (darkmode) {
    rightComponent = RenderTopRight('darkmode', theme, iconStyle, t, darkmodeToggle);
  }
  if (search) {
    rightComponent = RenderTopRight('search', theme, iconStyle, t, toggleShowSearch);
  }
  if (customLeftComponent) {
    leftComponent = customLeftComponent;
  }
  if (customRightComponent) {
    rightComponent = customRightComponent
  }
  return (
    <View
      style={[
        cStyles.fullWidth,
        translution && cStyles.abs,
        translution && cStyles.top0,
        containerStyle]}>
      <TopNavigation
        style={style}
        title={evaProps =>
          <Text {...evaProps}
            style={[cStyles.textCenter, titleStyle]}
            category={'s1'}>{title !== '' ? t(title) : ''}</Text>}
        subtitle={subtitle 
          ? evaProps =>
              <Text {...evaProps}
              style={[cStyles.textCenter, subtitleStyle]}
              category={'c1'}>{t(subtitle)}</Text> 
          : undefined}
        alignment={alignment}
        accessoryLeft={leftComponent}
        accessoryRight={rightComponent}
      />
      {showSearch && (
        <View style={[cStyles.mx16, cStyles.mb16]}>
          <CSearchBar autoFocus />
        </View>
      )}
    </View>
  );
}

CTopNavigation.propTypes = {
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  search: PropTypes.bool,
  back: PropTypes.bool,
  darkmode: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  leftTitle: PropTypes.string,
  leftSubtitle: PropTypes.string,
  alignment: PropTypes.oneOf(['center', 'start']),
  customLeftComponent: PropTypes.element,
  customRightComponent: PropTypes.element,
};

export default CTopNavigation;
