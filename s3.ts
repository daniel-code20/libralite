import 'dotenv/config';
import fs from 'fs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Asegúrate de que estas variables de entorno estén definidas
const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
const S3_REGION = process.env.S3_REGION;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY;

if (!S3_BUCKET_NAME || !S3_REGION || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    throw new Error('Missing required environment variables');
}

const client = new S3Client({
    region: S3_REGION,
    credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_ACCESS_KEY,
    }
});

async function uploadFile(pathFile: string) {
    const stream = fs.createReadStream(pathFile);

    const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: 'archivo',
        Body: stream
    };
    
    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
}

export default uploadFile;
