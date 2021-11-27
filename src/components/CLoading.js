/**
 ** Name: Custom loading
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CLoading.js
 **/
import PropTypes from 'prop-types';
import React from 'react';
import {Spinner} from '@ui-kitten/components';
import {View} from 'react-native';
import Modal from 'react-native-modal';
/* COMMON */
import { cStyles } from '~/utils/style';

function CLoading(props) {
  const {
    show = false,
  } = props;

  /************
   ** RENDER **
   ************/
  return (
    <Modal
      style={cStyles.m0}
      isVisible={show}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      coverScreen={true}
      hideModalContentWhileAnimating={true}
      renderToHardwareTextureAndroid={true}
      onBackdropPress={() => null}
      onBackButtonPress={() => null}
    >
      <View style={cStyles.flexCenter}>
        <Spinner />
      </View>
    </Modal>
  );
}

CLoading.propTypes = {
  show: PropTypes.bool,
};

export default CLoading;
