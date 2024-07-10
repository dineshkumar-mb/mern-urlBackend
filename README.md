implementing JWT authentication in a Node.js + Express.js API:

Install Dependencies: First, make sure you have Node.js and npm installed. Then, create a new Node.js project and install the necessary packages:
npm install express jsonwebtoken

Create an Authentication Middleware: You’ll need a middleware function to verify JWT tokens. Here’s a simple example:
JavaScript

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the Authorization header

    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Attach the user object to the request
        next();
    });
}
Generate Tokens on Login: When a user logs in, generate a JWT token and send it back to the client:
JavaScript

const token = jwt.sign({ username: 'user123' }, 'your-secret-key', { expiresIn: '1h' });
res.json({ token });

Protect Routes: Apply the authenticateToken middleware to routes that require authentication:
JavaScript

app.get('/protected-route', authenticateToken, (req, res) => {
    // Access the user object from req.user
    res.json({ message: 'Welcome to the protected route!' });
},
Client-Side Usage: In your client application (e.g., React, Angular, or Vue), store the token (usually in local storage) and include it in the Authorization header for authenticated requests.
Remember to replace 'your-secret-key' with a strong, unique secret key for signing and verifying tokens. Also, consider using environment variables for sensitive information.
