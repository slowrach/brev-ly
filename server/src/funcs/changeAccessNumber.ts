import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";
import { eq } from "drizzle-orm";

const linkRequest = z.object({
  id: z.string(),
  accessNumber: z.number(),
});

export type LinkRequest = z.input<typeof linkRequest>;

export async function changeAccessNumber(request: LinkRequest) {
  const { id, accessNumber } = linkRequest.parse(request);

  await db
    .update(schema.uploads)
    .set({accessNumber})
    .where(eq(schema.uploads.id, id));

  return accessNumber;
}
