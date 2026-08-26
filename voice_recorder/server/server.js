const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const config = require('./constants/constants');
const path = require('path');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(express.json());
app.use(express.static(config.BASE_DIR));
app.use(express.urlencoded({ extended: true }));

// Connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  socketTimeoutMS: 45000,
  family: 4, // Use IPv4, skip trying IPv6
  retryWrites: true,
  maxPoolSize: 10
};

// Connect with better error handling
mongoose.connect(process.env.MONGODB_URI, mongoOptions)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error: ", err);
    console.log("⚠️  Make sure MONGODB_URI is set correctly");
    console.log("💡 Connection string format: mongodb+srv://username:password@cluster.mongodb.net/dbname");
  });

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});

const appRoutes = require('./routes/app');
const errorRoutes = require('./routes/app');
const audioRoutes = require('./routes/audio');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, '../client/build/static')));
app.use('/api/audio', audioRoutes);
app.use('/', appRoutes);
app.use('/erro', errorRoutes);

const PORT = process.env.PORT || 5080;
server.listen(PORT, '0.0.0.0', () => {
    console.log("server listening on http://0.0.0.0:" + PORT);
});
