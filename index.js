const express = require('express');
const app = express();
require('express-async-errors');
const middleware = require('./util/middleware');

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const authorsRouter = require('./controllers/authors');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const blogsRouter = require('./controllers/blogs');
const readingListsRouter = require('./controllers/readingLists');

app.use(express.json());

app.use('/api/readinglists', readingListsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/login', loginRouter);
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
