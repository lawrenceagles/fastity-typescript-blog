import { fastify, FastifyInstance } from 'fastify';
// import { Server, IncomingMessage, ServerResponse } from 'http';
import pino from 'pino';
const dbConnector = require('./config/index');

const Port = process.env.PORT || 7000;
const server = fastify({
	logger: pino({ level: 'info' })
});

// register plugin below:
// server.register(db, { uri: "mongodb://localhost:27017/blogs" });
server.register(dbConnector);
// server.register(require('./blog-routes'));

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
