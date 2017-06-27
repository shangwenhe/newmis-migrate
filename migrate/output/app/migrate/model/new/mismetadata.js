/**
 * @file: mismetadata.jes
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

var modelNewMismetadata = (function () {
    function modelNewMismetadata() {
        _classCallCheck(this, modelNewMismetadata);
    }

    _createClass(modelNewMismetadata, [{
        key: 'find',

        /**
         * @desc 通过old mis id查找是否已经被迁移过
         */
        value: function find(table, callback) {
            _libLinkage.Metadata.find({
                table_name: table,
                is_deleted: false,
                menu_id: ''
            }).exec(callback);
        }
    }, {
        key: 'create',
        value: function create(cond, callback) {
            var metadata = new _libLinkage.Metadata(cond);
            metadata.save(callback);
        }
    }]);

    return modelNewMismetadata;
})();

exports['default'] = new modelNewMismetadata();

/* eslint-enable */
module.exports = exports['default'];