const service = require('../services/auth');

module.exports = {
  login: async (req, res) => {
    try {
      const { userName, password } = req.body;
      const accessToken = await service.login(userName, password);
      if (accessToken) {
        return res.send({
          code: 200,
          message: 'success',
          data: { accessToken },
        });
      }
      return res.status(401).send({ code: 401, message: 'login failed' });
    } catch (error) {
      return res.status(500).send({ code: 500, message: error.message });
    }
  },
};
