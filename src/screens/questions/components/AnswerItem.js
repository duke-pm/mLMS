/**
 ** Name: Answer Item
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of AnswerItem.js
 **/
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme, Card, Button, ListItem} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import StarRating from 'react-native-star-rating';
/* COMPONENTS */
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import CAlert from '~/components/CAlert';
/* COMMON */
import {cStyles} from '~/utils/style';
import {moderateScale} from '~/utils/helper';

/*********************
 ** OTHER COMPONENT **
 *********************/
const RenderLeftHeader = (info) => (
  <CAvatar source={{uri: info.avatar}} />
);

const RenderRightHeader = (numRate) => {
  const theme = useTheme();
  return (
    <View style={[cStyles.row, cStyles.itemsCenter]}>
      {numRate > 0 && (
        <CText
          style={cStyles.mr5}
          status={'warning'}
          category={'label'}>
          {numRate}
        </CText>
      )}
      <StarRating
        disabled={true}
        maxStars={1}
        starSize={moderateScale(20)}
        rating={numRate}
        fullStarColor={theme['color-warning-500']}
      />
    </View>
)};


/********************
 ** MAIN COMPONENT **
 ********************/
function AnswerItem(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const {
    style = {},
    data = null,
  } = props;

  /** Use state */
  const [showRate, setShowRate] = useState(false);
  const [rate, setRate] = useState(0);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const toggleRate = () => {
    setRate(0);
    setShowRate(!showRate);
  };

  const handleRate = rating => {
    setRate(rating);
  };

  const handleComment = () => {

  };

  /**********
   ** FUNC **
   **********/
  const onSubmitRate = () => {
  
  };

  /****************
   ** LIFE CYCLE **
   ****************/

  /************
   ** RENDER **
   ************/
  if (!data) return null;
  return (
    <>
      <Card
        style={[cStyles.mx10, style]}
        header={(propsH) => (
          <ListItem
            style={cStyles.px12}
            title={() => <CText style={cStyles.ml10} category={'label'}>{data.createdUser}</CText>}
            description={() => <CText style={cStyles.ml10} category={'c1'} appearance='hint'>{data.createdAt}</CText>}
            accessoryLeft={() => RenderLeftHeader(data)}
            accessoryRight={() => RenderRightHeader(data.rate)}
          />
        )}
        footer={(propsF) => (
          <View style={[cStyles.row, cStyles.itemsCenter, cStyles.justifyBetween, cStyles.p10]}>
            <Button appearance={'ghost'} size={'small'} status={'basic'} onPress={handleComment}>
              {`${t('question_details:add_comment')} (${data.comments.length})`}
            </Button>
            <Button appearance={'ghost'} size={'small'} status={'basic'} onPress={toggleRate}>
              {`${t('question_details:rate_answer')} (${data.numRate})`}
            </Button>
          </View>
        )}
      >
        <View style={styles.bg_content_card}>
          <CText category={'p1'}>{data.description}</CText>
        </View>
      </Card>

      <CAlert
      show={showRate}
      cancel={false}
      label={'question_details:rate_this_question'}
      customMessage={
        <StarRating
          containerStyle={cStyles.px36}
          starSize={moderateScale(30)}
          rating={rate}
          fullStarColor={theme['color-warning-500']}
          selectedStar={handleRate}
        />
      }
      onBackdrop={toggleRate}
      onOk={onSubmitRate}
      />
    </>
  );
}

const styles = StyleSheet.create({
  bg_content_card: {
    marginHorizontal: -8,
    marginVertical: -6,
  }
});

AnswerItem.propTypes = {
  style: PropTypes.object,
  data: PropTypes.object,
};

export default AnswerItem;
