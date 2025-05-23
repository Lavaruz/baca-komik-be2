import { S3Client } from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.CLOUDFLARE_R2_URL, // Ganti <account_id>
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_KEY,
    secretAccessKey: process.env.CLOUDFLARE_R2_KEY_SECRET,
  },
});

export default r2;
