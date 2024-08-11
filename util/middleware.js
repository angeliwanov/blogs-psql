const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Blog, Token, User } = require('../models');

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.errors[0].message });
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, SECRET);

      const tokenIsValid = await Token.findOne({ where: { jwt: token } });

      if (!tokenIsValid) {
        return res.status(400).json({ error: 'token expired' });
      }

      const user = await User.findByPk(decodedToken.id);

      if (!user.enabled) {
        return res.status(400).json({ error: 'user disabled' });
      }
      req.token = token;
      req.decodedToken = decodedToken;
    } catch {
      return res.status(401).json({ error: 'token invalid' });
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }
  next();
};

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

module.exports = {
  errorHandler,
  tokenExtractor,
  blogFinder,
};
