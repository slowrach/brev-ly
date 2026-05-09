import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";
import { eq } from "drizzle-orm";

const linkRequest = z.object({
  id: z.string(),
});

export type LinkRequest = z.input<typeof linkRequest>;

export async function deleteLinks(request: LinkRequest) {
  const { id } = linkRequest.parse(request);

  await db
    .delete(schema.uploads)
    .where(eq(schema.uploads.id, id));

  return id;
}
