const router = require('express').Router();
const userRoutes = require('./userRoutes');
const TechBlogPostRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
router.use('/TechBlogPost', TechBlogPostRoutes);

module.exports = router;
