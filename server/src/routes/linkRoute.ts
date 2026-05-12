import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { uploadLinks } from "../funcs/uploadLinks";
import { listLinks } from "../funcs/listLinks";
import { deleteLinks } from "../funcs/deleteLinks";
import { changeAccessNumber } from "../funcs/changeAccessNumber";
import { R2StorageProvider } from "../storage/providers/r2-storage";
import fs from "node:fs";
import { exportLinks } from "../funcs/exportLinks";

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
            uploadId: z.string(),
            originalLink: z.string(),
            shortLink: z.string(),
            accessNumber: z.number(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { originalLink, shortLink } = request.body;

      const { code, data } = await uploadLinks({
        originalLink,
        shortLink,
      });

      return reply.status(code).send(data);
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
              uploadId: z.string(),
              originalLink: z.string(),
              shortLink: z.string(),
              accessNumber: z.number(),
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
        return reply.status(400).send({ message: "Error listing items" });
      }

      return reply.status(200).send(link);
    },
  );

  app.get(
    "/export",
    {
      schema: {
        summary: "Export links as CSV",
        response: {
          200: z.object({
            url: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const storageProvider = new R2StorageProvider();
      const result = await exportLinks(storageProvider);

      if (!result) {
        return reply.status(400).send({ message: "No links found to export" });
      }

      return reply.status(200).send({ url: result.url });
    },
  );

  app.delete(
    "/:id",
    {
      schema: {
        summary: "Delete a link",
        params: z.object({
          id: z.string(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const deleted = await deleteLinks({ id });

      if (!deleted) {
        return reply
          .status(400)
          .send({ message: "Error. This link was not deleted" });
      }

      return reply.status(200).send({ message: "Link successfully deleted" });
    },
  );

  app.patch(
    "/:id",
    {
      schema: {
        summary: "Change access number",
        params: z.object({
          id: z.string(),
        }),
        body: z.object({
          accessNumber: z.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { accessNumber } = request.body;

      const changeNumber = await changeAccessNumber({ id, accessNumber });

      if (!changeNumber) {
        return reply
          .status(400)
          .send({ message: "Error. This link was not updated" });
      }

      return reply
        .status(200)
        .send({ message: "Access number successfully updated" });
    },
  );
};
