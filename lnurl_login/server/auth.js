const passport = require("passport");
const LnurlAuth = require("passport-lnurl-auth");

const map = {
  user: new Map(),
};

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, map.user.get(id) || null);
});

const strategy = new LnurlAuth.Strategy(function (linkingPublicKey, done) {
  let user = map.user.get(linkingPublicKey);
  if (!user) {
    user = { id: linkingPublicKey };
    map.user.set(linkingPublicKey, user);
  }
  done(null, user);
});

const middleware = new LnurlAuth.Middleware({
  callbackUrl: "http://localhost:5173/api/login",
  cancelUrl: "http://localhost:5173",
});

module.exports = {
  strategy,
  middleware,
};
