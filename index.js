require('dotenv').config();
const { Sequelize, Model, DataTypes } = require('sequelize');
const express = require('express');
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog',
  }
);

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.get('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      await blog.destroy();
      return res.status(204).json(blog);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (blog) {
      blog.likes = req.body.likes;
      await blog.save();
      return res.status(200).json(blog);
    } else {
      return res.status(404).end();
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
