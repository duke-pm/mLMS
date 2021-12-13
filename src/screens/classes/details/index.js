/**
 ** Name: Class details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect, useContext, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme, Layout, ButtonGroup, Button, List, Divider,
  ListItem, Card, Modal
} from '@ui-kitten/components';
import {StyleSheet, View, StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import COverflowMenu from '~/components/COverflowMenu';
import CPostImages from '~/components/CPostImages';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {IS_IOS, moderateScale, sW} from '~/utils/helper';
import {colors, cStyles} from '~/utils/style';
import {DARK, LIGHT} from '~/configs/constants';
import Routes from '~/navigator/Routes';
/* REDUX */

const mockupPosts = [
  {
    id: 'post1',
    images: [
      'https://picsum.photos/id/100/500/300',
      'https://picsum.photos/id/1000/500/300',
      'https://picsum.photos/id/1004/500/300',
      'https://picsum.photos/id/1005/500/300',
    ],
    author: 'Brent Morgan',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/garry.jpg',
    createdAt: '12/12/2021 08:00',
    createdWhere: 'University',
    caption: 'Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin.',
    isLiked: true,
    numLike: 10,
    numComment: 4,
    comments: [
      {
        id: 'cmt1',
        caption: 'Libero id faucibus nisl tincidunt eget',
        name: 'Judith Burton',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/joyce.jpg',
        createdAt: '14/12/2021 16:00'
      },
      {
        id: 'cmt2',
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        name: 'Jane Dean',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/jane.jpg',
        createdAt: '15/12/2021 11:45'
      },
      {
        id: 'cmt3',
        caption: 'Nisl tincidunt eget nullam non',
        name: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
        createdAt: '15/12/2021 12:45'
      },
      {
        id: 'cmt4',
        caption: 'Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
        name: 'Josefina Lakefield',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
        createdAt: '15/12/2021 16:45'
      }
    ]
  },
  {
    id: 'post2',
    images: [
      'https://picsum.photos/id/1/500/300',
      'https://picsum.photos/id/10/500/300',
      'https://picsum.photos/id/101/500/300',
      'https://picsum.photos/id/1010/500/300',
      'https://picsum.photos/id/1011/500/300',
      'https://picsum.photos/id/1012/500/300',
    ],
    author: 'Vincent Munoz',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/vincent.jpg',
    createdAt: '10/12/2021 18:00',
    createdWhere: 'Home',
    caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    isLiked: false,
    numLike: 2,
    numComment: 2,
    comments: [
      {
        id: 'cmt3',
        caption: 'Nisl tincidunt eget nullam non',
        name: 'Juan Carpenter',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/james.jpg',
        createdAt: '13/12/2021 16:00'
      },
      {
        id: 'cmt4',
        caption: 'Quis hendrerit dolor magna eget est lorem ipsum dolor sit',
        name: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
        createdAt: '13/12/2021 20:30'
      }
    ]
  },
  {
    id: 'post3',
    images: [],
    author: 'Boyle Winters',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
    createdAt: '09/12/2021 18:00',
    createdWhere: 'Class ABC',
    caption: 'Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia.\n\nIn tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus.',
    isLiked: false,
    numLike: 0,
    numComment: 0,
    comments: []
  }
];
const pAvatar = moderateScale(20);
const sIconMenu = moderateScale(30);

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderMenuIcon = (label, icon, color) => (
  <View style={cStyles.itemsCenter}>
    <View style={[cStyles.center, styles.con_icon_menu, {backgroundColor: color}]}>
      <IoniIcon name={icon} size={sIconMenu} color={colors.WHITE} />
    </View>
    <CText style={cStyles.mt16} >{label}</CText>
  </View>
);

/********************
 ** MAIN COMPONENT **
 ********************/
function ClassDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation, route} = props;
  const dataClass = route.params.data;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [alertMenu, setAlertMenu] = useState(false);
  const [functionMenu, setFunctionMenu] = useState(false);
  const [heightBanner, setHeightBanner] = useState(0);
  const [posts, setPosts] = useState(mockupPosts);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleFunctionMenu = () => {
    setFunctionMenu(!functionMenu);
  };

  const toggleAlertMenu = () => {
    setAlertMenu(!alertMenu);
  };

  const handleGoAssignment = () => {
    toggleAlertMenu();
    navigation.navigate(Routes.ASSIGNMENT.name);
  };

  const handleGoQuiz = () => {
    toggleAlertMenu();
    navigation.navigate(Routes.QUIZ.name);
  };

  const handleGoQuestions = () => {
    toggleAlertMenu();
    navigation.navigate(Routes.QUESTIONS.name);
  };

  const handleGoTeachingMaterial = () => {
    console.log('[LOG] === handleGoTeachingMaterial ===> ');
  };

  const handleGoStudents = () => {
    toggleFunctionMenu();
    navigation.navigate(Routes.STUDENTS.name);
  };

  const handleGoAddPost = () => {
    navigation.navigate(Routes.ADD_POST.name);
  };

  const handleGoPostDetails = (idxPost) => {
    navigation.navigate(Routes.POST_DETAILS.name);
  };

  const handleLikePost = (idxPost) => {
    let tmp = [...posts];
    if (tmp[idxPost].isLiked) {
      tmp[idxPost].numLike = tmp[idxPost].numLike - 1;
    } else {
      tmp[idxPost].numLike = tmp[idxPost].numLike + 1;
    }
    tmp[idxPost].isLiked = !tmp[idxPost].isLiked;
    setPosts(tmp);
  };

  /**********
   ** FUNC **
   **********/
  const onLayoutBanner = event => {
    let {height} = event.nativeEvent.layout;
    setHeightBanner(height);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    IS_IOS && StatusBar.setBarStyle('light-content', true);

    setLoading(false);
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (themeContext.themeApp === LIGHT) {
        StatusBar.setBarStyle('dark-content', true);
      }
      if (themeContext.themeApp === DARK) {
        StatusBar.setBarStyle('light-content', true);
      }
    };
  }, [themeContext.themeApp]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['bottom']}
      headerComponent={
        <FastImage
          style={[cStyles.abs, cStyles.fullWidth, cStyles.pb16, styles.img_background]}
          onLayout={onLayoutBanner}
          source={{uri: dataClass.bgImage}}
          resizeMode={FastImage.resizeMode.cover}>
          <View style={[cStyles.abs, cStyles.inset0, styles.backdrop]} />
            <SafeAreaView edges={['top']}>
              <CTopNavigation
                style={styles.top_navigation}
                titleStyle={styles.text_white}
                subtitleStyle={styles.text_white}
                iconStyle={styles.text_white}
                title={'class_details:title'}
                back
                customRightComponent={
                  <COverflowMenu
                    iconFill={'white'}
                    menus={[
                      {
                        id: 'menuListUser',
                        icon: 'people-outline',
                        label: 'class_details:list_students',
                        onPress: handleGoStudents,
                      },
                    ]}
                  />
                }
              />
              <View style={cStyles.px16}>
                <CText status={'control'} category={'label'} numberOfLines={2}>{dataClass.label}</CText>
                <View style={[cStyles.row, cStyles.itemsEnd, cStyles.mt12]}>
                  {dataClass.subjects.map((itemSub, indexSub) => {
                    return (
                      <CText
                        key={itemSub + '_' + indexSub}
                        style={cStyles.mt5}
                        status={'control'}
                        
                        numberOfLines={2}>&#10041; {itemSub}  </CText>
                    );
                  })}
                </View>

                <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt24]}>
                  <View style={[cStyles.row, cStyles.itemsCenter]}>
                    {dataClass.members.map((itemMem, indexMem) => {
                      return (
                        <View key={itemMem.id + '_' + indexMem} style={[cStyles.abs, {left: pAvatar * indexMem}]}>
                          <CAvatar size={'small'} source={{uri: itemMem.avatar}} />
                        </View>
                      );
                    })}
                    
                    <View 
                      style={[cStyles.abs, cStyles.rounded5, cStyles.p1, styles.bg_num_member]}>
                      <Layout
                        style={[
                          cStyles.center,
                          cStyles.rounded5,
                          styles.mini_avatar,
                        ]} level={'3'}>
                        <CText category={'c1'}>+{dataClass.numMember - 2}</CText>
                      </Layout>
                    </View>

                    <CText style={styles.txt_num_member} status={'control'} category={'c1'}>
                      {`${dataClass.numMember} ${t('class_details:members')}`}
                    </CText>
                  </View>

                  {dataClass.assignment > 0 && (
                    <Button
                      appearance={'filled'}
                      status={'basic'}
                      size={'tiny'}
                      accessoryRight={propsI => CIcon(propsI, 'eva', 'star')}>
                      {`${dataClass.assignment} ${t('classes:todo_item')}`}
                    </Button>
                  )}
                </View>
              </View>
            </SafeAreaView>
        </FastImage>
      }>
      {/** Actions */}
      <Layout
        style={[
          cStyles.row,
          cStyles.itemsCenter,
          cStyles.justifyBetween,
          cStyles.shadowListItem,
          {marginTop: heightBanner},
        ]}>
        <ButtonGroup appearance={'ghost'} status={'primary'}>
          <Button
            style={styles.btn_action}
            disabled={loading}
            accessoryLeft={propsI => CIcon(propsI, 'eva', 'grid', theme['color-primary-500'])}
            onPress={toggleAlertMenu}>
            {t('class_details:menu')}
          </Button>
          <Button
            style={styles.btn_action}
            disabled={loading}
            accessoryLeft={propsI => CIcon(propsI, 'eva', 'edit-2', theme['color-primary-500'])}
            onPress={handleGoAddPost}>
            {t('class_details:add_post')}
          </Button>
        </ButtonGroup>
      </Layout>

      {IS_IOS && <Divider />}

      {/** Posts of class */}
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          contentContainerStyle={cStyles.p10}
          data={posts}
          renderItem={info => {
            return (
              <Card
                onPress={handleGoPostDetails}
                header={(propsH) => (
                  <ListItem
                    disabled
                    title={evaProps =>
                      <CText style={cStyles.ml10} category={'label'}>{info.item.author}</CText>
                    }
                    description={evaProps =>
                      <CText style={cStyles.ml10} category={'c1'} appearance='hint'>
                        {info.item.createdAt + ' . At ' + info.item.createdWhere}
                      </CText>
                    }
                    accessoryLeft={<CAvatar source={{uri: info.item.avatar}} />}
                  />
                )}
                footer={info.item.numComment > 0
                  ? (propsF) => (
                  <Layout style={[cStyles.flex1, cStyles.p10]}>
                    {/** List of comment */}
                    <List
                      style={{backgroundColor: theme['background-basic-color-1']}}
                      data={info.item.comments}
                      renderItem={infoCmt => {
                        if (infoCmt.index > 1) return null;
                        return (
                          <ListItem
                            style={[
                              cStyles.itemsStart,
                              cStyles.rounded1,
                              cStyles.px10,
                              infoCmt.index > 0 && cStyles.mt10,
                              {backgroundColor: theme['background-basic-color-2']},
                            ]}
                            title={evaProps => (
                              <View style={[cStyles.ml10, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                                <CText style={cStyles.textLeft} category={'label'}>{infoCmt.item.name}</CText>
                                <CText style={cStyles.textRight} category={'c1'} appearance='hint'>
                                  {infoCmt.item.createdAt}
                                </CText>
                              </View>
                            )}
                            description={evaProps =>
                              <CText style={[cStyles.ml10, cStyles.mt5]} >
                                {infoCmt.item.caption}
                              </CText>
                            }
                            accessoryLeft={<CAvatar source={{uri: info.item.avatar}} />}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => item.id + index}
                      ListFooterComponent={
                        info.item.comments.length > 2
                        ? () => (
                          <View style={cStyles.pt10}>
                            <Button
                              appearance={'ghost'}
                              status={'primary'}
                              size={'tiny'}
                              onPress={() => handleGoPostDetails(info.index)}>
                              {t('class_details:see_more_comment')}
                            </Button>
                          </View>
                        ) : undefined
                      }
                    />
                  </Layout>
                ) : undefined}>
                <View style={styles.bg_content_card}>
                  <View style={[cStyles.px10, cStyles.py16]}>
                    <CText >{info.item.caption}</CText>
                  </View>
                  {info.item.images.length > 0 && (
                    <View style={cStyles.px10}>
                      <CPostImages images={info.item.images} />
                    </View>
                  )}
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.my5, cStyles.px10]}>
                    <Button
                      appearance={'ghost'}
                      status={info.item.isLiked ? 'primary' : 'basic'}
                      size={'small'}
                      accessoryLeft={propsI => info.item.isLiked
                        ? CIcon(propsI, 'eva', 'heart', theme['color-primary-500'])
                        : CIcon(propsI, 'eva', 'heart')
                      }
                      onPress={() => handleLikePost(info.index)}>
                      {info.item.numLike + ''}
                    </Button>
                    <Button
                      style={cStyles.ml10}
                      appearance={'ghost'}
                      status={'basic'}
                      size={'small'}
                      accessoryLeft={propsI => CIcon(propsI, 'eva', 'message-square')}>
                      {info.item.comments.length + ''}
                    </Button>
                  </View>
                </View>
              </Card>
            );
          }}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => <View style={cStyles.my5} />}
        />
      )}

      {/** Alert menu */}
      <Modal
        style={cStyles.flexCenter}
        visible={alertMenu}
        backdropStyle={styles.backdrop}
        onBackdropPress={undefined}>
        <Layout>
          <View style={[cStyles.row, cStyles.itemsCenter,]}>
            <Button appearance={'ghost'} status={'basic'} onPress={handleGoAssignment}>
            {propsB => 
              <Layout style={styles.con_menu}>
                {RenderMenuIcon(t('class_details:assignment'), 'document-outline', 'green')}
              </Layout>
            }
            </Button>

            <Button appearance={'ghost'} status={'basic'} onPress={handleGoQuiz}>
            {propsB => 
              <Layout style={styles.con_menu}>
                {RenderMenuIcon(t('class_details:quiz'), 'create-outline', 'indigo')}
              </Layout>
            }
            </Button>
          </View>
          <View style={[cStyles.row, cStyles.itemsCenter]}>
            <Button appearance={'ghost'} status={'basic'} onPress={handleGoQuestions}>
            {propsB => 
              <Layout style={styles.con_menu}>
                {RenderMenuIcon(t('class_details:questions'), 'help-circle-outline', 'hotpink')}
              </Layout>
            }
            </Button>

            <Button appearance={'ghost'} status={'basic'} onPress={handleGoTeachingMaterial}>
            {propsB => 
              <Layout style={styles.con_menu}>
                {RenderMenuIcon(t('class_details:teaching_material'), 'document-attach-outline', 'darkturquoise')}
              </Layout>
            }
            </Button>
          </View>
        </Layout>

        <View style={[cStyles.center, cStyles.mt24]}>
          <Button
            appearance={'ghost'}
            status={'control'}
            accessoryLeft={propsI =>
              CIcon(propsI, 'ioni', 'close-circle', 'white', moderateScale(40))}
            onPress={toggleAlertMenu}
          />
        </View>
      </Modal>

      {/** Loading of page */}
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  img_background: {
    zIndex: 1,
  },
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
  top_navigation: {
    backgroundColor: colors.TRANSPARENT
  },
  text_white: {
    color: colors.WHITE,
  },
  mini_avatar: {
    height: moderateScale(28),
    width: moderateScale(28),
  },
  bg_num_member: {
    left: moderateScale(40),
    backgroundColor: colors.BLACK,
  },
  txt_num_member: {
    marginLeft: moderateScale(80),
  },
  content: {
    marginTop: moderateScale(250),
  },
  btn_action: {
    width: '50%',
  },
  bg_content_card: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  con_menu: {
    alignItems: 'center',
    justifyContent: 'center',
    height: sW('50%'),
    width: sW('50%'),
  },
  con_icon_menu: {
    height: moderateScale(70),
    width: moderateScale(70),
    borderRadius: moderateScale(70),
  },
});

export default ClassDetails;
