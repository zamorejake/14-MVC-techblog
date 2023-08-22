const User = require('./User');
const TechBlogPost = require('./TechBlogPost');

User.hasMany(TechBlogPost, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

TechBlogPost.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, TechBlogPost };
