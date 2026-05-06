import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";

export async function listLinks() {
  const link = await db
    .select({
      originalLink: schema.uploads.originalLink,
      shortLink: schema.uploads.shortLink,
    })
    .from(schema.uploads);

  return link;
}
