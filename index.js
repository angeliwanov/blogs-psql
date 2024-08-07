const express = require('express');
const app = express();
require('express-async-errors');
const middleware = require('./util/middleware');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const userRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');

app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
