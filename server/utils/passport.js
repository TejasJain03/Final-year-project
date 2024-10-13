const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Google OAuth strategy setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:8081/auth/google/callback', 
    },
    async (accessToken, refreshToken, profile, done) => {
      const { email, given_name, id } = profile;

      try {
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            name: given_name,
            email,
            googleId: id,
            password: id, // You can use googleId or another field for password
          });
        }
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

module.exports = passport;
