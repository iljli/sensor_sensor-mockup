/*
    Installed packages:

    npx express-generator sensormock --no-view --git
    npm install express
    npm install dotenv
*/

var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const port = process.env.PORT || 3001; 
app.listen(port, () => { 
    console.log(`Sensor-Mock listening at http://localhost:${port}`); 
});

module.exports = app;
