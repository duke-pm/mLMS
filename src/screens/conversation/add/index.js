/**
 ** Name: Add coversation screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Divider, List, ListItem, Tab, TabView, useTheme,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
/* REDUX */

const mockupPeoples = [
  {
    id: 1,
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Shepard.jpg',
    user: 'Shepard Rosco',
    job: 'Magazine Designer',
    email: 'example@example.com',
    isOnline: true,
    isGroup: false,
    messages: [],
  },
  {
    id: 2,
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Tillman.jpg',
    user: 'Tillman Lee',
    job: 'News Photographer',
    email: 'example@example.com',
    isOnline: true,
    isGroup: false,
    messages: [],
  },
  {
    id: 3,
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Trevino.jpg',
    user: 'Trevino Bush',
    job: 'Photojournalist',
    email: 'example@example.com',
    isOnline: false,
    isGroup: false,
    messages: [],
  },
  {
    id: 4,
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Tyson.jpg',
    user: 'Tyson Marshall',
    job: 'Manuscript Editor',
    email: 'example@example.com',
    isOnline: false,
    isGroup: false,
    messages: [],
  },
  {
    id: 5,
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
    user: 'Velazquez Smethley',
    job: 'Publications Editor',
    email: 'example@example.com',
    isOnline: false,
    isGroup: false,
    messages: [],
  },
];
const mockupGroups = [
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
];

/********************
 ** MAIN COMPONENT **
 ********************/
function AddConversation(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [peoples, setPeoples] = useState(mockupPeoples);
  const [groups, setGroups] = useState(mockupGroups);

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
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={'add_conversation:title'}
          back
          iconBack={'close-outline'}
        />
      }>
      <TabView
        style={cStyles.flex1}
        tabBarStyle={cStyles.pb10}
        selectedIndex={selectedTab}
        onSelect={index => setSelectedTab(index)}>
        <Tab style={cStyles.flex1} title={t('add_conversation:member')}>
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            data={peoples}
            renderItem={info => {
              return (
                <ListItem
                  title={propsT =>
                    <CText style={cStyles.pl16} category={'label'}>{info.item.user}</CText>}
                  description={propsD => (
                    <View style={cStyles.pl16}>
                      <CText category={'c1'} appearance={'hint'}>{info.item.job}</CText>
                      <CText category={'c1'} appearance={'hint'}>{info.item.email}</CText>
                    </View>
                  )}
                  accessoryLeft={<CAvatar source={{uri: info.item.avatar}} />}
                  onPress={() => handleAddWithPeople(info.index)}
                />
            )}}
            keyExtractor={(item, index) => item.id + '_' + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.mx10} />}
          />
        </Tab>
        <Tab style={cStyles.flex1} title={t('add_conversation:group')}>
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            data={groups}
            renderItem={info => {
              return (
                <ListItem
                  title={propsT =>
                    <CText style={cStyles.pl10} category={'label'}>{info.item.user}</CText>}
                  description={propsD =>
                    <CText style={cStyles.mp10} category={'c1'} appearance={'hint'}>{info.item.job}</CText>}
                    accessoryLeft={<CAvatar sources={info.item.avatar} />}
                    onPress={() => handleAddWithGroup(info.index)}
                />
            )}}
            keyExtractor={(item, index) => item.id + '_' + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.mx10} />}
          />
        </Tab>
      </TabView>

      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
});

export default AddConversation;
