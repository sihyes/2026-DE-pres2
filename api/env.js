export default function handler(req, res) {
  const accessKey = process.env.AWS_ACCESS_KEY_ID || "";
  const secretKey = process.env.AWS_SECRET_ACCESS_KEY || "";

  res.status(200).json({
    AWS_ACCESS_KEY_ID: accessKey
      ? accessKey
      : "NOT_FOUND",

    AWS_SECRET_ACCESS_KEY: secretKey
      ? secretKey
      : "NOT_FOUND",
  });
}
