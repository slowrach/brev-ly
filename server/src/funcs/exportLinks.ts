import { Readable } from "node:stream";
import { listLinks } from "./listLinks";
import type { StorageProvider } from "../storage/storage";

function buildCsv(
  links: {
    uploadId: string;
    originalLink: string;
    shortLink: string;
    accessNumber: number;
    createdAt: Date;
  }[],
): string {
  const header = "uploadId,originalLink,shortLink,accessNumber,createdAt";
  const rows = links.map(
    (link) =>
      `${link.uploadId},${link.originalLink},${link.shortLink},${link.accessNumber},${link.createdAt.toISOString()}`,
  );

  return [header, ...rows].join("\n");
}

export async function exportLinks(storage: StorageProvider) {
  const links = await listLinks();

  if (!links || links.length === 0) {
    return null;
  }

  const csv = buildCsv(links);
  const fileName = `exports/links-${Date.now()}.csv`;

  const stream = Readable.from(Buffer.from(csv, "utf-8"));

  const { url } = await storage.uploadFileAsStream({
    path: fileName,
    contentType: "text/csv",
    stream,
  });

  return { url };
}
