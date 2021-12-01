/**
 ** Name: Custom alert
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CAlert.js
 **/
import PropTypes from 'prop-types';
import React, {useRef, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import {Modal, Card, Text, Button, useTheme} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/* COMPONENTS */

/* COMMON */
import {colors, cStyles} from '~/utils/style';
import { moderateScale } from '~/utils/helper';
/* REDUX */


function CAlert(props) {
  const theme = useTheme();
  const {t} = useTranslation();
  const {
    contentStyle = {},
    show = false,
    success = false,
    error = false,
    cancel = false,
    label = '',
    message = '',
    customMessage = null,
    textOk = 'common:ok',
    textCancel = 'common:cancel',
    statusOk = undefined,
    onBackdrop = () => null,
    onOk = undefined,
    onCancel = undefined,
  } = props;

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleBackdrop = () => {
    if (onBackdrop) onBackdrop();
  };

  const handleOk = () => {
    if (onOk) onOk();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
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
      <Card disabled style={[cStyles.mx16, contentStyle]}>
        {(success || error || label) && (
          <View style={[cStyles.flex1, cStyles.itemsCenter]}>
            {success && (
              <View style={cStyles.itemsCenter}>
                <IoniIcon name={'checkmark-circle-outline'} size={moderateScale(60)} color={theme['color-success-500']} />
                <Text style={cStyles.mt10} category={'h6'}>{t(label !== '' ? label : 'common:success')}</Text>
              </View>
            )}
            {error && (
              <View style={cStyles.itemsCenter}>
                <IoniIcon name={'close-circle-outline'} size={moderateScale(60)} color={theme['color-danger-500']} />
                <Text style={cStyles.mt10} category={'h6'}>{t(label !== '' ? label : 'common:error')}</Text>
              </View>
            )}
            {!success && !error && (
              <View style={cStyles.itemsCenter}>
                <Text category={'s1'}>{t(label)}</Text>
              </View>
            )}
          </View>
        )}

        {message !== '' && !customMessage && (
          <View style={[cStyles.my16, styles.content]}>
            <Text style={cStyles.textCenter} category={'p1'}>{t(message)}</Text>
          </View>
        )}
        {customMessage && (
          <View style={[cStyles.my16, styles.content]}>
            {customMessage}
          </View>
        )}

        {(cancel || onOk) && (
          <View
            style={[
              cStyles.mt16,
              cStyles.row,
              cStyles.itemsCenter,
              cStyles.justifyBetween,
              styles.footer
            ]}>
            {cancel && (
              <Button
                style={[styles.btn_main, cancel && styles.btn_cancel]}
                status={'basic'}
                appearance={'filled'}
                onPress={handleCancel}>
                {t(textCancel)}
              </Button>
            )}
            {onOk && (
              <Button 
                style={[styles.btn_main, cancel && styles.btn_cancel]}
                status={statusOk}
                appearance={'filled'}
                onPress={handleOk}>
                {t(textOk)}
              </Button>
            )}
          </View>
        )}
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
  btn_main: {
    width: '100%',
  },
  btn_cancel: {
    width: '45%',
  },
});

CAlert.propTypes = {
  contentStyle: PropTypes.object,
  show: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  cancel: PropTypes.bool,
  label: PropTypes.string,
  message: PropTypes.string,
  customMessage: PropTypes.element,
  textOk: PropTypes.string,
  textCancel: PropTypes.string,
  statusOk: PropTypes.string,
  onBackdrop: PropTypes.func,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default CAlert;
