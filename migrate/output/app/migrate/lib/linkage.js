/**
 * @file: linkage.js
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-27
 * @description: this is a <js> file
 */
/* eslint-disable */

/**
 * @desc 从home模块外链过来的模块
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _homeModelSchema = require('../../home/model/schema');

var _homeLibDaoMysql = require('../../home/lib/dao/mysql');

var _homeLibDaoMysql2 = _interopRequireDefault(_homeLibDaoMysql);

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * @desc 生成ids表用来储存自增ID
 */
var Schema = mongoose.Schema;
var IdsSchema = new Schema({
    _id: String,
    len: Number
});
var MenuId = undefined;
try {
    exports.MenuId = MenuId = mongoose.model('id', IdsSchema);
} catch (e) {
    exports.MenuId = MenuId = mongoose.model('id');
}

exports.Menu = _homeModelSchema.Menu;
exports.Database = _homeModelSchema.Database;
exports.Metadata = _homeModelSchema.Metadata;
exports.Dict = _homeModelSchema.Dict;
exports.User = _homeModelSchema.User;
exports.MySQL = _homeLibDaoMysql2['default'];
exports.MenuId = MenuId;

/* eslint-enable */