const { body } = require("express-validator");

const validateLogin = () => {
  return [
    body("username").trim(),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("You entered an incorrect password")
      .isLength({ max: 20 })
      .withMessage("You entered an incorrect password"),
  ];
};

const validateNewUser = () => {
  return [
    body("username").trim(),

    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Your password must be at least 4 characters")
      .isLength({ max: 20 })
      .withMessage("Your password must be maximum 20 characters"),

    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Your name must be at least 2 characters")
      .isLength({ max: 20 })
      .withMessage("Your name must be maximum 20 characters"),

    body("surname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Your surname must be at least 2 characters")
      .isLength({ max: 20 })
      .withMessage("Your surname must be maximum 20 characters"),

    body("repassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("The passwords are not the same");
        }
        return true;
      }),
  ];
};

const validateNewPassword = () => {
  return [
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Şifreniz en az 4 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Şifreniz en fazla 20 karakter olmalıdır"),

    body("repassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Sifreler aynı değil");
        }
        return true;
      }),
  ];
};

validateUpdateProfil = () => {
  return [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("İsminiz en az 2 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("İsminiz en fazla 30 karakter olmalıdır"),

    body("surname")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Soyisminiz en az 2 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Soyisminiz en fazla 20 karakter olmalıdır"),
  ];
};

validateUpdatePassword = () => {
  return [
    body("oldpass")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Şifreniz en az 4 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Şifreniz en fazla 20 karakter olmalıdır"),
    body("newpass")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Şifreniz en az 4 karakter olmalıdır")
      .isLength({ max: 20 })
      .withMessage("Şifreniz en fazla 20 karakter olmalıdır"),

    body("renewpass")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newpass) {
          throw new Error("Sifreler aynı değil");
        }
        return true;
      }),
  ];
};

module.exports = {
  validateLogin,
  validateNewUser,
  validateNewPassword,
  validateUpdateProfil,
  validateUpdatePassword,
};
