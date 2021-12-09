/**
 ** Name: Account screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, Icon, Text, Menu, MenuItem, useTheme} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
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
import {cStyles} from '~/utils/style';
import {moderateScale, resetRoute} from '~/utils/helper';
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
  const {navigation} = props;

  /** Use state */
  const [alertLogout, setAlertLogout] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState(false);
  const [menu, setMenu] = useState([
    {
      id: 'edit_account',
      label: 'account:edit_account',
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
    
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={t('account:title')}
        />
      }
    >
      <Layout style={[cStyles.itemsCenter, cStyles.pb20, cStyles.pt10]} level='1'>
        <TouchableOpacity onPress={toggleAlertAvatar}>
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
        </TouchableOpacity>
        <CText style={cStyles.mt16} category='h6'>{'Wayne Rooney'}</CText>
        <CText style={cStyles.mt5} category='c1'>{'WayneRooney@gmail.com'}</CText>
      </Layout>

      <Menu scrollEnabled={false} style={{backgroundColor: theme['background-basic-color-3']}}>
        {menu.map((item, index) => {
          return (
            <MenuItem
              key={item.id + '_' + index}
              title={t(item.label)}
              accessoryLeft={propsIc => RenderLeftIcon(propsIc, item.icon)}
              accessoryRight={item.renderNext ? propsR => RenderForwardIcon(propsR, theme, item) : undefined}
              onPress={item.renderNext ? () => handleGoMenuItem(item.nextRoute) : toggleAlertLogout}
            />
          )
        })}
      </Menu>

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
        <Layout level={'1'}>
          <SafeAreaView>
              <View style={cStyles.m16}>
                <CText category={'p1'}>{'Choose your input picture'}</CText>
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
  img_avatar: {
    height: moderateScale(50),
    width: moderateScale(50)
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
 