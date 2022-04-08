const isUserLogin = (req, res, next) => {
  if (!req.session.username) {
    res.redirect('/signin');
  } else {
    next();
  }
};

const isUserNotLogin = (req, res, next) => {
  if (req.session.username) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = { isUserLogin, isUserNotLogin };
