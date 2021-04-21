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
exports.blogSchema.statics.addOne = function (doc) {
    return new exports.Blog(doc);
};
exports.Blog = mongoose_1.model('Blog', exports.blogSchema);
