const router = require('express').Router();
const { Token } = require('../models');
const middleware = require('../util/middleware');

router.delete('/', middleware.tokenExtractor, async (req, res) => {
  const tokenToDelete = await Token.findOne({ where: { jwt: req.token } });
  await tokenToDelete.destroy();
  return res.status(204).json(tokenToDelete);
});

module.exports = router;
