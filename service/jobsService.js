/**
 * Created by zhangyong on 2015/11/20.
 */

var mysql = require('mysql');
var db_pool = require('../utils/db_pool.js').pool;
var logger = require('../utils/logger.js').getLogger;

var getTasks = function (params, callback) {

    function genSQLByParams(params) {
        var sql = "select task_name,task_period,task_start_time,task_end_time,task_status from muse_task_status " +
            "where task_name in (" + params.task_name + ") and task_period >='" + params.task_start_time + "' and task_period <= '" + params.task_end_time + "';";
        return sql;
    }

    function dbQuery(params, callback) {
        db_pool.getConnection(function (err, conn, cb) {
            if (err) {
                logger.error("Error: " + err);
            }
            else {
                logger.info("Get Connection Success!");
                var sql = genSQLByParams(params);
                conn.query(sql, function (err, rows) {
                    logger.info(sql);
                    if (err) {
                        logger.err("Error:" + err);
                        conn.release();
                    }
                    callback(rows);
                });
            }
        })
    }

    dbQuery(params, callback);
};

exports.getTasks = getTasks;

