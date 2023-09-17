const router = require("express").Router();
const { User, Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      userId: req.session.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No posts found!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No posts found!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;
