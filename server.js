const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'production';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Static file serving
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
    maxAge: '1d',
    etag: true
}));
app.use(express.static(__dirname));

// Health check endpoint for Octopus monitoring
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'PayXchangeable',
        version: process.env.OCTOPUS_RELEASE_NUMBER || '2.0.0',
        environment: ENV,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// API Routes
app.get('/api/health', (req, res) => {
    res.json({
        status: 'PayXchangeable API Active',
        deployment: 'Octopus Deploy',
        timestamp: new Date().toISOString(),
        version: process.env.OCTOPUS_RELEASE_NUMBER || '2.0.0'
    });
});

app.get('/api/csrf-token', (req, res) => {
    res.json({ token: 'octopus-csrf-' + Date.now() });
});

app.post('/api/csp-report', (req, res) => {
    console.log('CSP Violation Report:', req.body);
    res.status(204).send();
});

// Authentication endpoints
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (email && password) {
        res.json({
            success: true,
            user: {
                id: 1,
                email: email,
                name: 'PayXchangeable User',
                platforms: ['Apple Cash', 'Samsung Pay', 'PayPal']
            },
            token: 'jwt-' + Date.now()
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Platform management
app.get('/api/platforms', (req, res) => {
    res.json([
        {
            id: 'apple-cash',
            name: 'Apple Cash',
            connected: true,
            balance: 1250.00,
            lastSync: new Date().toISOString()
        },
        {
            id: 'samsung-pay',
            name: 'Samsung Pay',
            connected: true,
            balance: 890.50,
            lastSync: new Date().toISOString()
        },
        {
            id: 'paypal',
            name: 'PayPal',
            connected: true,
            balance: 2100.75,
            lastSync: new Date().toISOString()
        },
        {
            id: 'zelle',
            name: 'Zelle',
            connected: false,
            balance: 0,
            lastSync: null
        },
        {
            id: 'venmo',
            name: 'Venmo',
            connected: false,
            balance: 0,
            lastSync: null
        }
    ]);
});

// Bridge transfer processing
app.post('/api/transactions/bridge', (req, res) => {
    const { from, to, amount, note } = req.body;
    const fee = parseFloat(amount) * 0.005;
    
    res.json({
        transactionId: 'tx_' + Date.now(),
        from: from,
        to: to,
        amount: parseFloat(amount),
        fee: fee,
        total: parseFloat(amount) + fee,
        status: 'processing',
        estimatedTime: '2-5 minutes',
        note: note || '',
        timestamp: new Date().toISOString()
    });
});

// Financial learning modules
app.get('/api/learning/modules', (req, res) => {
    res.json([
        {
            id: 'budgeting-basics',
            title: 'Budgeting Basics',
            description: 'Learn fundamental budgeting techniques',
            progress: 75,
            unlocked: true,
            lessons: 5,
            estimatedTime: '45 minutes'
        },
        {
            id: 'investment-fundamentals',
            title: 'Investment Fundamentals',
            description: 'Understanding risk and return principles',
            progress: 40,
            unlocked: true,
            lessons: 8,
            estimatedTime: '1 hour'
        },
        {
            id: 'retirement-planning',
            title: 'Retirement Planning',
            description: 'Long-term financial planning strategies',
            progress: 0,
            unlocked: false,
            lessons: 6,
            estimatedTime: '50 minutes'
        }
    ]);
});

// EBT benefits integration
app.get('/api/ebt/benefits', (req, res) => {
    res.json({
        cashBalance: 450.00,
        snapBalance: 320.00,
        lastUpdated: new Date().toISOString(),
        availableUtilities: [
            { name: 'Electric', provider: 'City Power', accountNumber: '****1234' },
            { name: 'Gas', provider: 'Metro Gas', accountNumber: '****5678' },
            { name: 'Water', provider: 'Water Dept', accountNumber: '****9012' },
            { name: 'Internet', provider: 'Fast Internet', accountNumber: '****3456' }
        ]
    });
});

// Serve main application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle client-side routing
app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        res.status(404).json({ error: 'API endpoint not found' });
    } else {
        res.sendFile(path.join(__dirname, 'index.html'));
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Application Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`PayXchangeable running on port ${PORT}`);
    console.log(`Environment: ${ENV}`);
    console.log(`Deployment: Octopus Deploy`);
});

module.exports = app;