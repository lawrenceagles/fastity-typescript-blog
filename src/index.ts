import { fastify } from 'fastify';
import pino from 'pino';
import db from './config/index';
import BlogRoutes from './routes/BlogRoute';

const Port = process.env.PORT || 7000;
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogs';
const server = fastify({
	logger: pino({ level: 'info' })
});

// register plugin below:
server.register(db, { uri });
server.register(BlogRoutes);

const start = async () => {
	try {
		await server.listen(Port);

		const address = server.server.address();
		console.log(`Server listening at ${Port}}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();

// server.get('/ping', async (request, reply) => {
//     server.log.info('log message');
//     return 'pong\n';
// });
