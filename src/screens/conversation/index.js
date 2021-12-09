/**
 ** Name: Conversation screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Divider, Layout, List, Spinner, useTheme} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CAvatar from '~/components/CAvatar';
import CLoading from '~/components/CLoading';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
import { moderateScale } from '~/utils/helper';
/* REDUX */

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderAvatarUser = (info) => (
  <CAvatar
    showIsOnline={info.item.isOnline}
    source={{uri: info.item.avatar}}
  />
)

/********************
 ** MAIN COMPONENT **
 ********************/
function Conversation(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);

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

  /**********
   ** FUNC **
   **********/
  const onSetConversations = () => {
    let tmp = [
      {
        id: 1,
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
            user: 'Alice Freeman',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
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
    setConversations(tmp);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set data conversations */
    onSetConversations();
  }, []);

  useEffect(() => {
    if (loading) {
      if (conversations.length > 0) {
        setLoading(false);
      }
    }
  }, [
    loading,
    conversations,
  ]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={'conversation:title'}
          searchAdd
          onPressAdd={handleAddNew}
        />
      }>
      <Layout level={'1'}>
        {!loading && (
          <List
          style={{backgroundColor: theme['background-basic-color-1']}}
          data={conversations}
          renderItem={info => {
            return (
              <Button style={[cStyles.py0, cStyles.px0]} appearance={'ghost'} onPress={() => handleConversationItem(info)}>
                {propsB => (
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.py16, cStyles.px10]}>
                    {!info.item.isGroup && RenderAvatarUser(info)}
                    {info.item.isGroup && (
                      <View style={[cStyles.flexWrap, cStyles.ofHidden, cStyles.borderAll, cStyles.rounded8, cStyles.center, cStyles.row, {height: moderateScale(40), width: moderateScale(40)}]}>
                        {info.item.avatar.map((itemA, indexA) => {
                          if (indexA > 3) return null;
                          if (indexA === 3) {
                            return (
                              <Layout
                                style={[cStyles.rounded3, cStyles.center, cStyles.borderAll, cStyles.ml1, {height: moderateScale(15), width: moderateScale(15)}]}
                                level={'3'}>
                                <CText category={'c2'} numberOfLines={1}>+{info.item.avatar.length - 3}</CText>
                              </Layout>
                            )
                          }
                          return (
                            <CAvatar size={'thin'} source={{uri: itemA}} />
                          )
                        })}
                      </View>
                    )}
                    <View style={[cStyles.ml10, cStyles.flex1]}>
                      <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                        <CText category={'label'} numberOfLines={1}>{info.item.user}</CText>
                        <CText category={'c1'} appearance={'hint'} numberOfLines={1}>{info.item.lastMsgAt}</CText>
                      </View>
                      <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt5]}>
                        <View style={cStyles.flex1}>
                          <CText appearance={info.item.isRead ? 'hint' : 'default'} category={'p1'} numberOfLines={1}>
                            {!info.item.isGroup
                              ? info.item.lastMsg
                              : `${info.item.lastMsgUser}: ${info.item.lastMsg}`}
                          </CText>
                        </View>
                        {!info.item.isRead && (
                          <View style={[cStyles.center, cStyles.rounded2, cStyles.ml10, {backgroundColor: theme['color-danger-500'], height: moderateScale(20), width: moderateScale(20)}]}>
                            <CText status={'control'} category={'c1'} numberOfLines={1}>{'1'}</CText>
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}
              </Button>
            )
          }}
          keyExtractor={(item, index) => item.id + '_' + index}
          ItemSeparatorComponent={() => <Divider />}
        />
        )}
      </Layout>

      {loading && (
        <Layout style={cStyles.flexCenter} level={'3'}>
          <Spinner />
        </Layout>
      )}
    </CContainer>
  );
}

export default Conversation;
