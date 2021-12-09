/**
 ** Name: Add coversation screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import { Divider, Icon, Layout, List, ListItem, Tab, TabView, useTheme } from '@ui-kitten/components';
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, StyleSheet, View} from 'react-native';
import CAvatar from '~/components/CAvatar';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CText from '~/components/CText';
import CTopNavigation from '~/components/CTopNavigation';
import Routes from '~/navigator/Routes';
import { moderateScale } from '~/utils/helper';
/* COMMON */
import { cStyles } from '~/utils/style';
/* REDUX */

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderPeopleIcon = props => (
  <Icon {...props} name='person-outline' />
);

const RenderGroupIcon = props => (
  <Icon {...props} name='people-outline' />
);

const RenderAvatarPeople = info => (
  <CAvatar source={{uri: info.avatar}} showIsOnline={info.isOnline} />
);

const RenderAvatarGroup = info => {
  return (
    <View style={[cStyles.flexWrap, cStyles.ofHidden, cStyles.borderAll, cStyles.rounded8, cStyles.center, cStyles.row, {height: moderateScale(40), width: moderateScale(40)}]}>
      {info.avatar.map((itemA, indexA) => {
        if (indexA > 3) return null;
        if (indexA === 3) {
          return (
            <Layout
              style={[cStyles.rounded3, cStyles.center, cStyles.borderAll, cStyles.ml1, {height: moderateScale(15), width: moderateScale(15)}]}
              level={'3'}>
              <CText category={'c2'} numberOfLines={1}>+{info.avatar.length - 3}</CText>
            </Layout>
          )
        }
        return <CAvatar size={'thin'} source={{uri: itemA}} />
      })}
    </View>
  )
};

/********************
 ** MAIN COMPONENT **
 ********************/
function AddConversation(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [selectedTab, setSelectedTab] = useState(0);
  const [peoples, setPeoples] = useState([]);
  const [groups, setGroups] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleAddWithPeople = idxPeople => {
    navigation.navigate(Routes.CONVERSATION_DETAILS.name, {
      people: peoples[idxPeople],
    });
  };

  const handleAddWithGroup = idxGroup => {
    navigation.navigate(Routes.CONVERSATION_DETAILS.name, {
      group: groups[idxGroup],
    });
  };

  /**********
   ** FUNC **
   **********/
  const onSetPeoples = () => {
    let tmp = [
      {
        id: 1,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Shepard.jpg',
        user: 'Shepard Rosco',
        job: 'Magazine Designer',
        isOnline: true,
        isGroup: false,
        messages: [],
      },
      {
        id: 2,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Tillman.jpg',
        user: 'Tillman Lee',
        job: 'News Photographer',
        isOnline: true,
        isGroup: false,
        messages: [],
      },
      {
        id: 3,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Trevino.jpg',
        user: 'Trevino Bush',
        job: 'Photojournalist',
        isOnline: false,
        isGroup: false,
        messages: [],
      },
      {
        id: 4,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Tyson.jpg',
        user: 'Tyson Marshall',
        job: 'Manuscript Editor',
        isOnline: false,
        isGroup: false,
        messages: [],
      },
      {
        id: 5,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
        user: 'Velazquez Smethley',
        job: 'Publications Editor',
        isOnline: false,
        isGroup: false,
        messages: [],
      },
    ]
    setPeoples(tmp);
  };

  const onSetGroups = () => {
    let tmp = [
      {
        id: 1,
        avatar: [
          'http://react-material.fusetheme.com/assets/images/avatars/Shepard.jpg',
          'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
          'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
          'http://react-material.fusetheme.com/assets/images/avatars/Katina.jpg',
        ],
        user: 'Designer Group',
        job: 'Designer',
        isGroup: true,
        messages: [],
      },
      {
        id: 2,
        avatar: [
          'http://react-material.fusetheme.com/assets/images/avatars/Lily.jpg',
          'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
        ],
        user: 'Photographer Group',
        job: 'Photographer',
        isGroup: true,
        messages: [],
      },
      {
        id: 3,
        avatar: [
          'http://react-material.fusetheme.com/assets/images/avatars/Nancy.jpg',
          'http://react-material.fusetheme.com/assets/images/avatars/Nora.jpg',
        ],
        user: 'Teacher English Group',
        job: 'Teacher',
        isGroup: true,
        messages: [],
      },
    ]
    setGroups(tmp);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set data people, groups */
    onSetPeoples();
    onSetGroups();
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      scrollEnabled={false}
      headerComponent={
        <CTopNavigation
          title={'add_conversation:title'}
          back
          iconBack={'close-outline'}
        />
      }>
      <TabView
        style={cStyles.flex1}
        tabBarStyle={cStyles.py10}
        selectedIndex={selectedTab}
        onSelect={index => setSelectedTab(index)}>
        <Tab style={cStyles.flex1} title={t('add_conversation:member')} icon={RenderPeopleIcon}>
          <Layout style={cStyles.flex1} level={'1'}>
            <List
              style={{backgroundColor: theme['background-basic-color-1']}}
              data={peoples}
              renderItem={info => {
                return (
                  <ListItem
                    style={[cStyles.px10, cStyles.py16]}
                    title={propsT => <CText style={cStyles.ml10} category={'label'}>{info.item.user}</CText>}
                    description={propsD => <CText style={cStyles.ml10} category={'c1'} appearance={'hint'}>{info.item.job}</CText>}
                    accessoryLeft={() => RenderAvatarPeople(info.item)}
                    onPress={() => handleAddWithPeople(info.index)}
                  />
                )
              }}
              keyExtractor={(item, index) => item.id + '_' + index}
              ItemSeparatorComponent={() => <Divider />}
            />
          </Layout>
        </Tab>
        <Tab style={cStyles.flex1} title={t('add_conversation:group')} icon={RenderGroupIcon}>
          <Layout style={cStyles.flex1} level={'1'}>
            <List
              style={{backgroundColor: theme['background-basic-color-1']}}
              data={groups}
              renderItem={info => {
                return (
                  <ListItem
                    style={[cStyles.px10, cStyles.py16]}
                    title={propsT => <CText style={cStyles.ml10} category={'label'}>{info.item.user}</CText>}
                    description={propsD => <CText style={cStyles.ml10} category={'c1'} appearance={'hint'}>{info.item.job}</CText>}
                    accessoryLeft={() => RenderAvatarGroup(info.item)}
                    onPress={() => handleAddWithGroup(info.index)}
                  />
                )
              }}
              keyExtractor={(item, index) => item.id + '_' + index}
              ItemSeparatorComponent={() => <Divider />}
            />
          </Layout>
        </Tab>
      </TabView>
    </CContainer>
  );
}

const styles = StyleSheet.create({
})

export default AddConversation;
