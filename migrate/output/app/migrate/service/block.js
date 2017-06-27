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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _modelOldMetadata = require('../model/old/metadata');

var _modelOldMetadata2 = _interopRequireDefault(_modelOldMetadata);

var _modelOldChanneldb = require('../model/old/channeldb');

var _modelOldChanneldb2 = _interopRequireDefault(_modelOldChanneldb);

/**
 * misXXXX 为新MIS的模块
 */

var _modelNewMismenu = require('../model/new/mismenu');

var _modelNewMismenu2 = _interopRequireDefault(_modelNewMismenu);

var _modelNewMismetadata = require('../model/new/mismetadata');

var _modelNewMismetadata2 = _interopRequireDefault(_modelNewMismetadata);

var _modelNewMisdb = require('../model/new/misdb');

var _modelNewMisdb2 = _interopRequireDefault(_modelNewMisdb);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceBlock = (function () {
    function serviceBlock() {
        _classCallCheck(this, serviceBlock);
    }

    _createClass(serviceBlock, [{
        key: 'migrate',

        /**
         * @desc 所要迁移的区块
         * @param blocks 所有需要迁移的区块
         */
        value: function migrate(_ref, callback) {
            var _this = this;

            var blocks = _ref.blocks;
            var parentNode = _ref.parentNode;

            this.parentNode = parentNode;
            this.ID = parentNode.autoId || 0;
            this.parseBlock({
                children: blocks
            }, this.ID, function (err, item) {

                if (err) {
                    callback(err);
                    return;
                }

                if (item.children && item.children[0]['parent_id']) {
                    item.children[0]['parent_id'] = _this.parentNode.id;
                }
                var menusArr = [];
                (function loop(item) {
                    var children = item.children.map(function (item) {
                        var children = [];
                        if (item.children.length > 0) {
                            children = item.children.map(function (item) {
                                return item.id;
                            });
                            item.menu.children = loop(item);
                        }
                        menusArr.push(Object.assign(item.menu, {
                            children: children
                        }));
                        return item.menu;
                    });
                    return children;
                })(item);

                _async2['default'].mapSeries(menusArr, function (item, callback) {
                    _modelNewMismenu2['default'].find(item.oid, function (err, result) {
                        if (err) {
                            callback(Object.assign(err, item, {
                                errno: 100035,
                                msg: '查找菜单出错'
                            }));
                            return;
                        }
                        if (result instanceof Array && result.length > 0) {
                            callback(err, []);
                            return;
                        }
                        _modelNewMismenu2['default'].create(item, callback);
                    });
                }, function (err, result) {
                    _async2['default'].waterfall([function (callback) {
                        // 添加父子关系
                        _modelNewMismenu2['default'].update({
                            id: parentNode.id
                        }, {
                            $addToSet: {
                                "children": parentNode.autoId + 1
                            }
                        }, callback);
                    }, function (result, callback) {
                        // 取得当前最大的ID
                        _modelNewMismenu2['default'].maxId(callback);
                    }, function (result, callback) {
                        // 更新表IDS
                        _modelNewMismenu2['default'].setMenuId(result, callback);
                    }], callback);
                });
            });
        }
    }, {
        key: 'rebuildMenu',
        value: function rebuildMenu(item, blocks, callback) {
            var _this2 = this;

            if (item.menu) {
                blocks = item.menu;
            }
            blocks.children = [];
            _async2['default'].mapSeries(item.children, function (item, callback) {
                if (item.children && item.children.length > 0) {
                    _this2.rebuildMenu(item, item.menu, callback);
                } else {
                    blocks.children.push(item.menu);
                    callback(null, blocks);
                }
            }, callback);
        }

        /**
         * @desc 解析出数据中的区块
         */
    }, {
        key: 'parseBlock',
        value: function parseBlock(blocks, parent_id, callback) {
            var _this3 = this;

            _async2['default'].mapSeries(blocks.children, function (item, callback) {
                var url = item.index_page.match(/([^\/]*)\/mQuery/i);
                item.metadata = url && url[1] || '';
                item.parent_id = parent_id;
                item.oid = item.id;
                item.id = ++_this3.ID;

                /**
                 * @desc 查看metdata是否已经存在
                 */

                _this3.getMenu(item, function (err, info) {
                    if (item.children.length > 0) {
                        /**
                         *  @desc 如果item.children.length 长度大于零则进入下一个循环
                         */
                        _this3.parseBlock(item, _this3.ID, callback);
                    } else {
                        /**
                         *  @desc 如果item.children.length 长度小于1则调用callback 结束回调
                         */
                        callback(err, item);
                    }
                });
            }, function (err, result) {
                blocks.children = result;
                callback(err, blocks);
            });
        }

        /**
         * @desc 判断导航是否已经存在
         */
        // getMenu(item, callback) {
        //     /**
        //      * @desc 查找menu ID是否存在
        //      */
        //     modelNewMismenu.find(item.id, (err, result) => {
        //         if (err) {
        //             callback(Object.assign(err, item, {
        //                 errno: 100035,
        //                 msg: '查找菜单出错'
        //             }));
        //             return;
        //         }
        //         if (result instanceof Array && result.length > 0) {
        //             callback(err, item);
        //             return;
        //         }
        //         // 创建菜单
        //         this.createMenu(item, callback);
        //     });
        // }

        /**
         * @desc  创建菜单前的参数调整
         */
    }, {
        key: 'getMenu',
        value: function getMenu(item, callback) {

            var diff = {};
            if (item.metadata) {
                var query = item.index_page.match(/(block_sign|_order_by|_order_desc)=[^&]*/ig);
                diff = {
                    /**
                     * @desc 数据库ID 通过 item.metadata
                     * @desc 进行查询出来
                     */
                    metadata_id: '',
                    conds_query: query.join('&'),
                    show_type: 1
                };
            }

            var menu = Object.assign({
                name: item.priv_name,
                status: item.is_display,
                link: '',
                desc: '',
                show_type: 0,
                /**
                 * @desc 联合查询的query
                 */
                conds_query: ''
            }, diff, {
                parent_id: item.parent_id,
                oid: item.oid,
                id: item.id
            });
            item.menu = menu;
            if (!item.metadata) {
                /**
                 * 创建链接导航
                 */
                callback(null, item);
                return;
            }
            this.getMetadata(item, function (err, item) {
                callback(err, item);
            });
        }

        /**
         * @desc 取得metadata 如果不存在则创建如果已经存在则跳过
         */
    }, {
        key: 'getMetadata',
        value: function getMetadata(item, callback) {
            _modelNewMismetadata2['default'].find(item.metadata, function (err, result) {
                if (err) {
                    callback(Object.assign(err, item, {
                        errno: 100034,
                        msg: '从新的MIS中取出metadata失败'
                    }));
                    return;
                }
                /**
                 * @desc metadata已经在新MIS存在
                 */
                if (result instanceof Array && result.length > 0) {
                    item.menu.metadata_id = result[0]['_id'];
                    item.metainfo = result[0];
                    callback(err, item);
                    return;
                }

                /**
                 * @desc 元数据不存在
                 * @desc 从旧的MIS取出metadata数据
                 */
                callback({
                    errno: 100034,
                    msg: item.metadata + ' metadata not find'
                });
            });
        }
    }]);

    return serviceBlock;
})();

exports['default'] = new serviceBlock();

/* eslint-enable */
module.exports = exports['default'];