import { fastify } from 'fastify';
import pino from 'pino';
import db from './config/index';
import blogRoutes from './routes/blogRoute';

const Port = process.env.PORT || 7000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';
const server = fastify({
	logger: pino({ level: 'info' })
});

// Activate plugins below:
server.register(db, { uri });
server.register(blogRoutes);

const start = async () => {
	try {
		await server.listen(Port);
		console.log('Server started successfully');
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();
