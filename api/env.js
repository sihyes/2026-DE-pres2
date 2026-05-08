export default function handler(req, res) {
  const accessKey = process.env.AWS_ACCESS_KEY_ID || "NOT_FOUND";
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY || "NOT_FOUND";

  res.status(200).json({
    AWS_ACCESS_KEY_ID: accessKey,
    AWS_SECRET_ACCESS_KEY: secretKey,
  });
}
