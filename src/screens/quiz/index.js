/**
 ** Name: Quiz screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, List, Card, Button, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
/* REDUX */

const mockupDataCategories = [
  {
    id: 1,
    label: 'common:all',
  },
  {
    id: 2,
    label: 'Flutter',
  },
  {
    id: 3,
    label: '.NET',
  },
  {
    id: 4,
    label: 'Python',
  },
  {
    id: 5,
    label: 'Java',
  },
  {
    id: 6,
    label: 'JavaScript',
  },
  {
    id: 7,
    label: 'Swift',
  },
  {
    id: 8,
    label: 'C',
  },
  {
    id: 9,
    label: 'C++',
  },
  {
    id: 10,
    label: 'C#',
  }
];
const mockupLevel = [
  {
    id: 1,
    label: 'common:easy',
  },
  {
    id: 2,
    label: 'common:medium',
  },
  {
    id: 3,
    label: 'common:hard',
  },
  {
    id: 4,
    label: 'common:very_hard',
  },
];
const mockupCountQuestions = [
  {
    id: 1,
    label: '10',
  },
  {
    id: 2,
    label: '20',
  },
  {
    id: 3,
    label: '30',
  },
];
const mockupData = [
  {
    id: '1',
    label: 'Lorem ipsum dolor sit amet Consectetur adipiscing elit Non tellus orci ac auctor augue',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    subjects: ['Literature', 'Math', 'English'],
    numQuestions: 15,
    numParticipants: 20,
    timeout: 80,
    createdDateAt: '05/11/2021',
    createdTimeAt: '17:00',
    score: 95,
  },
];

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
    <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.py10, cStyles.px16]}>
      <View>
        <CText>{info.item.numQuestions}</CText>
        <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('quiz:questions')}</CText>
      </View>
      <View>
        <CText>{info.item.timeout} {t('common:minutes')}</CText>
        <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('quiz:durations')}</CText>
      </View>
      <View>
        <CText>{moment(info.item.createdDateAt, 'DD/MM/YYYY').format('DD MMM YY')}</CText>
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
  const [quizs, setQuizs] = useState(mockupData);
  const [categories, setCategories] = useState(mockupDataCategories);
  
  /*****************
   ** HANDLE FUNC **
   *****************/
  const handlePlayQuiz = info => {
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
          title={'quiz:title'}
          borderBottom
          back
          search />
      }>
      <View style={[cStyles.row, cStyles.itemsCenter, ]}>

      </View>

      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          contentContainerStyle={cStyles.p10}
          data={quizs}
          renderItem={info => {
            return (
              <Card
                header={(propsH) => (
                  <View style={[cStyles.py10, cStyles.px16]}>
                    <CText category={'label'} numberOfLines={2}>
                      {`${t('quiz:quiz_number')}${info.item.id} - ${info.item.label}`}
                    </CText>
                    <View style={[cStyles.row, cStyles.itemsCenter, cStyles.mt5]}>
                      {info.item.subjects.map((item, index) => <CText>&#10019; {item}  </CText>)}
                    </View>
                  </View>
                )}
                footer={propsF => RenderFooterQuiz(propsF, info)}
                onPress={() => handlePlayQuiz(info.item)}>
                <View style={styles.bg_content_card}>
                  <CText>{info.item.description}</CText>
                </View>
              </Card>
            )
          }}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => <View style={cStyles.my5} />}
        />
      )}
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -8,
    marginVertical: -6,
  }
});

export default Quiz;
