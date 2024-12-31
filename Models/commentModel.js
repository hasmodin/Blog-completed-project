
const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
        maxLength: 60,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;

// const addComment = async () => {
// let res = await Comment.insertMany([
//     {
//       comment: "This is very knowledgeable blogs",
//       name: "Ehan",
//       email: "ehan@gmail.com",
//     },
//     {
//       comment: "very well written",
//       name: "Hassam",
//       email: "hassam@gmail.com",
//     },
//     {
//       comment: "well written",
//       name: "Alex",
//       email: "alex@gmail.com",
//     },
//   ]);

  
// };

// addComment();