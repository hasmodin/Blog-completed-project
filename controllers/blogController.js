const Blog = require("../Models/blogModel.js");

module.exports.index = async (req, res, next) => {
  let blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render("blogs/index.ejs", { blogs });
};

module.exports.newBlogForm = (req, res, next) => {
  res.render("blogs/new.ejs");
};

module.exports.createNewBlog = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let { title, summary, content, image } = req.body;
  let newBlog = new Blog({ title, summary, content, image });
  newBlog.owner = req.user._id;
  newBlog.image = { url, filename };
  await newBlog.save();
  req.flash("successMsg", "New blog created!");
  res.redirect("/blogs");
};

module.exports.showBlog = async (req, res, next) => {
  let { id } = req.params;
  let blog = await Blog.findById(id).populate("comments").populate("owner");
  if (!blog) {
    req.flash("errorMsg", "Blog not found!");
    return res.redirect("/blogs");
  }
  res.render("blogs/show.ejs", { blog });
};

module.exports.editBlogForm = async (req, res, next) => {
  let { id } = req.params;
  let blog = await Blog.findById(id);
  res.render("blogs/edit.ejs", { blog });
};

module.exports.updateBlog = async (req, res, next) => {
  let { id } = req.params;
  let { title, summary, content, image } = req.body;
  await Blog.findByIdAndUpdate(id, { title, summary, content, image });
  req.flash("successMsg", "Updated successful!");
  res.redirect(`/blogs/${id}`);
};

module.exports.deleteBlog = async (req, res, next) => {
  let { id } = req.params;
  await Blog.findByIdAndDelete(id);
  req.flash("successMsg", "Blog deleted");
  res.redirect("/blogs");
};
