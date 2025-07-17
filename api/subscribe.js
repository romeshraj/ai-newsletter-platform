export default function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, subscriptionType = 'both' } = body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        error: 'Valid email address is required' 
      });
    }

    res.status(201).json({
      message: 'Successfully subscribed to AI Simplified!',
      email: email,
      subscriptionType: subscriptionType,
      welcome: 'Thank you for joining our AI community. Your first newsletter will arrive soon!'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
