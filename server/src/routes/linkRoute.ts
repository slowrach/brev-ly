import type { FastifyInstance } from "fastify";

export async function linkRoute(app: FastifyInstance) {
   app.post('/', async (request, reply) => {

      await reply.status(201)
   })
} 