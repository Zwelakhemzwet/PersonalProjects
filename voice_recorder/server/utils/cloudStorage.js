
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createReadStream } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

const BUCKET = process.env.R2_BUCKET;
const ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const PUBLIC_URL = process.env.R2_PUBLIC_URL?.replace(/\/+$/, "");

const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function uploadToCloud(
  filePath,
  keyPrefix,
  contentType = "application/octet-stream"
) {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase() || ".bin";

  const key = `${keyPrefix}${randomUUID()}${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: createReadStream(filePath),
      ContentType: contentType,
    })
  );

  return {
    key,
    url: await getFileUrl(key),
  };
}

export async function getFileUrl(key) {
  // Use a permanent public URL if configured.
  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${key
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`;
  }

  // Otherwise, generate a temporary URL for the private object.
  return getSignedUrl(
    s3,
    new (await import("@aws-sdk/client-s3")).GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 * 24 * 30 }
  );
}
