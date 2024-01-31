// Import
const express = require('express');
const route = require('./routes/route');
const app = express();
const path = require('path');
require('dotenv').config();
// Static Files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/css', express.static(path.join(__dirname, '../public/css')));
app.use('/js', express.static(path.join(__dirname, '../public/js')));
app.use('/img', express.static(path.join(__dirname, '../public/img')));

app.use('/', route);

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Listen on port 4021
const PORT = process.env.PORT || 4020;

// const port = 4021;
app.listen(PORT, function () {
  console.log('Bubble node app running on port ' + PORT);
});
