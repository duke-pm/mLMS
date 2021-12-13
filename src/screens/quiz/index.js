/**
 ** Name: Quiz screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, List, Card, Button, Divider, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CLoading from '~/components/CLoading';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
/* REDUX */


const RenderFooterQuiz = (propsF, info) => {
  const {t} = useTranslation();
  let status = '';
  if (info.item.score) {
    if (info.item.score > 80 ) {
      status = 'success';
    } else if (info.item.score >= 50 ) {
      status = 'info';
    } else {
      status = 'danger';
    }
  } else {
    status = 'basic';
  }
  return (
    <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p10]}>
      <View>
        <CText >{info.item.numQuestions}</CText>
        <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('quiz:questions')}</CText>
      </View>
      <View>
        <CText >{info.item.timeout} {t('common:minutes')}</CText>
        <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('quiz:durations')}</CText>
      </View>
      <View>
        <CText >{info.item.createdDateAt}</CText>
        <CText style={cStyles.mt5} >{info.item.createdTimeAt}</CText>
      </View>
      {info.item.score && (
        <Button
          appearance={'outline'}
          size={'tiny'}
          status={status}
        >{info.item.score + '%'}</Button>
      )}
      {!info.item.score && (
        <Button
          appearance={'outline'}
          size={'tiny'}
          status={status}
        >{t('quiz:not_do_test')}</Button>
      )}
    </View>
  )
};

function Quiz(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [quizs, setQuizs] = useState([]);
  
  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleAddQuiz = () => {
    console.log('[LOG] === handleAddQuiz ===> ');
  };
  
  const handlePlayQuiz = info => {
    console.log('[LOG] === handlePlayQuiz ===> ');
    navigation.navigate(Routes.QUIZ_DETAILS.name, {
      data: info,
    });
  };
  
  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    let tmpQuizs = [
      {
        id: '1',
        label: 'Lorem ipsum dolor sit amet Consectetur adipiscing elit Non tellus orci ac auctor augue',
        subjects: ['Math', 'Physics', 'Chemistry'],
        numQuestions: 10,
        numParticipants: 10,
        timeout: 60,
        createdDateAt: '12/12/2021',
        createdTimeAt: '08:00',
        score: null,
      },
      {
        id: '2',
        label: 'Consectetur adipiscing elit',
        subjects: ['Math', 'Literature', 'English'],
        numQuestions: 18,
        numParticipants: 10,
        timeout: 120,
        createdDateAt: '01/12/2021',
        createdTimeAt: '10:00',
        score: 40,
      },
      {
        id: '3',
        label: 'Volutpat odio facilisis mauris',
        subjects: ['Literature', 'History', 'Geography'],
        numQuestions: 12,
        numParticipants: 34,
        timeout: 70,
        createdDateAt: '27/11/2021',
        createdTimeAt: '13:00',
        score: 50,
      },
      {
        id: '4',
        label: 'Non tellus orci ac auctor augue',
        subjects: ['Literature', 'History', 'Geography'],
        numQuestions: 13,
        numParticipants: 24,
        timeout: 70,
        createdDateAt: '10/11/2021',
        createdTimeAt: '14:00',
        score: null,
      },
      {
        id: '5',
        label: 'Egestas integer eget aliquet nibh praesent',
        subjects: ['Literature', 'Math', 'English'],
        numQuestions: 15,
        numParticipants: 20,
        timeout: 80,
        createdDateAt: '05/11/2021',
        createdTimeAt: '17:00',
        score: 95,
      },
    ];
    setQuizs(tmpQuizs);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={'quiz:title'}
          back
          search />
      }>
      <Layout >
        {!loading && (
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.p10}
            data={quizs}
            renderItem={info => {
              return (
                <Card
                  header={(propsH) => (
                    <View style={cStyles.p10}>
                      <CText category={'label'} numberOfLines={2}>
                        {`${t('quiz:quiz_number')}${info.item.id} - ${info.item.label}`}
                      </CText>
                    </View>
                  )}
                  footer={propsF => RenderFooterQuiz(propsF, info)}
                  onPress={() => handlePlayQuiz(info.item)}>
                  <View style={[cStyles.row, cStyles.itemsCenter, styles.bg_content_card]}>
                    {info.item.subjects.map((item, index) => {
                      return (
                        <CText >&#10041; {item}  </CText>
                      )
                    })}
                  </View>
                </Card>
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <View style={cStyles.my5} />}
          />
        )}
        <CLoading show={loading} />
      </Layout>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -14,
    marginVertical: -6,
  }
});

export default Quiz;
