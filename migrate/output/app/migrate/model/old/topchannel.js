/**
 * @file: top_channel.jes
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _libMysql = require('../../lib/mysql');

var _libMysql2 = _interopRequireDefault(_libMysql);

var modelTopchannel = (function (_mysql) {
    _inherits(modelTopchannel, _mysql);

    function modelTopchannel() {
        _classCallCheck(this, modelTopchannel);

        _get(Object.getPrototypeOf(modelTopchannel.prototype), 'constructor', this).call(this);
        /**
         * @desc 顶级菜单
         */
        this.table = 'top_channel';
    }

    _createClass(modelTopchannel, [{
        key: 'getlist',
        value: function getlist(_ref, callback) {
            var _ref$fields = _ref.fields;
            var fields = _ref$fields === undefined ? '*' : _ref$fields;
            var _ref$where = _ref.where;
            var where = _ref$where === undefined ? '' : _ref$where;
            var _ref$order = _ref.order;
            var order = _ref$order === undefined ? '' : _ref$order;
            var _ref$limit = _ref.limit;
            var limit = _ref$limit === undefined ? 'limit 10' : _ref$limit;

            this.select({
                table: this.table,
                fields: fields,
                where: where,
                order: order,
                limit: limit
            }, callback);
        }
    }]);

    return modelTopchannel;
})(_libMysql2['default']);

exports['default'] = new modelTopchannel();

/* eslint-enable */
module.exports = exports['default'];