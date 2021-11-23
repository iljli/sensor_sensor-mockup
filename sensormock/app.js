/*
    Installed packages:

    npx express-generator sensormock --no-view --git
    npm install express
    npm install dotenv
    npm install cors
    // npm i --save axios
    // npm install node-fetch express-async-await
*/

var express = require('express');
var path = require('path');
const cors = require("cors");

var indexRouter = require('./routes/index');
var sensorRouter = require('./routes/sensor');

var app = express();

app.use(cors()); //Allowing cors for all origins

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sensor', sensorRouter);

const port = process.env.PORT || 3001; 
app.listen(port, () => { 
    console.log(`Sensor-Mock listening at http://localhost:${port}`); 
});

module.exports = app;
