/**
 ** Name: Custom Attached File
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of AttachedFile.js
 **/
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Button, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import * as Progress from 'react-native-progress';
/* COMPONENTS */
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
/* COMMON */
import Assets from '~/utils/asset/Assets';
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';

function AttachedFile(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {
    containerStyle = {},
    style = {},
    files = [],
    download = false,
  } = props;

  /** Use state */
  const [downloading, setDownloading] = useState(false);
  const [choosedFile, setChoosedFile] = useState(null);
  const [downloadFiles, setDownloadFiles] = useState(files);
  const [downloadedFiles, setDownloadedFiles] = useState(files);
  const [progress, setProgress] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleDownloadFile = (idxFile, infoFile) => {
    setChoosedFile(idxFile);
  };

  /**********
   ** FUNC **
   **********/
  const onDownload = () => {
    setDownloading(true);
    setProgress(0);
    let tmpProgress = 0;
    let interval = setInterval(() => {
      tmpProgress += Math.random() / 5;
      if (tmpProgress > 1) {
        let tmpDownloadedFiles = [...downloadedFiles];
        tmpDownloadedFiles[choosedFile].downloaded = true;
        setDownloadedFiles(tmpDownloadedFiles);

        tmpProgress = 1;
        setChoosedFile(null);
        setDownloading(false);
        clearInterval(interval);
      }
      setProgress(tmpProgress);
    }, 500);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    if (typeof choosedFile === 'number') {
      onDownload();
    }
  }, [choosedFile]);

  /************
   ** RENDER **
   ************/
  if (downloadFiles.length === 0) return null;
  return (
    <View style={containerStyle}>
      <CText >{t('common:attached_files')}:</CText>
      <View style={[cStyles.row, cStyles.itemsCenter, cStyles.flexWrap, cStyles.mt5]}>
        {downloadFiles.map((itemFile, indexFile) => {
          let tmpExt = Assets[itemFile.type];
          if (!tmpExt) {
            tmpExt = Assets.file;
          }
          return (
            <Layout key={itemFile.id + '_' + indexFile}
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

              {!downloading && download && !downloadedFiles[indexFile].downloaded && (
                <Button
                  style={cStyles.mx10}
                  appearance={'outline'}
                  size={'tiny'}
                  accessoryLeft={propsI => CIcon(propsI, 'eva', 'download', theme['color-primary-500'])}
                  onPress={() => handleDownloadFile(indexFile, itemFile)}
                />
              )}
              {choosedFile === indexFile && downloading && (
                <Progress.Circle
                  style={cStyles.mx10}
                  showsText
                  size={33}
                  color={theme['color-primary-500']}
                  thickness={2}
                  progress={progress}
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
