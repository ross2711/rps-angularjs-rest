
var express = require('express');
var router = express.Router();

// Home page route.
router.get('/random-number', function (request, response) {
    const random = Math.floor(Math.random() * 3);
    
    var data = {
        name: 'remote',
        answer: random
    };
    response.send(data);

})

module.exports = router;