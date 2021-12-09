/**
 ** Name: Notification screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import { Button, Icon, Layout, Spinner, TopNavigationAction } from '@ui-kitten/components';
import {Alert, StyleSheet, View} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import { cStyles } from '~/utils/style';
import { moderateScale } from '~/utils/helper';
/* REDUX */

const RenderTextClearAll = (props, t) => (
  <Icon {...props} name='trash-2-outline' />
);

const RenderButtonActions = (
  t,
  type = '',
  alignment = 'left', // left or right
  icon = '',
  color = '',
  title = '',
  holder = '',
  onPress = () => null,
) => {
  return (
    <Button
      style={[cStyles.flex1, cStyles.px0, cStyles.py0, alignment === 'left' ? cStyles.mr5 : cStyles.ml5]}
      appearance={'ghost'}
      status={'basic'}
      onPress={() => onPress(type)}>
      {propsB => (
        <Layout style={[cStyles.flexCenter, cStyles.p16, cStyles.rounded1]}>
          <View style={[cStyles.row, cStyles.center]}>
            <View
              style={[
                cStyles.center,
                cStyles.rounded8,
                styles.icon_action,
                {backgroundColor: color},
              ]}>
              <IoniIcon name={icon} color={'white'} size={moderateScale(20)} />
            </View>
            <View style={styles.text_action}>
              <CText style={cStyles.ml16} category={'label'} numberOfLines={2}>{t(title)}</CText>
            </View>
          </View>
          <CText style={cStyles.mt10} category={'p1'} appearance='hint'>{holder}</CText>
        </Layout>
      )}
    </Button>
  );
};

const RenderRightHeader = (t, onClearAll) => (
  <TopNavigationAction
    icon={propsI => RenderTextClearAll(propsI, t)}
    onPress={onClearAll}
  />
);

function Notification(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleClearAll = () => {
    Alert.alert(
      t('notification:title_clear_all'),
      t('notification:holder_clear_all'),
      [
        {style: 'cancel', text: t('notification:confirm_clear_all_no'), onPress: () => null},
        {style: 'destructive', text: t('notification:confirm_clear_all_yes'), onPress: onClearAll}
      ],
      {cancelable: true},
    );
  };

  const handleGoActions = () => {
  
  };

  /**********
   ** FUNC **
   **********/
  const onClearAll = () => {
  
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    setLoading(false);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={'notification:title'}
          back
          customRightComponent={RenderRightHeader(t, handleClearAll)}
        />
      }>
      <Layout style={cStyles.m10} level={'3'}>
        <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
          {RenderButtonActions(
            t,
            'assignment',
            'left',
            'document-outline',
            'green',
            'notification:upcoming_assignment',
            '3 Upcoming',
            handleGoActions
          )}
          {RenderButtonActions(
            t,
            'quiz',
            'right',
            'create-outline',
            'indigo',
            'notification:upcoming_quiz',
            '32 Upcoming',
            handleGoActions
          )}
        </View>

        <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt10]}>
          {RenderButtonActions(
            t,
            'question',
            'left',
            'help-outline',
            'hotpink',
            'notification:upcoming_question',
            '1 Upcoming',
            handleGoActions
          )}
          {RenderButtonActions(
            t,
            'conference',
            'right',
            'location-outline',
            'orange',
            'notification:upcoming_conference',
            '10 Upcoming',
            handleGoActions
          )}
        </View>
      </Layout>

      {/* {loading && (
        <Layout style={cStyles.flexCenter} level={'3'}>
          <Spinner />
        </Layout>
      )} */}
    </CContainer>
  );
}

const styles = StyleSheet.create({
  icon_action: {
    flex: 0.3,
    height: moderateScale(40),
    width: moderateScale(40),
  },
  text_action: {
    flex: 0.7,
  },
});

export default Notification;
