const isAuthenticated = (req, res, next) => {
  const user = req.user;
  if (user) {
    next();
  } else {
    res.redirect("/login");
  }
};

export default isAuthenticated;
