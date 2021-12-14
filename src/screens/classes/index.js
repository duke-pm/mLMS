/**
 ** Name: Classes screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useState, useEffect} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, List, useTheme, Button, Spinner} from '@ui-kitten/components';
import {StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
import CAvatar from '~/components/CAvatar';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles, colors} from '~/utils/style';
import {IS_ANDROID, moderateScale} from '~/utils/helper';
import {ThemeContext} from '~/configs/theme-context';
/* REDUX */

const mockupData = [
  {
    id: 'class1',
    label: 'Lorem ipsum dolor sit amet',
    subjects: ['Chemistry', 'Math', 'Biological'],
    teacher: {
      id: 'teacher1',
      name: 'Leona Hart',
      avatar: 'http://react-material.fusetheme.com/assets/images/avatars/jane.jpg'
    },
    numMember: 33,
    members: [
      {
        id: 'member1',
        name: 'Raymond Becker',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
      {
        id: 'member2',
        name: 'Lora Norris',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/andrew.jpg',
      },
    ],
    bgImage: 'https://picsum.photos/id/1018/500/300',
    assignment: 3,
  },
  {
    id: 'class2',
    label: 'Nisl tincidunt eget nullam non',
    subjects: ['Math', 'English', 'Literature'],
    teacher: {
      id: 'teacher2',
      name: 'Andrew Green',
      avatar: 'http://react-material.fusetheme.com/assets/images/avatars/garry.jpg'
    },
    numMember: 21,
    members: [
      {
        id: 'member3',
        name: 'Jane Dean',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/jane.jpg',
      },
      {
        id: 'member4',
        name: 'Judith Burton',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/joyce.jpg',
      },
    ],
    bgImage: 'https://picsum.photos/id/1019/500/300',
    assignment: 0,
  },
  {
    id: 'class3',
    label: 'Non tellus orci ac auctor augue',
    subjects: ['Geography', 'History', 'Literature'],
    teacher: {
      id: 'teacher3',
      name: 'Vincent Munoz',
      avatar: 'http://react-material.fusetheme.com/assets/images/avatars/vincent.jpg'
    },
    numMember: 25,
    members: [
      {
        id: 'member5',
        name: 'Juan Carpenter',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/james.jpg',
      },
      {
        id: 'member6',
        name: 'Alice Freeman',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/alice.jpg',
      },
    ],
    bgImage: 'https://picsum.photos/id/102/500/300',
    assignment: 5,
  }
];
const pAvatar = moderateScale(20);

/********************
 ** MAIN COMPONENT **
 ********************/
function Classes(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** use state */
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState(mockupData);
  
  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleClassItem = infoClass => {
    navigation.navigate(Routes.CLASS_DETAILS.name, {
      data: infoClass.item,
    });
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      StatusBar.setBarStyle('dark-content', true);
      IS_ANDROID &&
        StatusBar.setBackgroundColor('white', true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setLoading(false);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={t('classes:title')} search />}>
      {/** Content of page */}
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          contentContainerStyle={cStyles.p10}
          extraData={classes}
          data={classes}
          renderItem={info => {
            return (
              <Button
                style={[cStyles.rounded1, cStyles.px0, cStyles.py0]}
                appearance={'ghost'}
                onPress={() => handleClassItem(info)}>
                {evaProps => (
                  <FastImage
                    style={[cStyles.fullWidth, cStyles.rounded1]}
                    source={{uri: info.item.bgImage}}
                    resizeMode={FastImage.resizeMode.cover}>
                    <View style={[cStyles.flex1, cStyles.p16, cStyles.rounded1, styles.backdrop]}>
                      <CText status={'control'} category={'label'} numberOfLines={2}>{info.item.label}</CText>
                      <View style={[cStyles.row, cStyles.itemsEnd, cStyles.mt12]}>
                        {info.item.subjects.map((itemSub, indexSub) => 
                          <CText key={itemSub + '_' + indexSub}
                            style={cStyles.mt5}
                            status={'control'}
                            
                            numberOfLines={2}>&#10019; {itemSub}  </CText>
                        )}
                      </View>
      
                      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt24]}>
                        <View style={[cStyles.row, cStyles.itemsCenter]}>
                          {info.item.members.map((itemMem, indexMem) =>
                            <View key={itemMem.id + '_' + indexMem} style={[cStyles.abs, {left: pAvatar * indexMem}]}>
                              <CAvatar size='small' source={{uri: itemMem.avatar}} />
                            </View>
                          )}
                          
                          <View style={[cStyles.abs, cStyles.rounded5, cStyles.p1, styles.bg_num_member]}>
                            <Layout
                              style={[
                                cStyles.center,
                                cStyles.rounded5,
                                styles.mini_avatar,
                              ]} level={'3'}>
                              <CText category={'c1'}>+{info.item.numMember - 2}</CText>
                            </Layout>
                          </View>
      
                          <CText style={styles.txt_num_member} status={'control'} category={'c1'}>
                            {`${info.item.numMember} ${t('classes:members')}`}
                          </CText>
                        </View>
      
                        {info.item.assignment > 0 && (
                          <Button
                            appearance={'filled'}
                            status={'basic'}
                            size={'tiny'}
                            accessoryRight={propsI => CIcon(propsI, 'eva', 'star')}>
                            {`${info.item.assignment}  ${t('classes:todo_item')}`}
                          </Button>
                        )}
                      </View>
                    </View>
                  </FastImage>
                )}
              </Button>
            )
          }}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => <View style={cStyles.my3} />}
        />
      )}

      {/** Loading of page */}
      {loading && (
        <Layout style={cStyles.flexCenter} level={'3'}>
          <Spinner />
        </Layout>
      )}
    </CContainer>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
  bg_mini_avatar: {
    backgroundColor: colors.BLACK,
  },
  mini_avatar: {
    height: moderateScale(28),
    width: moderateScale(28),
  },
  bg_num_member: {
    left: moderateScale(40),
    backgroundColor: colors.BLACK,
  },
  txt_num_member: {
    marginLeft: moderateScale(80),
  },
});

export default Classes;
 