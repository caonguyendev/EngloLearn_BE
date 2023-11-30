const UserModel = require('../models/account.model/user.model');
const jwt = require('jsonwebtoken');
const { KEYS } = require('../constant');
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = '80048975329-0djhc326tp56olj8kdn9e0qf8j7gnerq.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);
require('dotenv').config();

// Authentication with JWT
exports.jwtAuthentication = async (req, res, next) => {
  try {
    res.locals.isAuth = false;
    let token = req.cookies ? req.cookies[KEYS.JWT_TOKEN] : null;

    // if not exist cookie[access_token] -> isAuth = false -> next
    if (!token) {
      next();
      return;
    }

    // verify jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded) {
      const { accountId } = decoded.sub;
      let user = await UserModel.findOne({ accountId }).select(
        '-_id username name avt favoriteList coin',
      );

      if (user) {
        user.accountId = accountId;
        res.locals.isAuth = true;
        req.user = user;
      }
    }
    next();
  } catch (error) {
    console.error('Authentication with JWT ERROR: ', error);
    return res.status(401).json({
      message: 'Unauthorized.',
      error,
    });
  }
};

exports.verifyGoogleToken = async (req, res, next) => {
  try {
      const idToken = req.body.access_token; 
      const ticket = await client.verifyIdToken({
          idToken,
          audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.user = payload; // Add the user payload to the request object
      next(); // Proceed to the next middleware or route handler
  } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
  }
}
