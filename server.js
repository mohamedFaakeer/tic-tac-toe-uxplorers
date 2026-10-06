const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self';");
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Rate limit: 30 requests per minute per IP
const limiter = rateLimit({ windowMs: 60 * 1000, max: 30, message: { error: 'Rate limit exceeded' } });
app.use(limiter);

app.use(cors({ origin: ['http://localhost:3000', 'https://tic-tac-toe-uxplorers.web.app'] }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on port', PORT));
