const isAuthenticated = (req, res, next) => {
  const user = req.user;
  if (user) {
    next();
  } else {
    res.status(403).redirect("/login");
  }
};

export default isAuthenticated;
