/**
 ** Name: Quiz screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, List, Card, Text, Button} from '@ui-kitten/components';
import {View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CLoading from '~/components/CLoading';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
/* REDUX */


const RenderFooterQuiz = (props, info) => {
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
    <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p16]}>
      <View>
        <Text category={'p1'}>{info.item.numQuestions}</Text>
        <Text style={cStyles.mt5} category={'c2'}>{t('quiz:questions')}</Text>
      </View>
      <View>
        <Text category={'p1'}>{info.item.timeout} {t('common:minutes')}</Text>
        <Text style={cStyles.mt5} category={'c2'}>{t('quiz:durations')}</Text>
      </View>
      <View>
        <Text category={'p1'}>{info.item.createdDateAt}</Text>
        <Text style={cStyles.mt5} category={'p1'}>{info.item.createdTimeAt}</Text>
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
          searchAdd
          onPressAdd={handleAddQuiz} />
      }>
      <Layout level={'1'}>
        {!loading && (
          <List
            contentContainerStyle={cStyles.p10}
            data={quizs}
            renderItem={info => {
              return (
                <Card
                  header={() => (
                    <View style={cStyles.p16}>
                      <Text category={'label'} numberOfLines={2}>
                        {`${t('quiz:quiz_number')}${info.item.id} - ${info.item.label}`}
                      </Text>
                    </View>
                  )}
                  footer={propsF => RenderFooterQuiz(propsF, info)}
                  onPress={() => handlePlayQuiz(info.item)}>
                  <View style={[cStyles.row, cStyles.itemsCenter]}>
                    {info.item.subjects.map((item, index) => {
                      return (
                        <Text category={'p1'}>&#10041; {item}  </Text>
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

export default Quiz;
