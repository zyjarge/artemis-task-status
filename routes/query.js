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
        logger.info("接收到http请求：" + bodyStr);

        var params = JSON.parse(bodyStr);
        jobService.getTasks(params, function (rows) {
            logger.info(rows);
            res.setHeader("Content-Type", "json/text");
            res.json(rows);
        });
    });
});

router.post('/qq', function (req, res, next) {
    console.log(req.body);
    if (req.headers["Content-Type"] != "json/text"){
        res.end("JSON request Only~");
    }
    jobService.getTasks(req.body, function (rows) {
        logger.info(rows);
        res.setHeader("Content-Type", "json/text");
        res.json(rows);
    });
})

module.exports = router;