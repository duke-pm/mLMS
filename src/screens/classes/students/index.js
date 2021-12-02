/**
 ** Name: Students screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {List, ListItem, ButtonGroup, Button, Icon, useTheme} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
/* COMMON */
import {cStyles} from '~/utils/style';
/* REDUX */

const RenderMessagesIcon = (props) => (
  <Icon {...props} name={'message-square-outline'} />
)

const RenderPhoneIcon = (props) => (
  <Icon {...props} name={'phone-outline'} />
)

const RenderAvatarStudent = (info) => (
  <CAvatar
    showIsOnline={info.item.isOnline}
    source={{uri: info.item.avatar}}
  />
);

const RenderActionsStudent = (info) => {

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleSendMessage = () => {

  };

  const handleCallPhone = () => {

  };

  /************
   ** RENDER **
   ************/
  return (
    <ButtonGroup
      style={[cStyles.row, cStyles.itemsCenter]}
      status={'basic'}
      appearance={'outline'}
      size={'tiny'}>
      <Button
        accessoryLeft={RenderMessagesIcon}
        onPress={handleSendMessage}
      />

      <Button
        accessoryLeft={RenderPhoneIcon}
        onPress={handleCallPhone}
      />
    </ButtonGroup>
  )
}

function Students(props) {
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

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
    let tmpStudents = [
      {
        id: 'student1',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Abbott.jpg',
        firstName: 'Abbott',
        lastName: 'Keitch',
        email: 'abbott@withinpixels.com',
        phone: '+1-202-555-0175',
        address: '933 8th Street Stamford, CT 06902',
        isOnline: true,
      },
      {
        id: 'student2',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
        firstName: 'Arnold',
        lastName: 'Matlock',
        email: 'arnold@withinpixels.com',
        phone: '+1-202-555-0141',
        address: '906 Valley Road Michigan City, IN 46360',
        isOnline: false,
      },
      {
        id: 'student3',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Barrera.jpg',
        firstName: 'Barrera',
        lastName: 'Bradbury',
        email: 'barrera@withinpixels.com',
        phone: '+1-202-555-0196',
        address: '183 River Street Passaic, NJ 07055',
        isOnline: true,
      },
      {
        id: 'student4',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
        firstName: 'Blair',
        lastName: 'Strangeway',
        email: 'blair@withinpixels.com',
        phone: '+1-202-555-0118',
        address: '143 Jones Street Eau Claire, WI 54701',
        isOnline: false,
      },
      {
        id: 'student5',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
        firstName: 'Boyle',
        lastName: 'Winters',
        email: 'boyle@withinpixels.com',
        phone: '+1-202-555-0177',
        address: '218 Pearl Street Brandon, FL 33510',
        isOnline: false,
      },
      {
        id: 'student6',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
        firstName: 'Christy',
        lastName: 'Camacho',
        email: 'christy@withinpixels.com',
        phone: '+1-202-555-0136',
        address: '329 Bridge Street Desoto, TX 75115',
        isOnline: false,
      },
      {
        id: 'student7',
        avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg',
        firstName: 'Copeland',
        lastName: 'Redcliff',
        email: 'copeland@withinpixels.com',
        phone: '+1-202-555-0107',
        address: '956 6th Avenue North Bergen, NJ 0704',
        isOnline: false,
      },
    ];
    setStudents(tmpStudents);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      scrollEnabled={false}
      headerComponent={
        <CTopNavigation title={'students:title'} back />
      }>
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          data={students}
          renderItem={info => {
            return (
              <ListItem
                title={() =>
                  <CText style={cStyles.ml10} category={'label'}>
                    {`${info.item.firstName} ${info.item.lastName}`}
                  </CText>
                }
                description={() => 
                  <CText style={cStyles.ml10} category={'c1'} appearance='hint'>
                    {`${info.item.email}`}
                  </CText>
                }
                accessoryLeft={() => RenderAvatarStudent(info)}
                accessoryRight={() => RenderActionsStudent(info)}
              />
            )
          }}
          keyExtractor={(item, index) => item.id + index}
        />
      )}
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
});

export default Students;
