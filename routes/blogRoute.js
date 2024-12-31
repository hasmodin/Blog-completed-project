const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateBlog } = require("../middleware.js");
const blogController = require("../controllers/blogController.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//route for getting all blogs and creatingBlog route
router
  .route("/")
  .get(wrapAsync(blogController.index))
  .post(isLoggedIn,   upload.single("image"), wrapAsync(blogController.createNewBlog));
 
//route for getting new blog form
router.route("/new").get(isLoggedIn, blogController.newBlogForm);

//route for viewing single blog
router.get("/:id", wrapAsync(blogController.showBlog));

//route for getting edit form
router
  .route("/:id/edit")
  .get(isLoggedIn, isOwner, wrapAsync(blogController.editBlogForm));

//update route and delete route
router
  .route("/:id")
  .put(isLoggedIn, isOwner, validateBlog, wrapAsync(blogController.updateBlog))
  .delete(isLoggedIn, isOwner, wrapAsync(blogController.deleteBlog));

module.exports = router;
