/**
 ** Name: Intro screen
 ** Author: DTP-Education
 ** CreateAt: 2021
 ** Description: Description of Intro.js
 **/
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, SafeAreaView, Image} from 'react-native';
import {Layout, Text, TopNavigation, ViewPager, Button} from '@ui-kitten/components';
/* COMMON */
import {colors, cStyles} from '~/utils/style';
import Assets from '~/utils/asset/Assets';
import {moderateScale, sW} from '~/utils/helper';
/* REDUX */


function Intro(props) {
  const {t} = useTranslation();

  /** Use state */
  const [pageIndex, setPageIndex] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleChangePage = newIndex => setPageIndex(newIndex);
  
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
    <SafeAreaView style={cStyles.flex1}>
      <Layout style={cStyles.flex1}>
        <TopNavigation accessoryRight={
          <Button appearance='ghost'>Skip</Button>
        } />

        <ViewPager
          selectedIndex={pageIndex}
          onSelect={handleChangePage}>
          <Layout style={cStyles.itemsCenter}>
            <Layout style={styles.con_layout}>
              <Image style={[cStyles.mt40, styles.img_intro]} source={Assets.imgIntro1} resizeMode={'contain'} />
              <Text style={[cStyles.textCenter, cStyles.mt36]} category='h5'>{t('intro:intro_1_title')}</Text>
              <Text style={[cStyles.textCenter, cStyles.mt24]} category='p1'>{t('intro:intro_1_content')}</Text>
            </Layout>
          </Layout>
          
          <Layout style={cStyles.itemsCenter}>
            <Layout style={styles.con_layout}>
              <Image style={[cStyles.mt40, styles.img_intro]} source={Assets.imgIntro2} resizeMode={'contain'} />
              <Text style={[cStyles.textCenter, cStyles.mt36]} category='h5'>{t('intro:intro_2_title')}</Text>
              <Text style={[cStyles.textCenter, cStyles.mt24]} category='p1'>{t('intro:intro_2_content')}</Text>
            </Layout>
          </Layout>

          <Layout style={cStyles.itemsCenter}>
            <Layout style={styles.con_layout}>
              <Image style={[cStyles.mt40, styles.img_intro]} source={Assets.imgIntro3} resizeMode={'contain'} />
              <Text style={[cStyles.textCenter, cStyles.mt36]} category='h5'>{t('intro:intro_3_title')}</Text>
              <Text style={[cStyles.textCenter, cStyles.mt24]} category='p1'>{t('intro:intro_3_content')}</Text>

              <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyEvenly, cStyles.mt40]}>
                <Button style={styles.btn_main} appearance='filled'>
                  Sign up
                </Button>
                <Button style={styles.btn_main} appearance='outline'>
                  Log in
                </Button>
              </Layout>
            </Layout>
          </Layout>
        </ViewPager>

        <Layout style={[cStyles.flex1, cStyles.itemsCenter]}>
          <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.mt40]}>
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
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  con_layout: {
    width: sW('75%'),
  },
  img_intro: {
    height: sW('75%'),
    width: sW('75%'),
  },
  btn_main: {
    width: sW('30%'),
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
