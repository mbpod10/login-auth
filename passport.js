const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const User = require("./models/User");

const cookieExtractor = (req) => {
  console.log(req);
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// authorization
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: "Eatry",
    },
    (payload, done) => {
      console.log("payload", payload);
      User.findById({ _id: payload.sub }, (error, user) => {
        if (error) {
          return done(error, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);

// authentication local strategy using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (error, user) => {
      // database broken
      if (error) {
        return done(error);
      }
      // no user found in db
      if (!user) {
        return done(null, false);
      }
      // compare passwords from the User methods schema
      user.comparePassword(password, done);
    });
  })
);
