const Joi = require("joi");


module.exports.blogSchema = Joi.object({
 
    title: Joi.string().required(),
    summary: Joi.string().required(),
    content: Joi.string().required(),
    image: Joi.string().required(),

});

module.exports.commentSchema = Joi.object({
 
    content: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required(),
 
});
