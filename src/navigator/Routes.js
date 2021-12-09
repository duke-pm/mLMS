/**
 ** Name: All routes of app
 ** Author: Jerry
 ** CreateAt: 2021
 ** Description: Description of Routes.js
 **/
/** INTRO */
import IntroScreen from '~/screens/intro';
/** AUTH */
import LoginScreen from '~/screens/authentication/login';
import SignUpScreen from '~/screens/authentication/signup';
import ForgotPasswordScreen from '~/screens/authentication/forgot_password';
import ResetPasswordScreen from '~/screens/authentication/reset_password';
/** MAIN */
import HomeScreen from '~/screens/home';
import ConversationScreen from '~/screens/conversation';
import NotificationScreen from '~/screens/notification';
import ClassesScreen from '~/screens/classes';
import AccountScreen from '~/screens/account';

import FavouriteScreen from '~/screens/favourite';
import SettingsScreen from '~/screens/settings';
import AppearanceScreen from '~/screens/appearance';
import InformationScreen from '~/screens/information';
import LanguagesScreen from '~/screens/languages';
import TermConditionScreen from '~/screens/term_and_condition';
import ProfileScreen from '~/screens/profile';
import HelpScreen from '~/screens/help';
import ClassDetailsScreen from '~/screens/classes/details';
import StudentsScreen from '~/screens/classes/students';
import QuizScreen from '~/screens/quiz';
import QuizDetailsScreen from '~/screens/quiz/details';
import QuizProcessScreen from '~/screens/quiz/process';
import QuizReviewScreen from '~/screens/quiz/review';
import QuestionsScreen from '~/screens/questions';
import QuestionDetailsScreen from '~/screens/questions/details';
import QuestionAnswersScreen from '~/screens/questions/answers';
import AssignmentScreen from '~/screens/assignment';
import AssignmentDetailsScreen from '~/screens/assignment/details';
import ConversationDetailsScreen from '~/screens/conversation/details';
import PostDetailsScreen from '~/screens/posts/details';
import ScheduleScreen from '~/screens/schedule';
import StudentDetailsScreen from '~/screens/classes/students/details';

import AddPostScreen from '~/screens/posts/add';
import AddAnswerScreen from '~/screens/questions/add_answer';
import AddConversationScreen from '~/screens/conversation/add';


const Routes = {
  INTRO: {
    name: 'Intro',
    path: IntroScreen,
  },
  LOGIN_IN: {
    name: 'Login',
    path: LoginScreen,
  },
  SIGN_UP: {
    name: 'SignUp',
    path: SignUpScreen,
  },
  FORGOT_PASSWORD: {
    name: 'ForgotPassword',
    path: ForgotPasswordScreen
  },
  RESET_PASSWORD: {
    name: 'ResetPassword',
    path: ResetPasswordScreen
  },
  PROFILE: {
    name: 'Profile',
    path: ProfileScreen,
  },
  FAVOURITE: {
    name: 'Favourite',
    path: FavouriteScreen,
  },
  SETTINGS: {
    name: 'Settings',
    path: SettingsScreen,
  },
  APPEARANCE: {
    name: 'Appearance',
    path: AppearanceScreen,
  },
  INFORMATION: {
    name: 'Information',
    path: InformationScreen,
  },
  LANGUAGES: {
    name: 'Languages',
    path: LanguagesScreen,
  },
  TERM: {
    name: 'TermCondition',
    path: TermConditionScreen,
  },
  HELP: {
    name: 'Help',
    path: HelpScreen,
  },
  CLASS_DETAILS: {
    name: 'ClassDetails',
    path: ClassDetailsScreen,
  },
  STUDENTS: {
    name: 'Students',
    path: StudentsScreen,
  },
  STUDENT_DETAILS: {
    name: 'StudentDetails',
    path: StudentDetailsScreen,
  },
  ADD_POST: {
    name: 'AddPost',
    path: AddPostScreen,
  },
  QUIZ: {
    name: 'Quiz',
    path: QuizScreen,
  },
  QUIZ_DETAILS: {
    name: 'QuizDetails',
    path: QuizDetailsScreen,
  },
  QUIZ_PROCESS: {
    name: 'QuizProcess',
    path: QuizProcessScreen,
  },
  QUIZ_REVIEW: {
    name: 'QuizReview',
    path: QuizReviewScreen,
  },
  QUESTIONS: {
    name: 'Questions',
    path: QuestionsScreen,
  },
  QUESTION_DETAILS: {
    name: 'QuestionDetails',
    path: QuestionDetailsScreen,
  },
  QUESTION_ANSWERS: {
    name: 'QuestionAnswers',
    path: QuestionAnswersScreen,
  },
  ADD_ANSWERS: {
    name: 'AddAnswers',
    path: AddAnswerScreen,
  },
  ASSIGNMENT: {
    name: 'Assignment',
    path: AssignmentScreen,
  },
  ASSIGNMENT_DETAILS: {
    name: 'AssignmentDetails',
    path: AssignmentDetailsScreen,
  },
  CONVERSATION_DETAILS: {
    name: 'ConversationDetails',
    path: ConversationDetailsScreen,
  },
  ADD_CONVERSATION: {
    name: 'AddConversation',
    path: AddConversationScreen,
  },
  POST_DETAILS: {
    name: 'PostDetails',
    path: PostDetailsScreen,
  },
  SCHEDULE: {
    name: 'Schedule',
    path: ScheduleScreen,
  },
  NOTIFICATION: {
    name: 'Notification',
    path: NotificationScreen,
  },
  TAB: {
    name: 'TabMain',
    HOME: {
      name: 'Home',
      path: HomeScreen,
    },
    CONVERSATION: {
      name: 'Conversation',
      path: ConversationScreen,
    },
    CLASSES: {
      name: 'Classes',
      path: ClassesScreen,
    },
    ACCOUNT: {
      name: 'Account',
      path: AccountScreen,
    },
  },
  
};

export default Routes;
