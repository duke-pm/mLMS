/**
 ** Name: Question Details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Button, Divider, Layout, ListItem, useTheme,
} from '@ui-kitten/components';
import {View, ScrollView} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import StarRating from 'react-native-star-rating';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAlert from '~/components/CAlert';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import AnswerItem from '../components/AnswerItem';
/* COMMON */
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
import Routes from '~/navigator/Routes';
/* REDUX */

const RenderLeftHeaderQuestion = (info) => (
  <CAvatar source={{uri: info.avatar}} />
);

const RenderRightHeaderQuestion = (toggle) => {
  const {t} = useTranslation();
  return (
  <Button appearance={'outline'} size={'small'} onPress={toggle}>
    {t('question_details:rate_this')}
  </Button>
)};


function QuestionDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataQuestion = route.params.data;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [showRateQuestion, setShowRateQuestion] = useState(false);
  const [mostVoteAnswers, setMostVoteAnswers] = useState([]);
  const [rateQuestion, setRateQuestion] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleRateQuestion = () => {
    setRateQuestion(0);
    setShowRateQuestion(!showRateQuestion);
  };

  const handleRateQuestion = rating => {
    setRateQuestion(rating);
  };

  const handleAddAnswer = () => {
    navigation.navigate(Routes.ADD_ANSWERS.name);
  };

  const handleSeeAllAnswer = () => {
    navigation.navigate(Routes.QUESTION_ANSWERS.name, {
      data: dataQuestion.answers,
    });
  };

  /**********
   ** FUNC **
   **********/
  const onSetMostVoteAnswer = () => {
    let tmpAnswers = dataQuestion.answers,
      tmpAnswersSort = [];
    if (tmpAnswers.length > 0) {
      tmpAnswers = tmpAnswers.sort((a,b) => a.numRate < b.numRate);
      tmpAnswersSort = tmpAnswers.filter(f => f.rate === tmpAnswers[0].rate);

      setMostVoteAnswers(tmpAnswersSort);
    }
    setLoading(false);
  };

  const onSubmitRateQuestion = () => {
    toggleRateQuestion();
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set the most vote answer */
    onSetMostVoteAnswer();
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={'question_details:title'}
          back />
      }>
      <ScrollView style={cStyles.flex1} contentContainerStyle={cStyles.pb10}>
        <Layout>
          <ListItem
            style={cStyles.px10}
            title={() => <CText style={cStyles.ml10} category={'label'}>{dataQuestion.createdUser}</CText>}
            description={() => <CText style={cStyles.ml10} category={'c1'} appearance='hint'>{dataQuestion.createdAt}</CText>}
            accessoryLeft={() => RenderLeftHeaderQuestion(dataQuestion)}
            accessoryRight={() => RenderRightHeaderQuestion(toggleRateQuestion)}
          />

          <Divider style={cStyles.m10} />

          <View style={cStyles.px10}>
            <CText >{dataQuestion.description}</CText>
          </View>

          <Divider style={cStyles.m10} />

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.px10]}>
            <View style={[cStyles.itemsCenter, {flex: 0.2}]}>
              <CText >{dataQuestion.views}</CText>
              <CText style={cStyles.mt5} category={'c2'}>{t('question_details:views')}</CText>
            </View>
            <View style={[cStyles.itemsCenter, {flex: 0.2}]}>
              <CText >{dataQuestion.answers.length}</CText>
              <CText style={cStyles.mt5} category={'c2'}>{t('question_details:responses')}</CText>
            </View>
            <View style={[cStyles.itemsEnd, {flex: 0.6}]}>
              <StarRating
                disabled
                starSize={moderateScale(18)}
                rating={dataQuestion.rate}
                fullStarColor={theme['color-warning-500']}
              />
              <CText style={cStyles.mt5} category={'c2'}>
                {`${t('question_details:from_rate_1')} ${dataQuestion.numRate} ${t('question_details:from_rate_2')}`}
              </CText>
            </View>
          </View>

          <Divider style={[cStyles.mx10, cStyles.my10]} />

          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.px10]}>
            <CText category={'label'}>{`${t('question_details:most_vote_answers')}`}</CText>
            <Button appearance={'ghost'} size={'small'} status={'basic'} onPress={handleSeeAllAnswer}>
              {evaProps => (
                <CText style={cStyles.textUnderline} category={'c1'} appearance={'hint'}>
                  {`${t('question_details:see_all')}`}
                </CText>
              )}
            </Button>
          </View>

          <Divider style={cStyles.mt5} />
        </Layout>

        {mostVoteAnswers.length > 0 && (
          mostVoteAnswers.map((itemAns, indexAns) => (
            <View style={cStyles.mt10} key={itemAns.id + '_' + indexAns}>
              <AnswerItem data={itemAns} />
            </View>
          ))
        )}
      </ScrollView>

      <Button style={[isIphoneX() && cStyles.pb36, cStyles.rounded0]} onPress={handleAddAnswer}>
        {t('question_details:add_answer')}
      </Button>
      
      <CAlert
        show={showRateQuestion}
        cancel={false}
        label={'question_details:rate_this_question'}
        customMessage={
          <StarRating
            containerStyle={cStyles.px36}
            animation='tada'
            starSize={moderateScale(30)}
            rating={rateQuestion}
            fullStarColor={theme['color-warning-500']}
            selectedStar={handleRateQuestion}
          />
        }
        onBackdrop={toggleRateQuestion}
        onOk={onSubmitRateQuestion}
      />

      <CLoading show={loading} />
    </CContainer>
  );
}

export default QuestionDetails;
