/**
 * @file: privilege.jes
 * @author: shangwenhe@itv.baidu.com
 * @date: 2017-04-25
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

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var servicePrivilege = (function () {
    function servicePrivilege() {
        _classCallCheck(this, servicePrivilege);
    }

    _createClass(servicePrivilege, [{
        key: 'onlyid',

        /**
         * @desc 查询指定ID
         */
        value: function onlyid(id, callback) {
            DB.modelPrivilege.getlist({
                where: 'where id=' + id
            }, callback);
        }

        /**
         * @desc 从父节点递归查询
         */
    }, {
        key: 'getChildren',
        value: function getChildren(privilege, callback) {
            var _this = this;

            DB.modelPrivilege.getlist({
                where: 'where parent_id=' + privilege.id,
                limit: 'limit 100'
            }, function (err, list) {
                if (list instanceof Array && list.length > 0) {
                    _async2['default'].mapSeries(list, function (item, callback) {
                        // 递归查询
                        _this.getChildren(item, callback);
                    }, function (err, datalist) {
                        privilege.children = datalist;
                        callback(err, privilege);
                    });
                } else {
                    privilege.children = list;
                    callback(err, privilege);
                }
            });
        }
    }]);

    return servicePrivilege;
})();

exports['default'] = new servicePrivilege();

/* eslint-enable */
module.exports = exports['default'];