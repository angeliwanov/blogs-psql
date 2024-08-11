const Blog = require('./blog');
const User = require('./user');
const ReadingList = require('./reading_list');
const Token = require('./token');

User.hasMany(Blog);
User.hasMany(ReadingList);
User.belongsToMany(Blog, { through: ReadingList, as: 'readings' });

Blog.belongsTo(User);
Blog.hasMany(ReadingList);
Blog.belongsToMany(User, { through: ReadingList });

ReadingList.belongsTo(User);
ReadingList.belongsTo(Blog);

module.exports = {
  Blog,
  User,
  ReadingList,
  Token,
};
