/**
 * @file: channeldb.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-05-04
 * @description: this is a <jes> file
 */
/* eslint-disable */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _model = require('../model/');

var DB = _interopRequireWildcard(_model);

var _modelNewMisdb = require('../model/new/misdb');

var _modelNewMisdb2 = _interopRequireDefault(_modelNewMisdb);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var serviceChanneldb = (function () {
    function serviceChanneldb() {
        _classCallCheck(this, serviceChanneldb);
    }

    _createClass(serviceChanneldb, [{
        key: 'migrate',
        value: function migrate(detail, callback) {
            var _this = this;

            _async2['default'].waterfall([function (callback) {
                /**
                 * @desc 验证数据库是否有权限
                 */
                var pool = _mysql2['default'].createConnection({
                    host: detail.db_host,
                    port: detail.db_port,
                    password: detail.db_password,
                    user: detail.db_user,
                    database: detail.db_database,
                    connectionLimit: 10
                });
                pool.connect(function (err, result) {
                    if (err) {
                        callback(Object.assign(err, {
                            errno: 100400,
                            msg: 'connect error, No database permissions'
                        }));
                        return;
                    }
                    callback(err, {
                        host: detail.db_host,
                        port: detail.db_port,
                        password: detail.db_password,
                        username: detail.db_user,
                        database: detail.db_database
                    });
                });
            }, function (db, callback) {
                var host = db.host;
                var port = db.port;
                var password = db.password;
                var username = db.username;
                var database = db.database;

                /**
                 * @desc 判断DB是否已经被添加
                 */
                _modelNewMisdb2['default'].find({ host: host, port: port, username: username }, function (err, result) {
                    /**
                     * @desc 如果数据库已经存在则跳过
                     */
                    if (err) {
                        callback(err);
                        return;
                    }

                    if (result && result.length > 0) {
                        err = {
                            errno: 100042,
                            msg: 'datadb ' + database + ' exist',
                            info: Object.assign(result, {
                                db_password: undefined
                            })
                        };
                    }
                    callback(err, result);
                });
            }, function (data, callback) {
                /**
                 * @desc 较验数据是否正确
                 */
                DB.modelChanneldb.getlist({
                    where: 'where db_host=\'' + detail.db_host + '\' and db_user=\'' + detail.db_user + '\' and db_port=' + detail.db_port
                }, callback);
            }, function (data, filed, callback) {
                _this.create(data[0], callback);
            }], callback);
        }
    }, {
        key: 'create',
        value: function create(db, callback) {
            _modelNewMisdb2['default'].create({
                host: db.db_host,
                port: db.db_port,
                name: db.db_database,
                desc: db.db_name,
                username: db.db_user,
                password: db.db_password,
                dbname: db.db_database,
                encode: db.charset,
                type: 'mysql',
                oid: db.id
            }, callback);
        }
    }]);

    return serviceChanneldb;
})();

exports['default'] = new serviceChanneldb();

/* eslint-enable */
module.exports = exports['default'];