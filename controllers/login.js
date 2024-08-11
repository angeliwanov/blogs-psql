const router = require('express').Router();
const { User, Token } = require('../models');
const { SECRET } = require('../util/config');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  const passwordCorrect = req.body.password === 'secret';

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET, { expiresIn: '24h' });

  await Token.create({ jwt: token });

  res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = router;
