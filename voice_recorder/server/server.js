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

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("mongodb connected");
})
.catch((err) => {
    console.error("mongodb connection error: ", err);
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
