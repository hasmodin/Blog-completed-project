const Comment = require('../Models/commentModel.js');
const Blog = require('../Models/blogModel.js');
const ExpressError = require("../utils/expressError.js");


module.exports.createComment = async (req, res) => {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    if (!blog) {
      throw new ExpressError(404, "Blog not found");
    }
    let { content, email, name } = req.body;
    let newComment = new Comment({ content, email, name });
    newComment.author = req.user._id;
    blog.comments.push(newComment);
    await blog.save();
    await newComment.save();
    req.flash("successMsg", "Comment added");
    // req.flash("errorMsg", "Something went wrong! try again.");
    res.redirect(`/blogs/${blog._id}`);
  };

  module.exports.deleteComment = async (req, res) => {
    let { id, commentId } = req.params;
    await Blog.findByIdAndUpdate(id, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    req.flash("successMsg", "Comment deleted!");
    // req.flash("errorMsg", "Something went wrong! try again.");
    res.redirect(`/blogs/${id}`);
  }