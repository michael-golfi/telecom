var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('db/wiglewifi.sqlite');

var router = express.Router();

var query = `SELECT lat,lon,level 
              FROM location,network 
              WHERE location.bssid = network.bssid
              AND ssid = 'wpa.mcgill.ca'`;

router.get('/', function (req, res, next) {
  db.serialize(function () {
    db.all(query, function (err, rows) {
      res.json(rows);
    });
  })
});

module.exports = router;
