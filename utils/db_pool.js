/**
 * Created by zhangyong on 14-2-21.
 * 将数据源改为连接池方式
 */

var mysql = require("mysql");
var setting = require("../settings.js");

var pool = mysql.createPool(setting.db_info);

exports.pool = pool;