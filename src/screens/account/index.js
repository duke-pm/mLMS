/**
 ** Name: Account screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect, useContext} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, Icon, Text, Menu, MenuItem, useTheme, ListItem} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity, ImageBackground, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CAlert from '~/components/CAlert';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {colors, cStyles} from '~/utils/style';
import {IS_ANDROID, moderateScale, resetRoute} from '~/utils/helper';
import { ThemeContext } from '~/configs/theme-context';
/* REDUX */

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderForwardIcon = (props, theme, info) => (
  <View style={[cStyles.row, cStyles.itemsCenter]}>
    {info.alert && (
      <View style={[{height: moderateScale(16), width: moderateScale(16), backgroundColor: theme['color-danger-500']}, cStyles.rounded4, cStyles.center]}>
        <Text category={'c1'} status={'control'}>{info.alert}</Text>
      </View>
    )}
    <Icon {...props} name='arrow-ios-forward' />
  </View>
);

const RenderLeftIcon = (props, nameIcon) => (
  <Icon {...props} name={nameIcon} />
);
 
/********************
 ** MAIN COMPONENT **
 ********************/
function Account(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** Use state */
  const [alertLogout, setAlertLogout] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState(false);
  const [menu, setMenu] = useState([
    {
      id: 'edit_account',
      label: 'account:edit_account',
      subtitle: 'account:holder_edit_account',
      icon: 'person-outline',
      renderNext: true,
      nextRoute: Routes.PROFILE.name,
      value: null,
      alert: null,
    },
    {
      id: 'notification',
      label: 'account:notification',
      icon: 'bell-outline',
      renderNext: true,
      nextRoute: Routes.NOTIFICATION.name,
      value: null,
      alert: 2, 
    },
    {
      id: 'schedule',
      label: 'account:schedule',
      icon: 'calendar-outline',
      renderNext: true,
      nextRoute: Routes.SCHEDULE.name,
      value: null,
      alert: 1,
    },
    {
      id: 'favourite',
      label: 'account:favourite',
      icon: 'star-outline',
      renderNext: true,
      nextRoute: Routes.FAVOURITE.name,
      value: null,
      alert: null,
    },
    {
      id: 'settings',
      label: 'account:settings',
      icon: 'settings-2-outline',
      renderNext: true,
      nextRoute: Routes.SETTINGS.name,
      value: null,
      alert: null,
    },
    {
      id: 'help',
      label: 'account:help',
      icon: 'question-mark-circle-outline',
      renderNext: true,
      nextRoute: Routes.HELP.name,
      value: null,
      alert: null,
    },
    {
      id: 'log_out',
      label: 'account:log_out',
      icon: 'log-out-outline',
      renderNext: false,
      nextRoute: null,
      value: null,
      alert: null,
    },
  ]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleAlertAvatar = () => {
    setAlertAvatar(!alertAvatar);
  };

  const toggleAlertLogout = () => {
    setAlertLogout(!alertLogout);
  };

  const handleLogout = () => {
    resetRoute(navigation, Routes.LOGIN_IN.name);
  };

  const handleChangeAvatar = () => {

  };

  const handleGoMenuItem = nextRoute => {
    navigation.navigate(nextRoute);
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('light-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor(theme['color-primary-400'], true);
    });
    return unsubscribe;
  }, [navigation]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer safeArea={['top']} backgroundColor={theme['color-primary-400']}>
      <Layout style={[cStyles.itemsCenter, cStyles.pb20, cStyles.pt10, cStyles.roundedBottomLeft10, cStyles.roundedBottomRight10, {backgroundColor: theme['color-primary-400']}]}>
        <TouchableOpacity onPress={toggleAlertAvatar}>
          <View style={[styles.con_avatar, cStyles.center]}>
            <ImageBackground
              style={styles.img_avatar}
              borderRadius={moderateScale(50)}
              resizeMode={'cover'}
              source={{uri: 'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg'}}>
              <View 
                style={[
                  cStyles.ofHidden,
                  cStyles.center,
                  cStyles.rounded5,
                  cStyles.abs,
                  styles.con_camera,
                  {backgroundColor: theme['color-basic-200']}
                ]}>
                <IoniIcon name={'camera'} color={theme['color-primary-500']} size={moderateScale(13)} />
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
        <CText style={cStyles.mt16} category='h6' status='control'>{'Wayne Rooney'}</CText>
        <CText category='c1' status='control'>{'WayneRooney@gmail.com'}</CText>
      </Layout>

      <Layout style={[cStyles.m16, cStyles.rounded2]}>
        <Menu scrollEnabled={false} style={[cStyles.rounded2, {backgroundColor: colors.TRANSPARENT}]}>
          {menu.map((item, index) => {
            return (
              <ListItem
                key={item.id + '_' + index}
                style={cStyles.rounded2}
                title={t(item.label)}
                description={t(item.subtitle)}
                accessoryLeft={propsIc => RenderLeftIcon(propsIc, item.icon)}
                accessoryRight={item.renderNext ? propsR => RenderForwardIcon(propsR, theme, item) : undefined}
                onPress={item.renderNext ? () => handleGoMenuItem(item.nextRoute) : toggleAlertLogout}
              />
            )
          })}
        </Menu>
      </Layout>

      <CAlert
        contentStyle={cStyles.m0}
        show={alertLogout}
        cancel={true}
        label={'common:alert'}
        message={'account:alert_msg_log_out'}
        textOk={'account:alert_log_out'}
        statusOk={'danger'}
        onBackdrop={toggleAlertLogout}
        onCancel={toggleAlertLogout}
        onOk={handleLogout}
      />

      <Modal
        style={[cStyles.m0, cStyles.justifyEnd]}
        isVisible={alertAvatar}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        coverScreen={true}
        renderToHardwareTextureAndroid={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={toggleAlertAvatar}
        onBackdropPress={toggleAlertAvatar}>
        <Layout >
          <SafeAreaView>
              <View style={cStyles.m16}>
                <CText >{'Choose your input picture'}</CText>
              </View>
              <Menu>
                <MenuItem
                  title='Camera'
                  accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'camera-outline')}
                  accessoryRight={RenderForwardIcon}
                />
                <MenuItem
                  title='Gallery'
                  accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'folder-outline')}
                  accessoryRight={RenderForwardIcon}
                />
              </Menu>
          </SafeAreaView>
        </Layout>
      </Modal>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  con_avatar: {
    height: moderateScale(100),
    width: moderateScale(100),
    borderRadius: moderateScale(90),
    backgroundColor: 'rgba(255,255,255,.5)',
  },
  img_avatar: {
    height: moderateScale(80),
    width: moderateScale(80)
  },
  con_camera: {
    height: moderateScale(20),
    width: moderateScale(20),
    right: -moderateScale(2),
    bottom: -moderateScale(2)
  },
  footer: {
    height: moderateScale(50),
  },
});

export default Account;
 