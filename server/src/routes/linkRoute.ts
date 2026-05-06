import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { uploadLinks } from "../funcs/uploadLinks";
import { listLinks } from "../funcs/listLinks";

export const linkRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    "/",
    {
      schema: {
        summary: "Create a new link",
        body: z.object({
          originalLink: z.url(),
          shortLink: z.string(),
        }),
        response: {
          201: z.object({
            originalLink: z.url(),
            shortLink: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body;

      const uploadedLink = await uploadLinks({
        originalLink,
        shortLink,
      });

      if (!uploadedLink) {
        return reply.status(400).send({ message: "Invalid link" });
      }

      return reply.status(201).send({ originalLink, shortLink });
    },
  );

  app.get(
    "/",
    {
      schema: {
        summary: "Get links",
        response: {
          200: z.array(
            z.object({
              originalLink: z.string(),
              shortLink: z.string(),
            }),
          ),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const link = await listLinks();

      if (!link) {
        return reply.status(400).send({ message: "Link não encontrado" });
      }

      return reply.status(200).send(link);
    },
  );
};
