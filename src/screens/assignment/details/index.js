/**
 ** Name: Assignment details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Layout, Divider, Button, List, useTheme, Card, Avatar, Input,
} from '@ui-kitten/components';
import {Keyboard, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import StarRating from 'react-native-star-rating';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
import CAlert from '~/components/CAlert';
import AttachedFile from '../components/AttachedFile';
/* COMMON */
import Assets from '~/utils/asset/Assets';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
import CAvatar from '~/components/CAvatar';
/* REDUX */

/** All init */
const sIconEmpty = moderateScale(30);
const sStarReview = moderateScale(30);

function AssignmentDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataExercise = route.params.data;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({
    show: false,
    answer: null,
    rate: 0,
    message: '',
  });
  const [resultReview, setResultReview] = useState({
    status: false,
    message: '',
  });

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleShowReview = info => {
    setResultReview({status: false, message: ''});
    setReview({
      show: !review.show,
      answer: info,
      rate: 0,
      message: '',
    });
  };

  const handleDownloadFile = (idxFile, infoFile) => {
  
  };

  const handleDownloadForReview = (file) => {

  };

  const handleReview = (info) => {
    if (resultReview.message === '') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setReview({
          ...review,
          rate: 0,
          answer: info,
        });
        let tmp = Math.random();
        if (tmp > 0.5) {
          setResultReview({
            status: true,
            message: 'assignment_details:msg_review_success',
          });
        } else {
          setResultReview({
            status: false,
            message: 'assignment_details:msg_review_error',
          });
        }
      }, 1000);
    } else {
      toggleShowReview(null);
    }
  };

  const handleRatingAnswer = rating => {
    setReview({...review, rate: rating});
  };

  /**********
   ** FUNC **
   **********/
  const onChangeTextReview = value => {
    setReview({...review, message: value});
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (review.answer && !review.show) {
      setReview({...review, show: true});
    }
  }, [review.answer, review.show]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation title={'assignment_details:title'} back />
      }>
      {/** Content of page */}
      <ScrollView style={cStyles.flex1}>
        <Layout style={cStyles.p10} >
          <CText category={'label'}>{dataExercise.label}</CText>
          <CText style={cStyles.mt10} >{dataExercise.description}</CText>
          {dataExercise.attachedFiles.length > 0 &&
            <Divider style={[cStyles.mx40, cStyles.my10]} />
          }
          {dataExercise.attachedFiles.length > 0 &&
            <AttachedFile
              containerStyle={cStyles.mt16}
              files={dataExercise.attachedFiles}
              download
            />
          }

          <Divider style={cStyles.my10} />

          <Layout style={cStyles.py10}>
            {dataExercise.userCompleted && (
              <CText category={'label'}>
                {`${dataExercise.userCompleted.length} ${t('assignment_details:user_completed')}`}
              </CText>
            )}
            {dataExercise.groupCompleted && (
              <CText category={'label'}>
                {`${dataExercise.groupCompleted.length} ${t('assignment_details:group_completed')}`}
              </CText>
            )}
          </Layout>
        </Layout>

        {dataExercise.userCompleted && (
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.p10}
            scrollEnabled={false}
            data={dataExercise.userCompleted}
            renderItem={info => {
              /** Check ext file */
              let tmpExt = null;
              if (info.item.attachedFiles) {
                tmpExt = Assets[info.item.attachedFiles.type];
                if (!tmpExt) tmpExt = Assets.file;
              }
              /** Check review */
              let statusReview = null;
              if (info.item.review) {
                statusReview = {
                  status: info.item.review > 2 && info.item.review < 4
                    ? 'warning' 
                    : info.item.review >= 4 
                      ? 'success' 
                      : 'danger',
                  score: info.item.review,
                  message: info.item.msgReview,
                };
              }

              return (
                <Card disabled>
                  <View style={[cStyles.row, cStyles.itemsCenter, styles.bg_content_card]}>
                    <View style={[cStyles.center, cStyles.p10]}>
                    {tmpExt && 
                      <>
                        <FastImage
                          style={styles.img_file}
                          source={tmpExt}
                          resizeMode={'contain'}
                        />
                        <CText category={'c1'} appearance={'hint'}>{info.item.attachedFiles.size} Mb</CText>
                      </>
                    }
                    {!tmpExt && 
                      <IoniIcon
                        name='alert-circle-outline'
                        size={sIconEmpty}
                        color={theme['color-basic-600']} />
                    }
                    </View>
                    <View style={[cStyles.flex1, cStyles.borderLeft, cStyles.p10, {borderLeftColor: theme['border-basic-color-2']}]}>
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                        <CText>{tmpExt ? info.item.attachedFiles.name : 'Empty file!!!'}</CText>
                        <CText category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                      </View>
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt5]}>
                        <Avatar style={cStyles.mt5} source={{uri: info.item.avatar}} size={'small'} />
                        <View style={[cStyles.row, cStyles.itemsCenter]}>
                          {tmpExt && 
                            <Button
                              size={'tiny'}
                              appearance={'outline'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download', theme['color-primary-500'])}
                              onPress={() => handleDownloadForReview(info.item.attachedFiles)} />
                          }
                          <Button
                            style={cStyles.ml5}
                            size={'tiny'}
                            appearance={(statusReview && statusReview.status) ? 'outline' : 'filled' }
                            status={(statusReview && statusReview.status) || 'primary'}
                            onPress={() => toggleShowReview(info.item)}>
                            {statusReview ? statusReview.score * 20 + '%' : t('assignment_details:review')}
                          </Button>
                        </View>
                      </View>
                      {info.item.msgReview &&
                        <View style={cStyles.mt10}>
                          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.my5]}>
                            <Divider style={[cStyles.flex1, {backgroundColor: theme['border-basic-color-2']}]} />
                            <CText style={cStyles.mx10} category='c1' appearance='hint'>{t('assignment_details:holder_review_from_teacher')}</CText>
                            <Divider style={[cStyles.flex1, {backgroundColor: theme['border-basic-color-2']}]} />
                          </View>
                          <View style={[cStyles.row, cStyles.itemsStart]}>
                            <Layout style={[cStyles.flex1, cStyles.rounded1, cStyles.mr10]}>
                              <CText style={cStyles.textItalic} category='p1' maxLines={3}>{info.item.msgReview}</CText>
                            </Layout>
                            <CAvatar size='tiny' source={{uri: 'http://react-material.fusetheme.com/assets/images/avatars/Tyson.jpg'}} />
                          </View>
                        </View>
                      }
                    </View>
                  </View>
                </Card>
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.my5} />}
          />
        )}
        {dataExercise.groupCompleted && (
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.px10}
            scrollEnabled={false}
            data={dataExercise.groupCompleted}
            renderItem={info => {
              /** Check ext file */
              let tmpExt = null;
              if (info.item.attachedFiles) {
                tmpExt = Assets[info.item.attachedFiles.type];
                if (!tmpExt) tmpExt = Assets.file;
              }
              /** Check review */
              let statusReview = null;
              if (info.item.review) {
                statusReview = {
                  status: info.item.review > 2 && info.item.review < 4
                    ? 'warning' 
                    : info.item.review >= 4 
                      ? 'success' 
                      : 'danger',
                  score: info.item.review,
                  message: info.item.msgReview,
                };
              }

              return (
                <Card disabled>
                  <View style={[cStyles.row, cStyles.itemsCenter, styles.bg_content_card]}>
                    <View style={[cStyles.center, cStyles.p10]}>
                    {tmpExt && 
                      <>
                        <FastImage
                          style={styles.img_file}
                          source={tmpExt}
                          resizeMode={'contain'}
                        />
                        <CText category={'c1'} appearance={'hint'}>{info.item.attachedFiles.size} Mb</CText>
                      </>
                    }
                    {!tmpExt && 
                      <IoniIcon
                        name='alert-circle-outline'
                        size={sIconEmpty}
                        color={theme['color-basic-600']} />
                    }
                    </View>
                    <View style={[cStyles.flex1, cStyles.borderLeft, cStyles.p10, {borderLeftColor: theme['border-basic-color-2']}]}>
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                        <CText>{tmpExt ? info.item.attachedFiles.name : 'Empty file!!!'}</CText>
                        <CText category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                      </View>
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt5]}>
                        <View style={[cStyles.row, cStyles.itemsCenter]}>
                          {info.item.avatar.map((item, index) => {
                            if (index === 2) {
                              return (
                                <View key={item + '_' + index}
                                  style={[
                                    cStyles.rounded7,
                                    cStyles.center,
                                    styles.holder_more_avatar, 
                                    {backgroundColor: theme['background-basic-color-3']},
                                  ]}>
                                  <CText >+{info.item.avatar.length - 2}</CText>
                                </View>
                              )
                            } else if (index < 2) {
                              return <Avatar key={item + '_' + index} style={cStyles.mr5} source={{uri: item}} size={'small'} />
                            } else {
                              return null;
                            }
                          })}
                        </View>
                        <View style={[cStyles.row, cStyles.itemsCenter]}>
                          {tmpExt && 
                            <Button
                              size={'tiny'}
                              appearance={'outline'}
                              accessoryLeft={propsI => CIcon(propsI, 'eva', 'download', theme['color-primary-500'])}
                              onPress={() => handleDownloadForReview(info.item.attachedFiles)} />
                          }
                          <Button
                            style={cStyles.ml5}
                            size={'tiny'}
                            appearance={(statusReview && statusReview.status) ? 'outline' : 'filled' }
                            status={(statusReview && statusReview.status) || 'primary'}
                            onPress={() => toggleShowReview(info.item)}>
                            {statusReview ? statusReview.score * 20 + '%' : t('assignment_details:review')}
                          </Button>
                        </View>
                      </View>
                      {info.item.msgReview &&
                        <View style={cStyles.mt10}>
                          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.my5]}>
                            <Divider style={[cStyles.flex1, {backgroundColor: theme['border-basic-color-2']}]} />
                            <CText style={cStyles.mx10} category='c1' appearance='hint'>{t('assignment_details:holder_review_from_teacher')}</CText>
                            <Divider style={[cStyles.flex1, {backgroundColor: theme['border-basic-color-2']}]} />
                          </View>
                          <View style={[cStyles.row, cStyles.itemsStart]}>
                            <Layout style={[cStyles.flex1, cStyles.rounded1, cStyles.mr10]}>
                              <CText style={cStyles.textItalic} category='p1' maxLines={3}>{info.item.msgReview}</CText>
                            </Layout>
                            <CAvatar size='tiny' source={{uri: 'http://react-material.fusetheme.com/assets/images/avatars/Tyson.jpg'}} />
                          </View>
                        </View>
                      }
                    </View>
                  </View>
                </Card>
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.my5} />}
          />
        )}
      </ScrollView>

      {/** Loading of page */}
      <CLoading show={loading} />

      {/** Review answers */}
      <CAlert
        show={review.show}
        loading={loading}
        cancel={resultReview.message === ''}
        success={resultReview.message !== '' ? resultReview.status === true : undefined}
        error={resultReview.message !== '' ? resultReview.status === false : undefined}
        label={review.answer
          ? `${t('assignment_details:review_this_answer')} ${review.answer.name}`
          : undefined
        }
        customMessage={
          resultReview.message === ''
           ? (
            <View style={cStyles.center}>
              <StarRating
                buttonStyle={cStyles.mx5}
                animation='tada'
                starSize={sStarReview}
                fullStarColor={theme['color-warning-500']}
                rating={review.rate}
                selectedStar={handleRatingAnswer}
              />

              <CText style={cStyles.mt5} category='p1'>{`${review.rate}/5`}</CText>

              <Input
                style={cStyles.mt10}
                renderToHardwareTextureAndroid={true}
                multiline
                value={review.message}
                placeholder={t('assignment_details:holder_review')}
                onChangeText={onChangeTextReview}
              />
            </View>
           )
           : (
             <View style={cStyles.center}>
               <CText style={cStyles.mt5} category='p1'>
                 {t(resultReview.message)}
                </CText>
             </View>
           )
        }
        onBackdrop={Keyboard.dismiss}
        onCancel={() => toggleShowReview(null)}
        onOk={handleReview}
      />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -24,
    marginVertical: -16,
  },
  holder_more_avatar: {
    height: moderateScale(31),
    width: moderateScale(31),
  },
  img_file: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
});

export default AssignmentDetails;
