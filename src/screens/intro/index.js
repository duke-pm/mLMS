/**
 ** Name: Intro screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of Intro.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Text, ViewPager, Button} from '@ui-kitten/components';
import {StyleSheet, StatusBar, Image, LayoutAnimation, UIManager, View} from 'react-native';
/** COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
/* COMMON */
import {IS_ANDROID, moderateScale, sW, resetRoute} from '~/utils/helper';
import Routes from '~/navigator/Routes';
import Assets from '~/utils/asset/Assets';
import {colors, cStyles} from '~/utils/style';

/** All init */
if (IS_ANDROID) {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/*********************
 ** OTHER COMPONENT **  
 *********************/
const RenderButtonFooter = (t, onPress) => {
  return (
    <View style={[cStyles.mt40, cStyles.mx40]}>
      <Button appearance='outline' onPress={onPress}>
        {t('log_in:title')}
      </Button>
    </View>
  )
}

const RenderPageIntro = (t, image, title, caption, footer = null) => {
  return (
    <View style={cStyles.itemsCenter}>
      <View style={styles.con_layout}>
        <Image style={[cStyles.mt40, styles.img_intro]} source={image} resizeMode={'contain'} />
        <Text style={[cStyles.textCenter, cStyles.mt36]} category='h5'>{t(title)}</Text>
        <Text style={[cStyles.textCenter, cStyles.mt24]} category='p1'>{t(caption)}</Text>
        {footer}
      </View>
    </View>
  );
}

/********************
 ** MAIN COMPONENT **  
 ********************/
function Intro(props) {
  const {t} = useTranslation();
  const {navigation} = props;

  /** Use state */
  const [pageIndex, setPageIndex] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleChangePage = newIndex => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setPageIndex(newIndex);
  };

  const handleGoLogin = () => {
    resetRoute(navigation, Routes.AUTHENTICATION.name);
  };
  
  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    StatusBar.setBarStyle('dark-content', true);
    IS_ANDROID && StatusBar.setTranslucent(false);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer safeArea={['top', 'bottom']}>
      {/** Header */}
      <CTopNavigation
        customRightComponent={
          <Button appearance='ghost' onPress={handleGoLogin}>{t('common:skip')}</Button>
        }
      />

      {/** Content */}
      <ViewPager
        selectedIndex={pageIndex}
        onSelect={handleChangePage}>
        {RenderPageIntro(t, Assets.imgIntro1, 'intro:intro_1_title', 'intro:intro_1_content')}
        {RenderPageIntro(t, Assets.imgIntro2, 'intro:intro_2_title', 'intro:intro_2_content')}
        {RenderPageIntro(t, Assets.imgIntro3,'intro:intro_3_title','intro:intro_3_content',
          RenderButtonFooter(t, handleGoLogin) )
        }
      </ViewPager>

      {/** Dot paging */}
      <Layout style={[cStyles.flex1, cStyles.itemsCenter, cStyles.justifyEnd]} level='1'>
        <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.mb24]}>
          <Layout style={[
            cStyles.mx6,
            cStyles.rounded1,
            styles.con_page_unactive,
            pageIndex === 0 && styles.con_page_active]}
          />
          <Layout style={[
            cStyles.mx6,
            cStyles.rounded1,
            styles.con_page_unactive,
            pageIndex === 1 && styles.con_page_active]}
          />
          <Layout style={[
            cStyles.mx6,
            cStyles.rounded1,
            styles.con_page_unactive,
            pageIndex === 2 && styles.con_page_active]}
          />
        </Layout>
      </Layout>
    </CContainer>
  )
}

const styles = StyleSheet.create({
  con_layout: {
    width: sW('75%'),
  },
  img_intro: {
    height: sW('75%'),
    width: sW('75%'),
  },
  con_page_unactive: {
    height: moderateScale(4),
    width: moderateScale(10),
    backgroundColor: colors.TERTIARY,
  },
  con_page_active: {
    height: moderateScale(4),
    width: moderateScale(20),
    backgroundColor: colors.PRIMARY,
  },
});

export default Intro;
