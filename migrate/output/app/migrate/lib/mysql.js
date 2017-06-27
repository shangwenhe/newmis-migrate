/**
 * @file: MySql.jes
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MySql = require('mysql');
var connection = MySql.createConnection({
    host: '10.26.3.189',
    port: 6151,
    user: 'ns_cms_mis',
    password: 'kGdjLang',
    database: 'db_mis',
    charset: 'utf8'
});
connection.connect();

var mysql = (function () {
    function mysql() {
        _classCallCheck(this, mysql);

        this.connection = connection;
    }

    /**
     * @desc 格式化 query
     * @param object
     *      object table 选择数据表
     *      object fields 选择的列
     *      object where 添加选择条件
     *      object order 排序
     *      object limit 条数限制
     * @callback callback
     */

    _createClass(mysql, [{
        key: 'select',
        value: function select(_ref) {
            var table = _ref.table;
            var _ref$fields = _ref.fields;
            var fields = _ref$fields === undefined ? '*' : _ref$fields;
            var _ref$where = _ref.where;
            var where = _ref$where === undefined ? '' : _ref$where;
            var _ref$order = _ref.order;
            var order = _ref$order === undefined ? '' : _ref$order;
            var _ref$limit = _ref.limit;
            var limit = _ref$limit === undefined ? 'limit 10' : _ref$limit;
            var callback = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var query = ['select', fields, 'from', table, where, order, limit];
            console.log(query.join(' '));
            this.connection.query(query.join(' '), function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                // this.connection.end();
                callback && callback.apply(null, args);
            });
        }
    }]);

    return mysql;
})();

exports['default'] = mysql;

/* eslint-enable */
module.exports = exports['default'];