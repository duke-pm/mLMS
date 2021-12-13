/**
 ** Name: Post details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Input, Layout, List, ListItem, Button, useTheme,
} from '@ui-kitten/components';
import {KeyboardAvoidingView, View, ScrollView, StyleSheet} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import COverflowMenu from '~/components/COverflowMenu';
import CPostImages from '~/components/CPostImages';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
import CIcon from '~/components/CIcon';
/* COMMON */
import {cStyles} from '~/utils/style';
import {IS_ANDROID, IS_IOS, moderateScale} from '~/utils/helper';
/* REDUX */

const mockupPost = {
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
};
const pAddingKeyboard = ifIphoneX(moderateScale(100), moderateScale(78));

/********************
 ** MAIN COMPONENT **
 ********************/
function PostDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(mockupPost);
  const [valueText, setValueText] = useState('');

  /*****************
   ** HANDLE FUNC **
   *****************/
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
          style={[
            IS_ANDROID && cStyles.shadowListItem,
            IS_IOS && cStyles.borderBottom,
          ]}
          title={'post_details:title'}
          back
          customRightComponent={
            <COverflowMenu
              menus={[
                {
                  id: 'menuShare',
                  icon: 'share-outline',
                  label: 'post_details:share',
                  onPress: handleShare,
                },
                {
                  id: 'menuReport',
                  icon: 'alert-triangle-outline',
                  label: 'post_details:report',
                  onPress: handleReport,
                },
              ]}
            />
          } />
      }>
      <KeyboardAvoidingView
        style={cStyles.flex1}
        behavior={IS_IOS ? 'padding' : undefined}
        keyboardVerticalOffset={pAddingKeyboard}>
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
                accessoryLeft={<CAvatar source={{uri: post.avatar}} />}
              />

              <Layout style={[cStyles.flex1, cStyles.px10]}>
                <View style={[cStyles.py16, cStyles.pt0]}>
                  <CText >{post.caption}</CText>
                </View>
                {post.images.length > 0 && <CPostImages images={post.images} />}
                <View style={[cStyles.row, cStyles.itemsCenter, cStyles.my5]}>
                  <Button
                    appearance={'ghost'}
                    status={post.isLiked ? 'primary' : 'basic'}
                    size={'small'}
                    accessoryLeft={propsI => post.isLiked
                      ? CIcon(propsI, 'eva', 'heart', theme['color-primary-500'])
                      : CIcon(propsI, 'eva', 'heart')
                    }
                    onPress={handleLike}>
                    {post.numLike}
                  </Button>
                  <Button
                    style={cStyles.ml10}
                    appearance={'ghost'}
                    status={'basic'}
                    size={'small'}
                    accessoryLeft={propsI => CIcon(propsI, 'eva', 'message-square')}>
                    {post.comments.length}
                  </Button>
                </View>
              </Layout>

              <Layout style={[cStyles.flex1, cStyles.p10]}>
                {/** List of comment */}
                <List
                  style={{backgroundColor: theme['background-basic-color-1']}}
                  scrollEnabled={false}
                  data={post.comments}
                  renderItem={infoCmt => {
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
                          <CText style={[cStyles.ml10, cStyles.mt5]} >
                            {infoCmt.item.caption}
                          </CText>
                        }
                        accessoryLeft={<CAvatar source={{uri: infoCmt.item.avatar}} />}
                      />
                    );
                  }}
                  keyExtractor={(item, index) => item.id + index}
                />
              </Layout>
            </Layout>
          </ScrollView>

          <Layout style={[cStyles.row, cStyles.itemsCenter]}>
            <Button
              style={[cStyles.px0, cStyles.mr10]}
              appearance={'ghost'}
              accessoryLeft={propsI => CIcon(propsI, 'eva', 'image')}
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
              accessoryLeft={propsI => CIcon(propsI, 'eva', 'paper-plane')}
              onPress={handleSendMessage}
            />
          </Layout>
        </View>
      </KeyboardAvoidingView>

      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
});


export default PostDetails;
