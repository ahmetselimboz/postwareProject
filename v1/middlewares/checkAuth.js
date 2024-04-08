const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/admin/login");
};

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/homepage");
  }
  next();
};

module.exports = { checkAuthenticated, checkLoggedIn };
