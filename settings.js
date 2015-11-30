/**
 * Created by zhangyong on 2015/11/20.
 */


module.exports = {
    port: 3000,
    context: '/task_status',
    db_info: {
        host: '192.168.8.101',
        user: 'viewer',
        password: 'PL3pwc3gNF',
        database: 'microlens',
        port: 3314,
        debug: false
    },
    logger: {
        "appenders": [
            {
                "type": "console"
            },
            {
                "type": "file",
                "filename": "E:/workspaces/artemis_git/artemis_task_status/log/runtime.log",
                "maxLogSize": 2048,
                "category": "default"
            }
        ],
        "replaceConsole": true
    }
};
