const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favourRoutes = require('./routes/favours')

// Environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to the MongoDB Database
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection successful")
});

// api imports ---------------------
favourRoutes(app);
const userRoute = require('./routes/users');
const leaderRoute = require('./routes/leaderboardRoute')
const requestRoute = require('./routes/requestRoutes');
app.use('/api/leaderboard', leaderRoute)
app.use('/api/users',  userRoute);
app.use('/api/request',  requestRoute);


// Static build files for React deployment
app.use(express.static(path.resolve(__dirname, "../frontend", "build")));




// Redirect to react build file
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});