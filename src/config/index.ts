import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';
import mongoose from 'mongoose';

const ConnectDB = async (fastify: FastifyInstance, options: { uri: string }) => {
	try {
		mongoose.connection.on('connected', () => {
			fastify.log.info({ actor: 'MongoDB' }, 'connected');
		});

		mongoose.connection.on('disconnected', () => {
			fastify.log.error({ actor: 'MongoDB' }, 'disconnected');
		});

		await mongoose.connect('mongodb://localhost:27017/blogs', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
			// these options are configurations options for mongoose to prevent mongoose throwing warnings and errors
		});
	} catch (error) {
		console.error(error);
	}
};

export default fastifyPlugin(ConnectDB);
