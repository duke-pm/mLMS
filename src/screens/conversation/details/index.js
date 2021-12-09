/**
 ** Name: Conversation details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import { Avatar, Button, Card, Icon, Input, Layout, List, useTheme, MenuItem, OverflowMenu, TopNavigationAction } from '@ui-kitten/components';
import {KeyboardAvoidingView, StyleSheet, View} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CAvatar from '~/components/CAvatar';
/* COMMON */
import { colors, cStyles } from '~/utils/style';
import { IS_IOS, moderateScale, sH, sW } from '~/utils/helper';
import FastImage from 'react-native-fast-image';
import Assets from '~/utils/asset/Assets';
import CPostImages from '~/components/CPostImages';
/* REDUX */


/*********************
 ** OTHER COMPONENT **
 *********************/
const MenuIcon = props => (
  <Icon {...props} name={'more-vertical-outline'} />
);

const RenderAddPeopleIcon = props => (
  <Icon {...props} name={'person-add-outline'} />
);

const RenderLeaveGroupIcon = props => (
  <Icon {...props} name={'log-out-outline'} />
);

const RenderAttachIcon = props => (
  <Icon {...props} name={'attach-outline'} />
);

const RenderPhotoIcon = props => (
  <Icon {...props} name={'image-outline'} />
);

const RenderSendIcon = props => (
  <Icon {...props} name={'paper-plane-outline'} />
);

const RenderDownloadIcon = props => (
  <Icon {...props} name={'download-outline'} />
);

const RenderFileIcon = (type) => {
  let ext = Assets[type];
  if (!ext) ext = Assets.file;

  return (
    <FastImage
      style={{height: moderateScale(50), width: moderateScale(50)}}
      source={ext}
      resizeMode={'contain'}
    />
  )
};

const RenderImageMsg = (link) => (
  <FastImage
    style={[cStyles.rounded1, {height: moderateScale(50), width: moderateScale(70)}]}
    source={{uri: link}}
    resizeMode={'cover'}
  />
)

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
  const [functionMenu, setFunctionMenu] = useState(false);
  const [valueText, setValueText] = useState('');

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleFunctionMenu = () => {
    setFunctionMenu(!functionMenu);
  };

  const handleInviteMember = () => {
  
  };

  const handleLeaveGroup = () => {
  
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

  /************
   ** RENDER **
   ************/
  const RenderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleFunctionMenu}/>
  );

  let isShowUserAvatar = false,
    nextUser = null;
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      scrollEnabled={false}
      headerComponent={
        <CTopNavigation
          alignment={!dataConversation.isGroup ? 'center' : 'start'}
          title={!dataConversation.isGroup ? dataConversation.user : undefined}
          subtitle={!dataConversation.isGroup ? dataConversation.job : undefined}
          customTitle={dataConversation.isGroup ?
            <View style={[cStyles.row, cStyles.itemsCenter]}>
              {dataConversation.avatar.map((itemMem, indexMem) => {
                if (indexMem >= 4) return null;
                return (
                  <View
                    key={itemMem + '_' + indexMem}
                    style={[
                      cStyles.abs,
                      cStyles.rounded5,
                      cStyles.p1,
                      styles.bg_mini_avatar,
                      {left: moderateScale(20) * indexMem}
                    ]}>
                    <Avatar size={'small'} source={{uri: itemMem}} />
                  </View>
                )
              })}
              
              {dataConversation.avatar.length > 4 && (
                <View style={[cStyles.abs, cStyles.rounded5, cStyles.p1, styles.bg_num_member]}>
                  <Layout
                    style={[
                      cStyles.center,
                      cStyles.rounded5,
                      styles.mini_avatar,
                      {backgroundColor: theme['color-primary-500']}
                    ]}>
                    <CText status={'control'} category={'c1'}>+{dataConversation.avatar.length - 4}</CText>
                  </Layout>
                </View>
              )}
            </View>
            : undefined
          }
          back
          customRightComponent={
            <OverflowMenu
              style={{width: sW('60%')}}
              anchor={RenderMenuAction}
              backdropStyle={styles.backdrop}
              visible={functionMenu}
              onBackdropPress={toggleFunctionMenu}>
              <MenuItem
                accessoryLeft={RenderAddPeopleIcon}
                title={t('conversation_details:invite_member')}
                onPress={handleInviteMember} />
              <MenuItem
                accessoryLeft={RenderLeaveGroupIcon}
                title={t('conversation_details:leave_group')}
                onPress={handleLeaveGroup} />
            </OverflowMenu>
          }
        />
      }>
      <KeyboardAvoidingView
        style={cStyles.flex1}
        behavior={IS_IOS ? 'padding' : undefined}
        keyboardVerticalOffset={ifIphoneX(moderateScale(100), moderateScale(78))}>
        <View style={cStyles.flex1}>
          <List
            style={{backgroundColor: theme['background-basic-color-1']}}
            contentContainerStyle={cStyles.py10}
            inverted={dataConversation.messages.length > 0}
            data={dataConversation.messages}
            renderItem={info => {
              if (info.item.user === 'me') {
                return (
                  <Layout style={cStyles.p10}>
                    <View style={[cStyles.p10, cStyles.rounded1, {backgroundColor: theme['color-primary-500']}]}>
                      {info.item.msg && (
                        <CText category={'p1'} status={'control'} maxLines={1000}>{info.item.msg}</CText>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'file' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'3'}>
                          {RenderFileIcon(info.item.ext)}
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={cStyles.flex1}>
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              accessoryLeft={RenderDownloadIcon}
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
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              accessoryLeft={RenderDownloadIcon}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                    </View>
                    <View style={[cStyles.itemsEnd]}>
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
                <Layout style={[cStyles.flex1, cStyles.row, cStyles.itemsStart, cStyles.px10, cStyles.pb10]}>
                  <View style={[cStyles.center, {flex: 0.15}]}>
                    {isShowUserAvatar && <CAvatar source={{uri: info.item.avatar}} />}
                  </View>
                  <View style={[cStyles.ml5, {flex: 0.85}]}>
                    <Layout style={[cStyles.p10, cStyles.rounded1]} level={'3'}>
                      {info.item.msg && (
                        <CText category={'p1'} status={'basic'} maxLines={1000}>{info.item.msg}</CText>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'file' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'3'}>
                          {RenderFileIcon(info.item.ext)}
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={cStyles.flex1}>
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              accessoryLeft={RenderDownloadIcon}
                              onPress={handleDownloadFile}
                            />
                          </View>
                        </Layout>
                      )}
                      {!info.item.msg && info.item.file && info.item.type === 'image' && (
                        <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'3'}>
                          <CPostImages images={[info.item.link, info.item.link, info.item.link, info.item.link,  info.item.link]} />
                          <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.ml10]}>
                            <View style={[cStyles.flex1, cStyles.mr10]}>
                              <CText category={'label'}>{info.item.file}</CText>
                              <CText category={'c1'} appearance={'hint'}>{info.item.size} Mb</CText>
                            </View>
                            <Button
                              appearance={'outline'}
                              size={'tiny'}
                              accessoryLeft={RenderDownloadIcon}
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
            ListEmptyComponent={() => 
              <View style={[cStyles.flexCenter, {height: sW('100%')}]}>
                <FastImage
                  style={{height: moderateScale(200), width: moderateScale(200)}}
                  source={Assets.imgEmptyList}
                  resizeMode={'contain'}
                />
                <CText category={'p1'} appearance={'hint'}>{t('post_details:empty')}</CText>
              </View>
            }
          />

          <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'1'}>
            <Button
              style={cStyles.px0}
              appearance={'ghost'}
              accessoryLeft={RenderAttachIcon}
              onPress={handleChooseFile}
            />
            <Button
              style={[cStyles.px0, cStyles.mr10]}
              appearance={'ghost'}
              accessoryLeft={RenderPhotoIcon}
              onPress={handleChoosePhoto}
            />
            <Input
              style={cStyles.flex1}
              multiline
              value={valueText}
              placeholder={t('post_details:holder_write_something')}
              onChangeText={setValueText}
            />
            <Button
              appearance={'ghost'}
              status={valueText === '' ? 'basic' : 'primary'}
              accessoryLeft={RenderSendIcon}
              onPress={handleSendMessage}
            />
          </Layout>
        </View>
      </KeyboardAvoidingView>
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
});

export default ConversationDetails;
