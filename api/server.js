// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();

// const userRoutes = '';

server.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = server;
