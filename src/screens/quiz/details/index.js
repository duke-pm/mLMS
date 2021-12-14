/**
 ** Name: Quiz details screen
 ** Author: IT-team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect, useLayoutEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {Button, Divider, Layout, List, useTheme} from '@ui-kitten/components';
import {StatusBar, StyleSheet, View, Alert} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
/* COMMON */
import Routes from '~/navigator/Routes';
import {IS_ANDROID, sW} from '~/utils/helper';
import {colors, cStyles} from '~/utils/style';
import {ThemeContext} from '~/configs/theme-context';
import {DARK, LIGHT} from '~/configs/constants';
/* REDUX */


function QuizDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation, route} = props;
  const dataQuiz = route.params.data;

  /** use state */
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleTakeThisQuiz = () => {
    console.log('[LOG] === handleTakeThisQuiz ===> ');
    Alert.alert(
      t('common:alert'),
      t('quiz_details:holder_start_this_test'),
      [
        {style: 'cancel', text: t('quiz_details:confirm_start_no'), onPress: () => null},
        {style: 'default', text: t('quiz_details:confirm_start_yes'), onPress: handleGoStart}
      ],
      {cancelable: true},
    );
  };

  const handleReviewThisQuiz = () => {
    navigation.navigate(Routes.QUIZ_REVIEW.name, {
      data: dataQuiz,
    });
  };
  
  const handleGoStart = () => {
    navigation.navigate(Routes.QUIZ_PROCESS.name, {
      data: dataQuiz,
    });
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    IS_ANDROID && StatusBar.setBackgroundColor(theme['color-primary-500'], true);
    let tmpParticipants = [
      {
        id: '1',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
        name: 'Blair Strangeway',
        email: 'blair@withinpixels.com',
        score: 85,
      },
      {
        id: '2',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
        name: 'Boyle Winters',
        email: 'boyle@withinpixels.com',
        score: 'need_review',
      },
      {
        id: '3',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
        name: 'Christy Camacho',
        email: 'christy@withinpixels.com',
        score: 50,
      },
      {
        id: '4',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg',
        name: 'Copeland Redcliff',
        email: 'copeland@withinpixels.com',
        score: 'need_review',
      },
      {
        id: '5',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Harper.jpg',
        name: 'Harper MacGuffin',
        email: 'harper@withinpixels.com',
        score: 65,
      },
      {
        id: '6',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Helen.jpg',
        name: 'Helen Sheridan',
        email: 'helen@withinpixels.com',
        score: 95,
      },
      {
        id: '7',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
        name: 'Henderson Cambias',
        email: 'henderson@withinpixels.com',
        score: 100,
      },
      {
        id: '8',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
        name: 'Josefina Lakefield',
        email: 'josefina@withinpixels.com',
        score: 90,
      },
      {
        id: '9',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Katina.jpg',
        name: 'Katina Bletchley',
        email: 'katina@withinpixels.com',
        score: 'need_review',
      },
      {
        id: '10',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Lily.jpg',
        name: 'Lily Peasegood',
        email: 'lily@withinpixels.com',
        score: 45
      },
    ];
    setParticipants(tmpParticipants);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (themeContext.themeApp === LIGHT) {
        StatusBar.setBarStyle('dark-content', true);
        IS_ANDROID && StatusBar.setBackgroundColor(colors.WHITE, true);
      }
      if (themeContext.themeApp === DARK) {
        StatusBar.setBarStyle('light-content', true);
        IS_ANDROID && StatusBar.setBackgroundColor(colors.BLACK, true);
      }
    }
  }, [themeContext.themeApp]);

  /************
   ** RENDER **
   ************/
  let chkOnTime = moment(dataQuiz.createdDateAt, 'DD/MM/YYYY').diff(moment(), 'days'),
  txtOnTime = '';
  if (chkOnTime < 0 && chkOnTime > -4) {
    txtOnTime = 'ago';
  } else {
    txtOnTime = dataQuiz.createdDateAt + ' - ' + dataQuiz.createdTimeAt;
  }
  return (
    <CContainer
      safeArea={['top']}
      backgroundColor={theme['color-primary-500']}
      headerComponent={
        <Layout style={{backgroundColor: theme['color-primary-500']}}>
          <CTopNavigation
            style={{backgroundColor: theme['color-primary-500']}}
            titleStyle={styles.txt_white}
            iconStyle={styles.txt_white}
            title={'quiz_details:title'}
            back />
          <View style={[cStyles.px10, cStyles.pb16]}>
            <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween]}>
              <View style={[cStyles.mr5, styles.con_title_left]}>
                <CText style={styles.txt_white} category={'label'}>{dataQuiz.label}</CText>
                <View style={[cStyles.flexWrap, cStyles.row, cStyles.itemsCenter, cStyles.mt10]}>
                  {dataQuiz.subjects.map((item, index) => {
                    return (
                      <CText style={cStyles.mt5} status={'control'} >&#10019; {item}  </CText>
                    )
                  })}
                </View>
              </View>
              {!dataQuiz.score && (
                <Button
                  style={[cStyles.ml5, styles.con_title_right]}
                  size={'small'}
                  status={'basic'}
                  onPress={handleTakeThisQuiz}>
                  {t('quiz_details:take_this_quiz')}
                </Button>
              )}
              {dataQuiz.score && (
                <Button
                  style={styles.con_title_right}
                  size={'small'}
                  status={dataQuiz.score >= 80 ? 'success' : dataQuiz.score >= 50 ? 'info' : 'danger'}
                  onPress={handleReviewThisQuiz}>
                  {`${dataQuiz.score}% (${t('quiz_details:review_this_quiz')})`}
                </Button>
              )}
            </View>
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt16]}>
              <CText style={styles.txt_white} >
                {txtOnTime === 'ago'
                ? `${Math.abs(chkOnTime)} ${t('quiz_details:ago')}` 
                : txtOnTime}
              </CText>
              <CText style={styles.txt_white} >
                {`${dataQuiz.numParticipants}/50 ${t('quiz_details:participants')}`}
              </CText>
            </View>
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt16]}>
              <CText style={styles.txt_white} >
                {`${t('quiz_details:durations')}: ${dataQuiz.timeout} ${t('common:minutes')}`}
              </CText>
              <CText style={styles.txt_white} >
                {`${dataQuiz.numQuestions} ${t('quiz_details:questions')}`}
              </CText>
            </View>
          </View>
        </Layout>
      }>
        
      <View style={[cStyles.p10, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
        <CText category={'s1'}>{t('quiz_details:participants').toUpperCase()}</CText>
        <CText category={'s1'}>{t('quiz_details:score').toUpperCase()}</CText>
      </View>
      
      <Divider />

      <List
        style={{backgroundColor: theme['background-basic-color-1']}}
        contentContainerStyle={[cStyles.px10, cStyles.pt16, cStyles.pb36]}
        data={participants}
        renderItem={info => {
          return (
            <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
              <View style={[cStyles.row, cStyles.itemsCenter]}>
                <CAvatar source={{uri: info.item.avatar}} />
                <CText style={cStyles.ml10} >{info.item.name}</CText>
              </View>

              <Button
                style={cStyles.rounded5}
                appearance={'outline'}
                size={'small'}
                status={info.item.score === 'need_review' 
                ? 'warning' 
                : info.item.score > 80 
                  ? 'success' 
                  : info.item.score >= 50 
                    ? 'info' 
                    : 'danger'
                }>
                {info.item.score === 'need_review' 
                ? t('quiz_details:need_review') 
                : info.item.score + '%'}
              </Button>
            </View>
          )
        }}
        keyExtractor={(item, index) => item.id + index}
        ItemSeparatorComponent={() => <View style={cStyles.my10} />}
      />
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  con_title_left: {flex: 0.7},
  con_title_right: {flex: 0.3},
  txt_white: {
    color: colors.WHITE,
  },
  btn_start: {
    width: sW('60%'),
  },
});

export default QuizDetails;
