const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const userService = require('../services/users');
const { ErrorMessage } = require('../constants');

module.exports = {
  initSocket: (server) => {
    return socketIO(server, {
      cors: {
        origin: [`${process.env.CLIENT}`],
        methods: ['GET', 'POST'],
        credential: true,
      },
    });
  },

  useMiddleware: (io) => {
    io.use((socket, next) => {
      let token = socket.handshake.query && socket.handshake.query.token;
      if (token) {
        jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
          if (err) {
            return next(new Error(ErrorMessage.Authentication));
          }
          const { _id } = payload;
          const user = await userService.get(_id);
          if (!user) {
            return next(new Error(ErrorMessage.Authentication));
          }
          socket.user = user;
          next();
        });
      } else {
        return next(new Error(ErrorMessage.Authentication));
      }
    });
  },
};
