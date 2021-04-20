import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import mongoose, { Model } from 'mongoose';
import { Blog, BlogDocument } from './models/BlogModel';

export interface Models {
	Blog: Model<BlogDocument>;
}

export interface Db {
	models: Models;
}

const ConnectDB = async (fastify: FastifyInstance, options: { uri: string }) => {
	try {
		mongoose.connection.on('connected', () => {
			fastify.log.info({ actor: 'MongoDB' }, 'connected');
		});

		mongoose.connection.on('disconnected', () => {
			fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
		});

		const db = await mongoose.connect(options.uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
			// these options are configurations options for mongoose to prevent mongoose throwing warnings and errors
		});

		const models: Models = { Blog };

		fastify.decorate('db', { models });
	} catch (error) {
		console.error(error);
	}
};

export default fastifyPlugin(ConnectDB);
