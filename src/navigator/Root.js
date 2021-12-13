/**
 ** Name: Root main of App
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Root.js
 **/
import React from 'react';
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {enableScreens} from 'react-native-screens';
import {useTheme} from '@ui-kitten/components';
import IoniIcon from 'react-native-vector-icons/Ionicons';
/** COMPONENTS */
import CText from '~/components/CText';
/** COMMON */
import Routes from './Routes';

/** INIT NAVIGATOR OF APP */
enableScreens(true);
const StackMain = createNativeStackNavigator();
const TabMain = createBottomTabNavigator();

export function BottomTabMain(props) {
  const {t} = useTranslation();
  const theme = useTheme();
  return (
    <TabMain.Navigator
      initialRouteName={Routes.TAB.HOME.name}
      backBehavior={'history'}
      screenOptions={({route}) => ({
        tabBarStyle: {
          backgroundColor: theme['background-basic-color-1'],
        },
        tabBarActiveTintColor: theme['color-primary-500'],
        headerShown: false,
        lazy: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';
          switch (route.name) {
            case Routes.TAB.ACCOUNT.name:
              iconName = focused ? 'person' : 'person-outline';
              break;
            case Routes.TAB.CONVERSATION.name:
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case Routes.TAB.CLASSES.name:
              iconName = focused ? 'library' : 'library-outline';
              break;
            default:
              iconName = focused ? 'home' : 'home-outline';
              break;
          }
          return <IoniIcon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({focused, color, position}) => {
          let label = '';
          switch (route.name) {
            case Routes.TAB.ACCOUNT.name:
              label = 'account:title';
              break;
            case Routes.TAB.CONVERSATION.name:
              label = 'conversation:title';
              break;
            case Routes.TAB.CLASSES.name:
                label = 'classes:title';
                break;
            default:
              label = 'home:title';
              break;
          }
          return <CText style={{color}} category={'c1'}>{t(label)}</CText>
        },
      })}>
      <TabMain.Screen
        name={Routes.TAB.HOME.name}
        component={Routes.TAB.HOME.path}
      />
      <TabMain.Screen
        name={Routes.TAB.CONVERSATION.name}
        component={Routes.TAB.CONVERSATION.path}
        options={{
          tabBarBadge: true,
          tabBarBadgeStyle: {
            height: 12,
            width: 12,
            minHeight: 12,
            minWidth: 12,
            borderRadius: 6,
            lineHeight: 10,
            paddingHorizontal: 0,
            backgroundColor: theme['color-danger-500'],
          }
        }}
      />
      <TabMain.Screen
        name={Routes.TAB.CLASSES.name}
        component={Routes.TAB.CLASSES.path}
      />
      <TabMain.Screen
        name={Routes.TAB.ACCOUNT.name}
        component={Routes.TAB.ACCOUNT.path}
      />
    </TabMain.Navigator>
  )
}

export function RootMain(props) {
  return (
    <StackMain.Navigator
      initialRouteName={Routes.INTRO.name}
      screenOptions={{
        headerShown: false,
      }}>
      <StackMain.Screen
        name={Routes.INTRO.name}
        component={Routes.INTRO.path}
      />
      <StackMain.Screen
        name={Routes.LOGIN_IN.name}
        component={Routes.LOGIN_IN.path}
      />
      <StackMain.Screen
        name={Routes.SIGN_UP.name}
        component={Routes.SIGN_UP.path}
      />
      <StackMain.Screen
        name={Routes.FORGOT_PASSWORD.name}
        component={Routes.FORGOT_PASSWORD.path}
      />
      <StackMain.Screen
        name={Routes.RESET_PASSWORD.name}
        component={Routes.RESET_PASSWORD.path}
      />
      <StackMain.Screen
        name={Routes.TAB.name}
        component={BottomTabMain}
      />
      <StackMain.Screen
        name={Routes.FAVOURITE.name}
        component={Routes.FAVOURITE.path}
      />
      <StackMain.Screen
        name={Routes.SETTINGS.name}
        component={Routes.SETTINGS.path}
      />
      <StackMain.Screen
        name={Routes.APPEARANCE.name}
        component={Routes.APPEARANCE.path}
      />
      <StackMain.Screen
        name={Routes.INFORMATION.name}
        component={Routes.INFORMATION.path}
      />
      <StackMain.Screen
        name={Routes.LANGUAGES.name}
        component={Routes.LANGUAGES.path}
      />
      <StackMain.Screen
        name={Routes.TERM.name}
        component={Routes.TERM.path}
      />
      <StackMain.Screen
        name={Routes.PROFILE.name}
        component={Routes.PROFILE.path}
      />
      <StackMain.Screen
        name={Routes.HELP.name}
        component={Routes.HELP.path}
      />
      <StackMain.Screen
        name={Routes.CLASS_DETAILS.name}
        component={Routes.CLASS_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.STUDENTS.name}
        component={Routes.STUDENTS.path}
      />
      <StackMain.Screen
        name={Routes.STUDENT_DETAILS.name}
        component={Routes.STUDENT_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.QUIZ.name}
        component={Routes.QUIZ.path}
      />
      <StackMain.Screen
        name={Routes.ADD_POST.name}
        component={Routes.ADD_POST.path}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <StackMain.Screen
        name={Routes.QUIZ_DETAILS.name}
        component={Routes.QUIZ_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.QUIZ_PROCESS.name}
        component={Routes.QUIZ_PROCESS.path}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <StackMain.Screen
        name={Routes.QUIZ_REVIEW.name}
        component={Routes.QUIZ_REVIEW.path}
      />
      <StackMain.Screen
        name={Routes.QUESTIONS.name}
        component={Routes.QUESTIONS.path}
      />
      <StackMain.Screen
        name={Routes.QUESTION_DETAILS.name}
        component={Routes.QUESTION_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.QUESTION_ANSWERS.name}
        component={Routes.QUESTION_ANSWERS.path}
      />
      <StackMain.Screen
        name={Routes.ADD_ANSWERS.name}
        component={Routes.ADD_ANSWERS.path}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <StackMain.Screen
        name={Routes.ASSIGNMENT.name}
        component={Routes.ASSIGNMENT.path}
      />
      <StackMain.Screen
        name={Routes.ASSIGNMENT_DETAILS.name}
        component={Routes.ASSIGNMENT_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.CONVERSATION_DETAILS.name}
        component={Routes.CONVERSATION_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.ADD_CONVERSATION.name}
        component={Routes.ADD_CONVERSATION.path}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <StackMain.Screen
        name={Routes.POST_DETAILS.name}
        component={Routes.POST_DETAILS.path}
      />
      <StackMain.Screen
        name={Routes.SCHEDULE.name}
        component={Routes.SCHEDULE.path}
      />
      <StackMain.Screen
        name={Routes.NOTIFICATION.name}
        component={Routes.NOTIFICATION.path}
      />
    </StackMain.Navigator>
  );
}

export default RootMain;
