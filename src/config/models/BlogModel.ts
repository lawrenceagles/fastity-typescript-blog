import { Schema, Document, model, Model } from 'mongoose';

export interface BlogAttrs {
	// used to make sure anytime we create a blog we pass the correct args.
	title: string;
	content: string;
	category: string;
}

export interface BlogModel extends Model<BlogDocument> {
	// enables typescript to understand what our user Model is.
	addOne(doc: BlogAttrs): BlogDocument;
}

// an interface that describes the properties that a blog document has
export interface BlogDocument extends Document {
	title: string;
	content: string;
	category: string;
}

export const blogSchema: Schema = new Schema(
	{
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
	},
	{
		timestamps: true
	}
);

// We need this trick to use the BlogAttrs interface to achieve our pupose above
// use instead of new Blog() because we cannot do effective type checking with new Blog()
// add the built function to the user model as seen below
blogSchema.statics.addOne = (doc: BlogAttrs) => {
	// this is just to get typescript invovled in creating a blog post.
	// how we get a custom function built into a model.
	// But TypeScript does not understand what it means to assign a property to the statics object add the interface
	// createBlog to fix this.
	return new Blog(doc);
};

export const Blog = model<BlogDocument, BlogModel>('Blog', blogSchema);

// how to make sure typscript checks the types of args we pass to the blog constructor.
// Ans BlogAttrs interface.

// Blog.addOne({
// 	email: 'adfdfsdfasdf'
// });
