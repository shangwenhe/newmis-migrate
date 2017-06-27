/**
 * @file: db.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-25
 * @description: this is a <jes> file
 */
/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.channelDB = channelDB;
exports.metaData = metaData;
exports.topChannel = topChannel;
exports.privilege = privilege;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _model = require('../model/');

var DB = _interopRequireWildcard(_model);

function channelDB(req, res) {
    res.render('migrate/page/channeldb.tpl', {});
}

function metaData(req, res) {
    res.render('migrate/page/metadata.tpl', {});
}

function topChannel(req, res) {
    DB.modelTopchannel.getlist(req.query, function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
}

function privilege(req, res) {
    DB.modelPrivilege.getlist(req.query, function (err, results, fields) {
        res.send(JSON.stringify(results));
    });
}

/* eslint-enable */