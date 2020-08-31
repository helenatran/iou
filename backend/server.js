const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { allowedNodeEnvironmentFlags } = require('process');

// Environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Static build files for React deployment
app.use(express.static(path.resolve(__dirname, "../frontend", "build")));

// Redirect to react build file
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
});

app.listen(PORT, () =>{
    console.log(`Server started on port: ${PORT}`)
});