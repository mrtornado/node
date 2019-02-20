const express = require("express");
const {
  getPosts,
  createPost,
  postByUser,
  postById,
  isPoster,
  deletePost
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/", getPosts);
router.post(
  "/post/new/:userId",
  requireSignin,
  createPost,
  createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postByUser);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);

// any routes containing: userId, our app will first execute userbyId()
router.param("userId", userById);

// any routes containing: postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;
