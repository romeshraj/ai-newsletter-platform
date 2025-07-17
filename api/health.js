export default function handler(req, res) {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'AI Newsletter API is running on Vercel!',
    backend: 'serverless'
  });
}
