const router = require('express').Router();
const { ReadingList } = require('../models');
const { User } = require('../models');
const middleware = require('../util/middleware');

router.get('/', async (req, res) => {
  const readingLists = await ReadingList.findAll({});
  res.json(readingLists);
});

router.post('/', async (req, res) => {
  const readingList = await ReadingList.create(req.body);
  res.json(readingList);
});

router.put('/:id', middleware.tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const readingList = await ReadingList.findByPk(req.params.id);
  if (readingList.userId == user.id) {
    readingList.read = req.body.read;
    readingList.save();
    res.json(readingList);
  } else {
    res
      .status(400)
      .send({ error: 'only the user who add the blog can change its status' });
  }
});

module.exports = router;
