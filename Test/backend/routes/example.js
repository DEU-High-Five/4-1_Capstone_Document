var express = require('express');
var router = express.Router();
var examp = require('../example.json');

router.get('/', function (req, res, next) {
 res.send(examp)
});

router.get('/:id', function (req, res, next) {
 var id = parseInt(req.params.id, 10)
 var movie = examp.filter(function (movie) {
 return movie.id === id
 });
 res.send(movie)
});
module.exports = router;