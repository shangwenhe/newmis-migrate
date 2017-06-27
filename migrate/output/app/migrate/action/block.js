/**
 * @file: block.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-26
 * @description: this is a <jes> file
 */
/* eslint-disable */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.post = post;
exports.get = get;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _serviceBlock = require('../service/block');

var _serviceBlock2 = _interopRequireDefault(_serviceBlock);

var _modelNewMismenu = require('../model/new/mismenu');

var _modelNewMismenu2 = _interopRequireDefault(_modelNewMismenu);

function post(req, res) {
    // 取出提交过来的数据
    var blocks = JSON.parse(req.body.blocks);

    var parentNode = req.body.parentNode && JSON.parse(req.body.parentNode) || {};

    _modelNewMismenu2['default'].maxId(function (err, id) {
        // autoId 为索引ID
        parentNode.autoId = id;
        _serviceBlock2['default'].migrate({ blocks: blocks, parentNode: parentNode }, function (err, result) {
            if (err) {
                res.json({ err: err });
                return;
            }
            res.json(result);
        });
    });
}

function get(req, res) {
    res.send('{get:""}');
}

/* eslint-enable */