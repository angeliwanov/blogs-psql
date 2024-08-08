const jwt = require('jsonwebtoken');
const { SECRET } = require('./config');
const { Blog } = require('../models');

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.errors[0].message });
  } else if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
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
