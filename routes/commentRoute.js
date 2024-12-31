const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const {
  validateComment,
  isLoggedIn,
  isCommentAuthor,
} = require("../middleware.js");
const commentController = require("../controllers/commentController.js");

//comments
//post route
router
  .route("/")
  .post(
    isLoggedIn,
    validateComment,
    wrapAsync(commentController.createComment)
  );

//delete route
router
  .route("/:commentId")
  .delete(
    isLoggedIn,
    isCommentAuthor,
    wrapAsync(commentController.deleteComment)
  );

module.exports = router;
