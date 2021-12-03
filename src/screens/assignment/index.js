/**
 ** Name: Assignment screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Card, Divider, List, useTheme, Button} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
/* COMMON */
import Assets from '~/utils/asset/Assets';
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
import AttachedFile from './components/AttachedFile';
/* REDUX */


function Assignment(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoDetails = idxExercise => {
    navigation.navigate(Routes.ASSIGNMENT_DETAILS.name, {
      data: exercises[idxExercise],
    });
  };

  /**********
   ** FUNC **
   **********/
  const onSetExercises = () => {
    let tmpExercises = [
      {
        id: 1,
        label: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
        description: 'Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis.',
        attachedFiles: [
          {
            id: 1,
            name: 'String Format.zip',
            type: 'zip',
            size: '25'
          },
          {
            id: 2,
            name: 'Senectus.zip',
            type: 'zip',
            size: '10'
          },
          {
            id: 3,
            name: 'Senectus.zip',
            type: 'zip',
            size: '10'
          },
        ],
        dueDate: '12/12/2021 08:00',
        submitDate: '01/12/2021 11:30',
        userCompleted: [
          {
            id: 1,
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Tillman.jpg',
            name: 'Tillman Lee',
            createdAt: '10/12/2021 09:45',
            attachedFiles: {
              id: 1,
              name: 'TillmanLee.doc',
              type: 'doc',
              size: '2'
            },
          },
          {
            id: 2,
            avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Trevino.jpg',
            name: 'Trevino Bush',
            createdAt: '11/12/2021 19:25',
            attachedFiles: {
              id: 1,
              name: 'TrevinoBush.xlsx',
              type: 'xlsx',
              size: '2'
            },
          }
        ],
        groupCompleted: null,
      },
      {
        id: 2,
        label: 'Senectus et netus et malesuada',
        description: 'Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis.',
        attachedFiles: [
          {
            id: 1,
            name: 'Et malesuada fames.zip',
            type: 'zip',
            size: '20'
          },
        ],
        dueDate: '15/12/2021 12:00',
        submitDate: '29/11/2021 17:30',
        userCompleted: null,
        groupCompleted: [
          {
            id: 1,
            avatar: [
              'http://react-material.fusetheme.com/assets/images/avatars/Tillman.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Tyson.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
            ],
            name: 'Group A - Sit amet nisl suscipit',
            createdAt: '10/12/2021 09:55',
            attachedFiles: {
              id: 1,
              name: 'GroupA.zip',
              type: 'zip',
              size: '3'
            },
          },
          {
            id: 2,
            avatar: [
              'http://react-material.fusetheme.com/assets/images/avatars/Henderson.jpg',
              'http://react-material.fusetheme.com/assets/images/avatars/Josefina.jpg',
            ],
            name: 'Group B - Arcu ac tortor dignissim',
            createdAt: '12/12/2021 23:45',
            attachedFiles: {
              id: 1,
              name: 'GroupB.xls',
              type: 'xls',
              size: '5'
            },
          }
        ],
      }
    ];
    setExercises(tmpExercises);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set data exercises */
    onSetExercises();
  }, []);

  useEffect(() => {
    if (loading) {
      if (exercises.length > 0) {
        setLoading(false);
      }
    }
  }, [
    loading,
    exercises,
  ]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={<CTopNavigation title={'assignment:title'} back />}>
      <List
        style={{backgroundColor: theme['background-basic-color-3']}}
        contentContainerStyle={cStyles.p10}
        data={exercises}
        renderItem={info => {
          return (
            <Card
              disabled
              header={(propsH) => (
                <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p10]}>
                  <View style={{flex: 0.9}}>
                    <CText category={'label'}>
                      {`${t('assignment:exercise')} ${info.index + 1}: ${info.item.label}`}
                    </CText>
                    {info.item.userCompleted && (
                      <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>
                        {`${info.item.userCompleted.length} ${t('assignment:user_completed')}`}
                      </CText>
                    )}
                    {info.item.groupCompleted && (
                      <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>
                        {`${info.item.groupCompleted.length} ${t('assignment:group_completed')}`}
                      </CText>
                    )}
                  </View>
                  <Button size={'tiny'} appearance={'outline'} onPress={() => handleGoDetails(info.index)}>
                    {t('assignment:go_details')}
                  </Button>
                </View>
              )}
              footer={(propsF) => (
                <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p10]}>
                  <View style={cStyles.itemsStart}>
                    <CText category={'p1'}>{info.item.dueDate}</CText>
                    <CText style={[cStyles.mt5, cStyles.fontBold]} category={'c1'} status={'danger'}>
                      {t('assignment:due_date')}
                    </CText>
                  </View>
                  <View style={cStyles.itemsEnd}>
                    <CText category={'p1'}>{info.item.submitDate}</CText>
                    <CText style={[cStyles.mt5, cStyles.fontBold]} category={'c1'} status={'info'}>
                      {t('assignment:submit_date')}
                    </CText>
                  </View>
                </View>
              )}
            >
              <View style={styles.bg_content_card}>
                <CText category={'p1'}>{info.item.description}</CText>

                {info.item.attachedFiles.length > 0 && (
                  <AttachedFile files={info.item.attachedFiles} download={false} />
                )}
              </View>
            </Card>
          );
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
    marginVertical: -6
  }
})

export default Assignment;
