/**
 * @file: searchprivilege.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-25
 * @description: this is a <jes> file
 */
/* eslint-disable */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.get = get;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _servicePrivilege = require('../service/privilege');

var _servicePrivilege2 = _interopRequireDefault(_servicePrivilege);

function get(req, res) {
    var _req$query = req.query;
    var id = _req$query.id;
    var hasChilde = _req$query.hasChilde;

    /**
     * @desc 是否包含了节点
     */
    _servicePrivilege2['default'].onlyid(id, function (err, result) {
        if (parseInt(hasChilde) === 1) {
            _servicePrivilege2['default'].getChildren(result[0], function (err, result) {
                res.json([result]);
            });
            return;
        }
        res.json(result);
    });
}

/* eslint-enable */