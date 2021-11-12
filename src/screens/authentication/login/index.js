/**
 ** Name: Login screen
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {createRef, useState, useEffect, useContext} from 'react';
import {StatusBar, StyleSheet, UIManager} from 'react-native';
import {Layout, Text, Button} from '@ui-kitten/components';
import {IS_ANDROID} from '~/utils/helper';
/* COMPONENTS */

/* COMMON */
import {ThemeContext} from '~/configs/theme-context';
import {cStyles} from '~/utils/style';

/* REDUX */

/** All init */
if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const INPUT_NAME = {
  USER_NAME: 'userName',
  PASSWORD: 'password'
};
/** All ref */
let userNameRef = createRef();
let passwordRef = createRef();

function Login(props) {

  const themeContext = useContext(ThemeContext);

  /** Use State */

  /*****************
   ** HANDLE FUNC **
   *****************/

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <Layout style={[cStyles.flexCenter]}>
      <Text category={'h1'}>LOGIN PAGE</Text>
      <Button style={cStyles.my16} onPress={themeContext.onToggleTheme}>TOGGLE THEME</Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
});

export default Login;
