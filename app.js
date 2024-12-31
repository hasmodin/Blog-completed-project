if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const engine = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const cookieParser = require("cookie-parser"); // to parse cookies
const session = require("express-session");
const MongoStore = require("connect-mongo"); // store session in atlasDB
const flash = require("connect-flash");
const blogRouter = require("./routes/blogRoute.js");
const commentRouter = require("./routes/commentRoute.js");
const userRouter = require("./routes/userRoute.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/userModel.js");
const dbURL = process.env.ATLAS_DB_URL;
const PORT = process.env.PORT;
const app = express();

main()
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error while connecting to DB");
  });

async function main() {
  await mongoose.connect(dbURL);
}

app.set("view engine", "ejs"); //setting ejs engine
app.set("views", path.join(__dirname, "views")); // for views folder

// for static file like css and js
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

app.use(express.json()); // to parse json data
app.use(express.urlencoded({ extended: true })); // to parse data

// for static file like css and js
app.use(express.static(path.join(__dirname, "public/css")));

app.engine("ejs", engine);
app.use(methodOverride("_method"));
app.use(cookieParser("")); //to send signed cookie must include secret to cookieParser

//storing session in MongoDb Atlas using connect-mongo
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () => {
  console.log("ERROR in MONGO SESSION STORE", err);
})

//session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(session(sessionOptions));
app.use(flash()); //for flashing message on failure or success

//initializing user authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware for flash messages
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("successMsg");
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.currUser = req.user;
  next();
});

//all routes
app.use("/blogs", blogRouter);
app.use("/blogs/:id/comments", commentRouter);
app.use("/", userRouter);

//home route
app.all("*", (req, res, next) => {
  res.send("<h1>Page not found</h1>");
});

//error handling middleware
app.use((err, req, res, next) => {
  console.log("Error caught:", err);
  let { statusCode = 500, message = "Some Error Occurred!" } = err;
  statusCode = Number(statusCode);
  if (isNaN(statusCode)) statusCode = 500; //if status is not a number
  res.status(statusCode).render("Error.ejs", { message });
});

//listening on port
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
