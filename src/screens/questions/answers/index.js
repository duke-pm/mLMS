/**
 ** Name: Question's Answers screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {TopNavigationAction, List, Button, useTheme} from '@ui-kitten/components';
import {View} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import AnswerItem from '../components/AnswerItem';
/* COMMON */
import {cStyles} from '~/utils/style';
import Routes from '~/navigator/Routes';
/* REDUX */

const RenderRightHeader = (handleAddAnswer) => (
  <TopNavigationAction
    icon={RenderAnswerText}
    onPress={handleAddAnswer}
  />
);

function QuestionAnswers(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataAnswers = route.params.data;

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleAddAnswer = () => {
    navigation.navigate(Routes.ADD_ANSWERS.name);
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
      safeArea={['top']}
      headerComponent={
        <CTopNavigation
          title={'question_answers:title'}
          back />
      }>
      <List
        style={{backgroundColor: theme['background-basic-color-3']}}
        contentContainerStyle={cStyles.py10}
        data={dataAnswers}
        renderItem={info => {
          return <AnswerItem data={info.item} />;
        }}
        keyExtractor={(item, index) => item.id + index}
        ItemSeparatorComponent={() => <View style={cStyles.my5} />}
      />
      <Button style={[isIphoneX() && cStyles.pb36, cStyles.rounded0]} onPress={handleAddAnswer}>
        {t('question_details:add_answer')}
      </Button>
    </CContainer>
  );
}

export default QuestionAnswers;
