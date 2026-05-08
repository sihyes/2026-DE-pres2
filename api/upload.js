import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default async function handler(req, res) {
    // 1. GET 요청만 허용
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { filename, contentType } = req.query;

    try {
        // 2. S3 클라이언트 설정 (환경변수 사용)
        const client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        // 3. 업로드할 파일 정보 설정 (경로는 uploads/폴더 안에 저장되도록)
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `uploads/${Date.now()}-${filename}`,
            ContentType: contentType,
        });

        // 4. 60초 동안만 유효한 업로드 URL 생성
        const url = await getSignedUrl(client, command, { expiresIn: 60 });
        
        // 5. 프론트엔드로 URL 전달
        res.status(200).json({ url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating Presigned URL' });
    }
}