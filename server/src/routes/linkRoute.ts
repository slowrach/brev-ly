import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { uploadLinks } from "../funcs/linkFunc";

export const linkRoute: FastifyPluginAsyncZod = async app => {
  app.post("/", {
   schema: {
      summary: "Create a new link" ,
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
         })
      }
   }
  }, async (request, reply) => {
    const { originalLink, shortLink } = request.body;

    const uploadedLink = await uploadLinks({
      originalLink,
      shortLink,
    })

    if(!uploadedLink) {
      await reply.status(400).send({ message: "Invalid link"})
    }

    await reply.status(201).send({ originalLink, shortLink });
  });
}
