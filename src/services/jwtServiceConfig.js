/**
 ** Name: JWT Services Config
 ** Author: Jerry
 ** CreatedAt: 2021
 ** Description: Description of JWTServiceConfig.js
 **/
/* COMMON */
import Configs from '~/configs';

export const jwtServiceConfig = {
  baseURL: Configs.hostAPI + '/' + Configs.prefixAPI,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
  },
  responseType: 'json',
  responseEncoding: 'utf8',
};

export default jwtServiceConfig;
