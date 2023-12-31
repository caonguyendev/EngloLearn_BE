const commonApi = require('express').Router();
const commonController = require('../controllers/common.controller');
const { jwtAuthentication } = require('../middlewares/auth.middleware');

commonApi.get('/word-pack/total', commonController.getTotalWordPack);

module.exports = commonApi;
