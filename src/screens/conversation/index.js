/**
 ** Name: Conversation screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Icon, Layout, Spinner, useTheme} from '@ui-kitten/components';
import {StyleSheet, View, SectionList, Animated} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CAvatar from '~/components/CAvatar';
import CSearchBar from '~/components/CSearchBar';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
/* REDUX */

const mockupFavorite = [
  {
    id: 1,
    user: 'Blair Ferguson',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
    job: 'Web Backend',
    lastMsgUser: null,
    lastMsg: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
    lastMsgAt: '23/11/2021 11:30',
    isRead: false,
    isOnline: true,
    isGroup: false,
    messages: [
      {
        id: 1,
        msg: null,
        createdAt: '21/11/2021 06:00',
        user: 'me',
        file: 'Lorem Ipsum.pdf',
        link: 'https://picsum.photos/id/100/500/300',
        ext: 'pdf',
        type: 'file',
        size: 5,
      },
      {
        id: 2,
        msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
        createdAt: '21/11/2021 08:00',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 3,
        msg: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
        createdAt: '21/11/2021 07:55',
        user: 'me',
      },
      {
        id: 4,
        msg: null,
        createdAt: '21/11/2021 07:55',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
        file: 'Lorem Ipsum.png',
        link: 'https://picsum.photos/id/1000/500/300',
        ext: 'png',
        type: 'image',
        size: 2,
      },
      {
        id: 5,
        msg: 'Nisl tincidunt eget nullam non',
        createdAt: '21/11/2021 07:50',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 6,
        msg: 'Quis hendrerit dolor magna eget est lorem ipsum dolor sit!',
        createdAt: '21/11/2021 07:48',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 7,
        msg: 'Volutpat odio facilisis mauris sit amet massa',
        createdAt: '21/11/2021 07:45',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 8,
        msg: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
        createdAt: '21/11/2021 07:35',
        user: 'me',
      },
      {
        id: 9,
        msg: 'Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et',
        createdAt: '21/11/2021 07:20',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 10,
        msg: 'Non tellus orci ac auctor augue',
        createdAt: '21/11/2021 07:15',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 11,
        msg: 'Elit at imperdiet dui accumsan sit, ornare arcu dui vivamus arcu felis',
        createdAt: '21/11/2021 07:00',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
    ]
  },
  {
    id: 2,
    user: `Barrera's Group`,
    avatar: [
      'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Barrera.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg'
    ],
    job: null,
    lastMsgUser: 'Copeland Rooney',
    lastMsg: 'Hey, I am facing problem as i can not login into application. Can you help me to reset my password?',
    lastMsgAt: '20/11/2021 12:00',
    isRead: true,
    isOnline: false,
    isGroup: true,
    messages: [
      {
        id: 1,
        msg: 'Hey, I am facing problem as i can not login into application. Can you help me to reset my password?',
        createdAt: '20/11/2021 12:00',
        user: 'Copeland Rooney',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg',
      },
      {
        id: 2,
        msg: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
        createdAt: '19/11/2021 07:55',
        user: 'me',
      },
      {
        id: 3,
        msg: 'Quickly come to the meeting room 1B, we have a big server issue',
        createdAt: '19/11/2021 07:50',
        user: 'Arnold',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
      },
      {
        id: 4,
        msg: 'Egestas integer eget aliquet nibh praesent.',
        createdAt: '18/11/2021 07:50',
        user: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
      },
      {
        id: 5,
        msg: 'In hac habitasse platea dictumst quisque sagittis purus.',
        createdAt: '18/11/2021 07:50',
        user: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
      },
      {
        id: 6,
        msg: 'Pulvinar elementum integer enim neque volutpat ac.',
        createdAt: '18/11/2021 07:50',
        user: 'Josefina Lakefield',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
      },
      {
        id: 7,
        msg: 'Senectus et netus et malesuada.',
        createdAt: '18/11/2021 07:50',
        user: 'Katina Bletchley',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Katina.jpg',
      },
      {
        id: 8,
        msg: 'Nunc pulvinar sapien et ligula ullamcorper malesuada proin.',
        createdAt: '18/11/2021 07:50',
        user: 'Lily Peasegood',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Lily.jpg',
      },
      {
        id: 9,
        msg: 'Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget.',
        createdAt: '18/11/2021 07:50',
        user: 'Mai Nox',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
      },
      {
        id: 10,
        msg: 'Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia.',
        createdAt: '18/11/2021 07:50',
        user: 'Mai Nox',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
      },
    ]
  }
];
const mockupData = [
  {
    id: 3,
    user: 'Alice Freeman',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
    job: 'Database Coordinator',
    lastMsgUser: null,
    lastMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
    lastMsgAt: '21/11/2021 08:00',
    isRead: false,
    isOnline: true,
    isGroup: false,
    messages: [
      {
        id: 1,
        msg: null,
        createdAt: '21/11/2021 06:00',
        user: 'me',
        file: 'Lorem Ipsum.pdf',
        link: 'https://picsum.photos/id/100/500/300',
        ext: 'pdf',
        type: 'file',
        size: 5,
      },
      {
        id: 2,
        msg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!',
        createdAt: '21/11/2021 08:00',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 3,
        msg: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
        createdAt: '21/11/2021 07:55',
        user: 'me',
      },
      {
        id: 4,
        msg: null,
        createdAt: '21/11/2021 07:55',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
        file: 'Lorem Ipsum.png',
        link: 'https://picsum.photos/id/1000/500/300',
        ext: 'png',
        type: 'image',
        size: 2,
      },
      {
        id: 5,
        msg: 'Nisl tincidunt eget nullam non',
        createdAt: '21/11/2021 07:50',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 6,
        msg: 'Quis hendrerit dolor magna eget est lorem ipsum dolor sit!',
        createdAt: '21/11/2021 07:48',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 7,
        msg: 'Volutpat odio facilisis mauris sit amet massa',
        createdAt: '21/11/2021 07:45',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 8,
        msg: 'It’s not my money, you know. I will eat my breakfast and then I will come to the meeting room.',
        createdAt: '21/11/2021 07:35',
        user: 'me',
      },
      {
        id: 9,
        msg: 'Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et',
        createdAt: '21/11/2021 07:20',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 10,
        msg: 'Non tellus orci ac auctor augue',
        createdAt: '21/11/2021 07:15',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 11,
        msg: 'Elit at imperdiet dui accumsan sit, ornare arcu dui vivamus arcu felis',
        createdAt: '21/11/2021 07:00',
        user: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
    ]
  },
  {
    id: 4,
    user: 'Arnold Group',
    avatar: [
      'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Barrera.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
      'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg'
    ],
    job: null,
    lastMsgUser: 'Arnold',
    lastMsg: 'We are losing money! Quick!',
    lastMsgAt: '20/11/2021 12:00',
    isRead: true,
    isOnline: false,
    isGroup: true,
    messages: [
      {
        id: 1,
        msg: 'We are losing money! Quick!',
        createdAt: '20/11/2021 12:00',
        user: 'Arnold',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
      },
      {
        id: 2,
        msg: 'I’m having breakfast right now, can’t you wait for 10 minutes?',
        createdAt: '19/11/2021 07:55',
        user: 'me',
      },
      {
        id: 3,
        msg: 'Quickly come to the meeting room 1B, we have a big server issue',
        createdAt: '19/11/2021 07:50',
        user: 'Arnold',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
      },
      {
        id: 4,
        msg: 'Egestas integer eget aliquet nibh praesent.',
        createdAt: '18/11/2021 07:50',
        user: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
      },
      {
        id: 5,
        msg: 'In hac habitasse platea dictumst quisque sagittis purus.',
        createdAt: '18/11/2021 07:50',
        user: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
      },
      {
        id: 6,
        msg: 'Pulvinar elementum integer enim neque volutpat ac.',
        createdAt: '18/11/2021 07:50',
        user: 'Josefina Lakefield',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
      },
      {
        id: 7,
        msg: 'Senectus et netus et malesuada.',
        createdAt: '18/11/2021 07:50',
        user: 'Katina Bletchley',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Katina.jpg',
      },
      {
        id: 8,
        msg: 'Nunc pulvinar sapien et ligula ullamcorper malesuada proin.',
        createdAt: '18/11/2021 07:50',
        user: 'Lily Peasegood',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Lily.jpg',
      },
      {
        id: 9,
        msg: 'Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget.',
        createdAt: '18/11/2021 07:50',
        user: 'Mai Nox',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
      },
      {
        id: 10,
        msg: 'Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia.',
        createdAt: '18/11/2021 07:50',
        user: 'Mai Nox',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
      },
    ]
  }
];

const AnimIcon = Animated.createAnimatedComponent(Icon);

/********************
 ** MAIN COMPONENT **
 ********************/
function Conversation(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;
  let prevOpenedRow;

  let swipeableRef = [];

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState(mockupData);
  const [favorites, setFavorites] = useState(mockupFavorite);
  const [sections, setSections] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleConversationItem = info => {
    navigation.navigate(Routes.CONVERSATION_DETAILS.name, {
      data: info.item,
    });
  };

  const handleAddNew = () => {
    navigation.navigate(Routes.ADD_CONVERSATION.name);
  };

  const handleAsRead = (infoUser) => {
    swipeableRef[infoUser.item.id + '_' + infoUser.index].close();
    alert('Set as Read to ' + infoUser.item.user);
  };

  const handleCall = (infoUser) => {
    swipeableRef[infoUser.item.id + '_' + infoUser.index].close();
    alert('Call to ' + infoUser.item.user);
  };

  const handleLeave = (infoUser) => {
    swipeableRef[infoUser.item.id + '_' + infoUser.index].close();
    alert('Remove this ' + infoUser.item.user);
  };

  /**********
   ** FUNC **
   **********/
  const onPrepareData = () => {
    if (sections.length === 0) {
      let tmp = [...sections];
      tmp.push({
        title: 'English Class',
        color: 'success',
        data: favorites,
      });
      tmp.push({
        title: 'Other',
        data: conversations,
      });
      setSections(tmp);
    }
  };

  const onSearch = (valueSearch) => {

  };

  const onCloseRow = (index) => {
    console.log('[LOG] === prevOpenedRow ===> ', prevOpenedRow);
    if (prevOpenedRow && prevOpenedRow !== swipeableRef[index]) {
      prevOpenedRow?.close();
    }
    prevOpenedRow = swipeableRef[index];
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    onPrepareData();
  }, []);

  useEffect(() => {
    if (loading) {
      if (sections.length > 0) {
        setLoading(false);
      }
    }
  }, [loading, sections]);

  /************
   ** RENDER **
   ************/
  const RenderRightAction = (progress, icon, color, x, onPress) => {
    const scale = progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
      extrapolate: 'clamp',
    });
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    return (
      <Animated.View style={[cStyles.flexCenter, {transform: [{ translateX: trans }] }]}>
        <RectButton style={[cStyles.flexCenter, {width: 64}]}onPress={onPress}>
          <AnimIcon
            style={[{height: 20, width: 20, transform: [{scale}]}]}
            name={icon + '-outline'}
            fill={color}
          />
        </RectButton>
      </Animated.View>
    )
  };

  const RenderRightActions = (progress, info) => {
    return (
      <View style={[cStyles.row, {width: 192}]}>
        {RenderRightAction(progress, 'checkmark-square', theme['color-info-500'], 192, () => handleAsRead(info))}
        {RenderRightAction(progress, 'phone', theme['color-primary-500'], 128, () => handleCall(info))}
        {RenderRightAction(progress, 'trash', theme['color-danger-500'], 64, () => handleLeave(info))}
      </View>
    )
  };

  return (
    <CContainer
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={'conversation:title'}
          add
          onPressAdd={handleAddNew}
        />
      }>
      <Layout style={[cStyles.px10, cStyles.pb10]}>
        <CSearchBar onSearch={onSearch} />
      </Layout>

      {!loading && (
        <SectionList
          sections={sections}
          renderItem={info => {
            return (
              <Swipeable
                ref={ref => swipeableRef[info.item.id + '_' + info.index] = ref}
                friction={2}
                rightThreshold={40}
                enableTrackpadTwoFingerGesture
                renderRightActions={(progress, dragX) =>
                  RenderRightActions(progress, info)
                }>
                <Button
                  style={[cStyles.py0, cStyles.px0]}
                  appearance={'ghost'}
                  onPress={() => handleConversationItem(info)}>
                  {propsB => (
                    <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.py16, cStyles.px10]}>
                      {!info.item.isGroup && (
                        <CAvatar source={{uri: info.item.avatar}} size='large' />
                      )}
                      {info.item.isGroup && (
                        <CAvatar sources={info.item.avatar} size='large' />
                      )}
                      <View style={[cStyles.ml10, cStyles.flex1]}>
                        <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                          <CText category={info.item.isRead ? 'p1' : 'label'} numberOfLines={1}>{info.item.user}</CText>
                          <CText category={'c1'} appearance={'hint'} numberOfLines={1}>{info.item.lastMsgAt}</CText>
                        </View>
                        <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt5]}>
                          <View style={cStyles.flex1}>
                            <CText category={info.item.isRead ? 'p1' : 'label'} appearance={info.item.isRead ? 'hint' : 'default'} numberOfLines={1}>
                              {!info.item.isGroup
                                ? info.item.lastMsg
                                : `${info.item.lastMsgUser}: ${info.item.lastMsg}`}
                            </CText>
                          </View>
                          {!info.item.isRead && (
                            <View
                              style={[
                                cStyles.center,
                                cStyles.rounded2,
                                cStyles.ml10,
                                styles.con_num_not_read,
                                {backgroundColor: theme['color-danger-500']},
                              ]}>
                              <CText status={'control'} category={'c1'} numberOfLines={1}>{'1'}</CText>
                            </View>
                          )}
                        </View>
                      </View>
                    </Layout>
                  )}
                </Button>
              </Swipeable>
            )
          }}
          renderSectionHeader={({section: {title, color}}) => (
            <Layout style={cStyles.p10} level={'2'}>
              <CText status={color} category='label'>{t(title).toUpperCase()}</CText>
            </Layout>
          )}
          keyExtractor={(item, index) => item + index} 
        />
      )}

      {loading && (
        <Layout style={cStyles.flexCenter} level={'3'}>
          <Spinner />
        </Layout>
      )}
    </CContainer>
  );
}

const styles = StyleSheet.create({
  con_group_avatar: {
    height: moderateScale(42),
    width: moderateScale(42),
  },
  con_holder_avatar: {
    height: moderateScale(17),
    width: moderateScale(17),
  },
  con_num_not_read: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
});

export default Conversation;
