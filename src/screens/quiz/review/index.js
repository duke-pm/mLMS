/**
 ** Name: Quiz review screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect, useLayoutEffect, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {
  useTheme, Layout, List, Card, Button, OverflowMenu,
  MenuItem, Icon, TopNavigationAction
} from '@ui-kitten/components';
import {StyleSheet, StatusBar, View, TouchableOpacity} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CText from '~/components/CText';
/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {DARK, LIGHT} from '~/configs/constants';
import {IS_ANDROID, moderateScale} from '~/utils/helper';
import {colors, cStyles} from '~/utils/style';
/* REDUX */

/** All init */
const TYPE_QUESTION = {
  TEXT_INPUT: 'textInput',
  CHOOSE_ONE: 'chooseOne',
  CHOOSE_MULTI: 'chooseMulti',
  SELECT_BLANK: 'selectBlank',
  DROP_DRAG_SENTENCE: 'drogDragSentence',
  YES_NO: 'yesNo',
};

const MenuIcon = props => (
  <Icon {...props} name={'more-vertical-outline'} />
);

const RenderFeedbackIcon = (props) => (
  <Icon {...props} name='undo-outline'/>
);

function QuizReview(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation, route} = props;
  const dataQuiz = route.params.data;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [idxMenuAnswer, setIdxMenuAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [menuAnswers, setMenuAnswers] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleFunctionMenu = (index) => {
    if (index) {
      let tmpMenu = [...menuAnswers];
      tmpMenu[Number(index)] = true;
      setMenuAnswers(tmpMenu);
      setIdxMenuAnswer(index);
    } else {
      let tmpMenu = [...menuAnswers];
      tmpMenu[Number(idxMenuAnswer)] = false;
      setMenuAnswers(tmpMenu);
      setIdxMenuAnswer(null);
    }
  };

  const handleFeedbackAnswer = idxQuestion => {
    toggleFunctionMenu(idxQuestion);
  };
  

  /**********
   ** FUNC **
   **********/
  const onSetAnswers = () => {
    let tmpAnswers = [
      {
        id: 1,
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        answers: null,
        userAnswer: 'Nisl tincidunt eget nullam non.',
        correctAnswer: 'Quis hendrerit dolor magna eget est lorem ipsum dolor sit.',
        type: 'textInput',
        score: '0',
        isCorrect: false,
      },
      {
        id: 2,
        question: 'Volutpat odio facilisis mauris sit amet massa.',
        answers: [
          'Commodo odio aenean sed adipiscing diam donec adipiscing tristique.',
          'Mi eget mauris pharetra et.',
          'Non tellus orci ac auctor augue.',
          'Elit at imperdiet dui accumsan sit.',
        ],
        userAnswer: 1,
        correctAnswer: 1,
        type: 'chooseOne',
        score: '1',
        isCorrect: true,
      },
      {
        id: 3,
        question: 'Ornare arcu dui vivamus arcu felis.',
        answers: [
          'Egestas integer eget aliquet nibh praesent.',
          'In hac habitasse platea dictumst quisque sagittis purus.',
          'Pulvinar elementum integer enim neque volutpat ac.',
          'Senectus et netus et malesuada.',
        ],
        userAnswer: [0,1,3],
        correctAnswer: [1,2],
        type: 'chooseMulti',
        score: '0',
        isCorrect: false,
      },
      {
        id: 4,
        question: ['Feugiat in fermentum posuere urna nec', 'nisi scelerisque eu', 'vitae auctor eu augue ut'],
        answers: ['praesent', 'tincidunt', 'ultrices', 'lectus', 'ipsum'],
        userAnswer: [1,3],
        correctAnswer: [1,2],
        type: 'selectBlank',
        score: '0',
        isCorrect: false,
      },
      {
        id: 5,
        question: 'Neque convallis a cras semper auctor.',
        answers: ['Praesent', 'Tincidunt', 'Ultrices', 'Lectus', 'Ipsum'],
        userAnswer: [4, 1, 3, 2, 0],
        correctAnswer: [4, 1, 3, 2, 0],
        type: 'drogDragSentence',
        score: '1',
        isCorrect: true,
      },
      {
        id: 6,
        question: 'Libero id faucibus nisl tincidunt eget.',
        userAnswer: 'yes',
        correctAnswer: 'no',
        type: 'yesNo',
        score: '0',
        isCorrect: false,
      },
    ];
    let tmpMenuAnswers = [false,false,false,false,false,false];
    setMenuAnswers(tmpMenuAnswers);
    setAnswers(tmpAnswers);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
    IS_ANDROID && StatusBar.setBackgroundColor(theme['color-primary-500'], true);

    /** Set data answers */
    onSetAnswers();
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
  const RenderMenuAction = (id) => (
    <TopNavigationAction icon={MenuIcon} onPress={() => toggleFunctionMenu(id)}/>
  );

  return (
    <CContainer
      safeArea={['top']}
      scrollEnabled={false}
      backgroundColor={theme['color-primary-500']}
      headerComponent={
        <Layout style={{backgroundColor: theme['color-primary-500']}}>
          <CTopNavigation
            style={{backgroundColor: theme['color-primary-500']}}
            titleStyle={styles.txt_white}
            iconStyle={styles.txt_white}
            title={'quiz_review:title'}
            back />
          <View style={[cStyles.itemsCenter, cStyles.px16, cStyles.pb16]}>
            <CText status={'control'} category={'h1'}>{`${dataQuiz.score}`}</CText>
            <CText style={cStyles.mt6} status={'control'} category={'p1'}>{t('quiz_review:total_score')}</CText>
          </View>
        </Layout>
      }>
      <List
        style={{backgroundColor: theme['background-basic-color-3']}}
        contentContainerStyle={[cStyles.p10, cStyles.pb24]}
        data={answers}
        renderItem={info => {
          return (
            <Card
              disabled
              header={(propsH) => (
                <View style={[cStyles.flex1, cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p10]}>
                  <View style={[cStyles.itemsStart, {flex: 0.05}]}><CText category={'label'}>{info.index + 1}.</CText></View>
                  <View style={[cStyles.px10, {flex: 0.9}]}>
                    {typeof info.item.question === 'object'
                      ? (info.item.question.map((itemQus, indexQus) => {
                        if (indexQus === info.item.question.length - 1) {
                          return <CText category={'label'}>{itemQus}</CText>
                        }
                        if (indexQus >= 0) {
                          return (
                            <View style={[cStyles.row, cStyles.itemsCenter]}>
                              <CText category={'label'}>{itemQus}</CText>
                              <Layout level={'4'} style={[cStyles.ml5, cStyles.itemsEnd, cStyles.justifyCenter, {borderRadius: 5, height: moderateScale(20), width: moderateScale(40)}]}>
                                <IoniIcon style={cStyles.mr5} name={'chevron-down'} color={theme['text-basic-color']} size={10} />
                              </Layout>
                            </View>
                          )
                        }
                        return null;
                      }))
                      :
                      <CText category={'label'}>{info.item.question}</CText>
                    }
                    
                    <CText style={cStyles.mt10} category={'c1'}>{t('quiz_review:correct_answer')}:</CText>
                    {info.item.type === TYPE_QUESTION.TEXT_INPUT && (
                      <CText style={cStyles.mt10} category={'p1'}>{info.item.correctAnswer}</CText>
                    )}
                    {info.item.type === TYPE_QUESTION.YES_NO && (
                      <CText style={cStyles.mt10} category={'p1'}>{t('quiz_review:' + info.item.correctAnswer)}</CText>
                    )}
                    {info.item.type === TYPE_QUESTION.CHOOSE_ONE && (
                      <CText style={cStyles.mt10} category={'p1'}>&#10003; {info.item.answers[info.item.correctAnswer]}</CText>
                    )}
                    {info.item.type === TYPE_QUESTION.CHOOSE_MULTI && info.item.correctAnswer.map((itemAns, indexAns) => (
                      <CText key={itemAns + '_' + indexAns} style={cStyles.mt10} category={'p1'}>
                        &#10003; {info.item.answers[itemAns]}
                      </CText>
                    ))}
                    {info.item.type === TYPE_QUESTION.SELECT_BLANK && (
                      <View style={[cStyles.row, cStyles.itemsCenter]}>
                        {info.item.correctAnswer.map((itemAns, indexAns) => (
                          <CText key={itemAns + '_' + indexAns} style={[cStyles.mt10, cStyles.ml10]} category={'p1'}>
                            &#10003; {info.item.answers[itemAns]}
                          </CText>
                        ))}
                      </View>
                    )}
                    {info.item.type === TYPE_QUESTION.DROP_DRAG_SENTENCE && (
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.flexWrap]}>
                        {info.item.correctAnswer.map((itemAns, indexAns) => (
                          <Layout style={[cStyles.center, cStyles.px10, cStyles.py4, cStyles.mt5, cStyles.mr5, cStyles.rounded1]} level={'4'}>
                            <CText key={itemAns + '_' + indexAns} category={'p1'}>
                              {info.item.answers[itemAns]}
                            </CText>
                          </Layout>
                        ))}
                      </View>
                    )}
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.05}]}>
                    <OverflowMenu
                      anchor={() => RenderMenuAction(info.index + '')}
                      backdropStyle={styles.backdrop}
                      visible={menuAnswers[info.index]}
                      onBackdropPress={() => toggleFunctionMenu(null)}>
                      <MenuItem
                        accessoryLeft={RenderFeedbackIcon}
                        title={t('quiz_review:feedback_answer')}
                        onPress={() => handleFeedbackAnswer(info.index)} />
                    </OverflowMenu>
                  </View>
                </View>
              )}
              footer={(propsF) => (
                <View style={[cStyles.flex1, cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.p10]}>
                  <View style={cStyles.itemsCenter}>
                    <View style={[cStyles.row, cStyles.itemsCenter]}>
                      <IoniIcon
                        name={info.item.isCorrect ? 'checkmark' : 'close'}
                        color={info.item.isCorrect ? theme['color-success-500'] : theme['color-danger-500']}
                        size={moderateScale(16)}
                      />
                      <CText style={cStyles.ml5} category={'label'} status={info.item.isCorrect ? 'success' : 'danger'}>
                        {t('quiz_review:' + (info.item.isCorrect ? 'true' : 'false')).toUpperCase()}
                      </CText>
                    </View>
                  </View>
                  <View style={[cStyles.row, cStyles.itemsCenter]}>
                    <CText style={cStyles.mr5} category={'c1'}>{t('quiz_review:score')}</CText>
                    <Button size={'small'} appearance={'filled'} status={'basic'}>{info.item.score}</Button>
                  </View>
                </View>
              )}
            >
              <View style={styles.bg_content_card}>
                <CText category={'c1'}>{t('quiz_review:your_answer')}:</CText>
                {info.item.type === TYPE_QUESTION.TEXT_INPUT && (
                  <CText style={cStyles.mt10} category={'p1'}>{info.item.userAnswer}</CText>
                )}
                {info.item.type === TYPE_QUESTION.YES_NO && (
                  <CText style={cStyles.mt10} category={'p1'}>{t('quiz_review:' + info.item.userAnswer)}</CText>
                )}
                {info.item.type === TYPE_QUESTION.CHOOSE_ONE && (
                  <CText style={cStyles.mt10} category={'p1'}>{info.item.answers[info.item.userAnswer]}</CText>
                )}
                {info.item.type === TYPE_QUESTION.CHOOSE_MULTI && info.item.userAnswer.map((itemAns, indexAns) => (
                  <CText key={itemAns + '_' + indexAns} style={cStyles.mt10} category={'p1'}>
                    &#10003; {info.item.answers[itemAns]}
                  </CText>
                ))}
                {info.item.type === TYPE_QUESTION.SELECT_BLANK && (
                  <View style={[cStyles.row, cStyles.itemsCenter]}>
                    {info.item.userAnswer.map((itemAns, indexAns) => (
                      <CText key={itemAns + '_' + indexAns} style={[cStyles.mt10, cStyles.ml10]} category={'p1'}>
                        &#10003; {info.item.answers[itemAns]}
                      </CText>
                    ))}
                  </View>
                )}
                {info.item.type === TYPE_QUESTION.DROP_DRAG_SENTENCE && (
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.flexWrap]}>
                    {info.item.userAnswer.map((itemAns, indexAns) => (
                      <Layout style={[cStyles.center, cStyles.px10, cStyles.py4, cStyles.mt5, cStyles.mr5, cStyles.rounded1]} level={'4'}>
                        <CText key={itemAns + '_' + indexAns} category={'p1'}>
                          {info.item.answers[itemAns]}
                        </CText>
                      </Layout>
                    ))}
                  </View>
                )}
              </View>
            </Card>
          )
        }}
        keyExtractor={(item, index) => item.id + index}
        ItemSeparatorComponent={() => <View style={cStyles.my5} />}
      />
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  txt_white: {
    color: colors.WHITE,
  },
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
  bg_content_card: {
    marginHorizontal: -14,
    marginVertical: -6,
  },
});

export default QuizReview;
