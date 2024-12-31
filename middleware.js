const Blog = require("./Models/blogModel.js");
const Comment = require("./Models/commentModel.js");
const ExpressError = require("./utils/expressError");
const { blogSchema, commentSchema } = require("./schema.js");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectURL = req.originalUrl;
    req.flash("errorMsg", "You must be logged in to access this page!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectURL) {
    res.locals.saveRedirectURL = req.session.redirectURL;
  }
  next();
}; 


module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  
  if (!blog.owner.equals(res.locals.currUser._id)) {
    req.flash("errorMsg", "You are not the owner of this blog!");
    return res.redirect(`/blogs/${id}`);
  }
  next();
}

module.exports.isCommentAuthor = async (req, res, next) => {
  const { id, commentId} = req.params;
  const comment = await Comment.findById(commentId);
  
  if (!comment.author.equals(res.locals.currUser._id)) {
    req.flash("errorMsg", "You are not the owner of this comment!");
    return res.redirect(`/blogs/${id}`);
  }
  next();
}

module.exports.validateBlog = (req, res, next) => {
  const {error } = blogSchema.validate(req.body);
  if(error) {
    let msg = error.details.map((el) => el.message).join(",");
    console.error("Validation Error: ", msg);
    throw new ExpressError(msg, 400);
  }else {
    next();
  }
};

module.exports.validateComment = (req, res, next) => {  
  const { error } = commentSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    console.error("Validation Error: ", msg);
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};