/**
 ** Name: Post details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Input, Layout, List, ListItem, Button, useTheme, Icon, TopNavigationAction, OverflowMenu, MenuItem} from '@ui-kitten/components';
import {KeyboardAvoidingView, View, ScrollView, StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CAvatar from '~/components/CAvatar';
import CPostImages from '~/components/CPostImages';
/* COMMON */
import {colors, cStyles} from '~/utils/style';
import {IS_IOS, moderateScale} from '~/utils/helper';
/* REDUX */

const RenderLikeIcon = props => (
  <Icon {...props} name='heart-outline' />
);

const RenderLikedIcon = props => (
  <Icon {...props} name='heart' />
);

const RenderCommentIcon = props => (
  <Icon {...props} name='message-circle-outline' />
);

const RenderPhotoIcon = props => (
  <Icon {...props} name={'image-outline'} />
);

const RenderSendIcon = props => (
  <Icon {...props} name={'paper-plane-outline'} />
);

const MenuIcon = props => (
  <Icon {...props} name={'more-vertical-outline'} />
);

const RenderShareIcon = props => (
  <Icon {...props} name='share-outline' />
);

const RenderReportIcon = props => (
  <Icon {...props} name='alert-triangle-outline' />
);

const RenderMenuAction = (toggleFunctionMenu) => (
  <TopNavigationAction icon={MenuIcon} onPress={toggleFunctionMenu}/>
);

const RenderLeftHeaderPost = (info) => (
  <CAvatar source={{uri: info.avatar}} />
);

const RenderHeaderComment = (info) => (
  <CAvatar source={{uri: info.item.avatar}} />
);

function PostDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [functionMenu, setFunctionMenu] = useState(false);
  const [post, setPost] = useState(
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
    }
  );
  const [valueText, setValueText] = useState('');

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleFunctionMenu = () => {
    setFunctionMenu(!functionMenu);
  };

  const handleLike = () => {
    let tmpPost = {...post};
    if (tmpPost.isLiked) {
      tmpPost.numLike = tmpPost.numLike - 1;
    } else {
      tmpPost.numLike = tmpPost.numLike + 1;
    }
    tmpPost.isLiked = !tmpPost.isLiked;
    setPost(tmpPost);
  };

  const handleChooseFile = () => {
  
  };

  const handleChoosePhoto = () => {
  
  };

  const handleSendMessage = () => {
  
  };

  const handleMenu = (info) => {
    
  };

  const handleShare = () => {
  
  };

  const handleReport = () => {
  
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
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      backgroundColor={theme['background-basic-color-1']}
      headerComponent={
        <CTopNavigation
          title={'post_details:title'}
          back
        />
      }>
      <KeyboardAvoidingView
        style={cStyles.flex1}
        behavior={IS_IOS ? 'padding' : undefined}
        keyboardVerticalOffset={ifIphoneX(moderateScale(100), moderateScale(78))}>
        <View style={cStyles.flex1}>
          <ScrollView style={cStyles.flex1}>
            <Layout style={cStyles.flex1}>
              <ListItem
                disabled
                title={evaProps =>
                  <CText style={cStyles.ml10} category={'label'}>{post.author}</CText>
                }
                description={evaProps =>
                  <CText style={cStyles.ml10} category={'c1'} appearance='hint'>
                    {post.createdAt + ' . At ' + post.createdWhere}
                  </CText>
                }
                accessoryLeft={RenderLeftHeaderPost(post)}
                accessoryRight={() => (
                  <OverflowMenu
                    anchor={() => RenderMenuAction(toggleFunctionMenu)}
                    backdropStyle={styles.backdrop}
                    visible={functionMenu}
                    onBackdropPress={toggleFunctionMenu}>
                    <MenuItem
                      accessoryLeft={RenderShareIcon}
                      title={t('post_details:share')}
                      onPress={handleShare} />
                    <MenuItem
                      accessoryLeft={RenderReportIcon}
                      title={t('post_details:report')}
                      onPress={handleReport} />
                  </OverflowMenu>
                )}
              />

              <Layout style={[cStyles.flex1, cStyles.px10]}>
                <View style={[cStyles.py16, cStyles.pt0]}>
                  <CText category={'p1'}>{post.caption}</CText>
                </View>
                {post.images.length > 0 && <CPostImages images={post.images} />}
                <View style={[cStyles.row, cStyles.itemsCenter, cStyles.my5]}>
                  <Button
                    appearance={'ghost'}
                    status={post.isLiked ? 'primary' : 'basic'}
                    size={'small'}
                    accessoryLeft={post.isLiked ? RenderLikedIcon : RenderLikeIcon}
                    onPress={handleLike}>
                    {post.numLike}
                  </Button>
                  <Button
                    style={cStyles.ml10}
                    appearance={'ghost'}
                    status={'basic'}
                    size={'small'}
                    accessoryLeft={RenderCommentIcon}>
                    {post.comments.length}
                  </Button>
                </View>
              </Layout>

              <Layout style={[cStyles.flex1, cStyles.p10]} level={'1'}>
                {/** List of comment */}
                <List
                  style={{backgroundColor: theme['background-basic-color-1']}}
                  scrollEnabled={false}
                  data={post.comments}
                  renderItem={infoCmt => {
                    // if (infoCmt.index > 1) return null;
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
            </Layout>
          </ScrollView>

          <Layout style={[cStyles.row, cStyles.itemsCenter]} level={'1'}>
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
              placeholder={t('conversation_details:holder_write_something')}
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
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
});


export default PostDetails;
