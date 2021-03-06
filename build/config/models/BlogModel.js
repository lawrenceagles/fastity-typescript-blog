"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.blogSchema = void 0;
var mongoose_1 = require("mongoose");
exports.blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
// We need this trick to use the BlogAttrs interface to achieve our pupose above
// use instead of new Blog() because we cannot do effective type checking with new Blog()
// add the built function to the user model as seen below
exports.blogSchema.statics.addOne = function (doc) {
    // this is just to get typescript invovled in creating a blog post.
    // how we get a custom function built into a model.
    // But TypeScript does not understand what it means to assign a property to the statics object add the interface
    // createBlog to fix this.
    return new exports.Blog(doc);
};
exports.Blog = mongoose_1.model('Blog', exports.blogSchema);
// how to make sure typscript checks the types of args we pass to the blog constructor.
// Ans BlogAttrs interface.
// Blog.addOne({
// 	email: 'adfdfsdfasdf'
// });
