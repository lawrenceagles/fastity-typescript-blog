import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import mongoose from 'mongoose';
import { Blog } from './models/BlogModel';

const ConnectDB = async (fastify: FastifyInstance, options: { uri: string }) => {
	try {
		mongoose.connection.on('connected', () => {
			fastify.log.info({ actor: 'MongoDB' }, 'connected');
		});

		mongoose.connection.on('disconnected', () => {
			fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
		});

		const url = 'mongodb://localhost:27017/blogs';
		const db = await mongoose.connect(url, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
			// these options are configurations options for mongoose to prevent mongoose throwing warnings and errors
		});

		const models = { Blog };

		fastify.decorate('db', { models });
	} catch (error) {
		console.error(error);
	}
};

export default fastifyPlugin(ConnectDB);
