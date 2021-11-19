/**
 ** Name: Custom alert
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CAlert.js
 **/
import PropTypes from 'prop-types';
import React, {useRef, useState, useEffect} from 'react';
import {Modal, Card, Text, Button, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */

/* COMMON */
import {colors, cStyles} from '~/utils/style';
import { moderateScale } from '~/utils/helper';
import { useTranslation } from 'react-i18next';
/* REDUX */


function CAlert(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  const {
    show = false,
    success = false,
    error = false,
    message = '',
    textOk = 'common:ok',
    textCancel = 'common:cancel',
    onBackdrop = () => null,
    onOk = undefined,
    onCancel = undefined,
  } = props;

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleBackdrop = () => {
    onBackdrop();
  };

  const handleOk = () => {
    onOk();
  };

  const handleCancel = () => {
    onCancel();
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
    <Modal
      visible={show}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleBackdrop}>
      <Card disabled style={cStyles.mx24}>
        <View style={[cStyles.flex1, cStyles.itemsCenter]}>
          {success && (
            <View style={cStyles.itemsCenter}>
              <IoniIcon name={'checkmark-circle-outline'} size={moderateScale(60)} color={theme['color-success-500']} />
              <Text style={cStyles.mt10} category={'h6'}>{t('common:success')}</Text>
            </View>
          )}
          {error && (
            <View style={cStyles.itemsCenter}>
              <IoniIcon name={'close-circle-outline'} size={moderateScale(60)} color={theme['color-danger-500']} />
              <Text style={cStyles.mt10} category={'h6'}>{t('common:error')}</Text>
            </View>
          )}
        </View>

        <View style={[cStyles.my16, styles.content]}>
          <Text style={cStyles.textCenter} category={'p1'}>{message}</Text>
        </View>

        <View style={[cStyles.mt16, styles.footer]}>
          {onOk && (
            <Button appearance={'filled'} onPress={handleOk}>
              {t(textOk)}
            </Button>
          )}
          {onCancel && (
            <Button appearance={'outline'} onPress={handleCancel}>
              {t(textCancel)}
            </Button>
          )}
        </View>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    
  },
  content: {

  },
  footer: {

  },
  backdrop: {
    backgroundColor: colors.BG_BACKDROP,
  },
});

CAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string,
  textOk: PropTypes.string,
  textCancel: PropTypes.string,
  onBackdrop: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CAlert;
