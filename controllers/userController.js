const User = require("../Models/userModel.js");


module.exports.signupForm = (req, res) => {
    res.render("users/signup.ejs");
  };

module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });

      const registerUser = await User.register(newUser, password);
      console.log(registerUser);

      //login the user directly after registration
      req.login(registerUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("successMsg", "Welcome to Dohafacts.com");
        res.redirect("/blogs");
      }
      );

      
    } catch (e) {
      req.flash("errorMsg", e.message);
      res.redirect("/signup");
    }
  };

  module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
  }


  module.exports.login = async (req, res) => {
    req.flash("successMsg", "Welcome to DohaFacts.com");
   let redirectUrl = res.locals.saveRedirectURL || "/blogs";
    res.redirect(redirectUrl);
  };

  module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        
        if(err) {
            return next(err);
        }
            req.flash("successMsg", "You logged out!");
            res.redirect("/blogs");
        
    })
};