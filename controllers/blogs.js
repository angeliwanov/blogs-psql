const router = require('express').Router();
const middleware = require('../util/middleware');
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

router.post('/', middleware.tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({
    ...req.body,
    userId: user.id,
    data: new Date(),
  });
  res.json(blog);
});

router.get('/:id', middleware.blogFinder, async (req, res) => {
  if (req.blog) {
    res.status(200).json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.blogFinder,
  async (req, res) => {
    if (req.blog.userId !== req.decodedToken.id) {
      res
        .status(400)
        .send({ error: 'only the user who created the blog can delete it' });
    }
    if (req.blog) {
      await req.blog.destroy();
      return res.status(204).json(req.blog);
    } else {
      return res.status(404).end();
    }
  }
);

router.put('/:id', middleware.blogFinder, async (req, res) => {
  if (!req.body.likes)
    return res.status(400).send({ error: 'Property likes is missing' });

  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    return res.status(200).json(req.blog);
  } else {
    return res.status(404).end();
  }
});

module.exports = router;
