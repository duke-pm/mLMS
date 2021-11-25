/**
 ** Name: Common actions
 ** Author: Jerry
 ** CreatedAt: 2021
 ** Description: Description of Common.js
 **/
/** REDUX */
import * as types from './types';

export const changeLanguage = language => ({
  type: types.CHANGE_LANGUAGE,
  payload: language,
});

export const changeNetStatus = connection => ({
  type: types.CHANGE_CONNECTION_STATUS,
  payload: connection,
});

export const changeFormatDate = format => ({
  type: types.CHANGE_FORMAT_DATE,
  payload: format,
});

export const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: theme,
});
