export default function handler(req, res) {
  const { method, body } = req;

  if (method === 'POST') {
    const { email, subscriptionType = 'both' } = body;

    // Basic email validation
    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        error: 'Valid email address is required' 
      });
    }

    // In a real app, you'd save to database
    // For now, we'll just simulate success
    console.log(`New subscription: ${email} (${subscriptionType})`);

    res.status(201).json({
      message: 'Successfully subscribed to AI Simplified!',
      email: email,
      subscriptionType: subscriptionType,
      welcome: 'Thank you for joining our AI community. Your first newsletter will arrive soon!',
      nextSteps: [
        'Check your email for a welcome message',
        'Add newsletter@ai-simplified.com to your contacts',
        'Share AI Simplified with friends who love AI news'
      ]
    });
  } else if (method === 'GET') {
    // Get subscription stats
    res.status(200).json({
      totalSubscribers: 1247,
      dailySubscribers: 892,
      weeklySubscribers: 355,
      recentGrowth: '+12% this week'
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
