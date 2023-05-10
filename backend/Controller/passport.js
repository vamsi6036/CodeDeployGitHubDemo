const passport = require ("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy; // -->??
// this details from google cloud
const GOOGLE_CLIENT_ID = "317712406984-de5v75smjt2pr0j1q69dutm7bj86url4.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4080/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   done(null, profile);
    })
);

passport.serializeUser((user, done) => { // serializer
    done(null, user);
})

passport.deserializeUser((user, done) => { // De-serializer
    done(null, user);
})