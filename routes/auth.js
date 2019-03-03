const express = require("express");
const {
  signup,
  signin,
  signout,
  forgotPassword,
  resetPassword,
  socialLogin
} = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { userSignupValidator, passwordResetValidator } = require("../validator");

const router = express.Router();

// password forgot and reset routes
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/social-login", socialLogin);

// any routes containing: userId, our app will first execute userbyId()
router.param("userId", userById);

module.exports = router;
