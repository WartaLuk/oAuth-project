const express = require('express');
const passport = require('passport');
const router = express.Router();
router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
);

router.post('/auth.logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('auth/logout');
  });
});

router.get('/logout', (req, res) => {
  res.render('logout');
});

module.exports = router;