/**
 * Created by zhangyong on 2015/11/18.
 * router for handling the query request.
 */

var express = require('express');
var jobService = require('../service/jobsService.js');
var logger = require('../utils/logger.js').getLogger;

var router = express.Router();

router.post('/q', function (req, res, next) {
    var bodyStr = '';
    req.on('data', function (chunk) {
        bodyStr += chunk;
    });
    req.on('end', function () {
        console.log(bodyStr);
        var params = JSON.parse(bodyStr);
        jobService.getTasks(params, function (rows) {
            logger.info(rows);
            res.setHeader("Content-Type","json/text");
            res.json(rows);
        });

    });
});

module.exports = router;