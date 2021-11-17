/**
 ** Name: Custom top navigation
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CTopNavigation.js
 **/
import PropTypes from 'prop-types';
import React, {useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {TopNavigation, TopNavigationAction, Icon, Text, Toggle} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {cStyles} from '~/utils/style';

/*********************
 ** OTHER COMPONENT **
 *********************/
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back'/>
);

const RenderTopLeft = (t, title, subtitle, onPress) => {
  return (
    <React.Fragment>
      <View style={[cStyles.row, cStyles.itemsCenter, !onPress && cStyles.ml24]}>
        {onPress && (
          <TopNavigationAction icon={BackIcon} onPress={onPress} />
        )}
        <View>
          <Text category='h2'>{t(title)}</Text>
          {subtitle && (
            <Text style={cStyles.mt6} category='c1'>{t(subtitle)}</Text>
          )}
        </View>
      </View>
    </React.Fragment>
  )
};

const RenderTopRight = darkmodeToggle => {
  return (
    <React.Fragment>
      <Toggle {...darkmodeToggle}>
        {evaProps => <Text {...evaProps}>{'Dark'}</Text>}
      </Toggle>
    </React.Fragment>
  )
};

/********************
 ** MAIN COMPONENT **
 ********************/
const useToggleState = (initialState = false) => {
  const themeContext = useContext(ThemeContext);
   /** Use state */
  const [checked, setChecked] = useState(initialState);

  const onCheckedChange = (isChecked) => {
    themeContext.onToggleTheme();
    setChecked(isChecked);
  };
  return { checked, onChange: onCheckedChange };
};

function CTopNavigation(props) {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {
    back = false,
    darkmode = false,
    title = '',
    subtitle = '',
    leftTitle = null,
    leftSubtitle = null,
    customLeftComponent = null,
    customRightComponent = null,
  } = props;

  /** Use state */
  const darkmodeToggle = useToggleState();

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoBack = () => {
    navigation.goBack();
  };

  /**********
   ** FUNC **
   **********/

  /************
   ** RENDER **
   ************/
  let leftComponent = undefined, rightComponent = undefined;
  leftComponent = RenderTopLeft(t, leftTitle, leftSubtitle, back && handleGoBack);
  if (darkmode) {
    rightComponent = RenderTopRight(darkmodeToggle);
  }
  if (customLeftComponent) {
    leftComponent = customLeftComponent;
  }
  if (customRightComponent) {
    rightComponent = customRightComponent
  }
  return (
    <TopNavigation
      title={title !== '' ? t(title) : ''}
      subtitle={subtitle !== '' ? t(subtitle) : ''}
      accessoryLeft={leftComponent}
      accessoryRight={rightComponent}
    />
  );
}

CTopNavigation.propTypes = {
  back: PropTypes.bool,
  darkmode: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  leftTitle: PropTypes.string,
  leftSubtitle: PropTypes.string,
  customLeftComponent: PropTypes.element,
  customRightComponent: PropTypes.element,
};

export default CTopNavigation;
