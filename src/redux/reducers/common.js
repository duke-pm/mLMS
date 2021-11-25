/**
 ** Name: Common reducers
 ** Author: IT-Team
 ** CreatedAt: 2021
 ** Description: Description of common.js
 **/
/* LIBRARY */
import {fromJS} from 'immutable';
import {
  DEFAULT_LANGUAGE_CODE,
  DEFAULT_FORMAT_DATE_1,
  LIGHT,
} from '~/configs/constants';
/** REDUX */
import * as types from '../actions/types';

export const initialState = fromJS({
  connection: true,
  theme: LIGHT,
  language: DEFAULT_LANGUAGE_CODE,
  formatDate: DEFAULT_FORMAT_DATE_1,
});

export default function (state = initialState, action = {}) {
  const {type, payload} = action;
  switch (type) {
    case types.CHANGE_CONNECTION_STATUS:
      return state.set('connection', payload);

    case types.CHANGE_LANGUAGE:
      return state.set('language', payload);
    
    case types.CHANGE_THEME:
      return state.set('theme', payload);

    case types.CHANGE_FORMAT_DATE:
      return state.set('formatDate', payload);

    default:
      return state;
  }
}
