/**
 ** Name: Custom text
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of CText.js
 **/
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Button, Text} from '@ui-kitten/components';
import {View} from 'react-native';

function CText(props) {
  const {
    style = {},
    category = '',
    maxLines = 5,
  } = props;
  let lineHeight = 0;
  if (category === 'h1') {
    lineHeight = 34;
  } else if (category === 'h2') {
    lineHeight = 32;
  } else if (category === 'h3') {
    lineHeight = 30;
  } else if (category === 'h4') {
    lineHeight = 28;
  } else if (category === 'h5') {
    lineHeight = 26;
  } else if (category === 'h6') {
    lineHeight = 24;
  } else if (category === 's1') {
    lineHeight = 22;
  } else if (category === 's2') {
    lineHeight = 21;
  } else if (category === 'p1') {
    lineHeight = 20;
  } else if (category === 'p2') {
    lineHeight = 19;
  } else if (category === 'c1') {
    lineHeight = 17;
  } else if (category === 'c2') {
    lineHeight = 15;
  } else if (category === 'label') {
    lineHeight = 20;
  }

  /** Use state */
  const [hasShowMore, setHasShowMore] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [maxL, setMaxL] = useState(maxLines);

  const handleShowMore = () => {
    if (!showMore) setMaxL(maxLines);
    else setMaxL(0);
    setShowMore(!showMore);
  };

  const onLayout = event => {
    const {height} = event.nativeEvent.layout;
    const maxHeight = maxL * lineHeight;
    if (maxL > 0 && height > maxHeight) {
      setShowMore(true);
      setHasShowMore(true);
    }
  };

  /************
   ** RENDER **
   ************/
  return (
    <View>
      <Text {...props}
        style={[style, {lineHeight}]}
        ellipsizeMode={'tail'}
        numberOfLines={props.numberOfLines || (showMore ? maxLines : 0)}
        onLayout={onLayout}
      >
        {props.children}
      </Text>
      {hasShowMore && (
        <Button appearance={'ghost'} size={'small'} status={'primary'} onPress={handleShowMore}>
          {showMore ? 'Show more' : 'Show less'}
        </Button>
      )}
    </View>
  );
}

CText.propTypes = {
  style: PropTypes.object,
  category: PropTypes.string,
  maxLines: PropTypes.number,
}

export default CText;
