const router = require('express').Router();
const { TechBlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await TechBlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const techBlogPosts = projectData.map((project) =>
      project.get({ plain: true })
    );

    res.render('articles', {
      techBlogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const projectData = await TechBlogPost.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['comment', 'date_posted'],
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    const post = projectData.get({ plain: true });

    res.render('profileid', {
      post,
      comments: post.comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/add-comment/:id', async (req, res) => {
  try {
    const newComment = {
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    };

    await Comment.create(newComment);

    res.redirect(`/post/${req.params.id}`);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: TechBlogPost }],
    });

    const user = userData.get({ plain: true });
    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/create-techblog', async (req, res) => {
  try {
    const {
      'techblog-title': techblogTitle,
      'techblog-content': techblogContent,
    } = req.body;

    await TechBlogPost.create({
      title: techblogTitle,
      description: techblogContent,
      user_id: req.session.user_id,
    });

    res.redirect('/profile');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
