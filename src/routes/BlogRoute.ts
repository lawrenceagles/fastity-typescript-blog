import { FastifyInstance, FastifyPluginOptions, FastifyPluginAsync } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import { Db } from '../config/index';
import { BlogAttrs } from '../config/models/BlogModel';

declare module 'fastify' {
	export interface FastifyInstance {
		db: Db;
	}
}

interface blogParams {
	id: string;
}

const BlogRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
	server.get('/blogs', {}, async (request, reply) => {
		try {
			const { Blog } = server.db.models;

			const blogs = await Blog.find();

			return reply.code(200).send(blogs);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

	server.post<{ Body: BlogAttrs }>('/blogs', {}, async (request, reply) => {
		try {
			const { Blog } = server.db.models;

			const blog = await Blog.addOne(request.body);

			return reply.code(201).send(blog);
		} catch (error) {
			request.log.error(error);
			return reply.send(500);
		}
	});

	// Read: https://www.fastify.io/docs/latest/TypeScript/#using-generics
	server.get<{ Params: blogParams }>('/blogs/:id', {}, async (request, reply) => {
		try {
			const _id = request.params.id;

			const blog = await server.db.models.Blog.findOne({
				_id
			});

			if (!blog) {
				return reply.send(404);
			}

			return reply.code(200).send(blog);
		} catch (error) {
			request.log.error(error);
			return reply.send(400);
		}
	});
};

export default fastifyPlugin(BlogRoute);
