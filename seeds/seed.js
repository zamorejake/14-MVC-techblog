const sequelize = require('../config/connection');
const { User, TechBlogPost, Comment } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //bulk create doesn't work with bcrypt when generating the seed
  const createdUsers = [];
  for (const user of userData) {
    const newUser = await User.create(user);
    createdUsers.push(newUser);
  }

  const createdProjects = [];
  for (const project of projectData) {
    const newProject = await TechBlogPost.create({
      ...project,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    });
    createdProjects.push(newProject);
  }

  for (const project of projectData) {
    await TechBlogPost.create({
      ...project,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    });
  }
  for (const comment of commentData) {
    await Comment.create({
      ...comment,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
      post_id:
        createdProjects[Math.floor(Math.random() * createdProjects.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
