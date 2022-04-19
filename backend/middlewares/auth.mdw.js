const jwt = require('jsonwebtoken');
const userService = require('../services/users');

module.exports = (req, res, next) => {
  const token = req.headers['token'];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
      if (err) {
        return res.status(401).send({ code: 401, message: err });
      }
      const { _id } = payload;
      const user = await userService.get(_id);
      if (!user) {
        return res.status(401).send({ code: 401, message: 'User not existed' });
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ code: 401, message: 'Missing access token' });
  }
};
