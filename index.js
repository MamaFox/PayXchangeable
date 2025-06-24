const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://cdn.jsdelivr.net", "'unsafe-inline'"],
      styleSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "'unsafe-inline'"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static('public'));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'PayXchangeable API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    message: 'PayXchangeable API is running',
    version: '1.0.0',
    features: ['Cross-platform transfers', 'EBT integration', 'FXAMS crypto', 'Financial education']
  });
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ 
    csrfToken: 'mock-csrf-token-for-serverless',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/csp-report', (req, res) => {
  console.log('CSP Violation:', req.body);
  res.status(204).send();
});

app.get('/api/bridges', (req, res) => {
  res.json({
    bridges: [
      { from: 'Apple Cash', to: 'Zelle', fee: '0.5%' },
      { from: 'Samsung Pay', to: 'PayPal', fee: '0.75%' },
      { from: 'Venmo', to: 'Cash App', fee: '0.5%' },
      { from: 'EBT Cash', to: 'Any Platform', fee: '0.45% (10% discount)' }
    ],
    totalBridges: 256,
    supported: ['Apple Cash', 'Samsung Pay', 'Zelle', 'PayPal', 'Venmo', 'Cash App', 'EBT Cash', 'Bank Accounts']
  });
});

app.use((err, req, res, next) => {
  console.error('API Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

module.exports = serverlessHttp(app);