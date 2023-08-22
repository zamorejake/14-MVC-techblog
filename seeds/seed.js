const sequelize = require('../config/connection');
const { User, TechBlogPost } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  //bulk create doesn't work with bcrypt when generating the seed
  const createdUsers = [];
  for (const user of userData) {
    const newUser = await User.create(user);
    createdUsers.push(newUser);
  }

  for (const project of projectData) {
    await TechBlogPost.create({
      ...project,
      user_id: createdUsers[Math.floor(Math.random() * createdUsers.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
