/**
 * @file: index.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-25
 * @description: this is a <jes> file
 */
/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _oldChanneldb = require('./old/channeldb');

var _oldChanneldb2 = _interopRequireDefault(_oldChanneldb);

var _oldMetadata = require('./old/metadata');

var _oldMetadata2 = _interopRequireDefault(_oldMetadata);

var _oldTopchannel = require('./old/topchannel');

var _oldTopchannel2 = _interopRequireDefault(_oldTopchannel);

var _oldDeliver = require('./old/deliver');

var _oldDeliver2 = _interopRequireDefault(_oldDeliver);

var _oldPrivilege = require('./old/privilege');

var _oldPrivilege2 = _interopRequireDefault(_oldPrivilege);

exports.modelChanneldb = _oldChanneldb2['default'];
exports.modelMetadata = _oldMetadata2['default'];
exports.modelTopchannel = _oldTopchannel2['default'];
exports.modelDeliver = _oldDeliver2['default'];
exports.modelPrivilege = _oldPrivilege2['default'];

/* eslint-enable */