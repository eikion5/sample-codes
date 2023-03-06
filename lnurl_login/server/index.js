const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { strategy, middleware } = require("./auth");

const app = express();
const clientUrl = "http://localhost:5173";

app.use(
  session({
    secret: "mysupersecret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

app.use(passport.authenticate("lnurl-auth"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/user", (req, res) => {
  if (!req.user) return res.status(401).send("Unauthorized");
  res.send(req.user);
});

app.get(
  "/login",
  (req, res, next) => {
    if (req.user) return res.redirect(clientUrl);
    next();
  },
  middleware
);

app.get("/logout", (req, res, next) => {
  if (req.user) {
    req.session.destroy();
    return res.redirect(clientUrl);
  }
  return next();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
