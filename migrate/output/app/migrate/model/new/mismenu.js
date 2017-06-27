/**
 * @file: mismenu.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-27
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

var modelNewMismenu = (function () {
    function modelNewMismenu() {
        _classCallCheck(this, modelNewMismenu);
    }

    _createClass(modelNewMismenu, [{
        key: 'find',

        /**
         * @desc 通过old mis id查找是否已经被迁移过
         */
        value: function find(oid, callback) {
            _libLinkage.Menu.find({
                oid: oid
            }).limit(2).exec(callback);
        }
    }, {
        key: 'create',
        value: function create(cond, callback) {
            var menu = new _libLinkage.Menu(cond);
            menu.save(callback);
        }
    }, {
        key: 'maxId',
        value: function maxId(callback) {
            _libLinkage.Menu.find().sort({ id: -1 }).limit(1).exec(function (err, data) {
                callback(err, data[0]['id']);
            });
        }
    }, {
        key: 'update',
        value: function update(cond, rest, callback) {
            _libLinkage.Menu.update(cond, rest).exec(callback);
        }
    }, {
        key: 'setMenuId',
        value: function setMenuId(id, callback) {
            // callback(null, {id})
            _libLinkage.MenuId.update({ '_id': 'menu' }, { $set: { 'len': id } }).exec(callback);
        }
    }]);

    return modelNewMismenu;
})();

exports['default'] = new modelNewMismenu();

/* eslint-enable */
module.exports = exports['default'];