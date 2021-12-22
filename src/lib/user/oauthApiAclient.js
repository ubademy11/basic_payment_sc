'use strict';

const axios = require('axios');

const googleApiClient = axios.create();

googleApiClient.interceptors.response.use(response => {
  if (response.status === 200) {
    return response.data;
  }
  const error = {
    status: response && response.status,
    error: response.data || response.statusText,
  };
  throw error;
});

const googleUserInfo = async accessToken => {
  const uri = `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`;
  return googleApiClient.get(uri);
};

module.exports = {
  googleUserInfo,
};
