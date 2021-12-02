/**
 ** Name: Class details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useContext, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useTheme, Layout, Icon, ButtonGroup, Button, List, Divider,
  ListItem, Card, Modal, OverflowMenu, MenuItem, TopNavigationAction, 
} from '@ui-kitten/components';
import {StyleSheet, View, TouchableNativeFeedback, StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CPostImages from '~/components/CPostImages';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {IS_IOS, moderateScale, sW} from '~/utils/helper';
import {colors, cStyles} from '~/utils/style';
import {DARK, LIGHT} from '~/configs/constants';
import Routes from '~/navigator/Routes';
/* REDUX */

const RenderLikeIcon = props => (
  <IoniIcon
    name='heart-outline'
    size={moderateScale(16)}
    color={'gray'}
  />
);

const RenderLikedIcon = props => (
  <IoniIcon
    name='heart'
    size={moderateScale(16)}
    color={colors.PRIMARY}
  />
);

const RenderCommentIcon = props => (
  <IoniIcon
    name='chatbubble-ellipses-outline'
    size={moderateScale(16)}
    color={'gray'}
  />
);

const RenderCloseIcon = props => (
  <IoniIcon
    name='close-circle-outline'
    size={moderateScale(40)}
    color={'white'}
  />
);

const MenuIcon = (props) => (
  <IoniIcon name='ellipsis-vertical' size={moderateScale(20)} color={colors.WHITE} />
);

const RenderPeopleIcon = (props) => (
  <Icon {...props} name='people-outline'/>
);

const RenderAddPostIcon = (props) => (
  <Icon {...props} name='edit-2-outline'/>
);

const RenderMenuActionsIcon = (props) => (
  <Icon {...props} name='grid-outline'/>
);

const RenderMenuIcon = (label, icon, color) => (
  <View style={cStyles.itemsCenter}>
    <View style={[cStyles.center, styles.con_icon_menu, {backgroundColor: color}]}>
      <IoniIcon
        name={icon}
        size={moderateScale(30)}
        color={'white'}
      />
    </View>
    <CText style={cStyles.mt16} category={'p1'}>{label}</CText>
  </View>
);

const RenderHeaderPost = (info) => (
  <CAvatar source={{uri: info.item.avatar}} />
);

const RenderHeaderComment = (info) => (
  <CAvatar source={{uri: info.item.avatar}} />
);


function ClassDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation, route} = props;
  const dataClass = route.params.data;

  /** Use ref */
  const infiniteAnimationIconRef = useRef();

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [alertMenu, setAlertMenu] = useState(false);
  const [functionMenu, setFunctionMenu] = useState(false);
  const [heightBanner, setHeightBanner] = useState(0);
  const [posts, setPosts] = useState([]);

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

    let tmpPosts = [
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
        numComment: 23,
        comments: [
          {
            id: 'cmt1',
            caption: 'Libero id faucibus nisl tincidunt eget',
            name: 'Judith Burton',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/joyce.jpg',
            createdAt: '14/12/2021 16:00'
          },
          {
            id: 'cmt1',
            caption: 'Leo a diam sollicitudin tempor id',
            name: 'Jane Dean',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/jane.jpg',
            createdAt: '15/12/2021 11:45'
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
        numComment: 5,
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
      }
    ];
    setPosts(tmpPosts);
  }, []);

  useEffect(() => {
    if (heightBanner > 0) setLoading(false);
  }, [heightBanner]);

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
  const RenderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleFunctionMenu}/>
  );

  return (
    <CContainer
      safeArea={['bottom']} 
      scrollEnabled={false}
      headerComponent={
        <FastImage
          style={[cStyles.abs, cStyles.fullWidth, cStyles.pb16, styles.img_background]}
          onLayout={onLayoutBanner}
          source={{
            uri: dataClass.bgImage,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.immutable,
          }}
          resizeMode={FastImage.resizeMode.cover}
        >
          <View style={[cStyles.abs, cStyles.inset0, styles.backdrop]} />
            <SafeAreaView edges={['top']}>
              <CTopNavigation
                style={styles.top_navigation}
                titleStyle={styles.text_white}
                subtitleStyle={styles.text_white}
                iconStyle={styles.text_white}
                title={'class_details:title'}
                back
                borderBottom={false}
                customRightComponent={
                  <OverflowMenu
                    anchor={RenderMenuAction}
                    visible={functionMenu}
                    onBackdropPress={toggleFunctionMenu}>
                    <MenuItem
                      accessoryLeft={RenderPeopleIcon}
                      title={t('class_details:list_students')}
                      onPress={handleGoStudents} />
                  </OverflowMenu>
                }
              />
              <View style={cStyles.px16}>
                <CText style={styles.text_white} category={'s1'} numberOfLines={1}>{dataClass.label}</CText>
                <View style={[cStyles.row, cStyles.itemsEnd, cStyles.mt12]}>
                  {dataClass.subjects.map((item, index) => {
                    return (
                      <CText
                        key={item + index}
                        style={[cStyles.mt5, styles.text_white]}
                        category={'p1'}
                        numberOfLines={1}>&#10041; {item}  </CText>
                    );
                  })}
                </View>

                <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt24]}>
                  <View style={[cStyles.row, cStyles.itemsCenter]}>
                    {dataClass.members.map((item, index) => {
                      return (
                        <View
                          key={item.id}
                          style={[
                            cStyles.abs,
                            cStyles.rounded5,
                            cStyles.p1,
                            styles.bg_mini_avatar,
                            {left: moderateScale(20) * index}
                          ]}>
                          <FastImage
                            style={[cStyles.center, cStyles.rounded5, styles.mini_avatar]}
                            source={{
                              uri: item.avatar,
                              priority: FastImage.priority.high,
                              cache: FastImage.cacheControl.immutable,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                          />
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
                          {backgroundColor: theme['color-primary-500']}
                        ]}>
                        <CText style={{color: 'white'}} category={'c2'}>+{dataClass.numMember - 2}</CText>
                      </Layout>
                    </View>

                    <CText style={styles.txt_num_member} category={'c1'}>
                      {`${dataClass.numMember} ${t('classses:members')}`}
                    </CText>
                  </View>

                  {dataClass.assignment > 0 && (
                    <Button
                      appearance={'filled'}
                      status={'warning'}
                      size={'tiny'}
                      accessoryRight={evaProps => (
                        <Icon
                          {...evaProps}
                          ref={infiniteAnimationIconRef}
                          animation='pulse'
                          name='star'
                        />
                      )}>
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
          {marginTop: heightBanner},
        ]}
        level={'1'}>
        <ButtonGroup appearance={'ghost'} status={'primary'}>
          <Button
            style={styles.btn_action}
            disabled={loading}
            accessoryLeft={RenderMenuActionsIcon}
            onPress={toggleAlertMenu}>
            {t('class_details:menu')}
          </Button>
          <Button
            style={styles.btn_action}
            disabled={loading}
            accessoryLeft={RenderAddPostIcon}
            onPress={handleGoAddPost}>
            {t('class_details:add_post')}
          </Button>
        </ButtonGroup>
      </Layout>

      <Divider />

      {/** Posts of class */}
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          contentContainerStyle={[cStyles.pt10, cStyles.px10]}
          data={posts}
          renderItem={info => {
            return (
              <Card
                disabled
                header={(propsH) => (
                  <ListItem
                    title={evaProps =>
                      <CText style={cStyles.ml10} category={'label'}>{info.item.author}</CText>
                    }
                    description={evaProps =>
                      <CText style={cStyles.ml10} category={'c1'} appearance='hint'>
                        {info.item.createdAt + ' . At ' + info.item.createdWhere}
                      </CText>
                    }
                    accessoryLeft={() => RenderHeaderPost(info)}
                  />
                )}
                footer={(propsF) => (
                  <Layout style={[cStyles.flex1, cStyles.p10]} level={'1'}>
                    <ButtonGroup size={'small'} status={'basic'} appearance={'ghost'}>
                      <Button
                        style={styles.btn_action}
                        accessoryLeft={info.item.isLiked ? RenderLikedIcon : RenderLikeIcon}>
                        {evaProps => (
                          <CText
                            style={cStyles.ml5}
                            status={info.item.isLiked ? 'primary' : 'basic'}
                            category={'p1'}>
                            {t(info.item.isLiked ? 'class_details:liked' : 'class_details:like')}
                          </CText>
                        )}
                      </Button>
                      <Button
                        style={styles.btn_action}
                        accessoryLeft={RenderCommentIcon}>
                          {evaProps => (
                            <CText style={cStyles.ml5} status={'basic'} category={'p1'}>
                              {t('class_details:comment')}
                            </CText>
                          )}
                      </Button>
                    </ButtonGroup>
                    
                    <List
                      style={{backgroundColor: theme['background-basic-color-1']}}
                      data={info.item.comments}
                      renderItem={infoCmt => {
                        return (
                          <ListItem
                            style={[
                              cStyles.rounded1,
                              cStyles.px10,
                              cStyles.mt10,
                              {backgroundColor: theme['background-basic-color-3']},
                            ]}
                            title={evaProps => (
                              <View style={[cStyles.ml10, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                                <CText style={cStyles.textLeft} category={'label'}>{infoCmt.item.name}</CText>
                                <CText style={cStyles.textRight} category={'c1'} appearance='hint'>{infoCmt.item.createdAt}</CText>
                              </View>
                            )}
                            description={evaProps =>
                              <CText style={[cStyles.ml10, cStyles.mt5]} category={'p1'}>
                                {infoCmt.item.caption}
                              </CText>
                            }
                            accessoryLeft={() => RenderHeaderComment(infoCmt)}
                          />
                        );
                      }}
                      keyExtractor={(item, index) => item.id + index}
                    />
                  </Layout>
                )}>
                <View style={styles.bg_content_card}>
                  <View style={[cStyles.px10, cStyles.py16]}>
                    <CText category={'p1'}>{info.item.caption}</CText>
                  </View>
                  <CPostImages
                    images={info.item.images}
                  />
                  {info.item.numLike > 0 && (
                    <View style={[cStyles.px10, cStyles.py10, cStyles.row, cStyles.itemsCenter]}>
                      <IoniIcon
                        name={'heart'}
                        color={colors.PRIMARY}
                        size={moderateScale(16)}
                      />
                      <CText style={cStyles.ml5} category={'p1'}>{`${info.item.numLike}`}</CText>
                    </View>
                  )}
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
        onBackdropPress={undefined}
      >
        <Layout level={'1'}>
          <View style={[cStyles.row, cStyles.itemsCenter, {borderBottomColor: theme['border-basic-color-3'], borderBottomWidth: 1}]}>
            <TouchableNativeFeedback onPress={handleGoAssignment}>
              <Layout style={[styles.con_menu, {borderRightColor: theme['border-basic-color-3'], borderRightWidth: 1}]} level={'1'}>
                {RenderMenuIcon(t('class_details:assignment'), 'document-outline', 'green')}
              </Layout>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={handleGoQuiz}>
              <Layout style={styles.con_menu} level={'1'}>
                {RenderMenuIcon(t('class_details:quiz'), 'create-outline', 'indigo')}
              </Layout>
            </TouchableNativeFeedback>
          </View>
          <View style={[cStyles.row, cStyles.itemsCenter]}>
            <TouchableNativeFeedback onPress={handleGoQuestions}>
              <Layout style={[styles.con_menu, {borderRightColor: theme['border-basic-color-3'], borderRightWidth: 1}]} level={'1'}>
                {RenderMenuIcon(t('class_details:questions'), 'help-circle-outline', 'hotpink')}
              </Layout>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback onPress={handleGoTeachingMaterial}>
              <Layout style={styles.con_menu} level={'1'}>
                {RenderMenuIcon(t('class_details:teaching_material'), 'document-attach-outline', 'darkturquoise')}
              </Layout>
            </TouchableNativeFeedback>
          </View>
        </Layout>

        <View style={[cStyles.center, cStyles.mt24]}>
          <Button
            appearance={'ghost'}
            status={'basic'}
            accessoryLeft={RenderCloseIcon}
            onPress={toggleAlertMenu}
          />
        </View>
      </Modal>

      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  img_background: {
    zIndex: 1,
  },
  img_content_card: {
    height: moderateScale(200),
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
  bg_mini_avatar: {
    backgroundColor: colors.BLACK,
  },
  mini_avatar: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  bg_num_member: {
    left: moderateScale(40),
    backgroundColor: colors.BLACK,
  },
  txt_num_member: {
    color: colors.WHITE,
    marginLeft: moderateScale(76),
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
