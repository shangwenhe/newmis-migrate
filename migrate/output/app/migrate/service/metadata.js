/**
 * @file: metadata.jes
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

var _bluebird = require('bluebird');

var Promise = _interopRequireWildcard(_bluebird);

var _model = require('../model/');

var DB = _interopRequireWildcard(_model);

var _modelNewMismetadata = require('../model/new/mismetadata');

var _modelNewMismetadata2 = _interopRequireDefault(_modelNewMismetadata);

var _modelNewMisdb = require('../model/new/misdb');

var _modelNewMisdb2 = _interopRequireDefault(_modelNewMisdb);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _libLinkage = require('../lib/linkage');

var serviceMetadata = (function () {
    function serviceMetadata() {
        _classCallCheck(this, serviceMetadata);
    }

    _createClass(serviceMetadata, [{
        key: 'migrate',
        value: function migrate(detail, metadataDesc, callback) {
            var _this = this;

            _async2['default'].waterfall([function (callback) {
                /**
                 * @desc  查找元数据是否存在
                 */
                _modelNewMismetadata2['default'].find(detail.name, function (err, info) {
                    if (err) {
                        callback(err);
                        return;
                    }
                    /**
                     * @desc 如果元数据存在则跳出
                     */
                    if (!err && info && info.length > 0) {
                        callback({
                            errno: 100040,
                            msg: 'metadata ' + detail.name + ' exist'
                        });
                        return;
                    }
                    callback(null, info);
                });
            }, function (info, callback) {
                /**
                 * @desc 查找元数据对应的库的相关信息
                 */
                DB.modelChanneldb.getlist({
                    where: 'where id=' + detail.db_id
                }, callback);
            }, function (data, field, callback) {

                var db = data[0];
                /**
                 * @desc 查找元数据对应的库是否在MIS中存在
                 */
                _modelNewMisdb2['default'].find({
                    host: db.db_host,
                    port: db.db_port,
                    username: db.db_user
                }, function (err, result) {
                    if (!err && result.length < 1) {
                        err = {
                            errno: 100040,
                            msg: 'datadb ' + db.db_database + ' undefined',
                            info: Object.assign(db, {
                                db_password: undefined,
                                db_port: undefined
                            })
                        };
                    }
                    callback(err, result);
                });
            }, function (data, callback) {
                /**
                 * @desc 从旧MIS中取出数据
                 */
                DB.modelMetadata.getlist({
                    where: 'where id=' + detail.id + ' and name=\'' + detail.name + '\' and top_ch_spell=\'video_publish\' and status=\'A\''
                }, function (err, field) {
                    callback(err, field[0], data[0]);
                });
            }, function (field, data, callback) {

                var homemysql = new _libLinkage.MySQL(data);
                homemysql.getDesc(detail.name).then(function (mysqlData) {

                    var schemas = mysqlData.map(function (item) {
                        var key = item['field'];
                        var desc = field['validate_depency'][key] && field['validate_depency'][key]['name'] || '';
                        item.desc = desc;
                        return item;
                    });
                    var editdepency = field['display_depency']['edit'];
                    var listdepency = field['display_depency']['view'];
                    var edit_conf = Object.keys(field['display_depency']['edit']).map(function (item, key) {
                        if (!editdepency[item]['display']) {
                            return false;
                        }
                        var field = item;
                        var edittype = 'edit-showing-input';
                        if (/time/.test(field)) {
                            edittype = 'edit-showing-time';
                        }
                        if (/img/.test(field)) {
                            edittype = 'edit-showing-image-upload';
                        }
                        if (/works_id/.test(field)) {
                            edittype = 'edit-showing-works-input';
                        }

                        return { field: field, edittype: edittype };
                    }).filter(function (value, index) {
                        return value;
                    });

                    var list_conf = Object.keys(field['display_depency']['view']).map(function (item, key) {
                        if (!listdepency[item]['display']) {
                            return false;
                        }
                        var field = item;
                        var type = 'list-showing-text';
                        if (/url/.test(field)) {
                            type = 'list-showing-link';
                        }
                        if (/img/.test(field)) {
                            type = 'list-showing-image';
                        }
                        if (/time/.test(field)) {
                            type = 'list-showing-time';
                        }
                        return { field: field, type: type };
                    }).filter(function (value, index) {
                        return value;
                    });

                    var database_id = data['_id'];
                    var table_name = detail.name;
                    var desc = metadataDesc || detail.name;

                    /**
                     * @desc  创建元数据
                     */
                    _this.create({ list_conf: list_conf, edit_conf: edit_conf, schemas: schemas, database_id: database_id, desc: desc, table_name: table_name }, callback);
                });
            }], callback);
        }

        /**
         * @desc 创建一个元数据
         */
    }, {
        key: 'create',
        value: function create(data, callback) {
            _modelNewMismetadata2['default'].create(data, callback);
            // callback(null, data);
        }
    }]);

    return serviceMetadata;
})();

exports['default'] = new serviceMetadata();

/* eslint-enable */
module.exports = exports['default'];