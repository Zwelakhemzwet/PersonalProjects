
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { createReadStream } = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

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

async function uploadToCloud(
  filePath,
  keyPrefix,
  contentType = "application/octet-stream"
) {
  const ext = path.extname(filePath).toLowerCase() || ".bin";
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

async function deleteFromCloud(key) {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );

  return { key, deleted: true };
}

async function getFileUrl(key) {
  if (PUBLIC_URL) {
    return `${PUBLIC_URL}/${key
      .split("/")
      .map(encodeURIComponent)
      .join("/")}`;
  }

  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: BUCKET,
      Key: key,
    }),
    { expiresIn: 3600 }
  );
}

module.exports = {
  uploadToCloud,
  getFileUrl,
  deleteFromCloud,
};
