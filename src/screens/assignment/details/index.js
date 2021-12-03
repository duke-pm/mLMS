/**
 ** Name: Assignment details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Icon, Divider, Button, List, useTheme, Card, Avatar} from '@ui-kitten/components';
import {ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
/* COMMON */
import Assets from '~/utils/asset/Assets';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
import AttachedFile from '../components/AttachedFile';
/* REDUX */

const RenderDownloadIcon = props => (
  <Icon {...props} name={'download-outline'} />
);

function AssignmentDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataExercise = route.params.data;

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleDownloadFile = (idxFile, infoFile) => {
  
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      scrollEnabled={false}
      headerComponent={
        <CTopNavigation title={'assignment_details:title'} back />
      }>
      <ScrollView style={cStyles.flex1}>
        <Layout style={cStyles.p10} level={'1'}>
          <CText category={'label'}>{dataExercise.label}</CText>
          <CText style={cStyles.mt10} category={'p1'}>{dataExercise.description}</CText>
          {dataExercise.attachedFiles.length > 0 && (
            <AttachedFile containerStyle={cStyles.mt16} files={dataExercise.attachedFiles} download />
          )}
        </Layout>

        <Layout style={[cStyles.px10, cStyles.py16]} level={'3'}>
          {dataExercise.userCompleted && (
            <CText category={'label'} maxLines={10}>
              {`${dataExercise.userCompleted.length} ${t('assignment_details:user_completed')}`}
            </CText>
          )}
          {dataExercise.groupCompleted && (
            <CText category={'label'} maxLines={10}>
              {`${dataExercise.groupCompleted.length} ${t('assignment_details:group_completed')}`}
            </CText>
          )}
        </Layout>

        {dataExercise.userCompleted && (
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.p10}
            scrollEnabled={false}
            data={dataExercise.userCompleted}
            renderItem={info => {
              let tmpExt = Assets[info.item.attachedFiles.type];
              if (!tmpExt) tmpExt = Assets.file;
              return (
                <Card disabled>
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                    <View style={[cStyles.row, cStyles.itemsCenter, styles.bg_content_card]}>
                      <FastImage
                        style={{height: moderateScale(40), width: moderateScale(40)}}
                        source={tmpExt}
                        resizeMode={'contain'}
                      />
                      <View style={cStyles.ml10}>
                        <CText style={cStyles.mt5} category={'label'}>{info.item.attachedFiles.name}</CText>
                        <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                        <Avatar style={cStyles.mt5} source={{uri: info.item.avatar}} size={'small'} />
                      </View>
                    </View>
                    <Button size={'tiny'}>{t('assignment_details:review')}</Button>
                  </View>
                </Card>
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.my5} />}
          />
        )}
        {dataExercise.groupCompleted && (
          <List
            style={{backgroundColor: theme['background-basic-color-3']}}
            contentContainerStyle={cStyles.px10}
            scrollEnabled={false}
            data={dataExercise.groupCompleted}
            renderItem={info => {
              let tmpExt = Assets[info.item.attachedFiles.type];
              if (!tmpExt) tmpExt = Assets.file;
              return (
                <Card disabled>
                  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween]}>
                    <View style={[cStyles.row, cStyles.itemsCenter, styles.bg_content_card, cStyles.py5]}>
                      <FastImage
                        style={{height: moderateScale(40), width: moderateScale(40)}}
                        source={tmpExt}
                        resizeMode={'contain'}
                      />
                      <View style={cStyles.ml10}>
                        <CText category={'label'}>{info.item.attachedFiles.name}</CText>
                        <CText style={cStyles.mt5} category={'c1'} appearance={'hint'}>{info.item.createdAt}</CText>
                        <View style={[cStyles.row, cStyles.itemsCenter, cStyles.mt5]}>
                          {info.item.avatar.map((item, index) => {
                            if (index === 3) {
                              return (
                                <View style={[cStyles.rounded7, cStyles.center, {height: 32, width: 32, backgroundColor: theme['background-basic-color-3']}]}>
                                  <CText category={'p1'}>{'+1'}</CText>
                                </View>
                              )
                            } else if (index < 3) {
                              return <Avatar style={cStyles.mr5} source={{uri: item}} size={'small'} />
                            } else {
                              return null;
                            }
                          })}
                        </View>
                      </View>
                    </View>
                    <Button size={'tiny'}>{t('assignment_details:review')}</Button>
                  </View>
                </Card>
              )
            }}
            keyExtractor={(item, index) => item.id + index}
            ItemSeparatorComponent={() => <Divider style={cStyles.m5} />}
          />
        )}
      </ScrollView>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -14,
    marginVertical: -6,
  }
});

export default AssignmentDetails;
