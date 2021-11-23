var express = require('express');
var router = express.Router();

const modData = {
  "sensor_id": '1',
  "time": 12345678,
  "pressure": 1021.659,        
  "temperature": 25.88761,     
  "humidity": 38,
  "carbondioxide": 515,        
  "organic": 17,
  "sensorData": [ 42.4242, 39 ]
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(modData);
  
});

module.exports = router;
