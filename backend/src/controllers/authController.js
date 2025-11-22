const login = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded credentials as per requirements
  const validUsers = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  const user = validUsers.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    });
  }

  // In a real app, we'd generate a JWT token here
  // For simplicity, we'll return a success response
  res.json({
    success: true,
    message: 'Login successful',
    user: {
      email: user.email
    }
  });
};

module.exports = {
  login
};

