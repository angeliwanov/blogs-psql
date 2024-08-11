const router = require('express').Router();
const { Blog } = require('../models');
const { User } = require('../models');
const { ReadingList } = require('../models');

router.get('/', async (req, res) => {
  const users = await User.findAll({
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get('/:id', async (req, res) => {
  const where = {};

  if (req.query.read) {
    where.read = req.query.read === 'true';
  }

  const user = await User.findByPk(req.params.id, {
    attributes: ['name', 'username'],
    include: [
      {
        model: Blog,
        as: 'readings',

        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        through: {
          attributes: [],
        },
        include: [
          {
            where,
            model: ReadingList,
            attributes: ['id', 'read'],
          },
        ],
      },
    ],
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });
  if (user) {
    if (req.body.password) {
      user.password = req.body.password;
    }
    if (req.body.name) {
      user.name = req.body.name;
    }
    await user.save();
    res.json(user);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
