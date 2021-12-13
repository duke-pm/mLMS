/**
 ** Name: Conversation details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button, Input, Layout, List, useTheme,
} from '@ui-kitten/components';
import {KeyboardAvoidingView, StyleSheet, View, ScrollView} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import COverflowMenu from '~/components/COverflowMenu';
import CPostImages from '~/components/CPostImages';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
import CAlert from '~/components/CAlert';
/* COMMON */
import {colors, cStyles} from '~/utils/style';
import {IS_ANDROID, IS_IOS, moderateScale, sW} from '~/utils/helper';
import Assets from '~/utils/asset/Assets';
/* REDUX */

/** All init */
const pBottomKeyboard = ifIphoneX(moderateScale(100), moderateScale(78));

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderFileIcon = (type) => {
  let ext = Assets[type];
  if (!ext) ext = Assets.file;

  return (
    <FastImage
      style={styles.icon_file}
      source={ext}
      resizeMode={'contain'}
    />
  )
};

const RenderImageMsg = (link) => (
  <FastImage
    style={[cStyles.rounded1, styles.img_message]}
    source={{uri: link}}
    resizeMode={'cover'}
  />
);

/********************
 ** MAIN COMPONENT **
 ********************/
function ConversationDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  let dataConversation = null;
  if (route.params.data) dataConversation = route.params.data;
  else if (route.params.people) dataConversation = route.params.people;
  else if (route.params.group) dataConversation = route.params.group;

  /** Use state */
  const [showGroup, setShowGroup] = useState(false);
  const [valueText, setValueText] = useState('');

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleShowGroup = () => {
    setShowGroup(!showGroup);
  };

  const handleInviteMember = () => {
  
  };

  const handleLeaveGroup = () => {
  
  };

  const handleCallMember = () => {
  
  };

  const handleDetailsMember = () => {
  
  };

  const handleChooseFile = () => {
  
  };

  const handleChoosePhoto = () => {
  
  };

  const handleSendMessage = () => {
  
  };

  const handleDownloadFile = () => {

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
  let isShowUserAvatar = false,
    nextUser = null;
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          back
          title={dataConversation.user}
          subtitle={!dataConversation.isGroup 
            ? dataConversation.job
            : `${dataConversation.avatar.length} ${t('conversation_details:member')}`}
          customRightComponent={dataConversation.isGroup ?
            <COverflowMenu
              menus={[
                {
                  id: 'menuDetailsGroup',
                  icon: 'people-outline',
                  label: 'conversation_details:details_group',
                  onPress: toggleShowGroup,
                },
                {
                  id: 'menuInviteUser',
                  icon: 'person-add-outline',
                  label: 'conversation_details:invite_member',
                  onPress: handleInviteMember,
                },
                {
                  id: 'menuLeaveGroup',
                  icon: 'log-out-outline',
                  label: 'conversation_details:leave_group',
                  onPress: handleLeaveGroup,
                }
              ]}
            />
            :
            <COverflowMenu
              menus={[
                {
                  id: 'menuCallUser',
                  icon: 'phone-outline',
                  label: 'conversation_details:call',
                  onPress: handleCallMember,
                },
                {
                  id: 'menuDetailsUser',
                  icon: 'person-outline',
                  label: 'conversation_details:details_member',
                  onPress: handleDetailsMember,
                },
              ]}
            />
          }
        />
      }>
      <KeyboardAvoidingView
        style={cStyles.flex1}
        behavior={IS_IOS ? 'padding' : undefined}
        keyboardVerticalOffset={pBottomKeyboard}>
        <Layout style={cStyles.flex1} level={'3'}>
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.py10}
            inverted={dataConversation.messages.length > 0}
            data={dataConversation.messages}
            ListEmptyComponent={() => 
              <Layout style={[cStyles.flexCenter, {height: sW('100%')}]} level={'3'}>
                <FastImage
                  style={{height: moderateScale(200), width: moderateScale(200)}}
                  source={Assets.imgEmptyList}
                  resizeMode={'contain'}
                />
                <CText appearance={'hint'}>{t('post_details:empty')}</CText>
              </Layout>
            }
            renderItem={info => {
              if (info.item.user === 'me') {
                return (
                  <Layout style={cStyles.p10} level={'3'}>
                    <View style={[cStyles.p10, cStyles.rounded1, {backgroundColor: theme['color-primary-500']}]}>
                      {info.item.msg && (
                        <CText status={'control'} maxLines={1000}>{info.item.msg}</CText>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'file' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter, {backgroundColor: theme['color-primary-500']}]}>
                          {RenderFileIcon(info.item.ext)}
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={cStyles.flex1}>
                              <CText status={'control'} category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} status={'control'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              status={'control'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download', 'white')}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'image' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'3'}>
                          {RenderImageMsg(info.item.link)}
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={[cStyles.flex1, cStyles.mr10]}>
                              <CText status={'control'} category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} status={'control'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              status={'control'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download', 'white')}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                    </View>
                    <View style={cStyles.itemsEnd}>
                      <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                    </View>
                  </Layout>
                )
              }
              if (dataConversation.messages[info.index + 1]) {
                nextUser = dataConversation.messages[info.index + 1];
                if (nextUser.user !== info.item.user) {
                  isShowUserAvatar = true;
                } else {
                  isShowUserAvatar = false;
                }
              } else {
                isShowUserAvatar = true;
              }
              return (
                <Layout
                  style={[
                    cStyles.row,
                    cStyles.itemsStart,
                    cStyles.px10,
                    cStyles.pb10,
                  ]}
                  level={'3'}>
                  <View style={[cStyles.center, {flex: 0.15}]}>
                    {isShowUserAvatar && <CAvatar source={{uri: info.item.avatar}} />}
                  </View>
                  <View style={[cStyles.ml5, {flex: 0.85}]}>
                    <Layout style={[cStyles.p10, cStyles.rounded1]}>
                      {info.item.msg && (
                        <CText status={'basic'} maxLines={1000}>{info.item.msg}</CText>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'file' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]}>
                          {RenderFileIcon(info.item.ext)}
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={cStyles.flex1}>
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              status={'basic'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download')}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'image' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]}>
                          <CPostImages images={[info.item.link, info.item.link, info.item.link, info.item.link,  info.item.link]} />
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={[cStyles.flex1, cStyles.mr10]}>
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              status={'basic'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download')}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                    </Layout>
                    <View style={[cStyles.itemsStart]}>
                      <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                    </View>
                  </View>
                </Layout>
              )
            }}
            keyExtractor={(item, index) => item.id + '_' + index}
          />

          <Layout
            style={[
              cStyles.row,
              cStyles.itemsCenter,
              IS_ANDROID && cStyles.shadowListItem,
              IS_IOS && cStyles.borderTop,
            ]}>
            <Button
              style={cStyles.px0}
              appearance={'ghost'}
              accessoryLeft={propsI => CIcon(propsI, 'eva', 'attach')}
              onPress={handleChooseFile}
            />
            <Button
              style={[cStyles.px0, cStyles.mr10]}
              appearance={'ghost'}
              accessoryLeft={propsI => CIcon(propsI, 'eva', 'image')}
              onPress={handleChoosePhoto}
            />
            <Input
              style={[cStyles.flex1, {borderWidth: 0.5}]}
              multiline
              value={valueText}
              placeholder={t('post_details:holder_write_something')}
              onChangeText={setValueText}
            />
            <Button
              appearance={'ghost'}
              status={valueText === '' ? 'basic' : 'primary'}
              accessoryLeft={propsI => CIcon(propsI, 'eva', 'paper-plane')}
              onPress={handleSendMessage}
            />
          </Layout>
        </Layout>
      </KeyboardAvoidingView>

      <CAlert
        show={showGroup}
        cancel
        label={`${t('conversation_details:group')} ${dataConversation.user}`}
        customMessage={
          <ScrollView style={{maxHeight: sW('100%')}}>
            {dataConversation.isGroup && dataConversation.avatar.map((itemU, indexU) => (
              <View key={itemU} style={[cStyles.row, cStyles.itemsCenter, cStyles.my10]}>
                <CAvatar source={{uri: itemU}} />
                <View style={cStyles.ml10}>
                  <CText category='p1'>{'Abbott Keitch'}</CText>
                  <CText category='c1' appearance='hint'>{'abbott@withinpixels.com'}</CText>
                </View>
              </View>
            ))}
          </ScrollView>
        }
        onBackdrop={toggleShowGroup}
        onCancel={toggleShowGroup}
      />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_mini_avatar: {
    backgroundColor: colors.BLACK,
  },
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
  mini_avatar: {
    height: moderateScale(31),
    width: moderateScale(31),
  },
  bg_num_member: {
    left: moderateScale(80),
    backgroundColor: colors.BLACK,
  },
  icon_file: {
    height: moderateScale(50),
    width: moderateScale(50),
  },
  img_message: {
    height: moderateScale(50),
    width: moderateScale(70),
  },
});

export default ConversationDetails;
