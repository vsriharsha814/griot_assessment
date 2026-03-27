// server/app.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./server/config/db');
const productRoutes = require('./server/routers/productRoutes');
const authRoutes = require('./server/routers/authRoutes');
const sellerRoutes = require('./server/routers/sellerRoutes');
const { notFoundHandler, errorHandler } = require('./server/middleware/errorHandler');

require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Ensure uploads directory exists for multer file writes.
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads', { recursive: true });
}

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const RATE_LIMIT_WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000);
const RATE_LIMIT_MAX = Number(process.env.RATE_LIMIT_MAX || 300);

const limiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
});

const isAllowedDevOrigin = (origin) =>
  /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (curl, server-to-server).
    if (!origin) return callback(null, true);
    if (origin === CLIENT_URL) return callback(null, true);
    if (process.env.NODE_ENV !== 'production' && isAllowedDevOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(helmet());
app.use(limiter);
app.use(express.json({ limit: '1mb' }));

app.use(cors(corsOptions));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/seller', sellerRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const io = socketIO(server, {
  cors: {
    origin:
      process.env.NODE_ENV === 'production'
        ? CLIENT_URL
        : [CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: ['GET', 'POST'],
  },
});


io.on('connection', (socket) => {
    console.log('New socket connection');
  
    // Listen for incoming messages and broadcast them to other clients
    socket.on('sendMessage', (message) => {
      io.emit('message', message);
    });
  
    // Disconnect event
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });
  });

const startServer = async () => {
  await connectDB();
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();