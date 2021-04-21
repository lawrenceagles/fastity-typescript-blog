import { Schema, Document, model, Model } from 'mongoose';

export interface BlogAttrs {
	title: string;
	content: string;
	category: string;
}

export interface BlogModel extends Model<BlogDocument> {
	addOne(doc: BlogAttrs): BlogDocument;
}

export interface BlogDocument extends Document {
	title: string;
	content: string;
	category: string;
	createdAt: string;
	updatedAt: string;
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

blogSchema.statics.addOne = (doc: BlogAttrs) => {
	return new Blog(doc);
};

export const Blog = model<BlogDocument, BlogModel>('Blog', blogSchema);
