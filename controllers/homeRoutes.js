const router = require("express").Router();
const { Post, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    //fetching the model post and including the User's model with the attribute "name"
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    for (i = 0; i < posts.length; i++) {
      if (posts[i].userId === req.session.user_id) {
        posts[i].flag = true;
      }
    }

    res.render("homepage", {
      posts,
      logged: req.session.logged,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    res.render("dashboard", {
      logged: req.session.logged,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
