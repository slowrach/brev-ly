import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";

export async function listLinks() {
  const link = await db
    .select({
      uploadId: schema.uploads.id,
      originalLink: schema.uploads.originalLink,
      shortLink: schema.uploads.shortLink,
      accessNumber: schema.uploads.accessNumber,
      createdAt: schema.uploads.createdAt,
    })
    .from(schema.uploads);

  return link;
}
