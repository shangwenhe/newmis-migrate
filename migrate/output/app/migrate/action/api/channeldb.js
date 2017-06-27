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
exports.get = get;
exports.post = post;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _model = require('../../model/');

var DB = _interopRequireWildcard(_model);

var _serviceChanneldb = require('../../service/channeldb');

var _serviceChanneldb2 = _interopRequireDefault(_serviceChanneldb);

function get(req, res) {
    DB.modelChanneldb.getlist(req.query, function (err, results, fields) {
        if (err) {
            res.json(err);
            return;
        }
        if (results && results.length < 1) {
            res.json({
                errno: 100041,
                msg: 'not find db'
            });
            return;
        }
        // results[0]['db_password'] = undefined;
        res.json(results);
    });
}

function post(req, res) {
    var detail = JSON.parse(req.body.detail);
    _serviceChanneldb2['default'].migrate(detail, function (err, data) {
        if (err) {
            res.json(err);
            return;
        }
        res.json(data);
    });
}

/* eslint-enable */