/**
 * @file: misdb.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-05-02
 * @description: this is a <jes> file
 */
/* eslint-disable */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _libLinkage = require('../../lib/linkage');

var modelNewMisdb = (function () {
    function modelNewMisdb() {
        _classCallCheck(this, modelNewMisdb);
    }

    _createClass(modelNewMisdb, [{
        key: 'find',

        /**
         * @desc 通过old mis id查找是否已经被迁移过
         */
        value: function find(_ref, callback) {
            var host = _ref.host;
            var port = _ref.port;
            var username = _ref.username;

            _libLinkage.Database.find({
                host: host, port: port, username: username
            }).exec(callback);
        }
    }, {
        key: 'create',
        value: function create(cond, callback) {
            var database = new _libLinkage.Database(cond);
            database.save(callback);
        }
    }]);

    return modelNewMisdb;
})();

exports['default'] = new modelNewMisdb();

/* eslint-enable */
module.exports = exports['default'];