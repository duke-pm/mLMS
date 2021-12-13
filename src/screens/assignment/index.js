/**
 ** Name: Assignment screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Card, Divider, List, useTheme, Button,
} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
import AttachedFile from './components/AttachedFile';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles} from '~/utils/style';
/* REDUX */

const mockupData = [
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
        review: 3,
        msgReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
      },
      {
        id: 3,
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Velazquez.jpg',
        name: 'Velazquez Anelka',
        createdAt: '12/12/2021 20:25',
        attachedFiles: null,
        review: 1,
        msgReview: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
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
        review: 5,
        msgReview: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      }
    ],
  }
]; 

function Assignment(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState(mockupData);

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
      headerComponent={<CTopNavigation title={'assignment:title'} back search />}>
      {/** Content of page */}
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          contentContainerStyle={cStyles.p10}
          data={exercises}
          renderItem={info => {
            return (
              <Card
                onPress={() => handleGoDetails(info.index)}
                header={(propsH) => (
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.p10]}>
                    <View style={styles.con_title}>
                      <CText category={'label'}>
                        {`${t('assignment:exercise')} ${info.index + 1}: ${info.item.label}`}
                      </CText>
                    </View>
                    <Button appearance={'outline'} size={'tiny'} status={'primary'}>
                      {`${info.item.userCompleted
                        ? info.item.userCompleted.length
                        : info.item.groupCompleted.length}/10 ${t('assignment:completed')}`}
                    </Button>
                  </View>
                )}
                footer={(propsF) => (
                  <View style={[cStyles.row, cStyles.itemsStart, cStyles.justifyBetween, cStyles.p10]}>
                    <View style={cStyles.itemsStart}>
                      <CText>{info.item.dueDate}</CText>
                      <CText style={[cStyles.mt5, cStyles.fontBold]} category={'c1'} status={'danger'}>
                        {t('assignment:due_date')}
                      </CText>
                    </View>
                    <View style={cStyles.itemsEnd}>
                      <CText>{info.item.submitDate}</CText>
                      <CText style={[cStyles.mt5, cStyles.fontBold]} category={'c1'} status={'success'}>
                        {t('assignment:submit_date')}
                      </CText>
                    </View>
                  </View>
                )}>
                <View style={styles.bg_content_card}>
                  <CText>{info.item.description}</CText>

                  {info.item.attachedFiles.length > 0 &&
                    <Divider style={[cStyles.mx40, cStyles.mt16]} />
                  }

                  {info.item.attachedFiles.length > 0 &&
                    <AttachedFile
                      containerStyle={cStyles.mt16}
                      files={info.item.attachedFiles}
                      download={false}
                    />
                  }
                </View>
              </Card>
            );
          }}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => <View style={cStyles.my5} />}
        />
      )}

      {/** Loading of page */}
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -14,
    marginVertical: -6
  },
  con_title: {flex: 0.9},
})

export default Assignment;
