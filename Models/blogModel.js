const mongoose = require("mongoose");
const Comment = require("./commentModel.js");

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        
    },
    content: {
        type: String,
        required: true,
    },
 
    image: {
       url: String,
       filename: String,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

}, {
    timestamps: true,
});

//delete middleware for comments 

blogSchema.post("findOneAndDelete", async(blog) => {
    if(blog) {
        await Comment.deleteMany({_id: {$in: blog.comments}});
    }
    
})


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;