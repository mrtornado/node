exports.createPostValidator = (req, res, next) => {
  // Title
  req.check("title", "Title must not be empty. Write a title").notEmpty();
  req.check("title", "Title must be between 4 to 150 characters").isLength({
    min: 4,
    max: 150
  });
  // Body
  req.check("body", "Body must not be empty. Write a body").notEmpty();
  req.check("body", "Body must be between 4 to 2000 characters").isLength({
    min: 4,
    max: 2000
  });
  // Check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middle where
  next();
};

exports.userSignupValidator = (req, res, next) => {
  // Name is not null and between 4-10 char
  req.check("name", "Name is required").notEmpty();

  // email is not null, valid and normalized
  req.check("email", "Email is required").notEmpty();
  req
    .check("email", "Email must be between 4 to 32 characters")
    .matches(/.+\@.+..+/)
    .withMessage("Email must contain @ sign")
    .isLength({
      minLength: 4,
      maxLength: 200
    });

  // check for password
  req.check("password", "Password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least a number");

  // Check for errors
  const errors = req.validationErrors();
  // if error show the first one as they happen
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  // proceed to next middle where
  next();
};
