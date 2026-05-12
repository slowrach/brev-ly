import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import type { StorageProvider, UploadFileAsStreamInput } from "../storage";
import { env } from "../../env";

export class R2StorageProvider implements StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    });
  }

  public async uploadFileAsStream({
    path,
    contentType,
    stream,
  }: UploadFileAsStreamInput) {
    const upload = new Upload({
      client: this.client,
      params: {
        Key: path,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: stream,
        ContentType: contentType,
      },
    });

    await upload.done();

    return {
      url: new URL(path, env.CLOUDFLARE_PUBLIC_URL).toString(),
    };
  }
}
