/* eslint-disable no-console */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const pool = require("../config/mysql");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor, // custom function we are providing to extract jwt from request
      secretOrKey: "NoobCoder", // use to verify the token
    },
    (payload, done) => {
      const { sub } = payload;
      const { username } = sub;
      pool.query(
        `SELECT * from users WHERE username='${username}' LIMIT 1`,
        (err, result) => {
          if (err) return done(err, false);
          if (result.length) {
            return done(null, {
              id: result[0].id,
              username: result[0].username,
              email: result[0].email,
              status: result[0].status,
              role: result[0].roleId_FK,
            });
          }
          return done(null, false);
        }
      );
    }
  )
);

// Authetication local strategy using username and password
passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("34242342424");
    pool.query(
      `SELECT * from users WHERE username='${username}' LIMIT 1`,
      async (err, user) => {
        if (err) return done(err, false);
        if (user.length) {
          const { password: hashedPassword } = user[0];
          const decrypted = await mycrypto.decrypt(hashedPassword);
          if (decrypted === user.password) {
            validPass = true;
          } else {
            validPass = false;
          }
          if (validPass) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        }
      }
    );
  })
);

module.exports = passport;
