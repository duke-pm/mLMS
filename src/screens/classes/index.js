/**
 ** Name: Classes screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useContext, useRef, useState, useEffect} from 'react';
import {useTranslation } from 'react-i18next';
import {Layout, List, Text, useTheme, Button, Icon} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import Routes from '~/navigator/Routes';
import {cStyles, colors} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
import {ThemeContext} from '~/configs/theme-context';
/* REDUX */
 
function Classes(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);
  const {navigation} = props;

  /** Use ref */
  const infiniteAnimationIconRef = useRef();

  /** use state */
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  

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
    let tmpClasses = [
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
    setClasses(tmpClasses)
    setTimeout(() => {
      setLoading(false);
      infiniteAnimationIconRef.current.startAnimation();
    }, 1000);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      headerComponent={<CTopNavigation title={t('classes:title')} search />}>
      <List
        contentContainerStyle={cStyles.px10}
        data={classes}
        renderItem={info => {
          return (
            <Button
              style={[cStyles.rounded1, cStyles.my6, cStyles.px0, cStyles.py0]}
              appearance={'ghost'}
              onPress={() => handleClassItem(info)}
            >
              {evaProps => (
                <FastImage
                  style={[cStyles.fullWidth, cStyles.rounded1]}
                  source={{uri: info.item.bgImage}}
                  resizeMode={FastImage.resizeMode.cover}>
                  <View style={[cStyles.flex1, cStyles.p16, cStyles.rounded1, styles.backdrop]}>
                    <View>
                      <Text style={styles.text_white} category={'s1'} numberOfLines={1}>{info.item.label}</Text>
                      <View style={[cStyles.row, cStyles.itemsEnd, cStyles.mt12]}>
                        {info.item.subjects.map((item, index) => {
                          return (
                            <Text
                              key={item + index}
                              style={[cStyles.mt5, styles.text_white]}
                              category={'p1'}
                              numberOfLines={1}>&#10041; {item}  </Text>
                          );
                        })}
                      </View>
                    </View>
    
                    <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.mt24]}>
                      <View style={[cStyles.row, cStyles.itemsCenter]}>
                        {info.item.members.map((item, index) => {
                          return (
                            <View
                              key={item.id}
                              style={[
                                cStyles.abs,
                                cStyles.rounded5,
                                cStyles.p1,
                                styles.bg_mini_avatar,
                                {left: moderateScale(20) * index}
                              ]}>
                              <FastImage
                                style={[cStyles.center, cStyles.rounded5, styles.mini_avatar]}
                                source={{uri: item.avatar}}
                                resizeMode={FastImage.resizeMode.contain}
                              />
                            </View>
                          )
                        })}
                        
                        <View 
                          style={[cStyles.abs, cStyles.rounded5, cStyles.p1, styles.bg_num_member]}>
                          <Layout
                            style={[
                              cStyles.center,
                              cStyles.rounded5,
                              styles.mini_avatar,
                              {backgroundColor: theme['color-primary-500']}
                            ]}>
                            <Text style={styles.text_white} category={'c2'}>+{info.item.numMember - 2}</Text>
                          </Layout>
                        </View>
    
                        <Text style={styles.txt_num_member} category={'c1'}>
                          {`${info.item.numMember} ${t('classes:members')}`}
                        </Text>
                      </View>
    
                      {info.item.assignment > 0 && (
                        <Button
                          appearance={'filled'}
                          status={'warning'}
                          size={'tiny'}
                          accessoryRight={evaProps => (
                            <Icon
                              {...evaProps}
                              ref={infiniteAnimationIconRef}
                              animation='pulse'
                              name='star'
                            />
                          )}>
                          {`${info.item.assignment} ${t('classes:todo_item')}`}
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
        extraData={classes}
      />
    </CContainer>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
  text_white: {
    color: colors.WHITE,
  },
  bg_mini_avatar: {
    backgroundColor: colors.BLACK,
  },
  mini_avatar: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  bg_num_member: {
    left: moderateScale(40),
    backgroundColor: colors.BLACK,
  },
  txt_num_member: {
    color: colors.WHITE,
    marginLeft: moderateScale(76),
  },
});

export default Classes;
 