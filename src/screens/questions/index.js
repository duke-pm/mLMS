/**
 ** Name: Questions screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { Card, List, useTheme, ListItem } from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import StarRating from 'react-native-star-rating';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
/* COMMON */
import { cStyles } from '~/utils/style';
import { moderateScale } from '~/utils/helper';
import Routes from '~/navigator/Routes';
/* REDUX */

const RenderHeaderQuestion = (info) => (
  <CAvatar source={{uri: info.item.avatar}} />
);

function Questions(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoQuestionDetails = (idxQuestion) => {
    navigation.navigate(Routes.QUESTION_DETAILS.name, {
      data: questions[idxQuestion],
    });
  };

  /**********
   ** FUNC **
   **********/
  const onSetQuestions = () => {
    let tmpQuestions = [
      {
        id: 1,
        label: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        createdAt: '12/12/2021 14:00',
        createdUser: 'Abbott Keitch',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Abbott.jpg',
        numRate: 35,
        rate: 4,
        tags: ['English', 'Math', 'History'],
        views: 100,
        answers: [
          {
            id: 1,
            description: 'Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit.',
            createdAt: '12/12/2021 16:00',
            createdUser: 'Arnold Matlock',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
            numRate: 3,
            rate: 4,
            comments: [
              {
                id: 1,
                message: 'Volutpat odio facilisis mauris sit amet massa.',
                createdAt: '12/12/2021 18:00',
                createdUser: 'Barrera Bradbury',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Barrera.jpg',
              },
              {
                id: 2,
                message: 'Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et.',
                createdAt: '12/12/2021 20:00',
                createdUser: 'Blair Strangeway',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
              }
            ]
          },
          {
            id: 2,
            description: 'Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.',
            createdAt: '12/12/2021 23:00',
            createdUser: 'Boyle Winters',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
            numRate: 5,
            rate: 4,
            comments: [
              {
                id: 1,
                message: 'Egestas integer eget aliquet nibh praesent.',
                createdAt: '13/12/2021 18:00',
                createdUser: 'Christy Camacho',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
              },
              {
                id: 2,
                message: 'In hac habitasse platea dictumst quisque sagittis purus.',
                createdAt: '14/12/2021 20:00',
                createdUser: 'Copeland Redcliff',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg',
              }
            ]
          },
          {
            id: 3,
            description: 'Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.',
            createdAt: '15/12/2021 12:00',
            createdUser: 'Shepard Rosco',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Shepard.jpg',
            numRate: 0,
            rate: 0,
            comments: [],
          }
        ]
      },
      {
        id: 2,
        label: 'Senectus et netus et malesuada',
        description: 'Pulvinar elementum integer enim neque volutpat ac?',
        createdAt: '15/12/2021 09:45',
        createdUser: 'Henderson Cambias',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
        numRate: 10,
        rate: 3.5,
        tags: ['Math', 'History'],
        views: 32,
        answers: [
          {
            id: 1,
            description: 'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg.',
            createdAt: '16/12/2021 16:00',
            createdUser: 'Josefina Lakefield',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
            numRate: 4,
            rate: 3,
            comments: [
              {
                id: 1,
                message: 'Neque convallis a cras semper auctor.',
                createdAt: '17/12/2021 18:00',
                createdUser: 'Katina Bletchley',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Katina.jpg',
              },
              {
                id: 2,
                message: 'Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id.',
                createdAt: '18/12/2021 20:00',
                createdUser: 'Lily Peasegood',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Lily.jpg',
              }
            ]
          },
          {
            id: 2,
            description: 'A lacus vestibulum sed arcu non odio euismod lacinia.',
            createdAt: '19/12/2021 23:00',
            createdUser: 'Mai Nox',
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Mai.jpg',
            numRate: 1,
            rate: 1,
            comments: [
              {
                id: 1,
                message: 'In tellus integer feugiat scelerisque.',
                createdAt: '20/12/2021 18:00',
                createdUser: 'Nancy Jaggers',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Nancy.jpg',
              },
              {
                id: 2,
                message: 'Feugiat in fermentum posuere urna nec tincidunt praesent.',
                createdAt: '21/12/2021 20:00',
                createdUser: 'Nora Franklin',
                avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Nora.jpg',
              }
            ]
          }
        ]
      }
    ];
    setQuestions(tmpQuestions);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };
  

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** set questions */
    onSetQuestions();
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation title={'questions:title'} back />
      }>
      <List
        style={{backgroundColor: theme['background-basic-color-3']}}
        contentContainerStyle={cStyles.p10}
        data={questions}
        renderItem={info => {
          return (
            <Card
              onPress={() => handleGoQuestionDetails(info.index)}
              header={(propsH) => (
                <ListItem
                  title={evaProps =>
                    <CText style={cStyles.ml10} category={'label'}>{info.item.createdUser}</CText>
                  }
                  description={evaProps =>
                    <CText style={cStyles.ml10} category={'c1'} appearance='hint'>{info.item.createdAt}</CText>
                  }
                  accessoryLeft={() => RenderHeaderQuestion(info)}
                />
              )}
              footer={(propsF) => (
                <View style={[cStyles.row, cStyles.itemsCenter, cStyles.p10]}>
                  <View style={[cStyles.itemsCenter, {flex: 0.2}]}>
                    <CText category={'p1'}>{info.item.views}</CText>
                    <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('questions:views')}</CText>
                  </View>
                  <View style={[cStyles.itemsCenter, {flex: 0.2}]}>
                    <CText category={'p1'}>{info.item.answers.length}</CText>
                    <CText style={cStyles.mt5} category={'c1'} appearance='hint'>{t('questions:responses')}</CText>
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.6}]}>
                    <StarRating
                      disabled
                      starSize={moderateScale(18)}
                      rating={info.item.rate}
                      fullStarColor={theme['color-warning-500']}
                    />
                    <CText style={cStyles.mt5} category={'c1'} appearance='hint'>
                      {`${t('questions:from_rate_1')} ${info.item.numRate} ${t('questions:from_rate_2')}`}
                    </CText>
                  </View>
                </View>
              )}>
              <View style={[styles.bg_content_card]}>
                <CText category={'label'}>{`${t('questions:question')} ${info.index + 1}: ${info.item.label}`}</CText>
                <CText style={cStyles.mt5} category={'p1'}>{info.item.description}</CText>
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
  bg_content_card: {
    marginHorizontal: -14,
  }
})

export default Questions;
