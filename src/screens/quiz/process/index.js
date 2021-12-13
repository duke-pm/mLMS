/**
 ** Name: Quiz process screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Layout, useTheme, List, Button, ViewPager, Select, SelectItem,
  IndexPath, Icon, Input, Radio, RadioGroup, CheckBox, Divider,
} from '@ui-kitten/components';
import {Alert, View, LayoutAnimation, UIManager, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAlert from '~/components/CAlert';
import CText from '~/components/CText';
/* COMMON */
import {cStyles} from '~/utils/style';
import {IS_ANDROID, moderateScale, sW} from '~/utils/helper';
/* REDUX */

if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/** All init */
const TYPE_QUESTION = {
  TEXT_INPUT: 'textInput',
  CHOOSE_ONE: 'chooseOne',
  CHOOSE_MULTI: 'chooseMulti',
  SELECT_BLANK: 'selectBlank',
  DROP_DRAG_SENTENCE: 'drogDragSentence',
  YES_NO: 'yesNo',
};
const TYPE_RESULT = {
  GOOD: 'good',
  MID: 'mid',
  BAD: 'bad',
};

const RenderCheckIcon = props => (
  <Icon {...props} name='checkmark-circle-outline' />
);

const RenderPreviousIcon = props => (
  <Icon {...props} name='arrow-back-outline' />
);

const RenderNextIcon = props => (
  <Icon {...props} name='arrow-forward-outline' />
);

const RenderSubmitIcon = props => (
  <Icon {...props} name='save-outline' />
);

function QuizProcess(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataQuiz = route.params.data;

  /** Use ref */
  let listNumQues = useRef();

  /** Use state */
  const [loading, setLoading] = useState({
    main: true,
    submit: false,
  });
  const [intervalTime, setIntervalTime] = useState(null);
  const [time, setTime] = useState(0);
  const [questions, setQuestions] = useState({
    data: [],
    current: 0,
  });
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState({
    show: false,
    score: 0,
    type: '',
    label: '',
  });

  const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
  const [yesNo, setYesNo] = useState(null);
  const [valueInput, setValueInput] = useState('');
  const [radio, setRadio] = useState(0);
  const [checks, setChecks] = useState([false, false, false, false]);

  const [receivingItemList, setReceivedItemList] = useState([
    {
      id: 6,
      name: '[Blank]',
    },
    {
      id: 7,
      name: '[Blank]',
    },
    {
      id: 8,
      name: '[Blank]',
    },
    {
      id: 9,
      name: '[Blank]',
    },
    {
      id: 10,
      name: '[Blank]',
    }
  ]);
  const [dragItemMiddleList, setDragItemListMiddle] = useState([
    {
      id: 1,
      name: 'Praesent',
    },
    {
      id: 2,
      name: 'Tincidunt',
    },
    {
      id: 3,
      name: 'Ultrices',
    },
    {
      id: 4,
      name: 'Lectus',
    },
    {
      id: 5,
      name: 'Ipsum',
    }
  ]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleBack = () => {
    Alert.alert(
      t('common:alert'),
      t('quiz_process:holder_back_quiz_process'),
      [
        {style: 'cancel', text: t('quiz_process:confirm_back_no'), onPress: () => null},
        {style: 'destructive', text: t('quiz_process:confirm_back_yes'), onPress: handleGoBack}
      ],
      {cancelable: true},
    );
  };

  const handleGoBack = () => {
    if (intervalTime) {
      clearInterval(intervalTime);
    }
    navigation.goBack();
  };

  const handleYesNo = yesOrNo => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setYesNo(yesOrNo);
  };

  const handleChangeChecks = (idxCheck, value) => {
    let tmpChecks = [...checks];
    tmpChecks[idxCheck] = value; 
    setChecks(tmpChecks);
  };

  const handlePrevious = () => {
    if (questions.current > 0 ) {
      setQuestions({...questions, current: questions.current - 1});
      listNumQues &&
        listNumQues.current.scrollToIndex({animated: true, index: questions.current - 1, viewPosition: 0.5});
    } 
  };
  
  const handleNext = () => {
    if (questions.current < questions.data.length - 1 ) {
      setQuestions({...questions, current: questions.current + 1});
      listNumQues &&
        listNumQues.current.scrollToIndex({animated: true, index: questions.current + 1, viewPosition: 0.5});
    } 
  };
  
  const handleSubmit = () => {
    Alert.alert(
      t('common:alert'),
      t('quiz_process:holder_submit_quiz_process'),
      [
        {style: 'cancel', text: t('quiz_process:confirm_submit_no'), onPress: () => null},
        {style: 'destructive', text: t('quiz_process:confirm_submit_yes'), onPress: onFinishTest}
      ],
      {cancelable: true},
    );
  };
  
  const handleTestAgain = () => {
    setLoading({submit: false, main: true});
    setResult({
      show: false,
      score: 0,
      type: null,
      label: '',
    });
    onSetIntervalTime();
    onSetQuestions();
  };
  
  /**********
   ** FUNC **
   **********/
  const onChangeQuestion = idxQuestion => {
    setQuestions({...questions, current: idxQuestion});
    listNumQues &&
      listNumQues.current.scrollToIndex({animated: true, index: idxQuestion, viewPosition: 0.5});
  };

  const onFinishTest = () => {
    setLoading({...loading, submit: true});
    if (intervalTime) {
      clearInterval(intervalTime);
      setIntervalTime(null);
    }

    setTimeout(() => {
      let rdResult = Math.random();
      if (rdResult >= 0.8) {
        setResult({
          show: true,
          score: 90,
          type: TYPE_RESULT.GOOD,
          label: 'quiz_process:title_finish_quiz_process_good',
        });
      } else if (rdResult >= 0.5) {
        setResult({
          show: true,
          score: 70,
          type: TYPE_RESULT.MID,
          label: 'quiz_process:title_finish_quiz_process_mid',
        });
      } else {
        setResult({
          show: true,
          score: 30,
          type: TYPE_RESULT.BAD,
          label: 'quiz_process:title_finish_quiz_process_bad',
        });
      }
      setLoading({...loading, submit: false});
    }, 1000)
  };

  const onSetIntervalTime = () => {
    let minute = dataQuiz.timeout - 1,
      sec = 59;
    let tmpTime = '';

    if (intervalTime) {
      clearInterval(intervalTime);
      setIntervalTime(null);
    }
    let intervalTimeOut = setInterval(function () {
      tmpTime = minute + ":" + sec;
      sec--;
      if (sec == 0) {
        minute--;
        sec = 59;
        if (minute == 0) {
          onFinishTest();
        }
      }
      setTime(tmpTime);
    }, 1000);
    setIntervalTime(intervalTimeOut);
  };

  const onSetQuestions = () => {
    let tmpQuestions = [
      {
        id: 6,
        question: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis.',
        answers: ['praesent', 'tincidunt', 'ultrices', 'lectus', 'ipsum'],
        trueAnswer: [4, 2, 1, 0, 3],
        type: 'drogDragSentence',
      },
      {
        id: 1,
        question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        type: 'textInput',
      },
      {
        id: 2,
        question: 'Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit.',
        trueAnswer: 'no',
        type: 'yesNo',
      },
      {
        id: 3,
        question: 'Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue.',
        type: 'chooseOne',
        answers: [
          'Elit at imperdiet dui accumsan sit.',
          'Ornare arcu dui vivamus arcu felis.',
          'Egestas integer eget aliquet nibh praesent.',
          'In hac habitasse platea dictumst quisque sagittis purus.'
        ],
        trueAnswer: 1,
      },
      {
        id: 4,
        question: 'Pulvinar elementum integer enim neque volutpat ac.',
        type: 'chooseMulti',
        answers: [
          'Senectus et netus et malesuada.',
          'Nunc pulvinar sapien et ligula ullamcorper malesuada proin.',
          'Neque convallis a cras semper auctor.',
          'Libero id faucibus nisl tincidunt eget.'
        ],
        trueAnswer: [1, 3],
      },
      {
        id: 5,
        questions: ['Feugiat in fermentum posuere urna nec', 'nisi scelerisque eu', 'vitae auctor eu augue ut'],
        answers: ['praesent', 'tincidunt', 'ultrices', 'lectus', 'ipsum'],
        trueAnswer: [1, 2],
        type: 'selectBlank',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
      {
        id: 7,
        question: 'In tellus integer feugiat scelerisque.',
        trueAnswer: 'yes',
        type: 'yesNo',
      },
    ];
    setQuestions({current: 0, data: tmpQuestions});
    setTimeout(() => {
      setLoading({main: false, submit: false});
    }, 1000);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set time for test */
    onSetIntervalTime();

    /** set questions for test */
    onSetQuestions();
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={(questions.current + 1) + ' / ' + questions.data.length}
          back
          iconBack={'close-outline'}
          customRightComponent={
            <View style={[cStyles.row, cStyles.itemsCenter]}>
              <CText style={cStyles.mr6} status={'primary'} category={'s2'}>{time}</CText>
              <IoniIcon
                name={'timer'}
                color={theme['color-primary-500']}
                size={moderateScale(16)}
              />
            </View>
          }
          onPressCustomBack={handleBack}
        />
      }>
      <Layout style={cStyles.flex1} >
        <View style={cStyles.itemsCenter}>
          {!loading.main && questions.data.length > 0 && (
            <List
              ref={listNumQues}
              style={{backgroundColor: theme['background-basic-color-1']}}
              contentContainerStyle={cStyles.px10}
              horizontal
              snapToAlignment={'center'}
              showsHorizontalScrollIndicator={false}
              data={questions.data}
              renderItem={info => {
                return (
                  <Button
                    size={'tiny'}
                    status={info.index === questions.current ? 'warning' : 'basic'}
                  >{info.index + 1}</Button>
                )
              }}
              keyExtractor={(item, index) => item.id + index}
              ItemSeparatorComponent={() => <View style={cStyles.pr1} />}
            />
          )}
        </View>

        {!loading.main && questions.data.length > 0 && (
          <ViewPager
            style={cStyles.flex1}
            selectedIndex={questions.current}
            onSelect={onChangeQuestion}>
            {questions.data.map((item, index) => {
              if (item.type === TYPE_QUESTION.SELECT_BLANK) {
                const displayValue = item.answers[selectedIndex.row];
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.flexWrap, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>
                      {`${t('quiz_process:sentence')} ${index + 1}:`}
                    </CText>

                    <CText >{t('quiz_process:choose_blank')}</CText>

                    <Layout
                      style={[
                        cStyles.pb16,
                        cStyles.px10,
                        cStyles.pt10,
                        cStyles.rounded1,
                        cStyles.mt16,
                        cStyles.fullWidth
                      ]}
                      level={'3'}>
                      {item.questions.map((itemQus, indexQus) => {
                        if (indexQus === item.questions.length - 1) {
                          return (
                            <CText key={itemQus + indexQus} style={cStyles.my5} >{itemQus}</CText>
                          )
                        }
                        if (indexQus >= 0) {
                          return (
                            <View key={itemQus + indexQus} style={[cStyles.itemsStart, cStyles.fullWidth, cStyles.my5]}>
                              <CText >{itemQus}</CText>
                              <Select
                                style={[cStyles.my5, cStyles.fullWidth]}
                                status={'primary'}
                                value={displayValue}
                                selectedIndex={selectedIndex}
                                onSelect={setSelectedIndex}>
                                {item.answers.map((itemAns, indexAns) => {
                                  return <SelectItem key={itemAns + indexAns} title={itemAns}  />
                                })}
                              </Select>
                            </View>
                          )
                        }
                        return null;
                      })}
                    </Layout>
                  </Layout>
                )
              }
              if (item.type === TYPE_QUESTION.TEXT_INPUT) {
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                    <CText style={cStyles.mt5} >{item.question}</CText>
  
                    <CText style={cStyles.mt32} category={'s1'}>{t('quiz_process:your_answer_is')}</CText>
                    <Input
                      style={[cStyles.flex1, cStyles.mt16, {height: sW('100%')}]}
                      multiline
                      value={valueInput}
                      onChangeText={setValueInput}
                    />
                  </Layout>
                )
              }
              if (item.type === TYPE_QUESTION.CHOOSE_ONE) {
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                    <CText style={cStyles.mt5} >{item.question}</CText>
  
                    <CText style={cStyles.mt32} category={'s1'}>{t('quiz_process:choose_one_answer')}</CText>
                    <RadioGroup style={cStyles.mt16} selectedIndex={radio} onChange={setRadio}>
                      {item.answers.map((itemAns, indexAns) => {
                        return <Radio key={itemAns + indexAns}>{itemAns}</Radio>
                      })}
                    </RadioGroup>
                  </Layout>
                )
              }
              if (item.type === TYPE_QUESTION.CHOOSE_MULTI) {
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                    <CText style={cStyles.mt5} >{item.question}</CText>
  
                    <CText style={cStyles.mt32} category={'s1'}>{t('quiz_process:choose_multi_answer')}</CText>
                    <View style={[cStyles.mt16]}>
                      {item.answers.map((itemAns, indexAns) => {
                        return (
                          <CheckBox
                            key={itemAns + indexAns}
                            style={indexAns !== 0 ? cStyles.mt16 : {}}
                            checked={checks[indexAns]}
                            onChange={nextChecked => handleChangeChecks(indexAns, nextChecked)}>
                            {itemAns}
                          </CheckBox>
                        )
                      })}
                    </View>
                  </Layout>
                )
              }
              if (item.type === TYPE_QUESTION.DROP_DRAG_SENTENCE) {
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                    <CText style={cStyles.mt5} >{item.question}</CText>
                    
                    <GestureHandlerRootView style={[cStyles.flex1, cStyles.mt10]}>
                      <DraxProvider>
                        <Layout style={[cStyles.flexWrap, cStyles.row, cStyles.itemsCenter, cStyles.rounded1, cStyles.p10]} level={'3'}>
                          {receivingItemList.map((item, index) => {
                            return (
                              <DraxView
                                key={item.name + index}
                                style={[cStyles.rounded1, cStyles.center, cStyles.mt10, cStyles.mr10]}
                                receivingStyle={[styles.receiving, {borderColor: theme['color-warning-transparent-500']}]}
                                renderContent={({viewState}) => {
                                  const receivingDrag = viewState && viewState.receivingDrag;
                                  const payload = receivingDrag && receivingDrag.payload;
                                  return (
                                    <Button 
                                      appearance={'outline'}
                                      status={item.name !== '[Blank]' ? 'primary' : 'basic'}>
                                      {item.name}
                                    </Button>
                                  )
                                }}
                                onReceiveDragDrop={(event) => {
                                  let selected_item = dragItemMiddleList[event.dragged.payload];
                                  let newReceivingItemList = [...receivingItemList];
                                  newReceivingItemList[index] = selected_item;
                                  setReceivedItemList(newReceivingItemList);
                        
                                  let newDragItemMiddleList = [...dragItemMiddleList];
                                  newDragItemMiddleList[event.dragged.payload] = receivingItemList[index];
                                  setDragItemListMiddle(newDragItemMiddleList);
                                }}
                              />
                            )
                          })}
                        </Layout>

                        <CText style={cStyles.mt32} category={'s1'}>{t('quiz_process:drog_drag_answer')}</CText>
                        <Layout style={[cStyles.rounded1, cStyles.mt16, cStyles.p16]} level={'4'}>
                          <DraxList
                            data={dragItemMiddleList}
                            renderItemContent={({item, index}) => {
                              return (
                                <DraxView
                                  style={[cStyles.rounded1, cStyles.mr10]}
                                  draggingStyle={styles.dragging}
                                  dragReleasedStyle={styles.dragging}
                                  hoverDraggingStyle={[styles.hoverDragging, {borderColor: theme['color-warning-500']}]}
                                  dragPayload={index}
                                  longPressDelay={150}>
                                  <Button appearance={'ghost'} status={item.name !== '[Blank]' ? 'primary' : 'basic'}>{item.name}</Button>
                                </DraxView>
                              );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
                            numColumns={3}
                            ItemSeparatorComponent={() => <View style={cStyles.my5} />}
                          />
                        </Layout>
                      </DraxProvider>
                    </GestureHandlerRootView>
                  </Layout>
                )
              }
              if (item.type === TYPE_QUESTION.YES_NO) {
                return (
                  <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                    <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                    <CText style={cStyles.mt5} >{item.question}</CText>
  
                    <CText style={cStyles.mt32} category={'s1'}>{t('quiz_process:your_answer_is')}</CText>
                    <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.mt16]}>
                      <Button
                        style={{width: sW('30%')}}
                        appearance={'filled'}
                        status={yesNo === 'yes' ? 'primary' : 'basic'}
                        accessoryLeft={yesNo === 'yes' ? RenderCheckIcon : undefined}
                        onPress={() => handleYesNo('yes')}>
                        {t('common:yes')}
                      </Button>
                      <Button
                        style={{width: sW('30%')}}
                        appearance={'filled'}
                        status={yesNo === 'no' ? 'primary' : 'basic'}
                        accessoryLeft={yesNo === 'no' ? RenderCheckIcon : undefined}
                        onPress={() => handleYesNo('no')}>
                        {t('common:no')}
                      </Button>
                    </View>
                  </Layout>
                )
              }
              return (
                <Layout key={item.id + '_' + index} style={[cStyles.flex1, cStyles.px10, cStyles.py16]}>
                  <CText category='label'>{`${t('quiz_process:sentence')} ${index + 1}:`}</CText>
                  <CText style={cStyles.mt10} >{item.question}</CText>
                </Layout>
              )
            })}
          </ViewPager>
        )}

        {!loading.main && questions.data.length > 0 && (
          <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly]} >
            <Button
              appearance={'ghost'}
              accessoryLeft={RenderPreviousIcon}
              status={'basic'}
              disabled={questions.current === 0}
              onPress={handlePrevious}>
              {t('common:previous')}
            </Button>
            {questions.current < questions.data.length - 1 && (
              <Button
                appearance={'ghost'}
                accessoryRight={RenderNextIcon}
                status={'basic'}
                disabled={questions.current === questions.data.length - 1}
                onPress={handleNext}>
                {t('common:next')}
              </Button>
            )}
            {questions.current === questions.data.length - 1 && (
              <Button
                accessoryLeft={RenderSubmitIcon}
                onPress={handleSubmit}>
                {t('quiz_process:submit')}
              </Button>
            )}
          </Layout>
        )}
      </Layout>

      <CAlert
        contentStyle={cStyles.m0}
        show={result.show}
        cancel={true}
        label={result.label}
        success={result.type === TYPE_RESULT.GOOD || result.type === TYPE_RESULT.MID}
        error={result.type === TYPE_RESULT.BAD}
        customMessage={
          <View style={cStyles.center}>
            <CText >{t('quiz_process:holder_finish_quiz_process')}</CText>
            <CText
              style={cStyles.mt32}
              status={result.type === TYPE_RESULT.GOOD ? 'success' : result.type === TYPE_RESULT.MID ? 'warning' : 'danger'}
              category={'h1'}>{result.score + '%'}</CText>
          </View>
        }
        textCancel={'quiz_process:confirm_finish_go_back'}
        onCancel={handleGoBack}
        textOk={'quiz_process:confirm_finish_test_again'}
        statusOk={'primary'}
        onOk={handleTestAgain}
      />

      <CLoading show={loading.main || loading.submit} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  centeredContent: {
    borderRadius: 10,
  },
  receiving: {
    borderWidth: 2,
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    width: moderateScale(100),
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  itemSeparator: {
    height: 15
  },
  draxListContainer: {
    padding: 5,
    height: 200
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100
  },
  textStyle: {
    fontSize: 18
  },
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20
  }
});

export default QuizProcess;
