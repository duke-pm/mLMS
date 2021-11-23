/**
 ** Name: Account screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, Icon, Text, Menu, MenuItem, useTheme} from '@ui-kitten/components';
import {StyleSheet, View, TouchableOpacity, ImageBackground} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CAlert from '~/components/CAlert';
/* COMMON */
import Configs from '~/configs';
import Routes from '~/navigator/Routes';
import Assets from '~/utils/asset/Assets';
import {cStyles} from '~/utils/style';
import {moderateScale, resetRoute} from '~/utils/helper';
 /* REDUX */


const RenderForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward' />
);

const RenderLeftIcon = (props, nameIcon) => (
  <Icon {...props} name={nameIcon} />
);
 
function Account(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [alertLogout, setAlertLogout] = useState(false);
  const [alertAvatar, setAlertAvatar] = useState(false);

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

  const handleGoMenuItem = () => {
    navigation.navigate(Routes.SETTINGS.name);
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
      headerComponent={<CTopNavigation title={t('account:title')} />}>
      <Layout style={[cStyles.flex1]} level={'1'}>
        <Layout style={[cStyles.itemsCenter, cStyles.pb20, cStyles.pt10]} level='1'>
          <TouchableOpacity onPress={toggleAlertAvatar}>
            <ImageBackground
              style={styles.img_avatar}
              borderRadius={moderateScale(50)}
              resizeMode={'cover'}
              source={Assets.avaMale}>
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
          <Text style={cStyles.mt16} category='h6'>{'Wayne Rooney'}</Text>
          <Text style={cStyles.mt5} category='c1'>{'WayneRooney@gmail.com'}</Text>
        </Layout>

        <Menu style={{backgroundColor: theme['background-basic-color-1']}}>
          <MenuItem
            title='Edit account'
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'person-outline')}
            accessoryRight={RenderForwardIcon}
          />
          <MenuItem
            title='Favourite'
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'star-outline')}
            accessoryRight={RenderForwardIcon}
            onPress={handleGoMenuItem}
          />
          <MenuItem
            title='Settings'
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'settings-2-outline')}
            accessoryRight={RenderForwardIcon}
            onPress={handleGoMenuItem}
          />
          <MenuItem
            title='Help'
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'question-mark-circle-outline')}
            accessoryRight={RenderForwardIcon}
          />
          <MenuItem
            title='Log out'
            accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'log-out-outline')}
            onPress={toggleAlertLogout}
          />
        </Menu>
      </Layout>

      <CAlert
        contentStyle={cStyles.m0}
        show={alertLogout}
        cancel={true}
        label={'account:alert_log_out'}
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
                <Text category={'p1'}>{'Choose your input picture'}</Text>
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
 