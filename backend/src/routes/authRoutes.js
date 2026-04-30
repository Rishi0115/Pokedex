const express = require('express');
const passport = require('passport');
const router = express.Router();

// Initiate Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google OAuth callback
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:5173'}?auth=failed`,
}), (req, res) => {
  // Encode user data as a base64 token so the frontend can read it from the URL
  // This avoids cross-domain cookie issues when frontend and backend are on different domains
  const userData = {
    id: req.user._id,
    displayName: req.user.displayName,
    email: req.user.email,
    avatar: req.user.avatar,
  };
  const token = Buffer.from(JSON.stringify(userData)).toString('base64');
  res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}?token=${token}`);
});

// Get current user
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      success: true,
      data: {
        id: req.user._id,
        displayName: req.user.displayName,
        email: req.user.email,
        avatar: req.user.avatar,
      },
    });
  } else {
    res.status(401).json({ success: false, message: 'Not authenticated' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ success: true, message: 'Logged out' });
    });
  });
});

module.exports = router;
