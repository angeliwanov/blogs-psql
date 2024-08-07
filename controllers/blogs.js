const router = require('express').Router();

const { Blog } = require('../models');
const { User } = require('../models');

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userID'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  res.json(blogs);
});

router.post('/', async (req, res) => {
  const user = await User.findOne();
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    data: new Date(),
  });
  res.json(blog);
});

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.status(200).json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    return res.status(204).json(req.blog);
  } else {
    return res.status(404).end();
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.status(200).json(req.blog);
  } else {
    return res.status(404).end();
  }
});

module.exports = router;
