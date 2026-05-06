import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";

const linkRequest = z.object({
  originalLink: z.url(),
  shortLink: z.string(),
});

export type LinkRequest = z.input<typeof linkRequest>;

export async function uploadLinks(request: LinkRequest) {
  const { originalLink, shortLink } = linkRequest.parse(request);

  console.log({ originalLink, shortLink });

  await db.insert(schema.uploads).values({
    originalLink,
    shortLink,
  });

  return { originalLink, shortLink };
}
