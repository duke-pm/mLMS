/**
 ** Name: Students screen
 ** Author: IT-Team
 ** CreateAt: 2021
 ** Description: Description of index.js
 **/
import React, {useState, useEffect} from 'react';
import {
  List, ListItem, ButtonGroup, Button, Icon, useTheme, Divider,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
/* COMPONENTS */
import CContainer from '~/components/CContainer';
import CTopNavigation from '~/components/CTopNavigation';
import CLoading from '~/components/CLoading';
import CAvatar from '~/components/CAvatar';
import CText from '~/components/CText';
import CIcon from '~/components/CIcon';
/* COMMON */
import {cStyles} from '~/utils/style';
import Routes from '~/navigator/Routes';
/* REDUX */

const mockupData = [
  {
    id: 'student1',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Abbott.jpg',
    firstName: 'Abbott',
    lastName: 'Keitch',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'abbott@withinpixels.com',
    phone: '+1-202-555-0175',
    address: '933 8th Street Stamford, CT 06902',
    isOnline: true,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student2',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Arnold.jpg',
    firstName: 'Arnold',
    lastName: 'Matlock',
    group: 'company',
    company: 'DTP-Education',
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'arnold@withinpixels.com',
    phone: '+1-202-555-0141',
    address: '906 Valley Road Michigan City Road Michigan City, IN 46360',
    isOnline: false,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student3',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Barrera.jpg',
    firstName: 'Barrera',
    lastName: 'Bradbury',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'barrera@withinpixels.com',
    phone: '+1-202-555-0196',
    address: '183 River Street Passaic, NJ 07055',
    isOnline: true,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student4',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Blair.jpg',
    firstName: 'Blair',
    lastName: 'Strangeway',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'blair@withinpixels.com',
    phone: '+1-202-555-0118',
    address: '143 Jones Street Eau Claire, WI 54701',
    isOnline: false,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student5',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Boyle.jpg',
    firstName: 'Boyle',
    lastName: 'Winters',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'boyle@withinpixels.com',
    phone: '+1-202-555-0177',
    address: '218 Pearl Street Brandon, FL 33510',
    isOnline: false,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student6',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Christy.jpg',
    firstName: 'Christy',
    lastName: 'Camacho',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'christy@withinpixels.com',
    phone: '+1-202-555-0136',
    address: '329 Bridge Street Desoto, TX 75115',
    isOnline: false,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
  {
    id: 'student7',
    avatar: 'http://react-material.fusetheme.com/assets/images/avatars/Copeland.jpg',
    firstName: 'Copeland',
    lastName: 'Redcliff',
    group: 'person',
    company: null,
    gender: 'male',
    dob: '18/10/1993',
    job: 'Mobile Developer',
    interests: 'Football',
    school: 'Finance-Marketing University',
    majors: 'IT',
    contactPerson: 'Henderson Cambias',
    contactPhone: '+1-202-555-0151',
    contactEmail: 'henderson@withinpixels.com',
    protectorDad: 'Shepard Rosco',
    protectorDadPhone: '+1-202-555-0173',
    protectorDadEmail: 'shepard@withinpixels.com',
    protectorMom: 'Josefina Lakefield',
    protectorMomPhone: '+1-202-555-0160',
    protectorMomEmail: 'josefina@withinpixels.com',
    email: 'copeland@withinpixels.com',
    phone: '+1-202-555-0107',
    address: '956 6th Avenue North Bergen, NJ 0704',
    isOnline: false,
    sessions: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            start: 'MAR 15',
            end: 'JUN 30',
            name: 'Learn Web Development with project',
            status: 'done',
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn Android Development with project',
            status: 'done',
          },
          {
            id: 2,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn iOS Development with project',
            status: 'pending',
          },
          {
            id: 3,
            start: 'OCT 10',
            end: 'DEC 31',
            name: 'Learn React Native Development with project',
            status: 'active',
          },
        ],
      }
    ],
    feeInvoices: [
      {
        title: 'Session 2020-2021',
        data: [
          {
            id: 1,
            name: 'Dashlite - Conceptual App Dashboard - Regular License',
            price: '500',
            qty: 5,
            amount: '2,500',
            status: 'paid'
          },
          {
            id: 2,
            name: 'Invest Management Dashboard - Regular License',
            price: '100',
            qty: 1,
            amount: '100',
            status: 'unpaid'
          },
        ],
      },
      {
        title: 'Session 2021-2022',
        data: [
          {
            id: 1,
            name: '6 months premium support',
            price: '1,000',
            qty: 2,
            amount: '2,000',
            status: 'unpaid'
          },
        ],
      },
    ],
  },
];

/*********************
 ** OTHER COMPONENT **
 *********************/
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
        accessoryLeft={propsI => CIcon(propsI, 'eva', 'message-square')}
        onPress={handleSendMessage}
      />

      <Button
        accessoryLeft={propsI => CIcon(propsI, 'eva', 'phone')}
        onPress={handleCallPhone}
      />
    </ButtonGroup>
  )
}

/********************
 ** MAIN COMPONENT **
 ********************/
function Students(props) {
  const theme = useTheme();
  const {navigation} = props;

  /** Use state */
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState(mockupData);

  /*****************
   ** HANDLE FUNC **
   *****************/
  const handleGoDetails = (idxStudent) => {
    navigation.navigate(Routes.STUDENT_DETAILS.name, {
      data: students[idxStudent],
    });
  };

  /**********
   ** FUNC **
   **********/

  /****************
   ** LIFE CYCLE **
   ****************/
  useEffect(() => {
    setLoading(false);
  }, []);

  /************
   ** RENDER **
   ************/
  return (
    <CContainer
      safeArea={['top', 'bottom']}
      headerComponent={
        <CTopNavigation
          title={'students:title'}
          subtitle={'React Native Class'}
          back />
      }>
      {/** Content of page */}
      {!loading && (
        <List
          style={{backgroundColor: theme['background-basic-color-3']}}
          data={students}
          renderItem={info => {
            return (
              <ListItem
                title={propsT =>
                  <CText style={cStyles.ml10} category={'label'}>
                    {`${info.item.firstName} ${info.item.lastName}`}
                  </CText>
                }
                description={propsD => 
                  <CText style={cStyles.ml10} category={'c1'} appearance={'hint'}>
                    {`${info.item.email}`}
                  </CText>
                }
                accessoryLeft={<CAvatar source={{uri: info.item.avatar}} />}
                accessoryRight={() => RenderActionsStudent(info)}
                onPress={() => handleGoDetails(info.index)}
              />
            )
          }}
          keyExtractor={(item, index) => item.id + index}
          ItemSeparatorComponent={() => <Divider />}
        />
      )}
      
      {/** Loading of page */}
      <CLoading show={loading} />
    </CContainer>
  );
}

const styles = StyleSheet.create({
});

export default Students;
