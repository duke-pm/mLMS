/**
 ** Name: Account screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, Menu, useTheme} from '@ui-kitten/components';
import {StyleSheet, View, ImageBackground, StatusBar, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CAlert from '~/components/CAlert';
import CText from '~/components/CText';
import CMenuAccount from '~/components/CMenuAccount';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
import {IS_ANDROID, moderateScale, resetRoute} from '~/utils/helper';
/* REDUX */

 
/********************
 ** MAIN COMPONENT **
 ********************/
function Account(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [alertLogout, setAlertLogout] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState(false);
  const [menu, setMenu] = useState([
    {
      id: 'edit_account',
      title: 'account:edit_account',
      subtitle: 'account:holder_edit_account',
      icon: 'person-outline',
      color: 'color-primary-600',
      bgColor: 'color-primary-transparent-500',
      renderNext: true,
      nextRoute: Routes.PROFILE.name,
      value: null,
      alert: null,
    },
    {
      id: 'notification',
      title: 'account:notification',
      subtitle: 'account:holder_notification',
      icon: 'bell-outline',
      color: 'color-success-600',
      bgColor: 'color-success-transparent-500',
      renderNext: true,
      nextRoute: Routes.NOTIFICATION.name,
      value: null,
      alert: 2, 
    },
    {
      id: 'schedule',
      title: 'account:schedule',
      subtitle: 'account:holder_schedule',
      icon: 'calendar-outline',
      color: 'color-info-600',
      bgColor: 'color-info-transparent-500',
      renderNext: true,
      nextRoute: Routes.SCHEDULE.name,
      value: null,
      alert: 1,
    },
    {
      id: 'favourite',
      title: 'account:favourite',
      subtitle: 'account:holder_favourite',
      icon: 'star-outline',
      color: 'color-warning-600',
      bgColor: 'color-warning-transparent-500',
      renderNext: true,
      nextRoute: Routes.FAVOURITE.name,
      value: null,
      alert: null,
    },
    {
      id: 'settings',
      title: 'account:settings',
      subtitle: 'account:holder_settings',
      icon: 'settings-2-outline',
      color: 'color-basic-600',
      bgColor: 'color-basic-transparent-500',
      renderNext: true,
      nextRoute: Routes.SETTINGS.name,
      value: null,
      alert: null,
    },
  ]);
  const [menu2, setMenu2] = useState([
    {
      id: 'help',
      title: 'account:help',
      icon: 'question-mark-circle-outline',
      color: 'color-primary-500',
      bgColor: 'color-primary-transparent-500',
      renderNext: true,
      nextRoute: Routes.HELP.name,
      value: null,
      alert: null,
    },
    {
      id: 'log_out',
      title: 'account:log_out',
      icon: 'log-out-outline',
      color: 'color-danger-500',
      bgColor: 'color-danger-transparent-500',
      renderNext: false,
      nextRoute: null,
      value: null,
      alert: null,
      onPress: () => toggleAlertLogout()
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
      <View
        style={[
          cStyles.itemsCenter,
          cStyles.pb20,
          cStyles.pt10,
          cStyles.roundedBottomLeft8,
          cStyles.roundedBottomRight8,
          {backgroundColor: theme['color-primary-400']}
        ]}>
        <View style={[styles.con_avatar, cStyles.center]}>
          <ImageBackground
            style={styles.img_avatar}
            borderRadius={moderateScale(50)}
            resizeMode={'cover'}
            source={{uri: 'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg'}}>
            {/* <View 
              style={[
                cStyles.ofHidden,
                cStyles.center,
                cStyles.rounded5,
                cStyles.abs,
                styles.con_camera,
                {backgroundColor: theme['color-basic-200']}
              ]}>
              <IoniIcon name={'camera'} color={theme['color-primary-500']} size={moderateScale(13)} />
            </View> */}
          </ImageBackground>
        </View>
        <CText style={cStyles.mt16} category='h6' status='control'>{'Wayne Rooney'}</CText>
        <CText category='c1' status='control'>{'WayneRooney@gmail.com'}</CText>
      </View>

      <ScrollView style={cStyles.flex1}>
        <>
          <CMenuAccount data={menu} />
          <CMenuAccount containerStyle={cStyles.mb10} data={menu2} />
        </>
      </ScrollView>

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
                {/* <MenuItem
                  title='Camera'
                  accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'camera-outline')}
                  accessoryRight={RenderForwardIcon}
                />
                <MenuItem
                  title='Gallery'
                  accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'folder-outline')}
                  accessoryRight={RenderForwardIcon}
                /> */}
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
 