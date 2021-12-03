/**
 ** Name: Custom Attached File
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of AttachedFile.js
 **/
import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Button, Icon} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
/* COMPONENTS */
import CText from '~/components/CText';
/* COMMON */
import Assets from '~/utils/asset/Assets';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';

const RenderDownloadIcon = props => (
  <Icon {...props} name={'download-outline'} />
);

function AttachedFile(props) {
  const {t} = useTranslation();
  const {
    containerStyle = {},
    style = {},
    files = [],
    download = false,
  } = props;

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
  if (files.length === 0) return null;
  return (
    <View style={containerStyle}>
      <CText category={'label'}>{t('common:attached_files')}</CText>
      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.flexWrap, cStyles.mt5]}>
        {files.map((itemFile, indexFile) => {
          let tmpExt = Assets[itemFile.type];
          if (!tmpExt) {
            tmpExt = Assets.file;
          }
          return (
            <Layout
              key={itemFile.id + '_' + indexFile}
              style={[
                cStyles.row,
                cStyles.itemsCenter,
                cStyles.justifyBetween,
                cStyles.rounded1,
                cStyles.p5,
                cStyles.mr5,
                cStyles.mt5,
                style,
              ]} level={'3'}>
              <View
                style={[
                  cStyles.row,
                  cStyles.itemsCenter,
                ]}>
                <FastImage
                  style={styles.file}
                  source={tmpExt}
                  resizeMode={'contain'}
                />

                <View style={cStyles.mx5}>
                  <CText category={'c1'}>{itemFile.name}</CText>
                  <CText category={'c1'} appearance={'hint'}>{`${itemFile.size} Mb`}</CText>
                </View>
              </View>

              {download && (
                <Button
                  style={cStyles.mx10}
                  appearance={'outline'}
                  size={'tiny'}
                  status={'basic'}
                  accessoryLeft={RenderDownloadIcon}
                  onPress={() => handleDownloadFile(indexFile, itemFile)}
                />
              )}
            </Layout>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  file: {
    height: moderateScale(30),
    width: moderateScale(30),
  },
});

AttachedFile.propTypes = {
  containerStyle: PropTypes.object,
  style: PropTypes.object,
  files: PropTypes.array,
  download: PropTypes.bool,
};

export default AttachedFile;
