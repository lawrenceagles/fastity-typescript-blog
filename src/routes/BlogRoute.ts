import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

const BlogRoute = async (server: FastifyInstance, opts) => {
	declare module 'fastify' {
		export interface FastifyInstance<
			HttpServer = http.Server,
			HttpRequest = http.IncomingMessage,
			HttpResponse = http.ServerResponse
		> {
			blipp(): void;
			db: Db;
		}
	}

	server.get('/vehicles/:id', {}, async (request, reply) => {
		try {
			const _id = request.params.id;

			const vehicle = await server.db.models.Blog.findOne({
				_id
			});

			if (!vehicle) {
				return reply.send(404);
			}

			return reply.code(200).send(vehicle);
		} catch (error) {
			request.log.error(error);
			return reply.send(400);
		}
	});

	server.post('/vehicles', {}, async (request, reply) => {
		try {
			const { Blog } = server.db.models;

			const blog = await Blog.createOne(request.body);

			return reply.code(201).send(blog);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});
};

export default fastifyPlugin(BlogRoute);
