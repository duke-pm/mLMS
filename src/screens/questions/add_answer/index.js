/**
 ** Name: Add Answer screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  TopNavigationAction, useTheme, Layout, Input, Divider, Button,
  Menu, MenuItem, Icon,
} from '@ui-kitten/components';
import {StyleSheet, Alert, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  checkMultiple, request, openSettings, PERMISSIONS, RESULTS,
} from 'react-native-permissions';
import IoniIcon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import { colors, cStyles } from '~/utils/style';
import { IS_ANDROID, IS_IOS, moderateScale, SCREEN_HEIGHT, SCREEN_WIDTH, sH, sW } from '~/utils/helper';
/* REDUX */

const RenderForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward' />
);

const RenderLeftIcon = (props, nameIcon) => (
  <Icon {...props} name={nameIcon} />
);

const RenderReChooseIcon = (props) => (
  <Icon {...props} name='refresh-outline' />
);

const RenderRemoveIcon = (props) => (
  <Icon {...props} name='trash-2-outline' />
);

const RenderAddText = (props) => {
  const {t} = useTranslation();
  return (
    <CText status={'primary'} category={'s1'}>{t('add_answer:done')}</CText>
  );
};

const RenderRightHeader = onPress => (
  <TopNavigationAction icon={RenderAddText} onPress={onPress} />
);

function AddAnswer(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [alertChooseImgVid, setChooseImgVid] = useState(false);
  const [value, setValue] = useState('');
  const [assets, setAssets] = useState({
    type: '',
    data: [],
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleAlertChooseImgVid = (type = assets.type) => {
    setChooseImgVid(!alertChooseImgVid);
    setAssets({...assets, type: type});
  };

  const handleChooseFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      })
      if (results.length > 0) {
        setAssets({type: 'files', data: results});
        // for (const res of results) {
        //   console.log(
        //     res.uri,
        //     res.type, // mime type
        //     res.name,
        //     res.size,
        //   )
        // }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('[LOG] === User cancelled the picker, exit any dialogs or menus and move on ===> ');
      } else {
        throw err
      }
    }
  };

  const handleChooseImagesVideos = async (type = assets.type) => {
    let chkPermission = false;
    if (IS_IOS) {
      chkPermission = await checkMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY,
      ]);
      if (chkPermission[PERMISSIONS.IOS.CAMERA] === RESULTS.DENIED) {
        onGetPermission(PERMISSIONS.IOS.CAMERA, type);
      } else if (chkPermission[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED) {
        if (chkPermission[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.DENIED) {
          onGetPermission(PERMISSIONS.IOS.PHOTO_LIBRARY, type);
        } else if (chkPermission[PERMISSIONS.IOS.PHOTO_LIBRARY] === RESULTS.GRANTED) {
          toggleAlertChooseImgVid(type);
        } else {
          onAlertGoSetting();
        }
      } else {
        onAlertGoSetting();
      }
    }
    if (IS_ANDROID) {
      chkPermission = await checkMultiple([
        PERMISSIONS.ANDROID.CAMERA,
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      ]);
      if (chkPermission[PERMISSIONS.ANDROID.CAMERA] === RESULTS.DENIED) {
        onGetPermission(PERMISSIONS.ANDROID.CAMERA, type);
      } else if (chkPermission[PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED) {
        if (chkPermission[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.DENIED) {
          onGetPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, type);
        } else if (chkPermission[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED) {
          toggleAlertChooseImgVid(type);
        } else {
          onAlertGoSetting();
        }
      } else {
        onAlertGoSetting();
      }
    }
  };

  const handleChooseFromCamera = async () => {
    let resultCamera = await launchCamera({
      maxWidth: SCREEN_WIDTH,
      maxHeight: SCREEN_HEIGHT,
      videoQuality: 'low',
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
      selectionLimit: 0,
    });
    if (resultCamera.assets && resultCamera.assets.length > 0) {
      toggleAlertChooseImgVid();
      setAssets({...assets, data: resultCamera.assets});
    }
  };

  const handleChooseFromGallery = async () => {
    let resultGallery = await launchImageLibrary({
      maxWidth: SCREEN_WIDTH,
      maxHeight: SCREEN_HEIGHT,
      videoQuality: 'low',
      quality: 0.5,
      includeBase64: true,
      saveToPhotos: true,
      selectionLimit: 0,
    });
    if (resultGallery.assets && resultGallery.assets.length > 0) {
      toggleAlertChooseImgVid();
      setAssets({...assets, data: resultGallery.assets});
    }
  };

  const handleRemoveAssets = idxAsset => {
    let tmpAssetsData = {...assets};
    tmpAssetsData.data.splice(idxAsset, 1);
    setAssets(tmpAssetsData);
  };

  const handleBack = () => {
    Alert.alert(
      t('common:alert'),
      t('add_answer:holder_back_add_answer'),
      [
        {style: 'cancel', text: t('add_answer:confirm_back_no'), onPress: () => null},
        {style: 'destructive', text: t('add_answer:confirm_back_yes'), onPress: handleGoBack}
      ],
      {cancelable: true},
    );
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleAddAnswer = () => {
  
  };

  /**********
   ** FUNC **
   **********/
  const onChangeValue = newValue => {
    setValue(newValue);  
  };

  const onAlertGoSetting = () => {
    Alert.alert(
      t('common:alert'),
      t('common:setting_need_permission'),
      [
        {style: 'cancel', text: t('common:cancel'), onPress: () => null},
        {style: 'default', text: t('common:ok'), onPress: onGoSettingCheck}
      ],
      {cancelable: true},
    );
  };

  const onGoSettingCheck = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  const onGetPermission = async (permission, type) => {
    let chkPermission = await request(permission);
    if (chkPermission === RESULTS.DENIED) {
      alert('We need you access all your camera and photo to updload post!');
    } else if (chkPermission === RESULTS.GRANTED) {
      handleChooseImagesVideos(type);
    } else {
      console.log('[LOG] === onGetPermission ===> ');
    }
  };

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={'add_answer:title'}
          back
          iconBack={'close-outline'}
          customRightComponent={() => RenderRightHeader(handleAddAnswer)}
          onPressCustomBack={handleBack}
        />
      }
    >
      <Layout style={cStyles.flex1} level={'1'}>
        <View style={cStyles.p10}>
          <Input
            style={{maxHeight: sW('100%')}}
            multiline
            value={value}
            placeholder={t('add_answer:your_answer')}
            onChangeText={onChangeValue}
          />

          <Divider style={cStyles.my10} />

          <CText category={'label'}>{t('add_post:attached')}</CText>
          {assets.data.length === 0 && (
            <>
              <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.mt16]}>
                <Button
                  appearance={'ghost'}
                  size={'large'}
                  onPress={handleChooseFile}
                >
                  {evaProps => (
                    <View style={cStyles.itemsCenter}>
                      <IoniIcon
                        name={'folder-outline'}
                        size={moderateScale(30)}
                        color={theme['color-primary-500']}
                      />
                      <CText style={cStyles.mt10} category={'p1'}>{t('add_post:add_file')}</CText>
                    </View>
                  )}
                </Button>
                <Button
                  appearance={'ghost'}
                  size={'large'}
                  onPress={() => handleChooseImagesVideos('photos')}
                >
                  {evaProps => (
                    <View style={cStyles.itemsCenter}>
                      <IoniIcon
                        name={'image-outline'}
                        size={moderateScale(30)}
                        color={theme['color-primary-500']}
                      />
                      <CText style={cStyles.mt10} category={'p1'}>{t('add_post:add_image')}</CText>
                    </View>
                  )}
                </Button>
              </View>
            </>
          )}
          {assets.type === 'files' && assets.data.length > 0 && (
            <View style={[cStyles.flex1, cStyles.itemsCenter, cStyles.mt16]}>
              {assets.data.map((itemAsset, indexAsset) => {
                return (
                  <Layout style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt6, cStyles.pl16, cStyles.pr10, cStyles.py10, cStyles.rounded1]} level={'2'}>
                    <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter]}>
                      <IoniIcon
                        name={'document-outline'}
                        size={moderateScale(40)}
                        color={theme['color-primary-500']}
                      />
                      <View style={[cStyles.flex1, cStyles.ml8]}>
                        <CText category={'p1'} numberOfLines={2}>{itemAsset.name}</CText>
                        <CText style={cStyles.mt5} category={'c1'} numberOfLines={1}>{itemAsset.size}</CText>
                      </View>
                    </View>

                    <Button
                      appearance={'ghost'}
                      status={'basic'}
                      accessoryLeft={RenderRemoveIcon}
                      onPress={() => handleChooseImagesVideos(indexAsset)} />
                  </Layout>
                )
              })}
              <View
                style={[
                  cStyles.flex1,
                  cStyles.borderAll,
                  cStyles.rounded1,
                  cStyles.borderDashed,
                  cStyles.mt6,
                  styles.btn_change_asset_files,
                  {backgroundColor: theme['background-basic-color-2']}
                ]}>
                <Button
                  style={cStyles.flex1}
                  appearance={'ghost'}
                  status={'basic'}
                  accessoryLeft={RenderReChooseIcon}
                  onPress={() => handleChooseImagesVideos(assets.type)} />
              </View>
            </View>
          )}
          {assets.type === 'photos' && assets.data.length > 0 && (
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.flexWrap, cStyles.mt16]}>
              {assets.data.map((itemAsset, indexAsset) => {
                return (
                  <View style={cStyles.mt6}>
                    <FastImage
                      style={[cStyles.rounded1, {height: sW('28%'), width: sW('28%')}]}
                      resizeMode={'cover'}
                      source={{
                        uri: 'data:image/png;base64,' + itemAsset.base64,
                        priority: FastImage.priority.high,
                        cache: FastImage.cacheControl.immutable,
                      }}
                    />
                    <Button
                      style={[cStyles.abs, styles.btn_remove_asset]}
                      appearance={'ghost'}
                      status={'control'}
                      size={'small'}
                      accessoryLeft={RenderRemoveIcon}
                      onPress={() => handleRemoveAssets(indexAsset)}
                    />
                  </View>
                )
              })}
              <View
                style={[
                  cStyles.borderAll,
                  cStyles.rounded1,
                  cStyles.borderDashed,
                  cStyles.mt6,
                  styles.btn_change_asset,
                  {backgroundColor: theme['background-basic-color-2']}
                ]}>
                <Button
                  style={cStyles.flex1}
                  appearance={'ghost'}
                  status={'basic'}
                  accessoryLeft={RenderReChooseIcon}
                  onPress={() => handleChooseImagesVideos(assets.type)} />
              </View>
            </View>
          )}
        </View>
      </Layout>

      <Modal
        style={[cStyles.m0, cStyles.justifyEnd]}
        isVisible={alertChooseImgVid}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        coverScreen={true}
        renderToHardwareTextureAndroid={true}
        hideModalContentWhileAnimating={true}
        onBackButtonPress={toggleAlertChooseImgVid}
        onBackdropPress={toggleAlertChooseImgVid}>
        <Layout level={'1'}>
          <SafeAreaView>
            <View style={cStyles.m16}>
              <CText category={'p1'}>{t('common:title_choose_photos_videos')}</CText>
            </View>
            <Menu>
              <MenuItem
                title='Camera'
                accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'camera-outline')}
                accessoryRight={RenderForwardIcon}
                onPress={handleChooseFromCamera}
              />
              <MenuItem
                title='Gallery'
                accessoryLeft={propsIc => RenderLeftIcon(propsIc, 'folder-outline')}
                accessoryRight={RenderForwardIcon}
                onPress={handleChooseFromGallery}
              />
            </Menu>
          </SafeAreaView>
        </Layout>
      </Modal>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  btn_remove_asset: {
    right: 5,
    top: 5,
    backgroundColor: colors.BG_BACKDROP,
  },
  btn_change_asset: {
    borderWidth: 2,
    height: sW('28%'),
    width: sW('28%'),
  },
  btn_change_asset_files: {
    borderWidth: 2,
    height: moderateScale(50),
    width: '100%',
  }
});

export default AddAnswer;
