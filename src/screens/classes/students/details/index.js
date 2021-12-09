/**
 ** Name: Student details screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useRef, useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {Layout, Icon, Tab, TabView, useTheme, Divider, Card} from '@ui-kitten/components';
import {View, SectionList, ScrollView, StyleSheet} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CAvatar from '~/components/CAvatar';
/* COMMON */
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';
/* REDUX */

const RenderRowTitle = (data) => (
  <View style={[cStyles.row, cStyles.itemsCenter, cStyles.p10]}>
    <CText category={'label'}>&#10019;</CText>
    <CText category={'label'}>  {data}</CText>
  </View>
);

const RenderRowInformations = (theme, iconName,  label, data) => (
  <View style={[cStyles.row, cStyles.itemsStart, cStyles.py10]}>
    <Icon style={styles.icon_row} fill={theme['color-basic-600']} name={iconName} />
    <View style={[cStyles.ml5, styles.con_row_left]}>
      <CText category={'p1'} appearance='hint'>{label}</CText>
    </View>
    <View style={[cStyles.pl10, styles.con_row_right]}>
      <CText category={'p1'}>{data || '-'}</CText>
    </View>
  </View>
);

function StudentDetails(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation, route} = props;
  const dataStudent = route.params.data;

  const [selectedTab, setSelectedTab] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/

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
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={'student_details:title'}
          back
        />
      }>
      <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.pb16, cStyles.px16]} level='1'>
        <CAvatar size={'largest'} source={{uri: dataStudent.avatar}} />
        <View style={cStyles.ml10}>
          <CText category={'label'}>{`${dataStudent.firstName} ${dataStudent.lastName}`}</CText>
          <CText category={'p1'}>{`${dataStudent.email}`}</CText>
        </View>
      </Layout>

      <TabView
        style={cStyles.flex1}
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}>
        <Tab title={t('student_details:informations')}>
          <ScrollView style={cStyles.flex1}>
            <Layout style={cStyles.p10} level='3'>
              <Card disabled header={propsH => RenderRowTitle(t('student_details:basic'))}>
                <View style={styles.bg_content_card}>
                  {RenderRowInformations(theme,
                    'person-outline',
                    t('student_details:full_name'),
                    `${dataStudent.firstName} ${dataStudent.lastName}`
                  )}
                  {RenderRowInformations(theme,
                    'email-outline',
                    t('student_details:email'),
                    `${dataStudent.email}`
                  )}
                  {RenderRowInformations(theme,
                    'phone-outline',
                    t('student_details:phone_number'),
                    `${dataStudent.phone}`
                  )}
                  {RenderRowInformations(theme,
                    'map-outline',
                    t('student_details:address'),
                    `${dataStudent.address}`
                  )}
                  {RenderRowInformations(theme,
                    'smiling-face-outline',
                    t('student_details:gender'),
                    `${dataStudent.gender}`
                  )}
                  {RenderRowInformations(theme,
                    'calendar-outline',
                    t('student_details:dob'),
                    `${dataStudent.dob}`
                  )}
                  {RenderRowInformations(theme,
                    'color-picker-outline',
                    t('student_details:job'),
                    `${dataStudent.job}`
                  )}
                  {RenderRowInformations(theme,
                    'loader-outline',
                    t('student_details:interests'),
                    `${dataStudent.interests}`
                  )}
                  {RenderRowInformations(theme,
                    'home-outline',
                    t('student_details:school'),
                    `${dataStudent.school}`
                  )}
                  {RenderRowInformations(theme,
                    'npm-outline',
                    t('student_details:majors'),
                    `${dataStudent.majors}`
                  )}
                  {dataStudent.group === 'company' && RenderRowInformations(theme,
                    'home-outline',
                    t('student_details:company'),
                    `${dataStudent.company}`
                  )}
                </View>
              </Card>

              <Card
                style={cStyles.mt10}
                disabled
                header={propsH => RenderRowTitle(t('student_details:contact_person'))}>
                <View style={styles.bg_content_card}>
                  {RenderRowInformations(theme,
                    'person-outline',
                    t('student_details:contact_person_name'),
                    `${dataStudent.contactPerson}`
                  )}
                  {RenderRowInformations(theme,
                    'phone-outline',
                    t('student_details:contact_person_phone'),
                    `${dataStudent.contactPhone}`
                  )}
                  {RenderRowInformations(theme,
                    'email-outline',
                    t('student_details:contact_person_email'),
                    `${dataStudent.contactEmail}`
                  )}
                </View>
              </Card>

              <Card
                style={cStyles.mt10}
                disabled
                header={propsH => RenderRowTitle(t('student_details:protector'))}>
                <View style={styles.bg_content_card}>
                  {RenderRowInformations(theme,
                    'person-outline',
                    t('student_details:protector_dad'),
                    `${dataStudent.protectorDad}`
                  )}
                  {RenderRowInformations(theme,
                    'phone-outline',
                    t('student_details:protector_dad_phone'),
                    `${dataStudent.protectorDadPhone}`
                  )}
                  {RenderRowInformations(theme,
                    'email-outline',
                    t('student_details:protector_dad_email'),
                    `${dataStudent.protectorDadEmail}`
                  )}
                  {RenderRowInformations(theme,
                    'person-outline',
                    t('student_details:protector_mom'),
                    `${dataStudent.protectorMom}`
                  )}
                  {RenderRowInformations(theme,
                    'phone-outline',
                    t('student_details:protector_mom_phone'),
                    `${dataStudent.protectorMomPhone}`
                  )}
                  {RenderRowInformations(theme,
                    'email-outline',
                    t('student_details:protector_mom_email'),
                    `${dataStudent.protectorMomEmail}`
                  )}
                </View>
              </Card>
            </Layout>
          </ScrollView>
        </Tab>

        <Tab title={t('student_details:history_sessions')}>
          <SectionList
            contentContainerStyle={cStyles.p10}
            sections={dataStudent.sessions}
            renderItem={info => {
              let statusText = 'basic';
              if (info.item.status === 'done') statusText = 'basic';
              else if (info.item.status === 'pending') statusText = 'warning';
              else statusText = 'success';
              return (
                <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.rounded1, cStyles.p10]}>
                  <View style={[{flex: 0.2}]}>
                    <CText category={'c1'} appearance='hint'>{`${info.item.start}`}</CText>
                    <CText category={'c1'} appearance='hint'>&#8675;</CText>
                    <CText category={'c1'} appearance='hint'>{`${info.item.end}`}</CText>
                  </View>
                  <View style={[cStyles.px10, {flex: 0.6}]}>
                    <CText category={'p1'}>{`${info.item.name}`}</CText>
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.2}]}>
                    <CText category={'label'} status={statusText}>
                      {`${info.item.status}`.toUpperCase()}
                    </CText>
                  </View>
                </Layout>
              )
            }}
            renderSectionHeader={({section: { title }}) => (
              <View style={[cStyles.itemsCenter, cStyles.py5]}>
                <CText category={'label'}>{title}</CText>
              </View>
            )}
            keyExtractor={(item, index) => item.id + '_' + index}
            ItemSeparatorComponent={() => <View style={cStyles.my5} />}
            SectionSeparatorComponent={() => <View style={cStyles.mt5} />}
          />
        </Tab>

        <Tab title={t('student_details:fee_invoice')}>
          <SectionList
            contentContainerStyle={cStyles.p10}
            sections={dataStudent.feeInvoices}
            renderItem={info => {
              let statusText = 'basic';
              if (info.item.status === 'paid') statusText = 'success';
              else statusText = 'warning';
              return (
                <Layout style={[cStyles.row, cStyles.itemsCenter, cStyles.rounded1, cStyles.p10]}>
                  <View style={[{flex: 0.4}]}>
                    <CText category={'p1'}>{`${info.item.name}`}</CText>
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.2}]}>
                    <CText category={'p1'}>{`${info.item.price}$ x${info.item.qty}`}</CText>
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.2}]}>
                    <CText category={'label'}>{`${info.item.amount}$`}</CText>
                  </View>
                  <View style={[cStyles.itemsEnd, {flex: 0.2}]}>
                    <CText category={'label'} status={statusText}>
                      {`${info.item.status}`.toUpperCase()}
                    </CText>
                  </View>
                </Layout>
              )
            }}
            renderSectionHeader={({section: { title }}) => (
              <View style={[cStyles.itemsCenter, cStyles.py5]}>
                <CText category={'label'}>{title}</CText>
              </View>
            )}
            keyExtractor={(item, index) => item.id + '_' + index}
            ItemSeparatorComponent={() => <View style={cStyles.my5} />}
            SectionSeparatorComponent={() => <View style={cStyles.mt5} />}
          />
        </Tab>
      </TabView>
    </CContainer>
  );
}

const styles = StyleSheet.create({
  con_row_left: {flex: 0.3},
  con_row_right: {flex: 0.7},
  icon_row: {
    height: moderateScale(18),
    width: moderateScale(18),
  },
  bg_content_card: {
    marginHorizontal: -14,
    marginVertical: -10,
  },
});

export default StudentDetails;
