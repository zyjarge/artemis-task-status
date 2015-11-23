/**
 * log4js封装类
 * Created by zhangyong on 14-1-26.
 */

var log4js = require('log4js');
var log4js_conf = require('../settings').logger;

log4js.configure(log4js_conf);

function getLogger() {
    var logger = log4js.getLogger("default");
    return logger;
}

exports.getLogger = getLogger();