const accountApi = require('express').Router();
const accountController = require('../controllers/account.controller');
const passport = require('passport');
const { jwtAuthentication, verifyGoogleToken } = require('../middlewares/auth.middleware');

accountApi.post('/register', accountController.postRegisterAccount);
accountApi.post('/login', accountController.postLogin);
accountApi.post('/logout', accountController.postLogout);

accountApi.post(
  '/auth/google',
  verifyGoogleToken,
  accountController.postLoginSocialNetwork
);

accountApi.post(
  '/login-fb',
  passport.authenticate('facebook-token', { session: false }),
  accountController.postLoginSocialNetwork,
);
accountApi.post('/reset-password', accountController.postResetPassword);

accountApi.put('/toggle-favorite', accountController.putToggleFavorite);
accountApi.put(
  '/update-coin',
  jwtAuthentication,
  accountController.putUpdateUserCoin,
);
accountApi.put(
  '/update-avt',
  jwtAuthentication,
  accountController.putUpdateAvt,
);
accountApi.put(
  '/update-profile',
  jwtAuthentication,
  accountController.putUpdateProfile,
);

accountApi.get(
  '/user-info',
  jwtAuthentication,
  accountController.getUserInfo,
);
accountApi.get('/send-verify-code', accountController.getVerifyCode);
accountApi.get(
  '/user-profile',
  jwtAuthentication,
  accountController.getUserProfile,
);

module.exports = accountApi;
