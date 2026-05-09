import z from "zod";
import { db } from "../infra/db";
import { schema } from "../infra/db/schemas";
import { PostgresError } from "postgres";

const linkRequest = z.object({
  originalLink: z.string(),
  shortLink: z.string(),
});

export type LinkRequest = z.input<typeof linkRequest>;

export async function uploadLinks(request: LinkRequest): Promise<{
  code: 201 | 400;
  data:
    | { message: string }
    | (LinkRequest & { uploadId: string; accessNumber: number });
}> {
  const { originalLink, shortLink } = linkRequest.parse(request);

  try {
    const [upload] = await db
      .insert(schema.uploads)
      .values({
        originalLink,
        shortLink,
      })
      .returning({
        uploadId: schema.uploads.id,
        originalLink: schema.uploads.originalLink,
        shortLink: schema.uploads.shortLink,
        accessNumber: schema.uploads.accessNumber,
      });

    return {
      code: 201,
      data: upload,
    };
  } catch (e) {
    return {
      code: 400,
      data: { message: "Essa URL encurtada já existe." },
    };
  }
}
