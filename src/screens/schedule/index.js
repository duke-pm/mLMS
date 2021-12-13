/**
 ** Name: Schedule screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import 'moment';
import 'moment/locale/vi';
import 'moment/locale/en-sg';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import { useTheme, Calendar, Layout, Text, List, Divider } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';
import {View} from 'react-native';
import moment from 'moment';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CText from '~/components/CText';
import CLoading from '~/components/CLoading';
/* COMMON */
import { moderateScale } from '~/utils/helper';
import { cStyles } from '~/utils/style';
/* REDUX */


const RenderDayCalendar = (date, style, markers) => {
  let dateFormat = date.format('YYYY-MM-DD');
  let fMarkerOfDate = markers.filter(f => f.date === dateFormat);
  return (
    <View style={[cStyles.flexCenter, style.container]}>
      <Text style={style.text} >{date.date()}</Text>
      {fMarkerOfDate.length > 0 && (
        <View style={[cStyles.row, cStyles.center, cStyles.abs, {bottom: 5}]}>
          {fMarkerOfDate[0].markers.map((itemM, indexM) => (
            <View key={itemM.id + '_' + indexM} style={cStyles.center}>
              <View style={[cStyles.mr3, cStyles.rounded1, {height: moderateScale(5), width: moderateScale(5), backgroundColor: itemM.color}]} />
            </View>
          ))}
        </View>
      )}
    </View>
  )
};

const RenderContentDate = (info) => {
  return (
    <View style={cStyles.mt10}>
      <View style={[cStyles.row, cStyles.itemsCenter]}>
        <CText category={'label'}>
          {`${moment(info.item.date).format('dddd').toUpperCase()} - ${moment(info.item.date).format('DD/MM')}`}
        </CText>
        <Divider style={[cStyles.flex1, cStyles.ml10]} />
      </View>

      {info.item.markers.map((itemM, indexM) => {
        return (
          <View style={[cStyles.row, cStyles.itemsStart, cStyles.mt16]}>
            <View style={[cStyles.itemsCenter, {flex: 0.3}]}>
              <CText  appearance='hint'>{itemM.timeStart}</CText>
              <CText  appearance='hint'>&#8675;</CText>
              <CText  appearance='hint'>{itemM.timeEnd}</CText>
            </View>
            <View style={[cStyles.row, cStyles.itemsStart, {flex: 0.7}]}>
              <View style={[cStyles.mt5, cStyles.rounded2, {height: moderateScale(10), width: moderateScale(10), backgroundColor: itemM.color}]} />
              <View style={cStyles.ml10}>
                <CText category={'label'}>{itemM.title}</CText>
                <CText style={cStyles.mt5} >{itemM.description}</CText>
              </View>
            </View>
          </View>
        )
      })}
    </View>
  )
};

function Schedule(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(moment());
  const [markers, setMarkers] = useState([]);

  /*****************
   ** HANDLE FUNC **
   *****************/

  /**********
   ** FUNC **
   **********/
  const onSetData = () => {
    let tmp = [
      {
        id: 1,
        date: '2021-12-11',
        timeStart: '08:00',
        timeEnd: '12:00',
        color: 'green',
        title: 'Assignment Deadline',
        description: 'History of UX design',
      },
      {
        id: 2,
        date: '2021-12-11',
        timeStart: '13:00',
        timeEnd: '17:00',
        color: 'indigo',
        title: 'Class Cancelled',
        description: 'Basics of Marketing',
      },
      {
        id: 3,
        date: '2021-12-14',
        timeStart: '08:00',
        timeEnd: '10:00',
        color: 'yellow',
        title: 'Basketball Training',
        description: 'S033 Sport Hall 07',
      },
      {
        id: 4,
        date: '2021-12-16',
        timeStart: '18:00',
        timeEnd: '19:00',
        color: 'green',
        title: 'Class Physics',
        description: '',
      },
      {
        id: 5,
        date: '2021-12-18',
        timeStart: '14:00',
        timeEnd: '17:00',
        color: 'green',
        title: 'Class Math',
        description: 'Circle of space',
      },
    ];
    let tmpMarkers = [], tmpObjMarker = {date: '', markers: []};
    for (let i of tmp) {
      let fMarker = tmpMarkers.findIndex(f => f.date === i.date);
      if (fMarker !== -1) {
        tmpMarkers[fMarker].markers.push(i);
      } else {
        tmpObjMarker = {date: '', markers: []};
        tmpObjMarker.date = i.date;
        tmpObjMarker.markers.push(i);
        tmpMarkers.push(tmpObjMarker);
      }
    }
    setMarkers(tmpMarkers);
  };

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    /** Set data schedule */
    onSetData();''
  }, []);

  useEffect(() => {
    if (loading) {
      if (markers.length > 0) {
        setLoading(false);
      }
    }
  }, [
    loading,
    markers,
  ]);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top']}
      backgroundColor={theme['background-basic-color-3']}
      headerComponent={
        <CTopNavigation
          style={{backgroundColor: theme['background-basic-color-3']}}
          title={'schedule:title'}
          back
          add
        />
      }>
      <Layout style={cStyles.flex1} level={'3'}>
        {!loading && (
          <Calendar
            style={[cStyles.fullWidth, cStyles.pt0, {borderWidth: 0, backgroundColor: theme['background-basic-color-3']}]}
            dateService={new MomentDateService('vi')}
            date={selectedDate}
            min={moment('2015-01-01')}
            max={moment('2030-12-31')}
            onSelect={setSelectedDate}
            renderDay={({date}, style) => RenderDayCalendar(date, style, markers)}
          />
        )}

        {!loading && (
          <List
            style={[ cStyles.roundedTopLeft10, cStyles.roundedTopRight10, {backgroundColor: theme['background-basic-color-1']}]}
            contentContainerStyle={[cStyles.p16, cStyles.pb32]}
            data={markers}
            renderItem={RenderContentDate}
            keyExtractor={(item, index) => item.date + '_' + index}
            ItemSeparatorComponent={() => <View style={cStyles.my10} />}
          />
        )}
      </Layout>

      <CLoading show={loading} />
    </CContainer>
  );
}

export default Schedule;
